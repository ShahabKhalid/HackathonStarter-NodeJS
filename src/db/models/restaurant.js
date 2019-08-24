/*
    Mongo Model for Restaurants
 */

import mongoose from 'mongoose'
import {RESTAURANT_NAME_IN_USE} from "../../constants/responses";

const restaurantSchema = new mongoose.Schema({
    name: String
})

restaurantSchema.pre('save', function(next) {
    Restaurant.find({name: this.name}, (err, user) => {
        if (err) next(err)
        if (user.length > 0) next(RESTAURANT_NAME_IN_USE)
    })
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
export default Restaurant
