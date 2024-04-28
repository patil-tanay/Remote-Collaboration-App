import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.js";
import { sendMessage, allMessages } from "../Controllers/messageController.js";

const router = Router();

router.route("/").post(verifyJWT, sendMessage);
router.route("/:chatId").get(verifyJWT, allMessages);

export default router;
