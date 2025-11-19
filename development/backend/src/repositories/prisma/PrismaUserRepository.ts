import {
    IPrismaUserRepository,
    IPrismaUserFactory,
} from "../IPrismaUserRepository";
import { prisma, Prisma, User } from "../../lib/prisma";

class PrismaUserRepository implements IPrismaUserRepository {
    async create(data: Prisma.UserCreateInput): Promise<User | null> {
        try {
            const user = await prisma.user.create({
                data,
            });

            return user;
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    async findByID(id: number): Promise<User | null> {
        try {
            const user = prisma.user.findUnique({
                where: {
                    id,
                },
            });

            return user;
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    async findByRegister(register: string): Promise<User | null> {
        try {
            const user = prisma.user.findUnique({
                where: {
                    register,
                },
            });

            return user;
        } catch (err) {
            console.error(err);
        }
        return null;
    }
}

class PrismaUserFactory implements IPrismaUserFactory {
    public createRepository(): IPrismaUserRepository {
        return new PrismaUserRepository();
    }
}

export { PrismaUserFactory, PrismaUserRepository };
