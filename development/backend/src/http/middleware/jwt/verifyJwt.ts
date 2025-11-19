import * as jwt from "jsonwebtoken";
import { verifyJwtSchema } from "../../schemas/JwtSchema";
import { Request, Response, NextFunction } from "express";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ error: "Nenhum token informado" });
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            return res.status(401).json({ error: "Token malformatado" });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: "Token malformatado" });
        }

        const result = verifyJwtSchema.safeParse({ accessToken: token }); // Captura o cookie

        if (!result.success) {
            return res.status(401).json({ error: "Token inválido" });
        }

        const userData = jwt.verify(token, process.env.JWT_SECRET as string, {
            complete: true,
        });

        if (!userData) {
            return res.status(401).json({ error: "Token inválido" });
        }

        req.user = userData;

        next();
    } catch (err: Error | any) {
        res.status(400).json({
            err: err.message,
            status: 400,
        });
    }
};
