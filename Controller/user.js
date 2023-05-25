import { sendCookie } from "../Utils/feature.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const users = await User.find({}).then((users) => {
    res.status(200).json({
      success: true,
      users,
    });
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("hello");
  let user = await User.findOne({ email });

  if (user)
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendCookie(user, res, "Registered Successfully", 201);
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(404).json({
      success: false,
      message: "User dosen't exist",
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Enter Correct Password",
    });

  sendCookie(user, res, `Login Successful ${user.name}`, 201);
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// export const updateUser = async(req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);

//                 res.status(200).json({
//                     success:true,
//                     message:"Upadated",
//                 })

// };

// export const DeleteUser = async(req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);
//      await user.remove();
//                 res.status(200).json({
//                     success:true,
//                     message:"Removed",
//                 })

// };
