import { ReqAuthDTO, ResAuthDTO } from "./dto/auth";
import { IPrismaUserRepository } from "../repositories/IPrismaUserRepository";
import { comparePwd } from "../utils/bcryptPwd";

class AuthUseCase {
    constructor(private prismaUserRepository: IPrismaUserRepository) {
        this.prismaUserRepository = prismaUserRepository;
    }

    async exec(data: ReqAuthDTO): Promise<ResAuthDTO> {
        const user = await this.prismaUserRepository.findByRegister(
            data.register
        );

        if (!user) {
            throw new Error("Estudante não existe no sistema");
        }

        const pwd_match = await comparePwd(data.password, user.password);

        if (!pwd_match) {
            throw new Error("Matrícula/senha está incorreto.");
        }

        return { user };
    }
}

export { AuthUseCase };
