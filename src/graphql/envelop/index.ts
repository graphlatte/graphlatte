/* eslint-disable react-hooks/rules-of-hooks */
import { schema } from "@/graphql/schema";
import { envelop, useLogger, useSchema, useTiming } from "@envelop/core";

function getEventFromName(eventName: string) {
  switch (eventName) {
    case "execute-start":
      return "[EXECUTE:START]";

    case "execute-end":
      return "[EXECUTE:END]";

    case "subscribe-start-start":
      return "[SUBSCRIBE:START]";

    case "subscribe-start-end":
      return "[SUBSCRIBE:END]";

    default:
      return "[UNRECOGNIZED]";
  }
}

export const getEnveloped = envelop({
  plugins: [
    // nexus not updated for gql16 yet
    // @ts-ignore
    useSchema(schema),
    useLogger({
      logFn(eventName, { args, result }) {
        const event = getEventFromName(eventName);

        console.log(event, args.operationName);

        if (result) {
          console.log(
            `[RESULT:${args.operationName}]`,
            JSON.stringify(result.data[args.operationName], null, 2)
          );
        }
      },
    }),
    useTiming(),
  ],
});
