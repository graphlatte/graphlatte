import { prisma } from "@/graphql/database";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

export type SessionUser = {
  id: number;
  name: string;
};

export type Context = {
  req: NextApiRequest;
  prisma: PrismaClient;
  user?: SessionUser;
};

type CreateContextProps = {
  req: NextApiRequest;
};

export function createContext({ req }: CreateContextProps): Context {
  return {
    req,
    prisma,
    user: req.session.user,
  };
}
