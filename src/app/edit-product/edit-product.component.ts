import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  id:number=0;
  name:string='';
  orderdate:string='';
  ordertime:string='';
  message:string='';

  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params=>{
      const idParam=params.get('id');
      if(idParam !==null){
        this.id =+ idParam;
        this.fetchProduct();
      }
      else{
        console.error("id is missiong or null");
      }
    })
    
  }

  fetchProduct(){
    this.http.get('http://localhost:3000/getProduct/'+this.id)
    .subscribe((response:any)=>
    {
    const product=response[0];
    this.name=product.name;
    this.orderdate=product.orderdate;
    this.ordertime=product.ordertime;
  },
    (error)=>{console.error('Error fetching the product',error);
  });
  }

  updateProduct(){
    const product={
      id:this.id,
      name:this.name,
      orderdate:this.orderdate,
      ordertime:this.ordertime
    };

    this.http.put('http://localhost:3000/updateProduct',product)
    .subscribe((response:any)=>
    {this.message=response.message;this.router.navigate(['/view'])},
    (error)=>{console.error('Error updating  the product',error)}
    );
  }

}

/*
* Notice: 
* You will be redirected to the particular view ---> this.router.navigate(['/view']
* 
*/