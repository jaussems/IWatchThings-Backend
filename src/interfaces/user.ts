import {Types} from "mongoose";

export interface IUserData {
    _id:      Types.ObjectId;
    email:    string;
    password: string;
    otp:      number;
    movies:   Types.ObjectId[];
    verified: Verified;
}

export interface Verified {
    verified: boolean;
    required: boolean;
    default:  boolean;
}