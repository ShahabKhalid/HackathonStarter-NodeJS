/*
    User session controller
 */

import Session from "../db/models/sessions";
import UUIDv1 from "uuid/v1"

const createSession = (email, ip) => {
    return new Promise((resolve, reject) => {
        Session.find({ email: email, loggedIP: ip}).then(
            session => {
                const uuid = UUIDv1()
                let newSession = new Session({
                    email: email,
                    authKey: uuid.toString(),
                    loggedIP: ip
                })

                return newSession.save().then(
                    newSession => resolve(newSession)
                ).catch(
                    err => reject(err)
                )
            }
        )
    })
}

const isValidSession = (authKey) => {
    return new Promise((resolve, reject) => {
        Session.find({authKey: authKey})
            .then(sessions => resolve(sessions.length > 0))
            .catch(err => reject(err))
    })
}

export {
    createSession,
    isValidSession
}