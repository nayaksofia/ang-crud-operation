import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

 products:any[] = [];

  message:string='';


  constructor(private http:HttpClient){}
/*
Any operation which you wanted to loaded , by default
without calling any function;
you write that piece of code inside ngOnInit().
*/
  ngOnInit(): void {
    this.fetchProducts();
  }
  
  fetchProducts(){
    this.http.get('http://localhost:3000/getProducts')
    .subscribe((response:any)=>
    {this.products=response},
    (error)=> {console.error('Error fetching the product',error);}
    );
  }

  deleteProduct(id:number){
    if(confirm('Are you sure you want to delete this product?')){
      this.http.delete('http://localhost:3000/deleteProduct/' + id)
      .subscribe((response:any)=>
      {this.message=response.message; this.fetchProducts()}, 
      //We call this.fetchProducts() --> To restart automaticallly after deletion 
      (error)=> {console.error('Error deleting the product',error);}
      );
    }
  }
}
