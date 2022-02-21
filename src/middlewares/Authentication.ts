import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import messages from "../utils/messages";
import User from "../models/userModel";
import {IGetUserAuthInfoRequest} from "../global.types";

export  function generateToken(_id: string, email: string, isAdmin: boolean): string {
    return jwt.sign(
        {_id, email, isAdmin},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
}

export async function verifyToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: 'error',
                data: {message: messages.unAuthorized}
            });
        }
        const token = req.headers.authorization.split(' ')[1];

        // verify user provided token against existing token
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({ _id: decoded._id });
        // check for valid app users
        if (!user) {
            return res.status(401).json({
                status: 'error',
                data: { message: messages.tokenError }
            })
        }

        // get user payload
        req.user = decoded;

        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
                status: 'error',
                data: {message: messages.tokenExpired}
            })
        }
        return res.status(400).json({
            status: 'error',
            data: {message: messages.error}
        })
    }
}


