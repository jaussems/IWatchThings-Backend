import { Request, Response } from "express";
import { SignUp } from "../models/signup";

const express = require("express");
const { Router } = express;
export const signUpRouter = new Router();

type RequestBody<T> = Request<{}, {}, T>;


signUpRouter.post("/signup", (request: RequestBody<SignUp>, response: Response) => {
    if(!request.body.username || !request.body.password || !request.body.confirmPassword )
    {
        response.status(401).send({
        message: "Please fill in your details "   
        })
    }
    else 
    {
        response.sendStatus(201).send({
        message:"Account created, we have send a verifcation code to the email adress listed."
        })
    }
})
