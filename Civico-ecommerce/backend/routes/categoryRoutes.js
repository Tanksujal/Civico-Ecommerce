const exptress = require('express')
const router = exptress.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const IsAdmin = require('../middleware/admin.Middleware');
const { Addcategory, UpdateCategory, DeleteCategory, Getallcategory } = require('../controllers/category.Controller');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'category', // Folder in Cloudinary where images will be stored
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});
const upload = multer({ storage: storage })
router.post('/addcategory',IsAdmin,upload.single('image'),Addcategory)
router.put('/updatecategory',IsAdmin,upload.single('image'),UpdateCategory)
router.delete('/deletecategory',IsAdmin,DeleteCategory)
router.get('/getallcategory',Getallcategory)
module.exports = router