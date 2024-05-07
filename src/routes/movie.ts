import {Request, Response} from "express";
import {IRequestBodyMovie, Movie} from "../models/movie";
import {User} from "../models/user";

const express = require("express");
const { Router } = express;

export const movieRouter = Router();


type RequestBody<T> = Request<{}, {}, T>;

movieRouter.post('/addmovie',  async (request: RequestBody<IRequestBodyMovie>, response:Response) => {
    const {body} = request;
    //console.log(body);

    try {
        Promise.all([
            User.findById({_id: request.body.userId})
                .exec()
                .then(user => {
                    user?.movies.push(request.body.movie._id);
                    user?.save()

                    console.log(`User: ${JSON.stringify(user)}`);
                    return response.status(201).send({
                        message: `Updated reference of user with the movie ID : ${request.body.movie._id} `
                    })
                }),
            Movie.findById({_id: request.body.movie._id})
                .exec()
                .then(movie => {
                    movie?.users.push(request.body.userId)
                    movie?.save()

                    console.log(`Movie: ${JSON.stringify(movie)}`);

                    return response.status(201).send({
                        message: `Updated reference of user with the user ID :${request.body.userId} `
                    })

                })

        ])

    }
    catch(error)
    {
        console.log(error);
        return response.status(500).send(error);
    }
})

