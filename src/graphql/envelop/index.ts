/* eslint-disable react-hooks/rules-of-hooks */
import { schema } from "@/graphql/schema";
import { envelop, useLogger, useSchema, useTiming } from "@envelop/core";

export const getEnveloped = envelop({
  plugins: [useSchema(schema), useLogger(), useTiming()],
});
