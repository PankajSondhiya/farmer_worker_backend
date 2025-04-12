const {
  getAllUsers,
  getUserById,
  UpdateUserById,
  deleteUserById,
} = require("../controllers/user.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.jwt");

module.exports = function (app) {
  app.get("/admin/api/v1/users", [verifyToken], getAllUsers);
  app.get("/admin/api/v1/users/:id", [verifyToken], getUserById);
  app.put("/admin/api/v1/users/:id", [verifyToken], UpdateUserById);
  app.delete("/admin/api/v1/users/:id", [isAdmin], deleteUserById);
};
