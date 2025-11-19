import { User } from "../../lib/prisma";

export type ReqRegisterDTO = {
    name: string;
    lastname: string;
    password: string;
    register: string;
};

export type ResRegisterDTO = {
    user: User | null;
};
