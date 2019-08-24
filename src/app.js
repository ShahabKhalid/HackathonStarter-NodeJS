/*
    SpecialMenu Backend By Shahab Khalid
    CopyRight @ Hasa Inc.
*/


import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import './db/index'

import {
    AuthRoutes,
    RestaurantRoutes
} from './routes/'

let app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

AuthRoutes(app, '/auth')
RestaurantRoutes(app, '/restaurant')

export default app
