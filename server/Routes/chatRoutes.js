import express, { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.js";
import { upload } from "../Middlewares/multer.js";
import {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  sendFiles,
} from "../Controllers/chatController.js";
const router = Router();

router.route("/").post(verifyJWT, accessChat);
router.route("/").get(verifyJWT, fetchChat);
router.route("/group").post(verifyJWT, createGroupChat);
router.route("/rename").put(verifyJWT, renameGroup);
router.route("/groupremove").put(verifyJWT, removeFromGroup);
router.route("/groupadd").put(verifyJWT, addToGroup);
router.route("/files").post(upload.single(), verifyJWT, sendFiles);

export default router;
