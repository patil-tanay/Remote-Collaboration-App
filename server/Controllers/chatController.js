import { asyncHandler } from "../Utils/asyncHandler.js";
import { Chat } from "../Models/chatSchema.js";
import { User } from "../Models/user.js";
import apiError from "../Utils/apiError.js";
import { UploadOnCloudinary } from "../Utils/cloudinary.js";
import ApiResponse from "../Utils/apiResponse.js";

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    throw new apiError(400, "UserId param not sent with request");
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.find({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(201).send(FullChat);
    } catch (error) {
      throw new apiError(400, error.message);
    }
  }
}); //Responsible for creating or fetching one-to-one chat

const fetchChat = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    throw new apiError(400, error.message);
  }
}); //Responsible for fetching a chat

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please enter all fields" });
  }
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.find({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    throw new apiError(400, error.message);
  }
}); //Responsible for creating a group chat

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatesChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatesChat) {
    throw new apiError(404, "Chat not found");
  } else {
    res.json(updatesChat);
  }
}); //Responsible for renaming a group chat

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    throw new apiError(404, "Chat not found");
  } else {
    res.json(added);
  }
}); //Responsible for adding a user to a group chat

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const remove = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!remove) {
    throw new apiError(404, "Chat not found");
  } else {
    res.json(remove);
  }
}); //Responsible for removing a user to a group

const sendFiles = asyncHandler(async (req, res) => {
  console.log(req.user);
  const localfilePath = req.file?.path;
  if (!localfilePath) {
    throw new apiError(400, "No files uploaded");
  }
  const file = await UploadOnCloudinary(localfilePath);
  if (!file.url) {
    throw new apiError(401, "Error, while uploading file on cloudinary");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "File uploaded successfully", file.url));
}); //Responsible for sending files to a chat

export {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  sendFiles,
};
