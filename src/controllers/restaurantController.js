/*
    Auth Controller
 */

import Restaurant from "../db/models/restaurant";
import {
    EMAIL_IN_USE,
    INTERNAL_SERVER_ERROR,
    RESTAURANT_CREATED, RESTAURANT_NAME_IN_USE
} from "../constants/responses";
import {isValidSession} from "./sessionController";

const addRestaurant = (req, res) => {
    const auth = req.headers['authorization'] || ''
    isValidSession(auth).then(
        isValid => {
            if (!isValid)
                return res.status(401).json({message: "Unauthorized user"})
            else {
                let restaurant = new Restaurant({
                    name: req.body.name
                })
                restaurant.save().then(
                    _ => {
                        res.status(201).json({message: RESTAURANT_CREATED})
                    }
                ).catch(
                    err => {
                        if (err === RESTAURANT_NAME_IN_USE)
                            res.status(409).json({error: RESTAURANT_NAME_IN_USE})
                        else {
                            res.status(500).json({error: INTERNAL_SERVER_ERROR})
                            console.error(err)
                        }
                    }
                )
            }
        }
    ).catch(err => {
        res.status(500).json({error: INTERNAL_SERVER_ERROR})
        console.error(err)
    })
}

const getRestaurant = (req, res) => {
    Restaurant.find({name: req.params.name}).then(
        restaurant => {
            if (restaurant.length < 1)
                res.status(404).json({message: "Restaurant not found"})
            else {
                restaurant =  restaurant[0]
                res.json(restaurant)
            }
        }
    ).catch(
        err => {
            res.status(500).json({error: INTERNAL_SERVER_ERROR})
            console.error(err)
        }
    )
}

export {
    addRestaurant,
    getRestaurant
}