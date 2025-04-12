const {
  signUp,
  resetPassword,
  signIn,
} = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post("/farmer/api/v1/auth/signin", signIn);
  app.post("/farmer/api/v1/auth/signup", signUp);
  app.put("/farmer/api/v1/auth/resetPassword", resetPassword);
};
