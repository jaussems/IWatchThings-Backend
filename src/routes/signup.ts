import { Request, Response } from "express";
import { SignUp } from "../models/signup";

const express = require("express");
const { Router } = express;
export const signUpRouter = new Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const User = require("../models/user.js");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: "gmail",
    auth: {
       user: process.env["EMAIL_USERNAME"],
       pass: process.env["EMAIL_PASSWORD"],
    },
});

type RequestBody<T> = Request<{}, {}, T>;

/**
 * @swagger
 * /catchphrases:
 *   get:
 *     description: Signing up user
 *     responses:
 *       200:
 *         description: Returns all the catachphrases
 *       401:
 *         description: Returns when the user updates with missing data.
 *       200:
 *         description: Returns all the catachphrases
 */
signUpRouter.post("/signup", async (request: RequestBody<SignUp>, response: Response) => {
    const {username, password, confirmPassword} = request.body

    if(!username || !password || !confirmPassword )
    {
        response.status(401).send({
        message: "Please fill in your details, you are either missing y"   
        })
    }
    try {
        const existingUser = await User.findOne({ username }).exec();
        if(existingUser){
        return response.status(409).send({
            message: "Email is already in use."
        })
        }

        const user = await new User({
            _id: new mongoose.Types.ObjectId,
            email: username,
            password: password
        })

        const verificationToken = user.generateVerificationtoken();
        const url = `http://localhost:3000/api/verify/${verificationToken}`

        transporter.sendMail({
            to: username,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
        })
        return response.status(201).send({
            message: `Sent a verification email to ${username}`
          });
    }
    catch(e: any)
    {
        return response.status(500).send(e);
    }
   
})
