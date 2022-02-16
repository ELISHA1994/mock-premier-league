import mongoose from "mongoose";
import {Request, Response, RequestHandler, } from "express";
import User from "../models/userModel";
import messages from "../utils/messages";
import Helper from "../helpers/helperFunctions";
import {generateToken} from "../middlewares/Authentication";

export const CreateUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: Helper.hashPassword(req.body.password),
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        const token = generateToken(user._id, user.email, user.isAdmin);

        const doc = await user.save();
        if (doc) {
            return res.status(201).json({
                status: "success",
                data: {
                    token
                }
            })
        }
    } catch (error) {
        if (error.errors.email.name === 'ValidatorError') {
            return res.status(409).json({
                status: 'error',
                data: { message: messages.duplicate }
            })
        }

        return res.status(400).json({
            status: 'error',
            data: { message: messages.error }
        })
    }
}
