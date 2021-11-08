import { Context, createContext } from "@/graphql/context";
import { getEnveloped } from "@/graphql/envelop";
import { withSession } from "@/graphql/session";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from "graphql-helix";

export default withSession(async (req, res) => {
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
  const { parse, validate, contextFactory, execute, schema } = getEnveloped({
    req,
  });

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

  sendResult(result, res);
});
