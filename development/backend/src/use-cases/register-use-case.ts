import { IPrismaUserRepository } from "../repositories/IPrismaUserRepository";
import { ReqRegisterDTO, ResRegisterDTO } from "./dto/register";
import { hashPwd } from "../utils/bcryptPwd";

class RegisterUseCase {
    constructor(private prismaUserRepository: IPrismaUserRepository) {
        this.prismaUserRepository = prismaUserRepository;
    }

    async exec(data: ReqRegisterDTO): Promise<ResRegisterDTO> {
        const userAlreadyExists =
            await this.prismaUserRepository.findByRegister(data.register);

        if (userAlreadyExists) {
            throw new Error("Estudante já existente");
        }

        const pwd_hash = await hashPwd(data.password);

        const user = await this.prismaUserRepository.create({
            ...data,
            password: pwd_hash,
        });

        return { user };
    }
}

export { RegisterUseCase };
