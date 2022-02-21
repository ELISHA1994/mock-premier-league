import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import uniqueValidator from "mongoose-unique-validator";
import {IUser} from "../global.types";


const UserSchema = new mongoose.Schema<IUser>(
    {
        _id: mongoose.Schema.Types.ObjectId,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: String,
        lastName: String,
        isAdmin: { type: Boolean, default: false }
    },
    { timestamps: true }
);

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(mongoosePaginate);

export default mongoose.model<IUser>('User', UserSchema);

