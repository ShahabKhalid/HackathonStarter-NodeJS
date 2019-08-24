/*
    Mongo Model for Users
 */

import mongoose from 'mongoose'
import bcrypt from "bcrypt";

import { BCRYPT_SALT_ROUNDS } from '../../config'
import { EMAIL_IN_USE } from '../../constants/responses'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}]
})

userSchema.pre('save', function(next) {
    User.find({email: this.email}, (err, user) => {
        if(err) next(err)
        if(user.length > 0) next(EMAIL_IN_USE)
    })
    bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS, (err, hash) => {
        if (err) return next(err)
        this.password = hash
        next()
    })
})

userSchema.methods = {
    comparePassword: function(password, callBack) {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) return callBack(err)
            callBack(null, isMatch)
        })
    }
}

userSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        ret['id'] = ret['_id']
        delete ret['_id']
        delete ret['password']
        delete ret['__v']
        return ret
    }
})

const User = mongoose.model('User', userSchema)
export default User