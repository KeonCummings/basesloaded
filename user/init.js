//uses the middleware function to see if the cookied user is a user

const passport = require('passport')

app.get('/profile', passport.authenticationMiddleware(), renderProfile)  