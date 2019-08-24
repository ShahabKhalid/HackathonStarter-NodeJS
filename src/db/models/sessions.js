/*
    Mongo Model for User Sessions
 */

import mongoose from 'mongoose'
import {RESTAURANT_NAME_IN_USE} from "../../constants/responses";

const sessionSchema = new mongoose.Schema({
    email: String,
    authKey: String,
    loggedIP: String
})

sessionSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['_id']
        delete ret['__v']
        delete ret['loggedIP']
        return ret
    }
})

const Session = mongoose.model('Session', sessionSchema)
export default Session
