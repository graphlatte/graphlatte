import { Context, createContext } from "@/graphql/context";
import { schema } from "@/graphql/schema";
import { ExtendedRequest, withSession } from "@/graphql/session";
import {
  getGraphQLParameters,
  processRequest,
  shouldRenderGraphiQL,
} from "graphql-helix";
import { renderPlaygroundPage } from "graphql-playground-html";
import { NextApiResponse } from "next";

async function run(req: ExtendedRequest, res: NextApiResponse) {
  const request = {
    body: req.body,
    headers: req.headers,
    method: String(req.method),
    query: req.query,
  };

  if (shouldRenderGraphiQL(request) && process.env.NODE_ENV !== "production") {
    return res.send(renderPlaygroundPage({ endpoint: "/api/graphql" }));
  }

  const { operationName, query, variables } = getGraphQLParameters(request);

  const result = await processRequest<Context>({
    operationName,
    query,
    variables,
    request,
    schema,
    contextFactory: () => createContext({ req }),
  });

  if (result.type === "RESPONSE") {
    result.headers.forEach(({ name, value }) => res.setHeader(name, value));
    res.status(result.status).json(result.payload);
  }
}

export default withSession(run);
