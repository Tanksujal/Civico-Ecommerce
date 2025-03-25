const CategoryModel = require("../models/Category.Model");
const cloudinary = require("cloudinary").v2;
const getPublicIdFromUrl = (url) => {
  const regex = /\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/;
  const match = url.match(regex);
  if (match) {
    return `${match[1]}/${match[2]}`; // captures the folder and file name without versioning or extension
  }
  return null;
};
const Addcategory = async (req, res) => {
  console.log(req.file);
  console.log("📥 Request Body:", req.body);
  
  const { name, description } = req.body;
  try {
    const existCategory = await CategoryModel.findOne({ name: name });
    if (existCategory) {
      return res.status(400).send({ message: "Category already exist" });
    }
    const image = req.file ? req.file.path : null;
    const newCategory = new CategoryModel({
      name: name,
      description: description,
      image: image,
    });
    const savedCategory = await newCategory.save();
    res
      .status(201)
      .send({ message: "Category created successfully", savedCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};
const UpdateCategory = async (req, res) => {
  try {
    const categoryId = req.query.id;
    const { name, description } = req.body;
    console.log(req.body);
    
    const existCategory = await CategoryModel.findById(categoryId);
    if (!existCategory) {
      return res.status(404).send({ message: "Category not found" });
    }
    let image = existCategory.image;
    if (req.file) {
      if (image) {
        const publicId = getPublicIdFromUrl(image);
        if (publicId) {
          const result = await cloudinary.uploader.destroy(publicId);
        } else {
          console.log("Could not extract publicId from URL:", image);
        }
      }
      image = req.file.path;
    }
    let categoryUpdate = await CategoryModel.findByIdAndUpdate(
      categoryId,
      {
        name: name,
        description: description,
        image: image,
      },
      { new: true }
    );
    console.log(categoryUpdate);
    
    if (!categoryUpdate) {
      return res.status(400).send({
        message: "Category not updated",
      });
    }
    res
      .status(200)
      .send({ message: "Category updated successfully", categoryUpdate });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};
const DeleteCategory = async (req, res) => {
  try {
    const deleteId = req.query.id;
    const categorydelte = await CategoryModel.findById(deleteId);
    if (!categorydelte) {
      return res.status(400).send({
        message: "Category not found",
      });
    }
    const imagePath = categorydelte.image;
    if (imagePath) {
      const publicId = getPublicIdFromUrl(imagePath);
      if (publicId) {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary deletion result:", result);
      } else {
        console.log("Could not extract publicId from image URL:", imagePath);
      }
    }
    await CategoryModel.findByIdAndDelete(deleteId);
    return res.status(200).send({
      message: "Category and image deleted successfully",
      categorydelte,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};
const Getallcategory = async(req,res) => {
    try {
      const categories = await CategoryModel.find({})
      if(!categories){
        return res.status(400).send({
            message: "No categories found",
        })
      }
      return res.status(200).send({
        message: "Categories found",
        categories
      })
    } catch (error) {
        
    }
}
module.exports = { Addcategory, UpdateCategory ,DeleteCategory,Getallcategory};