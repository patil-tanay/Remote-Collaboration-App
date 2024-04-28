import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = async function () {
  return jwt.sign({ id: this._id }, process.env.ACCESSTOKENSECRET, {
    expiresIn: process.env.ACCESSTOKENEXPIRES,
  });
};

UserSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({ id: this._id }, process.env.REFRESHTOKENSECRET, {
    expiresIn: process.env.REFRESHTOKENEXPIRES,
  });
};

export const User = mongoose.model("User", UserSchema);
