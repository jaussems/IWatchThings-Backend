import { Schema, model, Types } from "mongoose";

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

export interface IUserData {
    _id:      Types.ObjectId;
    email:    string;
    password: string;
    otp:      number;
    verified: Verified;
}

export interface Verified {
    verified: boolean;
    required: boolean;
    default:  boolean;
}

export const UserSchema = new Schema<IUserData>({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    otp: Number,
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