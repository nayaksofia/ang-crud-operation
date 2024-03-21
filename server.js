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


//Define API 

//to insert product into db
//       endpoints 
app.post('/addProduct',(req,res)=>{

    //Pass the data in the form of json
    const{id,name,orderdate,ordertime} = req.body;

    //Write sql query
    const sql = 'insert into product values(?,?,?,?)';

    //Connect the db and Access the query method
    db.query(sql,[id,name,orderdate,ordertime],(err,result)=>{

        if(err){
            console.error('Error in Adding the Product',err);
            res.status(500).json({error:'An error occured'});
        }else{
            res.status(200).json({message:'Product Added Successfully'});
        }
        
    });

});

//to get all the products--To view list
 
app.get('/getProducts',(req,res)=>{
    //Because it is a get operation , there is no data supply here.
    //write sql query
    const sql = 'select * from product';

    //connect db and call the query method
    db.query(sql,(err,result)=>{
        if(err){
            console.error('Error in fetching the product',err);
            res.status(500).json({error:'An error occured'});
        }else{
            res.status(200).json(result); //No message here like, result object is passed directly 
        }
    });

});

//to get product on Id
app.get('/getProducts/:id',(req,res)=>{

    const id = req.params.id;
    //Define query,No datasupply here as it is a get operation
    const sql = 'select * from product where id=?';

    //connect db and access query method
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.error('Error in fetching the product by id',err);
            res.status(500).json({error:'An error occured'});
        }else{
            res.status(200).json(result);
        }
    });

});



//update of product
app.put('/updateProduct',(req,res)=>{

    //Pass the data in the form of jshon
    const {id, name, orderdate,ordertime}=req.body;

    //Write sql query
    const sql ='update product set name=? , orderdate=? , ordertime=? where id=? ';
   
    //Connect db and access the query method
    db.query(sql,[name,orderdate,ordertime,id],(err,result)=>{
        if(err){
            console.error('Error in Updating Product Values',err);
            res.status(500).json({error: 'An error occured'});
        }else{
            res.status(200).json({message: 'Product Updated Succesfully'})
        }
    });

});

//delete of product
app.delete('/deleteProduct/:id',(req,res)=>{
    //define id
    const id = req.params.id;
    //define sql query
    const sql = 'delete from product where id=? ';

    //connect db and access query
    db.query(sql,[id],(err,result)=>{
       if(err){
        console.error('Error in deleting product',err);
        res.status(500).json({error:'An error ocurred'});
       }else{
        res.status(200).json({message:'Product Deleted Successfully'});
       }
    });

});