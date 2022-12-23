import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import Room from "../models/Room.js";
import ErrorResponse from './../utils/errorResponse.js';

export const createRoom = asyncHandler(async (req, res, next)=> {
    const room = await new Room(req.body).save()
    res.status(201).json({
        success : true,
        data : room
    })
});

export const getRoomById = asyncHandler(async (req, res, next)=> {
    const rooms = await Room.findOne({id:req.body.id})
    if (!rooms) {
        return next(new ErrorResponse("Invalid Room ID! Room doesn't exists", 404));
    }
    const type=rooms.type;
    if(type==="true" && rooms.password!==req.body.password){
        return next(new ErrorResponse("Incorrect Password", 401));
    }
    return res.status(200).json({
        success : true,
        data : rooms
    })
});

// export const deleteRoom = asyncHandler(async (req, res, next)=> {
//     const room = await Room.findOneAndDelete({})
//     return res.status(200).json({
//         success : true,
//         data : room
//     })
// });