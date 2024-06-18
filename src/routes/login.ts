import {Request, Response, Router} from "express";
import {database} from "../services/database";
import {ObjectId} from "mongodb";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


export const loginRouter = Router();

const SECRET = process.env['SECRET'];

loginRouter.post('/login', (request: Request, response: Response ) => {
    try {
        if (!request.body.email || !request.body.password) {
            return response.status(401).send({
                message: "Please provide all the details for logging in."
            })
        }
            database.collection('users').findOne( {email: request.body.email}).then((user) => {
            if(!user) {
                return response.status(404).send({
                    message:"No user was found with that email."
                })
            } else {
                if (!bcrypt.compareSync(request.body.password, user.password)) {
                    response.status(401).send({ success: false, error: "Wrong password" })
                } else {
                    const token = jwt.sign({ id: user._id, email: user.email }, SECRET)
                    response.status(201).send({ success: true, token: token, id: user._id })
                }
            }
        });

    }
    catch(error){
        console.log(error);
        return response.status(500).send(error);
    }
})

loginRouter.get("/user-account", (request: Request, response: Response) => {
    try
    {
        console.log(request.body);
        database.collection('users').findOne({_id: new ObjectId(request.body._id)}).then((user) => {
        console.log(user);
        if (!user) {
            return response.status(401).send({
                message:"No user found with that id."
            })
        }
        return response.status(200).send({
            user
        })
        });
    }

    catch(error) {
        console.log(error);
        return response.status(500).send(error);
    }
})