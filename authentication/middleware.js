//middleware that sits between express server and the client side
//use middleware to direct users based on authentication response
//in this case middleware checks the users cookies and sees where
//user should be directed 

function authenticationMiddleware () {  
return function (req, res, next) {
	if (req.isAuthenticated()) {
	  return next()
	}
	res.redirect('/')
}}


module.exports = authenticationMiddleware