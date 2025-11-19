import { IPrismaUserFactory } from "../../repositories/IPrismaUserRepository";
import { ProfileUseCase } from "../profile-use-case";

export function MakeProfile(prismaUserFactory: IPrismaUserFactory) {
    const repository = prismaUserFactory.createRepository();
    const profile = new ProfileUseCase(repository);

    return profile;
}
