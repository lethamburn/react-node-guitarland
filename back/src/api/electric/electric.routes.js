const ElectricRoutes = require("express").Router();
const {authorize} = require("../../middlewares/auth");
const upload = require("../../middlewares/file");

const {
    getAllElectrics,
    getElectricByID,
    createElectric,
    updateElectric,
    deleteElectric,
} = require("./electric.controller");

ElectricRoutes.get("/", getAllElectrics);
ElectricRoutes.get("/:id", getElectricByID);
ElectricRoutes.post("/create", [authorize], upload.single("image"), createElectric);
ElectricRoutes.patch("/:id", [authorize], upload.single("image"), updateElectric);
ElectricRoutes.delete("/:id",  [authorize], deleteElectric);

module.exports = ElectricRoutes;
