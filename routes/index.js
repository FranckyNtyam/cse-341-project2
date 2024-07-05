const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'))
router.get('/', (req, res) =>{
    res.send('Hello Francky Ludovic, type "localhost:8080/login" to log');
})



router.use('/employees', require('./employees'))
router.use('/projects', require('./projects'))

router.get('/login', passport.authenticate('github', (req, res) =>{}))
router.get('/logout', function(req, res, next){
    req.logOut(function(err) {
        if(err){return next(err)}
        res.send('You are logout, type "localhost:8080/login" to log')
    })
})

module.exports = router