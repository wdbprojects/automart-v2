import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

function makeClient() {
  return new PrismaClient().$extends(withAccelerate());
}

// export const prisma = globalForPrisma.prisma || (makeClient() as PrismaClient);
export const prisma =
  globalForPrisma.prisma || (makeClient() as unknown as PrismaClient);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
