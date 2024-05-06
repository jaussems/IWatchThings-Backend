import {Request, Response} from "express";
import {IRequestBodyMovie} from "../models/movie";
import {database, insertNewMovie} from "../services/database";

const express = require("express");
const { Router } = express;

export const movieRouter = Router();


type RequestBody<T> = Request<{}, {}, T>;

movieRouter.post('/addmovie', (request: RequestBody<IRequestBodyMovie>, response:Response) => {
    try {
        const existingUser =  database.collection('users').find({_id : request.body.userId});
        const findMovie =  database.collection('movies').find({_id : request.body.movie.id});

        //console.log(findMovie)
        //console.log(existingUser)
        if(!existingUser){
            return response.status(401).send({
                message: "User not found."
            })
        }

        if(!findMovie && existingUser)
        {
            const newMovie = request.body.movie
            console.log(`I am here:`)
            newMovie.users = [...newMovie.users, request.body.userId]
            insertNewMovie(newMovie);
        }

        // Adding references for both User and Movie

        database.collection('users').findOne({_id: request.body.userId}).then((foundUser) => {
            if(foundUser){
                foundUser.movies = [...foundUser.movies, request.body.movie.id]
                console.log(`find and update: ${JSON.stringify(foundUser)}`)
            }
        });
        return response.status(201).send({
            message: "Movie added with reference to user."
        });
    }
    catch(error)
    {
        console.log(error);
        return response.status(500).send(error);

    }

})

