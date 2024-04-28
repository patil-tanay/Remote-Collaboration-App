import { Router } from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
} from "../Controllers/userController.js";
import { verifyJWT } from "../Middlewares/auth.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logOutUser);

export default router;
