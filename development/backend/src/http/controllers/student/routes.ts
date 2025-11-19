import { Router, IRouter } from "express";
import { RegisterController } from "./register";
import { AuthController } from "./auth";
import { ProfileController } from "./profile";
import { verifyJwt } from "../../middleware/jwt/verifyJwt";
import { SendPhotoController } from "./send-photo";

const router: IRouter = Router();

router.post("/register", RegisterController);
router.post("/auth", AuthController);

router.get("/profile", verifyJwt, ProfileController);
router.post("/send-photo", SendPhotoController);

export { router as StudentRoutes };
