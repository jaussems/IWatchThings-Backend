import express, { Express, Request, Response } from "express";
import {signUpRouter} from "./src/routes/signup";

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config();
const uri = `mongodb+srv://${process.env["USERNAME"]}:${process.env["PASSWORD"]}@${process.env["MONGODBURL"]}`;
mongoose.connect(uri)
const db = mongoose.connection;
const app: Express = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/test', (req: Request,res: Response) => {
    res.status(200).send({
        message: "I am working"
    })
})

app.use(signUpRouter);

app.listen(PORT, () => {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
    console.log('Connected to MongoDB');
    });
    console.log(`Listening on port: ${PORT}`)
})