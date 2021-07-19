import { Context } from "@/graphql/context";

export async function isAuthorized(_r: {}, _a: {}, { session }: Context) {
  const user = session.get("user");
  return Boolean(user);
}
