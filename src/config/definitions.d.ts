import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "preview";
      PORT?: string;
      IRON_SECRET: string;
      AUTH_COOKIE: string;
      DATABASE_URL: string;
      NEXT_PUBLIC_BASE_URL: string;
    }

    interface Global {
      prisma: PrismaClient;
    }
  }
}

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      name: string;
    };
  }
}

export {};
