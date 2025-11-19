import { PrismaClient, Prisma, User, Token, Profile } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma, Prisma, User, Token, Profile };
