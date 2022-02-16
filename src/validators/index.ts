import { validationResult } from "express-validator";
import {Request, Response, NextFunction } from "express";


export default function runValidation(req: Request, res: Response, next: NextFunction): any {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            body: { message: errors.array()[0].msg }
        });
    }
    next();
}

