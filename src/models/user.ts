import { Schema } from "mongoose";

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    verified: {
        verified: Boolean,
        required: true,
        default: false
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

module.exports = mongoose.model("User", UserSchema);

