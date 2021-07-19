import { writeFile } from "fs/promises";
import { customAlphabet } from "nanoid";
import { resolve } from "path";

const gen = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  100
);

writeFile(
  resolve(process.cwd(), ".env"),
  `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app"
AUTH_COOKIE="cookie"
IRON_SECRET="${gen()}"

NEXT_PUBLIC_BASE_URL="http://localhost:3000"
`
);
