const express = require('express')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const IsAdmin = require('../middleware/admin.Middleware');
const { addProduct, UpdateProduct, DeleteProduct, getallproductBysubcategory, fetchProductsByCategory, getallproducts } = require('../controllers/product.Controller');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'product', // Folder in Cloudinary where images will be stored
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});
const upload = multer({ storage: storage })

router.post('/addproduct',IsAdmin,upload.single('image'),addProduct)
router.put('/updateproduct',IsAdmin,upload.single('image'),UpdateProduct)
router.delete('/deleteproduct',IsAdmin,DeleteProduct)
router.get('/getallproductBysubcategory',getallproductBysubcategory)
router.get('/fetchProductsByCategory',fetchProductsByCategory)
router.get('/getallproducts',getallproducts)
module.exports = router