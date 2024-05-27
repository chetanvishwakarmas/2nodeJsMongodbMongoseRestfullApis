
//nodejs mongodb restfull apis with mongoose and schema model

const express = require('express');
const config = require("./config");
const Product = require('./product'); //schema and model created of product table
const app = express();
app.use(express.json());

app.post("/product/create", async (req, resp) => {
    let data = new Product(req.body);
    const result = await data.save();
    resp.send(result);
});

app.get("/product/list", async (req, resp) => {
    let data = await Product.find();
    resp.send(data);
})

app.delete("/product/delete/:_id", async (req, resp) => {
    //console.log(req.params)
    let data = await Product.deleteOne(req.params);
    resp.send(data);
})

app.put("/product/update/:_id",async (req, resp) => {
    //console.log(req.params)
    let data = await Product.updateOne(
        req.params,
        {$set: req.body}
    );
    resp.send(data);
})

app.listen(5000);
