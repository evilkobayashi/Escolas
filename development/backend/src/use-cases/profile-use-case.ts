import { IPrismaUserRepository } from "../repositories/IPrismaUserRepository";
import { ReqProfileDTO, ResProfileDTO } from "./dto/profile";

class ProfileUseCase {
    constructor(private prismaUserRepository: IPrismaUserRepository) {
        this.prismaUserRepository = prismaUserRepository;
    }

    async exec(data: ReqProfileDTO): Promise<ResProfileDTO> {
        const user = await this.prismaUserRepository.findByRegister(
            data.register
        );

        if (!user) {
            throw new Error("Este estudante não existe");
        }

        return { user };
    }
}

export { ProfileUseCase };
