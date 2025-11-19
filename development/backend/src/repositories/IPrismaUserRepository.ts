import { Prisma, User } from "../lib/prisma";

interface IPrismaUserRepository {
    create: (data: Prisma.UserCreateInput) => Promise<User | null>;
    findByID: (id: number) => Promise<User | null>;
    findByRegister: (register: string) => Promise<User | null>;
}

interface IPrismaUserFactory {
    createRepository(): IPrismaUserRepository;
}

export { IPrismaUserRepository, IPrismaUserFactory };
