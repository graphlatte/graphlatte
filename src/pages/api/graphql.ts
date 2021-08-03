import { Context, createContext } from "@/graphql/context";
import { getEnveloped } from "@/graphql/envelop";
import { ExtendedRequest, withSession } from "@/graphql/session";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
} from "graphql-helix";
import { NextApiResponse } from "next";

async function run(req: ExtendedRequest, res: NextApiResponse) {
  const { parse, validate, contextFactory, execute, schema } = getEnveloped({
    req,
  });

  const request = {
    body: req.body,
    headers: req.headers,
    method: String(req.method),
    query: req.query,
  };

  if (shouldRenderGraphiQL(request) && process.env.NODE_ENV !== "production") {
    return res.send(renderGraphiQL({ endpoint: "/api/graphql" }));
  }

  const { operationName, query, variables } = getGraphQLParameters(request);

  const result = await processRequest<Context>({
    operationName,
    query,
    variables,
    request,
    schema,
    parse,
    validate,
    execute,
    contextFactory: (props) => ({
      ...createContext({ req }),
      ...contextFactory(props),
    }),
  });

  if (result.type === "RESPONSE") {
    result.headers.forEach(({ name, value }) => res.setHeader(name, value));
    res.status(result.status).json(result.payload);
  }
}

export default withSession(run);
