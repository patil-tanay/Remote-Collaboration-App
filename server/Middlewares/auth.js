import ApiError from "../Utils/apiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import JWT from "jsonwebtoken";
import { User } from "../Models/user.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = JWT.verify(token, process.env.ACCESSTOKENSECRET);

  const user = await User.findById(decodedToken?.id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(401, "Access token expired");
  }
  req.user = user;
  next();
});
