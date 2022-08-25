const UserRoutes = require("express").Router();
const { authorize } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");

const {
  register,
  login,
  userByID,
  update,
  remove,
} = require("./user.controller");

UserRoutes.post("/register", upload.single("avatar"), register);
UserRoutes.post("/login", login);
UserRoutes.get("/:id", [authorize], userByID);
UserRoutes.patch("/:id", [authorize], update);
UserRoutes.delete("/:id", [authorize], remove);

module.exports = UserRoutes;
