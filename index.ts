import express, { Express, Request, Response } from "express";

const dotenv = require('dotenv');

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;


app.get('/test', (req: Request,res: Response) => {
    res.status(200).send({
        message: "I am working"
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})