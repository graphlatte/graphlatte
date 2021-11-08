import { Context } from "@/graphql/context";

export async function isAuthorized(root: {}, args: {}, { user }: Context) {
  return typeof user?.id !== "undefined";
}
