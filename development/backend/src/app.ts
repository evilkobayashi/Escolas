import express, {
    type Express,
    type Request,
    type Response,
    type NextFunction,
} from "express";
import { StudentRoutes } from "./http/controllers/student/routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/student", StudentRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Rota não encontrada",
    });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({
        message: "Algo deu errado",
    });
});

export { app as AppServer };
