const { default: mongoose } = require('mongoose')
const monngoose = require('mongoose')
const CategorySchema = new monngoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        unique:true
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
})
const categoryModel = mongoose.model('category',CategorySchema)
module.exports = categoryModel