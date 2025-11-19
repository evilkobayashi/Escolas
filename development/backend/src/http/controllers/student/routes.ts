import { Router, IRouter } from "express";
import { RegisterController } from "./register";
import { AuthController } from "./auth";

const router: IRouter = Router();

router.post("/register", RegisterController);
router.post("/auth", AuthController);

router.post("/send-photo");
router.get("/profile");

export { router as StudentRoutes };
