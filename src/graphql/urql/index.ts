import { NextPage } from "next";
import { withUrqlClient, WithUrqlProps } from "next-urql";

export function withGraphQL(page: NextPage<WithUrqlProps>) {
  return withUrqlClient(() => ({
    url: "/api/graphql",
    requestPolicy: "cache-and-network",
  }))(page);
}
