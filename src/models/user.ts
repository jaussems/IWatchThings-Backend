import { Schema, model, Types } from "mongoose";
import {IMovie} from "../interfaces/movie";
import {IUserData} from "../interfaces/user";

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();





export const UserSchema = new Schema<IUserData>({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    otp: Number,
    movies : [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    verified: {
        verified: Boolean,
        required: Boolean,
        default:Boolean
    }
});




UserSchema.methods.generateVerificationtoken = function () {
    const user = this;
    const verificationToken = jwt.sign(
        { ID : user._id },
        process.env.USER_VERIFICATION_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
    return verificationToken;
};

export const User = model<IUserData>('User', UserSchema);

module.exports = {
    User,UserSchema
}