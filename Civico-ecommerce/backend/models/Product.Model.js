const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    CategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    SubCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    delPrice: {
      type: Number,
    },
    unit: {
      type: String,
      required: true,
    },
    size: [
      {
        width: { type: Number },
        height: { type: Number },
        text: { type: String },
        randomSize: { type: String },
      },
    ],

    thickness: [{ type: String }],
    weight: [
      {
        weight: {
          type: String,
        },
        unit: {
          type: String,
        },
      },
    ],
    colors: [
      {
        name: { type: String },
        hexa: { type: String },
        image: { type: String },
      },
    ],
    image: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    manufactureDetails: {
      type: String,
    },
    returnPolicy: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
