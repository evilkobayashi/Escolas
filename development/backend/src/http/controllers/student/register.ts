import { Request, Response } from "express";
import { studentRegisterSchema } from "../../schemas/StudentSchema";
import { PrismaUserFactory } from "../../../repositories/prisma/PrismaUserRepository";
import { MakeRegister } from "../../../use-cases/factories/makeRegister";

async function RegisterController(req: Request, res: Response) {
    try {
        const student = studentRegisterSchema.parse(req.body);

        const prismaFact = new PrismaUserFactory();
        const makeRegister = MakeRegister(prismaFact);

        await makeRegister.exec(student);

        res.status(200).json({
            message: "Estudante cadastrado!",
        });
    } catch (error) {
        res.json({
            message: "Error",
        });
    }
}

export { RegisterController };
