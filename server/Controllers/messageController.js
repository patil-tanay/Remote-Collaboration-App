import { asyncHandler } from "../Utils/asyncHandler.js";
import { Chat } from "../Models/chatSchema.js";
import { Message } from "../Models/messageSchema.js";
import { User } from "../Models/user.js";
import ApiError from "../Utils/apiError.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    throw new ApiError(400, "Invalid data passed into request");
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  var message = await Message.create(newMessage);
  message = await message.populate("sender", "name pic");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "name pic email",
  });

  await Chat.findByIdAndUpdate(req.body.chatId, {
    latestMessage: message,
  });

  return res.status(201).json(message);
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    throw new ApiError(400, error);
  }
});

export { sendMessage, allMessages };
