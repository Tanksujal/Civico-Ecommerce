const UserModel = require('../models/User.Model')
const jwt = require('jsonwebtoken')
const VerifyToken = async(req,res,next) => {
   try {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).send({message: "Access denied. No token provided."})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await UserModel.findById(decoded.id)
    if(!user) {
        return res.status(401).send({message: "Access denied. User not found."})
    }
    req.user = user
    next()
   } catch (error) {
    console.log(error);
    return res.status(500).send({
        message: "Internal Server Error",
        error
    })
   }
}
module.exports = {VerifyToken};