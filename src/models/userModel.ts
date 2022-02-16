import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IUser {
    _id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
    isAdmin: boolean
}

const UserSchema = new mongoose.Schema<IUser>({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    isAdmin: { type: Boolean, default: false }
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>('User', UserSchema);

