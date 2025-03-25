const express = require('express')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const IsAdmin = require('../middleware/admin.Middleware');
const { Addsubcategory, Updatesubcategory, Deletesubcategory, getAllsubcategory, subcategorfindByCategory } = require('../controllers/subcategory.Controller');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'subcategory', // Folder in Cloudinary where images will be stored
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});
const upload = multer({ storage: storage })
router.post('/addsubcategory',IsAdmin,upload.single('image'),Addsubcategory)
router.put('/updatesubcategory',IsAdmin,upload.single('image'),Updatesubcategory)
router.delete('/deletesubcategory',IsAdmin,Deletesubcategory)
router.get('/getallsubcategory',getAllsubcategory)
router.get('/subcategorfindByCategory',subcategorfindByCategory)
module.exports = router