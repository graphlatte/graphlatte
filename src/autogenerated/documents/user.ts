import * as Types from "../types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type UserFragment = { __typename?: "User" } & Pick<
  Types.User,
  "id" | "name" | "createdAt"
>;

export const UserFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "User" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserFragment, unknown>;
