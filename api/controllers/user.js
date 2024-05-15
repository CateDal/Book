import user  from "../models/user.js"

export const updatedUser = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);
    try {
        const User = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body},
            {new:true}
        );
        res.status(200).json(updatedUser);
    } catch (error) {
                next(err );
            }
    }

    export const deleteUser= async (req,res,next)=>{
        const newHotel = new user(req.body);
        try {
            await user.findByIdAndDelete(
                req.params.id, 
            );
            res.status(200).json("Hotel has been deleted.");
        } catch (error) {
                    next(err );
                }
        }
    
        export const getUser = async (req,res,next)=>{
            try {
                const user = await User.findById(
                    req.params.id, 
                );
                res.status(200).json(user);
            } catch (error) {
                        next(err );
                    }  
            }

            export const getallUser = async (req,res,next)=>{
                const user = new user(req.body);
                try {
                    const users = await user.find();
                    res.status(200).json(users);
                } catch (error) {
                            next(err );
                        }
                }