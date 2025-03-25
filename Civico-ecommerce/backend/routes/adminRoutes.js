const express = require('express')
const IsAdmin = require('../middleware/admin.Middleware')
const { getAdmin, getAllUser } = require('../controllers/admin.Controller')
const router = express.Router()
router.get('/getAdmin',IsAdmin,getAdmin)
router.get('/getAlluser',IsAdmin,getAllUser)
module.exports = router