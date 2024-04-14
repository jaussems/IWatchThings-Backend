import express, { Express, Request, Response } from "express";

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = `mongodb+srv://${process.env["USERNAME"]}:${process.env["PASSWORD"]}@${process.env["MONGODBURL"]}`;
mongoose.connect(uri)
const db = mongoose.connection;
const app: Express = express();
const PORT = process.env.PORT || 4000;

app.get('/test', (req: Request,res: Response) => {
    res.status(200).send({
        message: "I am working"
    })
})

app.listen(PORT, () => {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
    console.log('Connected to MongoDB');
    });
    console.log(`Listening on port: ${PORT}`)
})