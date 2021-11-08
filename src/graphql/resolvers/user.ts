import { isAuthorized } from "@/graphql/rules/isAuthorized";
import { hash, verify } from "argon2";
import {
  mutationField,
  nonNull,
  objectType,
  queryField,
  stringArg,
} from "nexus";
import { User } from "nexus-prisma";
import { z } from "zod";

export const item = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.name);
    t.field(User.password);
    t.field(User.createdAt);
  },
});

export const login = mutationField("login", {
  type: "User",
  args: {
    name: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  async resolve(_root, { name, password }, { prisma, req }) {
    const validName = await z.string().min(1).safeParseAsync(name);

    if (!validName.success) {
      throw new Error("Invalid name.");
    }

    const validPassword = await z.string().min(1).safeParseAsync(password);

    if (!validPassword.success) {
      throw new Error("Invalid password.");
    }

    const userInDatabase = await prisma.user.findUnique({
      where: {
        name,
      },
    });

    if (!userInDatabase) {
      throw new Error("User not found.");
    }

    const isValidPassword = await verify(userInDatabase.password, password);

    if (isValidPassword) {
      req.session.user = {
        id: userInDatabase.id,
        name,
      };
      await req.session.save();

      delete (userInDatabase as any).password;

      return userInDatabase;
    }

    throw new Error("Invalid password.");
  },
});

export const register = mutationField("register", {
  type: "User",
  args: {
    name: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  async resolve(_root, { name, password }, { prisma }) {
    const validName = await z.string().min(1).safeParseAsync(name);

    if (!validName.success) {
      throw new Error("Invalid name.");
    }

    const validPassword = await z.string().min(1).safeParseAsync(password);

    if (!validPassword.success) {
      throw new Error("Invalid password.");
    }

    const exists = await prisma.user.findUnique({
      where: {
        name,
      },
    });

    if (exists) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await hash(password);

    const result = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    delete (result as any).password;

    return result;
  },
});

export const logout = mutationField("logout", {
  type: "User",
  async resolve(_root, _args, { req }) {
    req.session.destroy();
    return null;
  },
});

export const me = queryField("me", {
  type: "User",
  authorize: isAuthorized,
  async resolve(_root, _args, { user, prisma }) {
    if (!user) {
      return null;
    }

    const userInDatabase = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userInDatabase) {
      throw new Error("Not authorized");
    }

    delete (userInDatabase as any).password;

    return userInDatabase;
  },
});
