/*
  Application Configurations
 */


//--------------------------
// Mongoose Configs
//--------------------------

const mongoConfig = {
    HOST: 'localhost',
    DATABASE: 'test'
}

export const connectionURL = `mongodb://${mongoConfig.HOST}/${mongoConfig.DATABASE}`

export const BCRYPT_SALT_ROUNDS = 10
