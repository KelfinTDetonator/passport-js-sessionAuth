const router = require('./router')
const authController = require('../controllers/auth.controller')

//get page register
router.get('/register', (req, res) => {
    res.render('register')
});
//sesudah get page, ketika user tekan tombol submit -> barulah router post ini berjalan
router.post('/register', authController.register)

//get page login
router.get('/login', (req, res)=> {
    res.render('login.ejs');
})
const passport = require('../lib/passport')
                                            //tipe strategy
router.post('/login', passport.authenticate('local')
    // , {
    // successRedirect: '/api/v1/dashboard', //ketika success, redirect ke dashboard/home page
    // failureRedirect: '/api/v1/login' //ketika gagal, tetap di login page
    // }
, (req, res) => {
    try {
        res.send(200)
    } catch (error) {
        res.send(error.stack)
    }
});

router.get('/dashboard', authController.dashboard)

module.exports = router

