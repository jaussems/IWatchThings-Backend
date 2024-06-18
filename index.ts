import express, { Express, Request, Response } from "express";
import {signUpRouter} from "./src/routes/signup";
import {loginRouter} from "./src/routes/login";
import {movieRouter} from "./src/routes/movie";
import {database} from "./src/services/database";

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config();
const uri = `mongodb+srv://${process.env["USERNAME"]}:${process.env["PASSWORD"]}@${process.env["MONGODBURL"]}`;
mongoose.connect(uri)
const db = mongoose.connection;
const app: Express = express();
const PORT = process.env.PORT || 4000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');


app.use(cors());
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'IWatchThings API',
            description: "A REST API built with Express and MongoDB. This API is build to interact with the MongoDB database and save the users preference."
        },
    },
    apis: ["./src/routes/signup.ts"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/test', (req: Request,res: Response) => {
    res.status(200).send({
        message: "I am working"
    })
})



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(signUpRouter);
app.use(movieRouter);
app.use(loginRouter);

app.listen(PORT, () => {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
    console.log('Connected to MongoDB');
    });
    console.log(`Listening on port: ${PORT}`)
})