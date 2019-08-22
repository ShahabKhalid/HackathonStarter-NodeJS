/*
    NodeJSBoilerPlate By Shahab Khalid
*/


import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {
  CommonRoutes
} from './routes/';

let app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
CommonRoutes(app);


export default app;
