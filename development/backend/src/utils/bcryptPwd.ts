import * as bcrypt from "bcrypt";

export const hashPwd = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

export const comparePwd = async (current: string, hash: string) => {
    return await bcrypt.compare(current, hash);
};
