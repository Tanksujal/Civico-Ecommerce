const UserModel = require("../models/User.Model");
const jwt = require('jsonwebtoken')
const sentOtp = async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    if (!mobileNumber) {
      return res.status(400).send({ message: "Mobile number is required" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 
    let user = await UserModel.findOne({mobileNumber:mobileNumber})
    if (!user) {
      user = new UserModel({mobileNumber,otp,otpExpiresIn:otpExpires})
    }else{
      user.otp = otp;
      user.otpExpiresIn = otpExpires;
    }
    await user.save()
    console.log(`OTP sent to ${mobileNumber}: ${otp}`); 
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};
const verifyOtp = async (req, res) => { 
  try {
    console.log(req.body);
    
    const { mobileNumber, otp } = req.body;
    if (!mobileNumber || !otp) {
      return res.status(400).send({ message: "Mobile number and OTP are required" });
    }
    const user = await UserModel.findOne({mobileNumber:mobileNumber})
    if (user.otp !== otp || user.otpExpiresIn < Date.now()) {
      return res.status(400).send({ message: "Invalid or expired OTP" });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresIn = undefined;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });
    res.cookie("token", token);

    return res.status(200).send({ message: "OTP verified", user, token });

  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};
const RegisterUser = async (req, res) => {
  try {
    console.log(req.body);
    
    const { Typeuse, Company, Site } = req.body;
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized: No user found" });
    }

    const userId = req.user.id; // Assuming req.user contains the logged-in user's ID

    // Update User Details in Database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { Typeuse, Company, Site },
      { new: true, runValidators: true } // Returns updated document
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({
      message: "User registered successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};
const GetProfile = async(req,res) => {
  try {
    const user = req.user
    
    if(!user){
      return res.status(401).send({message: "Unauthorized: No user found"})
    }
    return res.status(200).send({
      message: "User Profile Retrieved Successfully",
      user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
}
const editProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure `req.user` is populated from auth middleware
    const { name, email, Typeuse, Company, Site } = req.body;
console.log(req.body);

    if (!userId) {
      return res.status(400).json({ message: "User not found" });
    }

    // Update user details
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email, Typeuse, Company, Site },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or update failed" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  verifyOtp,
  sentOtp,
  RegisterUser,
  GetProfile,
  editProfile
};
