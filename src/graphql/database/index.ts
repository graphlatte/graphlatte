import { PrismaClient } from "@prisma/client";

declare const global: NodeJS.Global;

export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}
