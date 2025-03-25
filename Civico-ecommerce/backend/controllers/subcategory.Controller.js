const SubCategoryModel = require('../models/SubCategory.model')
const CategoryModel = require('../models/Category.Model')
const cloudinary = require("cloudinary").v2;
const getPublicIdFromUrl = (url) => {
  const regex = /\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/;
  const match = url.match(regex);
  if (match) {
    return `${match[1]}/${match[2]}`; // captures the folder and file name without versioning or extension
  }
  return null;
};
const Addsubcategory = async (req, res) => {
  try {
    const {name,description,categoryId} = req.body 
    console.log(req.body);
    
    const existsubcategory = await SubCategoryModel.findOne({name:name})
    if(existsubcategory) {
        return res.status(400).send({message: "Subcategory already exists" })
    }
    const existCategory = await CategoryModel.findById(categoryId)
    if(!existCategory) {
        return res.status(400).send({message: "Category does not exist" })
    }
    const image = req.file ? req.file.path :null
    const subcategory = new SubCategoryModel({
        name:name,
        description:description,
        CategoryId:categoryId,
        image:image
    })
    const subcategories = await subcategory.save()
    res.status(201).send({message: "Subcategory created successfully",subcategories})
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};
const Updatesubcategory = async(req,res) => {
    try {
        const subcategoryId = req.query.id
        const {name,description,categoryId} = req.body
        const subcategory = await SubCategoryModel.findById(subcategoryId)
        if(!subcategory) {
            return res.status(400).send({message: "Subcategory does not exist" })
        }
        const existCategory = await CategoryModel.findById(categoryId)
    if(!existCategory) {
        return res.status(400).send({message: "Category does not exist" })
    }
    let image = subcategory.image;
    if(req.file){
        if(image){
            const publicId = getPublicIdFromUrl(image);
        if (publicId) {
          const result = await cloudinary.uploader.destroy(publicId);
        } else {
          console.log("Could not extract publicId from URL:", image);
        }
        }
        image = req.file.path
    }
    const subcategoryupdate = await SubCategoryModel.findByIdAndUpdate(subcategoryId,{
        name:name,
        description:description,
        image:image,
        CategoryId:categoryId
    },{new:true})
    res.status(200).send({message: "Subcategory updated successfully",subcategoryupdate})
    } catch (error) {
        console.log(error);
        return res.status(500).send({
          message: "Internal Server Error",
          error,
        });
    }
}
const Deletesubcategory = async(req,res) => {
    try {
        const deleteId = req.query.id
        const subcategory = await SubCategoryModel.findById(deleteId)
        if(!subcategory) {
            return res.status(400).send({message: "Subcategory does not exist" })
        }
        let image = subcategory.image;
        if(image){
            const publicId = getPublicIdFromUrl(image);
            if (publicId) {
                const result = await cloudinary.uploader.destroy(publicId);
                console.log("Cloudinary deletion result:", result);
            }else{
                console.log("Could not extract publicId from URL:", image);
            }
            
        }
        await SubCategoryModel.findByIdAndDelete(deleteId);
        res.status(200).send({message: "Subcategory deleted successfully" })
    } catch (error) {
        console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
    }
}
const getAllsubcategory = async(req,res) => {
    try {
        const subcategories = await SubCategoryModel.find({}).populate('CategoryId')
        if(!subcategories){
            return res.status(400).send({message: "No subcategories found" })
        }
        res.status(200).send({message: "Subcategories found successfully",subcategories})
    } catch (error) {
        console.log(error);
        return res.status(500).send({
          message: "Internal Server Error",
          error,
        });
    }
}
const subcategorfindByCategory = async(req,res) => {
    try {
        const categoryId = req.query.id;
        
        if(!categoryId){
            return res.status(400).send({message: "Category id is required" })
        }
        const existCategory = await CategoryModel.findById(categoryId)
        if(!existCategory){
            return res.status(400).send({message: "Category does not exist" })
        }
        
        const subcategories = await SubCategoryModel.find({ CategoryId: categoryId}).populate('CategoryId')
        if(!subcategories){
            return res.status(400).send({message: "No subcategories found" })
        }
        
        res.status(200).send({message: "Subcategories found successfully",subcategories})
    } catch (error) {
        console.log(error);
        return res.status(500).send({
          message: "Internal Server Error",
          error,
        });
    }
}
module.exports = {
    Addsubcategory,Updatesubcategory,Deletesubcategory,getAllsubcategory,subcategorfindByCategory
}