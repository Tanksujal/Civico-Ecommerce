const Usermodel = require('../models/User.Model')
const jwt = require('jsonwebtoken')
const IsAdmin = async(req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).send({message: "Unauthorized"})
        }
        const decoded  = jwt.verify(token,process.env.SECRET_KEY)
        const user = await Usermodel.findById(decoded.id)
        if(!user){
            return res.status(401).send({message: "Unauthorized"})
        }
        if(user.role !== 'admin'){
            return res.status(401).send({message: "Unauthorized not Admin"})
        }
        req.user = user
        next()  
    } catch (error) {
        console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
    }
}
module.exports = IsAdmin;