
'use strict'

var connection = require('../config.js');

function getTasks(request, response){

 var iduser = request.params.iduser;


 connection.query(`SELECT * FROM tasks t INNER JOIN users_tasks ut ON ut.iduser = ${iduser} AND t.idtask = ut.idtask`, function(error, results, fields) {
 

         response.json({
             ok : true,
             rows: results,
         });

 });

}


function updateTask(request, response){

 var description = request.body.description;
 var complete = request.body.complete;
 var idtask = request.params.idtask;

 connection.query(`UPDATE tasks SET description='${description}', complete=${complete} WHERE idtask=${idtask}`, function(error, results, fields) {
 
     if(results.affectedRows > 0){

         response.json({
             ok : true,
             msj: results,
         });
     }else{

         response.json({
             ok : false,
             msj: [],
         });
     }



 });

}


function deleteTask(request, response){

 var idtask = request.params.idtask;

 console.log(idtask);

 connection.query(`DELETE FROM tasks WHERE idtask = ${idtask}`, function(error, results, fields) {
 

         connection.query(`DELETE FROM users_tasks WHERE idtask = ${idtask}`, function(error, results, fields) { 

             response.json({
                 ok : true,
                 msj: results,
             });

         });

 });

}


function registerTask(request, response){

 var des = {
  description: request.body.description,
  complete: request.body.complete
} 

var iduser = request.params.iduser;


if (des.description != '') {

connection.query('INSERT INTO tasks SET ?', des, function(error, results, fields) {


if (results.insertId > 0) {

 let task  = {
      iduser: iduser,
      idtask: results.insertId
 }

     connection.query('INSERT INTO users_tasks SET ?', task, function(error, results, fields) {

          console.log(results);

           response.json({
            ok : true,
            msj: 'Task Success',
        });

     });
 }
});


}

}


module.exports = {
 updateTask,
 deleteTask,
 getTasks,
 registerTask
}
