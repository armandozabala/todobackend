var mysql = require('mysql');

var connection = mysql.createConnection({
	   host     : 'localhost',
	   user     : 'root',
	   password : '',
    database : 'db_prueba_poly',
    multipleStatements: true
});


module.exports = connection;