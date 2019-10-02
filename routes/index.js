var express = require('express');
var router = express.Router();

var Category = require("../models/categories.model");
var Product = require("../models/products.model");

router.get('/', function(req, res, next) {
  res.render('login');
});

// Categories start
router.get('/categories', function(req,res){
  Category.find({}, function(err,categories){
      if(err){
          res.render({
              status : false,
              error : err
          })
      }
      else{
        res.render('categories', { categories: categories, email : req.session.email });
      }
  })
})

router.post('/addCategories', function(req,res){
  var cat= new Category();
  cat.name = req.body.catName;
  cat.save();
  res.redirect('/categories');
})

// categories end
// products start

router.get('/products', function(req,res){
  Product.find({}).populate('category').exec(function(err,products){
      if(err){
          res.render({
              status : false,
              error : err
          })
      }
      else{ 
        Category.find({} , function(err,categories)
        {
            if(err){
                return;
            }
            else{ 
                res.render('products', { products: products, categories :categories, email : req.session.email });
            }
        })
      }
  })
})

router.post('/addProducts', function(req,res){
  var pro= new Product();
  pro.name = req.body.proName;
  pro.price = req.body.proPrice;
  pro.category = req.body.category;
  pro.save();
  res.redirect('/products');
})

// products end

router.get('/logout', function(req, res) {
  req.session.destroy(function(){
    res.redirect('/')
  })
});

router.get('/home', function(req, res) {
    res.render('home',{email : req.session.email});
});

router.post('/checklogin',function(req,res){
    if(req.body.email=='admin@gmail.com' && req.body.pass=='12345'){
      req.session.email = req.body.email;
      res.redirect('/home')
    }
})

module.exports = router;