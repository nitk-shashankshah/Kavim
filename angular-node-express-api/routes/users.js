var express = require('express');

var mysql = require('mysql');

var router = express.Router();

var pool  = mysql.createPool({
  connectionLimit : 10, // default = 10
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "kavim"
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  let pg = req.query.page;
  let lmt = req.query.limit;
  pool.getConnection(function (err, con) {
    if (err) throw err;
    con.query("SELECT * FROM products limit " + pg + ", " + lmt, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

/* GET users listing. */
router.get('/categories', function(req, res, next) {
  pool.getConnection(function (err, con) {
    if (err) throw err;
    con.query("SELECT DISTINCT category FROM products", function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

module.exports = router;
