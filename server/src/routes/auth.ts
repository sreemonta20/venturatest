import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login for a user
router.post("/login", AuthController.login);

// get a profile details for a user (along with follower and follow count)
router.get("/profile",  [checkJwt], AuthController.getProfile);

//Change user's password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;