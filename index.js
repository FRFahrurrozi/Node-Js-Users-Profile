const express = require('express')
const app = express();
app.use(express.json());
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Berhasil Konek');
});

// Get Users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//Login
app.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var sql='SELECT * FROM users WHERE email =? AND password =?';
  connection.query(sql, [email, password], function (err, data) {
      if(err) throw err
      if(data.length>0){
        res.json('Login Berhasil');
      }else{
        res.json('Email atau Password salah');
      }
  });
});

//Signup
app.post('/signup', function(req, res) {
    
    inputData ={
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
    }

    var sql='SELECT * FROM users WHERE email =?';
    connection.query(sql, [inputData.email] ,function (err, data) {
    if(err) throw err
    if(data.length>1){
        var msg = inputData.email+ "Email sudah ada";
    }else{
        var sql = 'INSERT INTO users SET ?';
      connection.query(sql, inputData, function (err, data) {
          if (err) throw err;
              });
      var msg ="Berhasil Register";
    }
    res.json(msg);
    });
});

//Update email
app.put('/users/:id', function (req, res) {
  const id_user = req.body.id_user;
  const email = req.body.email;
  const password = req.body.password;
 
  connection.query(
    'UPDATE users SET email = ? WHERE id = ?',
    [password, email, id_user],
    function (error, data) {
      if (error) throw error;
      res.send(`User dengan ${id} updated berhasil.`);
    }
  );
});
 
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});