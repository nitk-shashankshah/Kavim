var express = require('express');

var mysql = require('mysql');

var router = express.Router();

var orm = require('orm');
var totalRec = 0,
pageSize  = 10,
pageCount = 0;
var start = 0;
var currentPage = 1;

router.use(orm.express("mysql://admin:admin@localhost/kavim?pool=true", {
  define: function (db, models, next) {
    models.products = db.define("products", {
      id : Number,
      name: String,
      description: String,
      price: Number,
      imageUrl: String,
      category: String    
    });

    models.images = db.define("productImages", {
      id : Number,
      imageURL: String
    });

    next();
  }
}));

router.get('/', function(req, res, next) {
  var result = req.models.products.count({
  }, function(error, productsCount){
      if(error) throw error;
      totalRec = productsCount;
      pageCount = Math.ceil(totalRec /  pageSize);
  
      if (typeof req.query.page !== 'undefined') {
        currentPage = req.query.page;
      } else {
        currentPage = 1;
      }
    
      start = (currentPage - 1) * pageSize;
    
      var result = req.models.products.find({},{limit: pageSize, offset: start}, function(error, products){
        res.json(products);
      });    
  });
});

router.get('/categories', function(req, res, next) {
  var result = req.models.products.aggregate().distinct('category').get(function (err, countries) {
    res.json(countries);
  });
});

router.get('/images', function(req, res, next) {
  var result = req.models.images.find({"id":  req.query.id},{},function (err, imgs) {
    res.json(imgs);
  });
});


module.exports = router;
