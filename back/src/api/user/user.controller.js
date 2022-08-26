const User = require("./user.model");
const bcrypt = require("bcrypt");
const { createToken } = require("../../helpers/token-action");
const { deleteFile } = require("../../middlewares/delete-file");
const { setError } = require("../../helpers/errors");

const userByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id != req.user.id) return next(setError(403, "Forbidden"));
    const user = await User.findById(id);
    if (!user) return next(setError(404, "User not found"));
    return res.status(200).json(user);
  } catch (error) {
    return next(setError(500, error.message || "Failed recovering User"));
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const usernameExist = await User.findOne({ username: newUser.username });
    if (usernameExist) {
      return next(setError(409, "User already exists"));
    }
    if (req.file) {
      newUser.avatar = req.file.path;
    }
    const userInDB = await newUser.save();
    res.status(201).json(userInDB);
  } catch (error) {
    return next(setError(500, error.message || "Failed creating User"));
  }
};

const login = async (req, res, next) => {
  try {
    const userInDb = await User.findOne({ username: req.body.username });
    if (!userInDb) return next(setError(404, "User not found"));

    if (bcrypt.compareSync(req.body.password, userInDb.password)) {
      const token = createToken(userInDb._id, userInDb.password);
      return res.status(200).json({ userInDb, token });
    } else {
      return next(setError(401, "Invalid password"));
    }
  } catch (error) {
    return next(setError(500, error.message || "Failed authenticating User"));
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = new User(req.body);
    user._id = id;
    if (req.file) user.avatar = req.file.path;
    const updatedUser = await User.findByIdAndUpdate(id, user);
    if (!updatedUser) return next(setError(404, "User not found"));
    return res.status(201).json({
      message: "Updated User",
      updatedUser,
    });
  } catch (error) {
    return next(setError(500, error.message | "Failed updated user"));
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findOneAndDelete(id);
    if (deletedUser.avatar) {
      deleteFile(deletedUser.avatar);
    }
    if (!deletedUser) {
      return next(setError(404, "User not found"));
    }
    return res.status(200).json({
      message: "User deleted",
      deletedUser,
    });
  } catch (error) {
    return next(setError(500, error.message || "Failed deleting User"));
  }
};

module.exports = { register, login, userByID, update, remove };
