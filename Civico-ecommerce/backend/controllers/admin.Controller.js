const UserModel = require('../models/User.Model')
const getAdmin = async(req,res) => {
    try {
       const user = req.user;
       if(user.role === 'admin'){
         res.status(200).send({
          success : true,
            message: 'Welcome Admin',
            user: user
         })
       }
       else{
        res.status(401).send({
            message: 'You are not an admin'
        })
       }
    } catch (error) {
        console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
    }
}
const getAllUser =async(req,res) => {
  try {
    const user = req.user;
    if(user.role === "admin"){
      const users = await UserModel.find({})
      res.status(200).send({
        message: 'All Users',
        users
      })
    }
    else{
      res.status(401).send({
        message: 'You are not an admin'
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
}
module.exports={
    getAdmin,getAllUser
}