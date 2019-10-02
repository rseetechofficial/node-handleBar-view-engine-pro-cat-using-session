var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ProductsModel = new Schema({
    name : {type : String,unique : true},
    price  : {type : Number},
   // ProCat : {type : String},
    category : {type : Schema.Types.ObjectId,ref : 'Category'},
    createdDate : {type : Date, default : Date.now}
})
module.exports = mongoose.model('Product',ProductsModel)