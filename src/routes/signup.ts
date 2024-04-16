import { Request, Response } from "express";
import { SignUp } from "../models/signup";
import { MongoClient } from "mongodb";
import { insertNewUserIntoCollection } from "../services/database";


const express = require("express");
const { Router } = express;
export const signUpRouter = new Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const {randomInt} = require('crypto')
dotenv.config();

const uri = `mongodb+srv://${process.env["USERNAME"]}:${process.env["PASSWORD"]}@${process.env["MONGODBURL"]}`;
mongoose.connect(uri)
const db = mongoose.connection;
const client = new MongoClient(uri);

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
    //const database = client.db("IwatchMovies");
  //  const collection = database.collection("users");

    const {email, password, confirmPassword} = request.body

    if(!email || !password || !confirmPassword )
    {
        response.status(401).send({
        message: "Please fill in your details, you are either missing y"   
        })
    }

    const otp =  randomInt(100000, 999999);

    try {
        const existingUser = await User.findOne({ email }).exec();
        if(existingUser){
        return response.status(409).send({
            message: "Email is already in use."
        })
        }

        const user = await new User({
            _id: new mongoose.Types.ObjectId,
            email: email,
            password: password,
            verified: {
                verified: false,
                required: true,
                default: false
            }
        })

     //   collection.insertOne(user);
        insertNewUserIntoCollection(user)

        const verificationToken = user.generateVerificationtoken();
        const url = `http://localhost:3000/api/verify/${verificationToken}`

        transporter.sendMail({
            to: email,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
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

    }
    catch(error) {
        return response.status(500).send(error);
    }
})
