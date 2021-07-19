import { passwords } from "@/config/passwords";
import { NextApiRequest, NextApiResponse } from "next";
import { Handler, Session, withIronSession } from "next-iron-session";

export interface ExtendedRequest extends NextApiRequest {
  session: Session;
}

export function withSession(handler: Handler<NextApiRequest, NextApiResponse>) {
  return withIronSession(handler, {
    password: passwords,
    cookieName: process.env.AUTH_COOKIE,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}
