const AcousticRoutes = require("express").Router();
const {authorize} = require("../../middlewares/auth");
const upload = require("../../middlewares/file");

const {
  getAllAcoustics,
  getAcousticByID,
  createAcoustic,
  updateAcoustic,
  deleteAcoustic,
} = require("./acoustic.controller");

AcousticRoutes.get("/", getAllAcoustics);
AcousticRoutes.get("/:id", getAcousticByID);
AcousticRoutes.post("/create", [authorize],upload.single("image"), createAcoustic);
AcousticRoutes.patch("/:id",  [authorize],upload.single("image"), updateAcoustic);
AcousticRoutes.delete("/:id",  [authorize],deleteAcoustic);

module.exports = AcousticRoutes;
