const Acoustic = require("./acoustic.model");
const { setError } = require("../../helpers/errors");
const { deleteFile } = require("../../middlewares/delete-file");

const getAllAcoustics = async (req, res, next) => {
  try {
    const acoustics = await Acoustic.find().sort({ createdAt: "desc" });
    return res.status(200).json({
      message: "All Acoustic Guitars",
      acoustics,
    });
  } catch (error) {
    return next(
      setError(500, error.message | "Failed recovering all acoustic guitars")
    );
  }
};

const getAcousticByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const acoustic = await Acoustic.findById(id);
    if (!acoustic) {
      return next(setError(404, error.message | "Acoustic guitar not found"));
    }
    return res.status(200).json({
      message: "Acoustic Guitar by ID",
      acoustic,
    });
  } catch (error) {
    return next(
      setError(500, error.message | "Failed recovering acoustic guitar by ID")
    );
  }
};

const createAcoustic = async (req, res, next) => {
  try {
    const acoustic = new Acoustic(req.body);
    if (req.file) {
      acoustic.image = req.file.path;
    }
    const acousticInDB = await acoustic.save();
    return res.status(201).json({
      message: "Acoustic guitar created",
      acousticInDB,
    });
  } catch (error) {
    return next(
      setError(500, error.message | "Failed creating acoustic guitar")
    );
  }
};

const updateAcoustic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const acoustic = new Acoustic(req.body);
    acoustic._id = id;
    if (req.file) {
      acoustic.image = req.file.path;
    }
    const updatedAcoustic = await Acoustic.findByIdAndUpdate(id, acoustic);
    if (!updatedAcoustic) {
      return next(setError(404, "Acoustic guitar not found"));
    }
    return res.status(201).json({
      message: "Acoustic guitar updated",
      updateAcoustic,
    });
  } catch (error) {
    return next(
      setError(500, error.message | "Failed updating acoustic guitar")
    );
  }
};

const deleteAcoustic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAcoustic = await Acoustic.findByIdAndDelete(id);
    if (deleteAcoustic.image) {
      deleteFile(deleteAcoustic.image);
    }
    if (!deletedAcoustic) {
      return next(setError(404, "Acoustic guitar not found"));
    }
    return res.status(200).json({
      message: "Acoustic guitar deleted",
      deleteAcoustic,
    });
  } catch (error) {
    return next(
      setError(500, error.message | "Failed deleting acoustic guitar")
    );
  }
};

module.exports = {
  getAllAcoustics,
  getAcousticByID,
  createAcoustic,
  updateAcoustic,
  deleteAcoustic,
};
