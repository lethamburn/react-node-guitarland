const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    strings: { type: Number, required: true },
    image: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: String, required: false },
    stock: { type: Boolean, required: true },
    type: { type: String, default: "acoustic" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("acoustics", schema);
