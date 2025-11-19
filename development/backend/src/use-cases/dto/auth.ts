import { User } from "../../lib/prisma";

export type ReqAuthDTO = {
    register: string;
    password: string;
};

export type ResAuthDTO = {
    user: User | null;
};
