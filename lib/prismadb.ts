import { PrismaClient } from "@prisma/client";

declare global {
  var primsa: PrismaClient | undefined;
}

const prismadb = globalThis.primsa || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.primsa = prismadb;

export default prismadb;
