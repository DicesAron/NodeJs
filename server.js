require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME,
    timezone: 'UTC'
  });

  //minden lekerdezes
  app.get('/:table', (req, res) => {
    let table = req.params.table;
      pool.query(`SELECT * FROM ${table}`, (err, results) => {
        if(err){console.log(err)}
        else{console.log(results + " :)")}
      });
  });
  //egy lekerdezes
  app.get('/:table/:id', (req, res) => {
    let table = req.params.table;
    let id = req.params.table;
      pool.query(`SELECT * FROM ${table} Where ID = ${id}`, (err, results) => {
        if(err){console.log(err)}
        else{console.log(results + " :)")}
      });
  });
  //uj adat felvetele
  app.post('/:table/', (req, res) => {
    let table = req.params.table;
    let values = '"'+ Object.values(req.body).join('","') +'"';
    let fields = Object.keys(req.body).join(',');
      pool.query(`INSERT INTO ${table} (${fields}) VALUES(${values})`, (err, results) => {
        if(err){console.log(err)}
        else{console.log(results + " :)")}
      });
  });
  
//UPDATE
  app.patch('/:table/:id/:valami/:value', (req, res) => {
    let table = req.params.table;
    let id = req.params.id;
    let value = req.params.value;
    let amit = req.params.amit;
      pool.query(`UPDATE ${table} SET ${amit}=${value} WHERE ID=${id}`, (err, results) => {
        if(err){console.log(err)}
        else{console.log(results + " :)")}
      });
  });
//DELETE id alapján
  app.delete('/:table/:id', (req, res) => {
    let table = req.params.table;
    let id = req.params.id;
    
      pool.query(`DELETE FROM ${table} WHERE ID=${id}`, (err, results) => {
        if(err){console.log(err)}
        else{console.log(results + " :)")}
      });
  });
// delete mindent
  app.delete('/:table', (req, res) => {
    let table = req.params.table;
    
    
      pool.query(`DELETE FROM ${table}`, (err, results) => {
        if(err){console.log(err)}
        else{console.log(results + " :)")}
      });
  });

  console.log("a serverfut a " + port +" port on");