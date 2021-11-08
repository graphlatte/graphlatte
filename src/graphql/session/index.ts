import { passwords } from "@/config/passwords";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

export function withSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, {
    password: passwords,
    cookieName: process.env.AUTH_COOKIE,
  });
}
