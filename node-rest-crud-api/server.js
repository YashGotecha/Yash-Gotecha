var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_js_api'
});
  
// connect to database
dbConn.connect(); 
 
 
// Retrieve all users 
app.get('/users', function (req, res) {
    console.log('Selecte All User');
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
 
 
// Retrieve user with id 
app.get('/user/:id', function (req, res) {
    try {
        console.log('Selecte User by ID');
        let user_id = req.params.id;
      
        if (!user_id) {
            return res.status(400).send({ error: true, message: 'Please provide user_id' });
        }
      
        dbConn.query('SELECT * FROM users where id=?', [user_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results[0], message: 'users list.' });
        });
    }
    catch(error){
        console.log(error);
    }
});
 
 
// Add a new user 
app.post('/user', function (req, res) {
  
    let qname = req.body.name;
    let qemail = req.body.email;
    let qcreatedat = req.body.createdat;
    console.log(qname+qemail+qcreatedat);
    if (!qname || !qemail || !qcreatedat ) {
        return res.status(400).send({ error:true, message: 'Please provide all fileds' });
    }
  
    dbConn.query("INSERT INTO users (name,email,created_at) VALUES (?,?,?) ",  [qname,qemail,qcreatedat], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});
 
 
//  Update user with id
app.put('/user', function (req, res) {
  
    let user_id = req.body.id;
    let qname = req.body.name;
    let qemail = req.body.email;
    let qcreatedat = req.body.createdat;
  
    if (!user_id || !qname || !qemail || !qcreatedat) {
        return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
  
    dbConn.query("UPDATE users SET name=?,email=?,created_at=? WHERE id = ?", [qname,qemail,qcreatedat, user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});
 
 
//  Delete user
app.delete('/user', function (req, res) {
  
    let user_id = req.body.id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
}); 
 
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;