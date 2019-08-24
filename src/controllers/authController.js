/*
    Auth Controller
 */

import bcrypt from 'bcrypt'

import User from '../db/models/users'
import {
    USER_CREATED,
    EMAIL_IN_USE,
    INVALID_CREDENTIALS,
    INTERNAL_SERVER_ERROR
} from '../constants/responses'
import {createSession} from "./sessionController";
import Session from "../db/models/sessions";

const createUser = (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
    user.save().then(
        _ => {
            res.status(201).json({message: USER_CREATED})
        }
    ).catch(
        err => {
            if (err === EMAIL_IN_USE)
                res.status(409).json({error: EMAIL_IN_USE})
            else {
                res.status(500).json({error: INTERNAL_SERVER_ERROR})
                console.error(err)
            }
        }
    )
}

const loginUser = (req, res) => {
    User.find({ email: req.body.email }).then(
        user => {
            if (user.length < 1)
                res.status(401).json({message: INVALID_CREDENTIALS})
            else {
                user = user[0]
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (!isMatch)
                        res.status(401).json({message: INVALID_CREDENTIALS})
                    else {
                        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
                        createSession(req.body.email, ip).then(
                            session => {
                                res.status(201).json(session.toJSON())
                            }
                        ).catch(
                            err => {
                                res.status(500).json({error: INTERNAL_SERVER_ERROR})
                                console.error(err)
                            }
                        )

                    }
                })

            }
        }
    ).catch(
        err => {
            res.status(500).json({error: INTERNAL_SERVER_ERROR})
            console.error(err)
        }
    )
}

const logOut = (req, res, authKey) => {
    Session.deleteMany({ authKey: authKey }).then(
        _ => res.json({message: "Logged out successfully"})
    ).catch(err => {
            res.status(500).json({error: INTERNAL_SERVER_ERROR})
            console.error(err)
        }
    )
}

export {
    createUser,
    loginUser,
    logOut
}