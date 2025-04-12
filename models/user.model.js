const mongoose = require("mongoose");
const { USERTYPE, USER_STATUS } = require("../contants");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 10,
  },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: USERTYPE.FARMER,
  },
  userStatus: {
    type: String,
    required: true,
    default: USER_STATUS.PENDING,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  lastLogin: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  firebaseUid: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
