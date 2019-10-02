var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CategoriesModel = new Schema({
    name : {type : String,unique : true},
    createdDate : {type : Date, default : Date.now}
})
module.exports = mongoose.model('Category',CategoriesModel)