import { z } from "zod";

const studentRegisterSchema = z
    .object({
        name: z.string(), // Nome
        lastname: z.string(), // Sobrenome
        register: z.string(), // Matricula
        password: z.string(), // Senha
        confirm: z.string(), // Confirmar Senha
    })
    .refine((data) => data.password === data.confirm, {
        error: "As senhas não são iguais",
        path: ["confirm"],
    });

const studentAuthSchema = z.object({
    register: z.string(), // Matricula
    password: z.string(), // Senha
});

export { studentRegisterSchema, studentAuthSchema };
