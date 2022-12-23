import mongoose from "mongoose";
import validator from "validator";
import asyncHandler from "../middleware/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
export const registerUser = asyncHandler(async (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return next(new ErrorResponse("Enter a valid email", 402));
  }
  const user = await User.findOne({ email: req.body.email });
  if(user){
    return next(new ErrorResponse(`Cannot Register. User with email ${req.body.email} already exists`, 402));
  }
  const userData = {
    email: req.body.email,
    fullname: req.body.fullname,
    phonenumber: req.body.phonenumber,
    password: await bcrypt.hash(req.body.password,10)
  }
  const newUser = await new User(userData).save();
  res.status(201).json({
    success: true,
    data: newUser
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const privateKey = process.env.PRIVATE_KEY;
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("Invalid Email! User doesn't exists", 404));
  }
  const result = await bcrypt.compare(req.body.password, user.password);
  if (result) {
    const token = jwt.sign(
      {
        userName: user.fullname,
        userEmail: user.email
      },
      privateKey,
      { expiresIn: "1h" }
    );
    const date = new Date();
    let expiryTime = date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
    res.status(200).json({
      success: true,
      data: user,
      token: token,
      tokenExpiry: expiryTime
    });
  } else {
    return next(new ErrorResponse("Invalid Login Details", 401));
  }
});
