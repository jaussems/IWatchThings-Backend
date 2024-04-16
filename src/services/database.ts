import { MongoClient } from "mongodb";
import { Schema } from "mongoose";
import { User } from "../models/user";

const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const uri = `mongodb+srv://${process.env["USERNAME"]}:${process.env["PASSWORD"]}@${process.env["MONGODBURL"]}`;
mongoose.connect(uri)
const client = new MongoClient(uri);
const database = client.db("IwatchMovies");
const collection = database.collection("users");

export function insertNewUserIntoCollection (user: Schema<User>) {
    collection.insertOne(user);
}

export function findExistingUser(email: String): any {
    const existingUser = collection.find({
       email: email
    })

    console.log(`existingUser : ${existingUser}`)
    return existingUser;
}
