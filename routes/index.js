// Example code to send email :; https://www.w3schools.com/nodejs/nodejs_email.asp 


var express = require('express');
var router = express.Router();



router.get('/',  function(req, res, next) {
	return res.render('home', { title: 'Home' });
});



 
module.exports = router;
