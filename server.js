//let's define : dependencies
const express = require('express')
const bodyParser = require('body-parser') //to understand json data body-parser is required 
const cors = require('cors')
const mysql = require('mysql2')

//let's define : express operations
const app=express();  //express is initiated 

//let's define : port
const port=3000;

//defining the cors- cross origin by receiving the data in json format
app.use(cors()); //open to cross origin
app.use(bodyParser.json())

//Establish the connection with dB
const db=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'root',
        database:'dbs'
    }
);

//Verifying whether DB is connected or not 

db.connect(err=> {
    if(err){
        console.log('Connection is not established with the db',err);
    }else{
        console.log('Connection established with db succesfully');
    }
});

//Show :: On what port number having this application
app.listen(port, ()=> {console.log('Server port established on 3000')})