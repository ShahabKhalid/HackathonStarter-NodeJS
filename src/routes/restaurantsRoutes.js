/*
    Restaurant routes
 */

import {
    check,
    validationResult
} from 'express-validator'
import {
    addRestaurant,
    getRestaurant
} from "../controllers/restaurantController";

const RestaurantRoutes = (app, path='') => {
    app.post(path + '/add', [
        check('name')
            .exists().withMessage("field missing")
            .isString().withMessage("Invalid restaurant name")
            .isLength({min: 2}).withMessage("Too short name")
    ], (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array({onlyFirstError: true})
            })
        }
        addRestaurant(req, res)
    })

    app.get(path + '/:name', getRestaurant)
}

export default RestaurantRoutes
