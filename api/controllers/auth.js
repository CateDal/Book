import User from "../models/user.js"; // Ensure the import is correct
import bcrypt from "bcryptjs";
import createError from "http-errors"; // Import createError function for error handling
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("User has been created");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        if (!foundUser) 
            return next(createError(400, "User not found"));
        

        const isPasswordCorrect = await bcrypt.compare(req.body.password, foundUser.password);
        if (!isPasswordCorrect) 
            return next(createError(400, "Wrong password or username!"));

            const token = jwt.sign({id: foundUser._id, isAdmin: foundUser.isAdmin}, process.env.JWT);
    
        const {password, isAdmin,...otherDetails} = foundUser;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json(otherDetails); // Return user data if login is successful
    } catch (err) {
        next(err);
    }
};
