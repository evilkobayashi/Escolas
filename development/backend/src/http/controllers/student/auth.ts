import { Request, Response } from "express";
import { studentAuthSchema } from "../../schemas/StudentSchema";
import { PrismaUserFactory } from "../../../repositories/prisma/PrismaUserRepository";
import { MakeAuth } from "../../../use-cases/factories/makeAuth";
import { PrismaJWTFactory } from "../../../repositories/prisma/PrismaJWTRepository]";
import * as jwt from "jsonwebtoken";

async function AuthController(req: Request, res: Response) {
    try {
        const { register, password } = studentAuthSchema.parse(req.body);

        const prismaFact = new PrismaUserFactory();
        const makeAuth = MakeAuth(prismaFact);

        const { user } = await makeAuth.exec({ register, password });

        const { jwtFactory } = new PrismaJWTFactory();

        const accessToken = jwt.sign(
            {
                sub: {
                    ...user,
                    password: undefined,
                },
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d",
            }
        );

        const refreshToken = jwt.sign(
            {
                sub: {
                    ...user,
                    password: undefined,
                },
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d",
            }
        );

        await jwtFactory().store(user!.id, refreshToken);

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        res.status(200).json({
            auth: true,
            message: "Autenticado",
            ...user,
            password: undefined,
        });
    } catch (err) {
        console.error(err);
    }
}

export { AuthController };
