const mongoose  = require('mongoose')
const SubCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    CategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        required:true
    }
})

const SubCategoryModel = mongoose.model('Subcategory',SubCategorySchema)
module.exports = SubCategoryModel