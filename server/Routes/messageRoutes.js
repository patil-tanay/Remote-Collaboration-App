import express from "express";
import { protect } from "../middleware/authMiddlewares.js";
import { sendMessage, allMessages } from "../Controllers/messageControllers.js";

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

export default router;
