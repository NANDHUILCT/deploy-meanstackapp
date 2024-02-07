const express = require("express");
const productdata = require("./src/model/productdata");


const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT||8080;
const path=require('path');
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URL);

app.use(cors());


app.get('/*',function(req,res){
//res.send("API response correctly")
res.sendFile(path.join(_dirname,'./Client/build/index.html'));

})

app.get('/api/products',function(req,res){
    res.header("Acces-Control-Allow-Origin","*");
    res.header('Acces-Control-Allow-Methods:GET,POST,PUT,DELETE');
    productdata.find().then(function(products){
       res.send(products);


    })
})

app.post('/api/insert',bodyParser.json(),function(req,res){
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-methods:GET,POST,PUT,DELETE');
    console.log(req.body);
    var product = {
        productID: req.body.product.productID,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        releaseDate:req.body.product.releaseDate,
        description:req.body.product.description,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageURL:req.body.product.imageURL,
        }
        var product = new productdata(product);
        product.save();
})
// app.listen(5000,()=>{
//     console.log("server started...")

// });

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL);
      console.log(`MongoDB Connected: `);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests on ",port);
    })
})



