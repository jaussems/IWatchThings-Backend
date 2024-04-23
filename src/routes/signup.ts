import { Request, Response } from "express";
import { SignUp } from "../models/signup";
import { insertNewUserIntoCollection } from "../services/database";

const express = require("express");
const { Router } = express;
export const signUpRouter = new Router();
const nodemailer = require('nodemailer');
const {randomInt} = require('crypto')
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
 * /signup:
 *   get:
 *     description: Signing up user
 *     responses:
 *       200:
 *         description: Returns message that request is succesful.
 *       401:
 *         description: Returns when the user updates with missing data.
 */
signUpRouter.post("/signup", async (request: RequestBody<SignUp>, response: Response) => {
    const {email, password, confirmPassword} = request.body

    if(!email || !password || !confirmPassword )
    {
        response.status(401).send({
        message: "Please fill in your details, you are either missing y"   
        })
    }

    const otp =  randomInt(100000, 999999);

    try {
        //TODO: Fix existing user query
        // const existingUser = findExistingUser(email)
        // if(existingUser){
        // return response.status(409).send({
        //     message: "Email is already in use."
        // })
        // }
        let user = await new User({
            _id: new mongoose.Types.ObjectId,
            email: email,
            password: password,
            otp: otp,
            verified: {
                verified: false,
                required: true,
                default: false
            }
        })

        bcrypt.hash(password, saltRounds, async (err: Error, hash: string) => {
            if (err) {
                console.error(err);
                return;
            }
            user.password = hash;
        });

        insertNewUserIntoCollection(user)

        const verificationToken = user.generateVerificationtoken();
        const url = `http://localhost:3000/api/verify/${verificationToken}`;

        transporter.sendMail({
            to: email,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
        })

        // needs to be moved in future when user verifies mail and proceeds to step 2
        transporter.sendMail({
            to: email,
            subject: 'Verification Number IWatchThings',
            html: `Your verification number is : ${otp}`
        })
        return response.status(201).send({
            message: `Sent a verification email to ${email}`
          });
    }
    catch(error: any)
    {
        return response.status(500).send(error);
    }
})

/**
 * @swagger
 * /sendotp:
 *   post:
 *     description: Sending verification code to user
 *     responses:
 *       201:
 *         description: Successfully send verification code to your email.
 *       401:
 *         description: Sends Error
 */
signUpRouter.post("/sendotp", async (request: Request, response: Response) => {
    const otp =  randomInt(100000, 999999);
    try {
    const user = await User.findOneAndUpdate(
        {otp, otpExpiration: Date.now() + 60000},
        {expired: false}
    )

    transporter.sendMail({
        to: user.username,
        subject: 'Verify Account',
        html: `Your verification mail is : ${otp}`
    })
        return response.status(201).send({
            message: "Successfully send verification code to your email."
        })

    }
    catch(error) {
        return response.status(500).send(error);
    }
})

/**
 * @swagger
 * /sendotp:
 *   put:
 *     description: Resending verification code to user
 *     responses:
 *       201:
 *         description: Successfully resend verification code to your email.
 *       401:
 *         description: Sends Error
 */
signUpRouter.put('/sendotp', async (request: Request, response: Response) => {
    const otp =  randomInt(100000, 999999);
    try {
        const user = await User.findOneAndUpdate(
            {otp, otpExpiration: Date.now() + 60000},
            {expired: false}
        )
        transporter.sendMail({
            to: user.username,
            subject: 'Verify Account',
            html: `Your verification mail is : ${otp}`
        })
        return response.status(201).send({
            message: "Successfully resend verification code to your email."
        })
    }
    catch(error)
    {
        return response.status(500).send(error);
    }

})
