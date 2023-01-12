var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Product = new Schema({

    ProductName:{
        type:String
    },
    ProductPrice:{
        type:Number
    },
    ProductDescription:{
        type:String
    }
},{
    collection: 'product'
 });

 module.exports = mongoose.model('product',Product);