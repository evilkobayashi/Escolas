import { prisma, Token } from "../lib/prisma";

interface IPrismaJWTRepository {
    store: (userId: number, refreshToken: string) => Promise<Token | null>;
}

interface IPrismaJWTFactory {
    jwtFactory(): IPrismaJWTRepository;
}

export { IPrismaJWTRepository, IPrismaJWTFactory };
