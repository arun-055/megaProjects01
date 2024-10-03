 import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId)=>{
  const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn: "15m",});
  const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:"7d",
  });
  return {accessToken,refreshToken};
}

 export const signup =async (req, res) => {
try {
  const {email,password,name}= req.body;
const userExists = await User.findOne({email});

if(userExists) 
  return res.status(400).json({message:"User already exists"});
const user = await User.create({name,email,password});
//authenticate
  res.status(201).json({user, message:"user created successfully"});
}
  catch (error) {
  res.status(500).json({message:error.message});
  
}}

export const login = async (req, res) => {
  res.send("login route called");
};

export const logout =  async (req, res) => {
res.send("sign out route called");
};
