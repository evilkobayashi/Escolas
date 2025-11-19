import { IPrismaUserFactory } from "../../repositories/IPrismaUserRepository";
import { AuthUseCase } from "../auth-use-case";

export function MakeAuth(prismaUserFactory: IPrismaUserFactory) {
    const repository = prismaUserFactory.createRepository();
    const auth = new AuthUseCase(repository);

    return auth;
}
