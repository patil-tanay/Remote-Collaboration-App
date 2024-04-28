import { User } from "../Models/user.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new apiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //frontend->name, email, password
  //validate
  //check if user already exists
  //create userDBObject
  //save userDBObject
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new apiError(400, "User already exists");
  }

  const createdUser = await User.create({ name, email, password });
  if (!createdUser) {
    throw new apiError(500, "User registration failed");
  }

  const registeredUser = await User.findOne({ email }).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new apiResponse(201, "User registered successfully", registeredUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new apiError(400, "email is required");
  }
  if (!password) {
    throw new apiError(400, "Password is required");
  }

  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new apiError(404, "User does not exist");
  }

  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    throw new apiError(400, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  loggedInUser.accessToken = accessToken;

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      _id: loggedInUser._id,
      name: loggedInUser.name,
      email: loggedInUser.email,
      accessToken,
    });
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, "User Logged Out", {}));
});

export { registerUser, loginUser, logOutUser, allUsers };
