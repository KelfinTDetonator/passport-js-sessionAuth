const prisma = require('../db/prismaClient')
const bcrypt = require('bcrypt')

module.exports = {
    register: async(req, res, next) => {
        try {
            let { email, password, username } = req.body
            // console.log(email, password, username);
            let userExist = await prisma.user.findUnique({ where: {email}})
            
            if(userExist){
                req.flash('Error', "User already exist");
                return res.redirect('/api/v1/register')
            }

            let encryptPw = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data:{
                    email,
                    password: encryptPw,
                    username,
                }
            })
            return res.redirect('/api/v1/login')
        } catch (error) {
            next(error)
        }
    },

    authUser: async(email, password, done) => {
        try {
            let userExist = await prisma.user.findUnique({where: {email}})
            if(!userExist  || !await bcrypt.compare(password, userExist.password)){
                return done(null, false, { message: 'Invalid email or password' })
            }
            return done(null, userExist) 
        } catch (error) {
            return done(null, false, { message: error.message })
        }
    },

    dashboard: async(req, res, next) => {
        // console.log(req.user);
        // res.render('dashboard', { user: req.user })
        if(req.user){
            res.status(200).json({
                data: req.user
            })
        } 
        // else if(!req.user){
        //     res.status(403).send({
        //         error: true,
        //         message: "Forbidden, not authenticated"
        //     })
        // }
    }
}