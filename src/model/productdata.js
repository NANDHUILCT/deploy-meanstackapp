const mongoose = require('mongoose');

require ("dotenv").config();
mongoose.connect(process.env.MONGODB_URL);

// mongoose.connect("mongodb+srv://Nandhu:Nandhu2004@cluster0.hursawp.mongodb.net/ProductDB");

//schema
const Schema = mongoose.Schema;
const productSchema = new Schema({
productID:Number,
productName:String  ,
productCode:String ,
releaseDate:String,
description:String,
price:Number,
starRating:Number,
imageURL:String
});

//model creation

var productdata = mongoose.model('products',productSchema);

module.exports = productdata;







