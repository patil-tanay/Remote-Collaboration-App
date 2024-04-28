import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes
import userRoute from "./Routes/userRoute.js";
import messageRoute from "./Routes/messageRoutes.js";
import chatRoute from "./Routes/chatRoutes.js";

//Routes Declaration
app.use("/api/v1/users", userRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/chat", chatRoute);

export default app;
