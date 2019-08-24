/*
    Mongo Init
 */

import mongoose from 'mongoose'
import { connectionURL } from '../config'

mongoose.connect(connectionURL, {useNewUrlParser: true}).then(
    _ => {
        const db = mongoose.connection
        db.on('error', function() {
            console.error("Mongo connection error.")
            process.exit(0)
        })
        db.on('open', function () {
            console.log("Mongo successfully connected.")
        })
    }
)
