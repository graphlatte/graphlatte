import * as Types from "../types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type HelloQueryVariables = Types.Exact<{ [key: string]: never }>;

export type HelloQuery = {
  __typename?: "Query";
  hello?: string | null | undefined;
};

export const HelloDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "hello" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "hello" } }],
      },
    },
  ],
} as unknown as DocumentNode<HelloQuery, HelloQueryVariables>;
