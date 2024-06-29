const router = require('express').Router();

router.use('/', require('./swagger'))
router.get('/', (req, res) =>{
    res.send('Hello Francky Ludovic');
})

router.use('/employees', require('./employees'))

module.exports = router