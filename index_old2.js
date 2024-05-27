
//nodejs mongodb restfull apis

const express = require('express');

const mongodb = require('mongodb');

var app = express();

app.use(express.json());

const {MongoClient} = require('mongodb');
const url= 'mongodb://localhost:27017';
const databaseName='e-comm';
const client= new MongoClient(url);

async function dbConnect()
{
    let result = await client.connect();
    db= result.db(databaseName);
    collection = db.collection('student');
    return collection;
    //let data = await collection.find({}).toArray();
    //console.log(data);
}

app.get('/school_list', async (req, res)=>{
    let data = await dbConnect();
    data = await data.find().toArray();
    //console.log(data);
    res.send(data);
});

app.get('/school_list/:name', async (req, res)=>{
    let name = req.params.name;
    let data = await dbConnect();
    data = await data.find({name:name}).toArray();
    //console.log(data);
    res.send(data);
});

app.post('/school_list', async (req, res)=>{
    let formdata = req.body;
    let data = await dbConnect();
    //data = await data.insertOne(req.body);    
    data = await data.insertOne({name:formdata.name,age:formdata.age});
    //console.log(data);
    res.send(data);
});

app.put('/school_list/:id', async (req, res)=>{
    let data = await dbConnect();
    data = await data.updateOne(
                                    {_id:new mongodb.ObjectId(req.params.id)},
                                    {$set:{name:req.body.name}}
                                );
    //data = await data.updateOne({name:"chetan"},{$set:{age:55}});
    console.log(data);
    res.send(data);
});

app.patch('/school_list/:id', async (req, res)=>{
    //let formdata = req.body;
    //let id = req.params.id;
    let data = await dbConnect();
    data = await data.updateOne(
        {_id:new mongodb.ObjectId(req.params.id)},
        {$set:{name:req.body.name}}
    );
    //console.log(data);
    res.send(data);
});

/*app.delete('/school_list/:name', async (req, res)=>{
    let data = await dbConnect();
    data = await data.deleteOne({name:req.params.name});
    //console.log(data);
    res.send(data);
});*/

app.delete('/school_list/:id', async (req, res)=>{
    let data = await dbConnect();
    data = await data.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    //console.log(data);
    res.send(data);
});

app.listen(5000, ()=>{
    console.log('app is started');
});
