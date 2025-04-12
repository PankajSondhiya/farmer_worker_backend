const mongoose = require("mongoose");
const User = require("../models/user.model");
const admin = require("../config/firebaseAdmin");

async function getAllUsers(req, res) {
  const users = await User.find({});
  res.status(200).send(users);
}

async function getUserById(req, res) {
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).send(user);
}

async function deleteUserById(req, res) {
  const id = req.params.id;
  const { UID } = req.body;

  await User.findByIdAndDelete(id);
  await admin.auth().deleteUser(UID);
  res
    .status(200)
    .send({ message: `user with the ID:${id} deleted successfully` });
}

async function UpdateUserById(req, res) {
  const { firebaseUid, email } = req.body;
  const id = req.params.id;
  await admin.auth().updateUser(firebaseUid, {
    email: email,
  });
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).send({
    message: `user with the ID:${id} updated successfully`,
    updatedUser,
  });
}
module.exports = {
  getAllUsers,
  deleteUserById,
  UpdateUserById,
  getUserById,
};
