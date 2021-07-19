import { prisma } from "@/graphql/database";
import { ExtendedRequest } from "@/graphql/session";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-iron-session";

export type SessionUser = {
  id: number;
  name: string;
};

export type Context = {
  prisma: PrismaClient;
  req: ExtendedRequest;
  session: Session;
  user: SessionUser | undefined;
};

type CreateContextProps = {
  req: ExtendedRequest;
};

export function createContext({ req }: CreateContextProps): Context {
  return { req, prisma, session: req.session, user: req.session.get("user") };
}
