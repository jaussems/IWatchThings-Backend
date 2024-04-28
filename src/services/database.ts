import { MongoClient } from "mongodb";

import {UserData} from "../interfaces/user";
import mongoose, { Document, Model, Schema } from 'mongoose';
import {IUserData} from "../models/user";





const dotenv = require('dotenv').config();

const uri = `mongodb+srv://${process.env["USERNAME"]}:${process.env["PASSWORD"]}@${process.env["MONGODBURL"]}`;
mongoose.connect(uri)
const client = new MongoClient(uri);
const database = client.db("IwatchMovies");
const usercollection = database.collection("users");

export function insertNewUserIntoCollection (user: IUserData) {
    usercollection.insertOne(user);
}



export function findExistingUser(email: String): any {
    const existingUser = usercollection.find({
       email: email
    })

    console.log(`existingUser : ${existingUser}`)
    return existingUser;
}

export { usercollection }