require('dotenv').config()
const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const morgan = require('morgan')
const passport = require('passport')

const PORT = process.env.PORT

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))
//passport middleware
app.use(passport.initialize())  
app.use(passport.session())

//view engine
app.set('views')
app.set('view engine', 'ejs');

app.use(flash());

const authRouter = require('./routes/auth.routes')
app.use('/api/v1', authRouter)

app.listen(PORT, ()=>{
    console.log(`Server is listening to http://localhost:${PORT}/api/v1`);
})