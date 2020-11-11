
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const userCtrl = require('./controller/user');
const taskCtrl = require('./controller/task');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.post('/register',  userCtrl.registerUser);

app.post('/auth',  userCtrl.authUser);

app.post('/registertask/:iduser', taskCtrl.registerTask);

app.get('/alltasks/:iduser', taskCtrl.getTasks);

app.post('/deletetask/:idtask', taskCtrl.deleteTask);


app.put('/updatetask/:idtask', taskCtrl.updateTask);


app.listen(3000);

