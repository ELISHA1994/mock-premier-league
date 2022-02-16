import { check } from "express-validator";

export const userSignupValidator: Array<any> = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('firstName is required'),
    check('lastName')
        .not()
        .isEmpty()
        .withMessage('lastName is required')
];

export const userSigninValidator: Array<any> = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];
