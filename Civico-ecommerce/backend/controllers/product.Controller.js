const CategoryModel = require("../models/Category.Model");
const SubCategoryModel = require("../models/SubCategory.model");
const ProductModel = require("../models/Product.Model");
const cloudinary = require("cloudinary").v2;
const getPublicIdFromUrl = (url) => {
  const regex = /\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/;
  const match = url.match(regex);
  if (match) {
    return `${match[1]}/${match[2]}`; // captures the folder and file name without versioning or extension
  }
  return null;
};
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      description,
      categoryId,
      subcategoryId,
      delprice,
      unit,
      size,
      thickness,
      weight,
      color,
      manufactureDetails,
      returnPolicy,
    } = req.body;
    console.log(req.body);
    
    const parsedSize = typeof size === 'string' ? JSON.parse(size) : size;
    const parsedWeight = weight ? typeof weight === 'string' ? JSON.parse(weight) : weight : null;
    const parsedcolor = typeof color === 'string' ? JSON.parse(color) : color;
    console.log(parsedSize);
    

    console.log(req.body);
    console.log(categoryId);
    
    
    const existCategory = await CategoryModel.findById(categoryId);
    if (!existCategory) {
      return res.status(400).send({ message: "Category does not exist" });
    }

    const existSubCategory = await SubCategoryModel.findById(subcategoryId);
    if (!existSubCategory) {
      return res.status(400).send({ message: "SubCategory does not exist" });
    }

    const image = req.file ? req.file.path : null;
    const product = new ProductModel({
      name,
      price,
      description,
      CategoryId: categoryId,
      SubCategoryId: subcategoryId,
      delPrice:delprice,
      unit,
      size:parsedSize,
      thickness,
      weight:parsedWeight,
      color:parsedcolor,
      manufactureDetails,
      returnPolicy,
      image,
      stock,
    });

    const products = await product.save();
    res.status(201).send({ message: "Product added successfully", products });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};
const UpdateProduct = async (req, res) => {
  try {
    const productId = req.query.id;
    const {
      name,
      price,
      description,
      categoryId,
      subcategoryId,
      delPrice,
      unit,
      size,
      thickness,
      weight,
      stock,
      color,
      manufactureDetails,
      returnPolicy,
    } = req.body;

    const parsedSize = typeof size === 'string' ? JSON.parse(size) : size;
    const parsedWeight = typeof weight === 'string' ? JSON.parse(weight) : weight;
    const parsedcolor = typeof color === 'string' ? JSON.parse(color) : color;
    const subcategory = await SubCategoryModel.findById(subcategoryId);
    if (!subcategory) {
      return res.status(400).send({ message: "Subcategory does not exist" });
    }
    console.log(subcategoryId);
    
    const existCategory = await CategoryModel.findById(categoryId);
    if (!existCategory) {
      return res.status(400).send({ message: "Category does not exist" });
    }
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(400).send({ message: "Product does not exist" });
    }
    let image = product.image;
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
    const productUpdate = await ProductModel.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        description,
        CategoryId: categoryId,
        SubCategoryId: subcategoryId,
        delPrice,
        unit,
        stock,
        size:parsedSize,
        thickness,
        weight:parsedWeight,
        color:parsedcolor,
        manufactureDetails,
        returnPolicy,
        image,
      },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Product updated successfully", productUpdate });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};
const DeleteProduct = async (req, res) => {
  try {
    const deleteId = req.query.id;
    const Product = await ProductModel.findById(deleteId);
    if (!Product) {
      return res.status(400).send({ message: "Product does not exist" });
    }
    let image = Product.image;
    if (image) {
      const publicId = getPublicIdFromUrl(image);
      if (publicId) {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary deletion result:", result);
      } else {
        console.log("Could not extract publicId from URL:", image);
      }
    }
    await ProductModel.findByIdAndDelete(deleteId);
    res.status(200).send({ message: "product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};
const getallproductBysubcategory = async(req,res) => {
    try {
        const subcategoryId = req.query.id;
console.log(subcategoryId);

        if(!subcategoryId){
            return res.status(400).send({message: "Subcategory id is required"})
        }
        const products = await ProductModel.find({SubCategoryId:subcategoryId})
        console.log(products);
        
        if(!products){
            return res.status(400).send({message: "No products found"})
        }
        res.status(200).send({message:"Product Found.",products})
    } catch (error) {
        console.log(error);
        return res.status(500).send({
          message: "Internal Server Error",
          error,
        });
    }
}
const fetchProductsByCategory = async(req,res) => {
  try {
    const categoryId = req.query.id;
    console.log(categoryId);
    
    if(!categoryId){
      return res.status(400).send({message: "Category id is required"})
    }
    const products = await ProductModel.find({CategoryId:categoryId})
    if(!products){
      return res.status(400).send({message: "No products found"})
    }
    return res.status(200).send({products})
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
}
const getallproducts  = async(req,res) =>{
  try {
    console.log("api called ");
    
    const products = await ProductModel.find({}).populate('CategoryId').populate('SubCategoryId')
    if(!products){
      return res.status(400).send({message: "No products found"})
    }
    
    return res.status(200).send({message:"product fetched succesfully",products})
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
      });
  }
}
module.exports ={
    addProduct,UpdateProduct,DeleteProduct,getallproductBysubcategory,fetchProductsByCategory,getallproducts
}