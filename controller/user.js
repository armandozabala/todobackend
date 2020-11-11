'use strict'

var connection = require('../config.js');

function registerUser(request, response){

 var user = {
  name: request.body.name,
  lastname: request.body.lastname,
  email: request.body.email,
  password: request.body.password
}

if ( user.name != '' && user.lastname != '' ) {

connection.query('SELECT * FROM users WHERE email = ?', user.email, function(error, results, fields) {
if (results.length > 0) {
 response.send({
     ok : false,
     msj: 'Email Exist',
     iduser: results[0].iduser
 });
}else{

 connection.query('INSERT INTO users SET ?', user, function(error, results, fields) {

  if (results.insertId > 0) {
   response.send({
       ok : true,
       msj: 'Login Success',
       iduser: results.insertId
   });
  }
 });
}
});

} else {
response.send({
 ok : false,
 msj: 'Name and Lastname is Incorrect'
});

}

}

function authUser(request, response){

	var email = request.body.email;
	var password = request.body.password;
	if (email && password) {
		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				response.json({
        ok : true,
        msj: 'Login Success',
        iduser: results[0].iduser
    });
			} else {

      response.json({
       ok : false,
       msj: 'Login Failed'
    });

			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}

}

module.exports = {
 authUser,
 registerUser
}
