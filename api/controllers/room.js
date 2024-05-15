import room from "../models/room.js";
import Hotel from "../models/Hotel.js";
import createError from "http-errors";

export const createRoom = async (req,res,next) =>{
    const hotelsId = req.params.hotelsid;
    const newRoom = new room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelsId, {
                $push: { rooms: savedRoom._id},
            });
        }catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    }catch (err) {
        next(err);
    }
};

export const updatedRoom = async (req,res,next)=>{
    try {
        const updatedRoom = await room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body},
            {new:true}
        );
        res.status(200).json(updatedRoom);
    } catch (error) {
                next(err );
            }
    }

    export const deleteRoom = async (req,res,next)=>{
        try {
            await room.findByIdAndDelete(
                req.params.id, 
            );
            res.status(200).json("Room has been deleted.");
        } catch (error) {
                    next(err );
                }
        }
    
        export const getRoom = async (req,res,next)=>{
            try {
                const room = await room.findById(
                    req.params.id, 
                );
                res.status(200).json(room);
            } catch (error) {
                        next(err );
                    }  
            }

            export const getallRooms = async (req,res,next)=>{
                try {
                    const rooms = await room.find();
                    res.status(200).json(rooms);
                } catch (error) {
                            next(err );
                        }
                }