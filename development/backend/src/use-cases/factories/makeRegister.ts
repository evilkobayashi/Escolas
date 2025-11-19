import { IPrismaUserFactory } from "../../repositories/IPrismaUserRepository";
import { RegisterUseCase } from "../register-use-case";

export function MakeRegister(prismaUserFactory: IPrismaUserFactory) {
    const repository = prismaUserFactory.createRepository();
    const register = new RegisterUseCase(repository);

    return register;
}
