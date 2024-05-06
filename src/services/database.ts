import { MongoClient } from "mongodb";
import mongoose, {Document, Model, Schema, Types} from 'mongoose';
import {IMovie} from "../interfaces/movie";
import {response} from "express";
import {IUserData} from "../interfaces/user";
const dotenv = require('dotenv').config();


const uri = `mongodb+srv://${process.env["USERNAME"]}:${process.env["PASSWORD"]}@${process.env["MONGODBURL"]}`;
mongoose.connect(uri)
const client = new MongoClient(uri);
const database = client.db("IwatchMovies");
 const usercollection = database.collection("users");

export function insertNewUserIntoCollection (user: IUserData) {
    database.collection("users").insertOne(user);
}


export async function insertNewMovie(movie: IMovie) {
    try
    {
        const foundMovie = await database.collection('movies').find({_id: movie.id });
        if(!foundMovie)
        {
            await database.collection('movies').insertOne(movie);
            return response.status(201).send({
                message: "Movie created and added to collection."
            })
        }
    }
    catch(error) {
        console.log(error);
    }
}


export function addRefUserMovie(userId: Types.ObjectId, movie : IMovie) {
   usercollection.findOne({_id: userId}).then((foundUser) => {
        if(foundUser){
        foundUser.movies = [...foundUser.movies, movie.id]
            return response.status(201).send({
                message: `Reference for movie was added to user ${userId}`,
            })
        }
        else
        {
            return response.status(404).send({
                message: "User not found."
            })
        }
    });
}


export function insertUserIntoCollection (user: IUserData) {

}

export function findExistingUser(email: String): any {
    const existingUser = usercollection.find({
       email: email
    })

    console.log(`existingUser : ${existingUser}`)
    return existingUser;
}

export { usercollection, database }