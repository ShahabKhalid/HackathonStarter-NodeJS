/*
    Auth routes
 */

import {
    check,
    validationResult
} from 'express-validator'

import {
    loginUser,
    createUser, logOut
} from '../controllers/authController'
import {isValidSession} from "../controllers/sessionController";
import {INTERNAL_SERVER_ERROR} from "../constants/responses";

const AuthRoutes = (app, path='') => {
    /**
    * @api {post} /auth/register Create user
    * @apiName Create new user
    * @apiPermission None
    * @apiGroup User
    *
    * @apiParam  {String} [firstName] firstName
    * @apiParam  {String} [lastLame] lastName
    * @apiParam  {String} [email] email
    * @apiParam  {String} [password] password
    *
    * @apiSuccess (201) {"message" : "User Successfully created"}
    */
    app.post(path+'/register', [
      check('firstName')
          .exists().withMessage("field missing")
          .isString().withMessage("Invalid firstName")
          .isLength({ min: 3 }).withMessage("Too short firstName"),
      check('lastName')
          .exists().withMessage("field missing")
          .isString().withMessage("Invalid lastName")
          .isLength({ min: 3 }).withMessage("Too short lastName"),
      check('email')
          .exists().withMessage("field missing")
          .isEmail().withMessage("Invalid Email"),
      check('password')
          .exists().withMessage("field missing")
          .isString().withMessage("Invalid password")
          .isLength({ min: 8 }).withMessage("Password must contain at-least 8 characters")
    ], (req, res) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
          return res.status(422).json({
              errors: errors.array({onlyFirstError: true})
          })
      }
      createUser(req, res)
    })

    app.post(path+'/login', [
        check('email')
            .exists().withMessage("field missing")
            .isEmail().withMessage("Invalid Email"),
        check('password')
            .exists().withMessage("field missing")
            .isString().withMessage("Invalid password")
            .isLength({ min: 8 }).withMessage("Password must contain at-least 8 characters")
    ], (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array({onlyFirstError: true})
            })
        }
        loginUser(req, res)
    })

    app.post(path+'/logout', (req, res) => {
        const auth = req.headers['authorization'] || ''
        isValidSession(auth)
            .then(isValid => {
                if (!isValid)
                    return res.status(401).json({message: "Unauthorized user"})
                else {
                    logOut(req, res, auth)
                }
            }).catch(err => {
                res.status(500).json({error: INTERNAL_SERVER_ERROR})
                console.error(err)
            }
        )
    })
}

export default AuthRoutes
