import * as Types from "../types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type RandomQueryVariables = Types.Exact<{ [key: string]: never }>;

export type RandomQuery = { __typename?: "Query" } & Pick<
  Types.Query,
  "random"
>;

export const RandomDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "random" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "random" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomQuery, RandomQueryVariables>;
