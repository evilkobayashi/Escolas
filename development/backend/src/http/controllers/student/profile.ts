import { Request, Response } from "express";
import { MakeProfile } from "../../../use-cases/factories/makeProfile";
import { PrismaUserFactory } from "../../../repositories/prisma/PrismaUserRepository";

async function ProfileController(req: Request, res: Response) {
    try {
        const userData = req.user;

        const prismaFact = new PrismaUserFactory();
        const makeProfile = MakeProfile(prismaFact);

        const { user } = await makeProfile.exec({
            register: userData.payload.sub.register,
        });

        res.json({
            auth: true,
            user,
        });
    } catch (err) {
        console.error(err);
    }
}

export { ProfileController };
