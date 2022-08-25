const Electric = require("./electric.model");
const { setError } = require("../../helpers/errors");
const { deleteFile } = require("../../middlewares/delete-file");

const getAllElectrics = async (req, res, next) => {
  try {
    const electrics = await Electric.find().sort({ createdAt: "desc" });
    return res.status(200).json({
      message: "All Electrics Guitars",
      electrics,
    });
  } catch (error) {
    return next(
      setError(500, error.message | "Failed recovering all electric guitars")
    );
  }
};

const getElectricByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const electric = await Electric.findById(id);
    if (!electric) {
      return next(setError(404, error.message | "Electric guitar not found"));
    }
    return res.status(200).json({
      message: "Electric Guitar by ID",
      electric,
    });
  } catch (error) {
    return next(
      setError(500, error.message | "Failed recovering electric guitar by ID")
    );
  }
};

const createElectric = async (req, res, next) => {
  try {
    const electric = new Electric(req.body);
    if (req.file) {
      electric.image = req.file.path;
    }
    const electricInDB = await electric.save();
    return res.status(201).json({
      message: "Electric guitar created",
      electricInDB,
    });
  } catch (error) {
    return next(
      setError(500, error.message | "Failed creating electric guitar")
    );
  }
};

const updateElectric = async (req, res, next) => {
  try {
    const { id } = req.params;
    const electric = new Electric(req.body);
    electric._id = id;
    if (req.file) {
      electric.image = req.file.path;
    }
    const updatedElectric = await Electric.findByIdAndUpdate(id, electric);
    if (!updatedElectric) {
      return next(setError(404, "Electric guitar not found"));
    }
    return res.status(201).json({
      message: "Electric guitar updated",
      updatedElectric,
    });
  } catch (error) {
    return next(
      setError(500, error.message | "Failed updating electric guitar")
    );
  }
};

const deleteElectric = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedElectric = await Electric.findByIdAndDelete(id);
    if (deletedElectric.image) {
      deleteFile(deletedElectric.image);
    }
    if (!deletedElectric) {
      return next(setError(404, "Electric guitar not found"));
    }
    return res.status(200).json({
      message: "Electric guitar deleted",
      deletedElectric,
    });
  } catch (error) {
    return next(
      setError(500, error.message | "Failed deleting electric guitar")
    );
  }
};

module.exports = {
  getAllElectrics,
  getElectricByID,
  createElectric,
  updateElectric,
  deleteElectric,
};
