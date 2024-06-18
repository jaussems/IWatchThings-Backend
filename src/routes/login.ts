import {Request, Response, Router} from "express";
import {database} from "../services/database";

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
