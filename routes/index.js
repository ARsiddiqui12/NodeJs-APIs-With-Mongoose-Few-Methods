var express = require("express");

var product = require('../mongoose/product');

var route = express.Router();

route.get('/',(req,res)=>res.send("Access Denied!"));

route.post('/create-product',(req,res)=>{
   
    // product.create({

    //     ProductName:req.body.ProductName,
    //     ProductPrice:req.body.ProductPrice,
    //     ProductDescription:req.body.ProductDescription

    // },(err,doc)=>{
    //     res.json(doc);
    // });
    product.create(req.body).then((result) => {
        console.log(`Successfully saved ${result.length} users`);
      }).catch((err) => {
        console.log(err);
      });

      res.send("created");

});

route.get('/remove-product',(req,res)=>{

    var productId = req.query.id;

    product.findByIdAndDelete(productId, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Document deleted successfully');
        }
    });

    res.send("Product Deleted");
});

route.get('/remove-all-products',(req,res)=>{

    product.remove({}, function(err) {
        if (!err) {
            console.log("Collection truncated!");
            res.send("Collection truncated!");
        } else {
            console.log(err);
        }
    });

});

route.get('/find-all-records',(req,res)=>{

    product.find({}, function(err, docs) {
        if (!err) {
            console.log(docs);
            res.json(docs);
        } else {
            console.log(err);
        }
    });

});

route.get('/find-product-by-string',(req,res)=>{
   
    var ProductName = req.query.ProductName;

    product.findOne({ ProductName: ProductName }, function(err, doc) {
        if (!err) {
            console.log(doc,"docs");
            res.json(doc);
        } else {
            console.log(err);
        }
    });




    

});

route.get('/find-product-by-id',(req,res)=>{
   
    var id = req.query.id.toString();

    product.findById(id, function(err, doc) {
        if (err) return handleError(err);
        console.log(doc);
        res.send(doc);
    });

   




    

});

route.get('/count-products',async(req,res)=>{

     const count = await product.countDocuments();

      res.send("Total Products"+count);

});

route.get('/count-products-two',async(req,res)=>{

    let total = 0;

    await product.countDocuments().then((count)=>{

        total = count;

    });
    
    console.log(total);
    
    res.send("Total Documents Count : "+total);
});

route.get('/product-update',(req,res)=>{

   
    product.updateOne({ _id: req.query.id }, { $set: { ProductName: 'new name' } }, function (err, res) {
        if (err) return handleError(err);
        console.log(res);
      });

    res.send("product updated!");

});

route.get('/product-update-many',(req,res)=>{

    product.find({ ProductName: 'new name' }).updateMany({ $set: { ProductName: "HELLO WORLD" } }).exec();

    res.send("UPDATED MANY");

});

module.exports = route;