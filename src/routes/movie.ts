import {Request, Response} from "express";
import {IRequestBodyMovie} from "../models/movie";
import {database} from "../services/database";
const ObjectId = require('mongodb').ObjectId;


const express = require("express");
const { Router } = express;

export const movieRouter = Router();


type RequestBody<T> = Request<{}, {}, T>;

movieRouter.post('/addmovie',  async (request: RequestBody<IRequestBodyMovie>, response:Response) => {
    try {
                await Promise.all([
                database.collection('users').findOneAndUpdate({_id: new ObjectId(request.body.userId)}, {
                $push: {
                    'movies': new ObjectId(request.body.movie._id)
                }
                }),
                    database.collection('movies').findOneAndUpdate({_id: new ObjectId(request.body.movie._id)}, {
                        $push: {
                            'users': new ObjectId(request.body.userId)
                        }
                    })
                    ]);
        return response.status(201).send({
            message: "Movie created, added to collection of user, and user added to users in Movie Object."
        });
    }
    catch(error)
    {
        console.log(error);
        return response.status(500).send(error);
    }
})


movieRouter.post('/movies',  async (request: Request, response:Response) => {
    try
    {
        database.collection('movies').insertOne(request.body.movie);
    }
    catch (error) {
      console.log(error);
    }
})
