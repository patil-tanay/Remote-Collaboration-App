import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../Controllers/taskController.js";
import { verifyJWT } from "../Middlewares/auth.js";

const router = Router();

router.route("/getAllTasks").get(verifyJWT, getAllTasks);
router.route("/createTask").post(verifyJWT, createTask);
router.route("/updateTask").post(verifyJWT, updateTask);
router.route("/deleteTask").post(verifyJWT, deleteTask);

export default router;
