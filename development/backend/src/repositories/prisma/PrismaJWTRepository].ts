import {
    IPrismaJWTFactory,
    IPrismaJWTRepository,
} from "../IPrismaJWTRepository";
import { prisma, Token } from "../../lib/prisma";

class PrismaJWTRepository implements IPrismaJWTRepository {
    async store(userId: number, refreshToken: string): Promise<Token | null> {
        try {
            const token = prisma.token.create({
                data: {
                    refreshToken,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                    users: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });

            return token;
        } catch (err) {
            console.error(err);
        }

        return null;
    }
}

class PrismaJWTFactory implements IPrismaJWTFactory {
    public jwtFactory(): PrismaJWTRepository {
        return new PrismaJWTRepository();
    }
}

export { PrismaJWTRepository, PrismaJWTFactory };
