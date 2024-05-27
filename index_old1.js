
//nodejs mongodb db connection and crud functions create and check on command prompt
//nodejs mongodb core/simple

const express = require('express');

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

// //old function way to get data from a table
dbConnect().then((resp)=>{
    resp.find({name:'sonam'}).toArray().then((data)=>{
    console.log(data)
    })
});


//new way to get data from a table
const main=async ()=>{
    let data = await dbConnect();
    data = await data.find({name:'maxyyyyy'}).toArray();
    console.log(data)
}
main();

/* const insertData= async ()=>{
    let data = await dbConnect();
    //let result = await data.insertOne({name:'max666',age:10});
    let result = await data.insertMany([{name:'max666',age:10},{name:'max777',age:10}]);
    console.warn(result);
    //return result;
    if(result.acknowledged)
    {
       console.warn("data is inserted")
    }
}
insertData(); */

/*
const updateData=async ()=>{
    let data = await dbConnect();
    //let result = await data.updateOne(
    let result = await data.updateMany(
        { name:'max666'},
        {
            $set:{name:'max pro 2222', age:111}
        }
        )
    console.log(result);
}
updateData(); */

/*
const deleteData=async ()=>{
    let data = await dbConnect();
    let result = await data.deleteOne({name:'max777'})
    //let result = await data.deleteMany({name:'max pro 6'})
    console.log(result)
}
deleteData(); */
