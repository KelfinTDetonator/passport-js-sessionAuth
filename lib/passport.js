const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const prisma = require('../db/prismaClient')
const authController = require('../controllers/auth.controller')

//serialize session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
//deserialize session
passport.deserializeUser(async function(id, done) {
    try {
        done(null, await prisma.user.findUnique({where: { id } }))
    } catch (error) {
        done(error, null)
    }
});

passport.use(new localStrategy({ //By default, LocalStrategy expects to find credentials in parameters named username and password.
    usernameField: 'email', 
    passwordField: 'password',
}, authController.authUser))

module.exports = passport
