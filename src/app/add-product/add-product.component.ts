import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  id:number = 0; //Initialize 
  name:string='';
  orderdate:string='';
  ordertime:string='';
  message:string=''

  //Create object to httpclient
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    
  }

  addProduct(){
   //Create a json object 
   const product = {
    id: this.id,
    name: this.name,
    orderdate: this.orderdate,
    ordertime: this.ordertime
   };

   //Send to localhost 3000
   this.http.post('http://localhost:3000/addProduct',product)
   .subscribe((response:any)=>{ this.message=response.message},
   (error) => {console.error('Error adding the product',error);} 
   );
  }
}
