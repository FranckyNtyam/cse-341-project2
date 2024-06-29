const express = require('express');
const app = express();
const mongodb = require('./models/database')
const bodyParser = require('body-parser')

const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', require('./routes/index') )

mongodb.initDb((err) => {
    if(err){
        console.log(err)
    }else{
        app.listen(port, () => {
            console.log(`Running on port ${port}`)
        })
    }
})
