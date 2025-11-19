import { User } from "../../lib/prisma";

export type ReqProfileDTO = {
    register: string;
};
export type ResProfileDTO = {
    user: User | null;
};
