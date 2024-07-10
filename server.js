const express = require('express')
const app = express()
const mongodb = require('./models/database')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const GithubStrategy = require('passport-github2').Strategy
const cors = require('cors')

const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

app.use(cors({methods:['GET', 'POST', 'PUT', 'DELETE']}))
app.use(cors({origin:'*'}))
app.use('/', require('./routes/index') )
passport.use(new GithubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
   
        return done(null, profile)
    }
   

))

// This is the basic express session initialization.
app.use(session({
    secret:"secret",
    // resave:false,
    // saveUninitialized:true,
}))
// Init passport on every routes call.
app.use(passport.initialize())
//Allow passport to use express-session
app.use(passport.session())
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}`: "logged Out")
})

app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: "/api-docs", session: false
}),
(req, res) => {
    req.session.user = req.user
    res.redirect('/api-docs')
}
)

mongodb.initDb((err) => {
    if(err){
        console.log(err)
    }else{
        app.listen(port, () => {
            console.log(`Running on port ${port}`)
        })
    }
})
