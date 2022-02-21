import { Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
    user: IUser // or any other type
}

export interface IUser {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}
