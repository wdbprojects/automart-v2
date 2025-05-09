import { bcryptPasswordHash } from "@/lib/bcrypt";
import { PrismaClient } from "@prisma/client";

export const seedAdmin = async (prisma: PrismaClient) => {
  const password = await bcryptPasswordHash("asdfasdf");
  const admin = await prisma.user.create({
    data: {
      email: "admin@wdb.com",
      hashedPassword: password,
    },
  });
  console.log("Admin created: ", admin);
  return admin;
};
