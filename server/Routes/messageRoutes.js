import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.js";
import {
  sendMessage,
  allMessages,
  sendFiles,
} from "../Controllers/messageController.js";
import { upload } from "../Middlewares/multer.js";

const router = Router();

router.route("/").post(verifyJWT, sendMessage);
router.route("/:chatId").get(verifyJWT, allMessages);
router.route("/files").post(upload.single("messageFile"), verifyJWT, sendFiles);

export default router;
