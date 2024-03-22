import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; //Add
import { HttpClient, HttpClientModule} from '@angular/common/http'; //Add

//Configure routes
const routes:Routes=[
//If nothing is present
{path:'',redirectTo:'/view',pathMatch:'full'},
{path:'view', component:ViewProductComponent},
{path:'add',component:AddProductComponent},
{path:'edit/:id',component:EditProductComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ViewProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Add
    FormsModule, //Add
    RouterModule.forRoot(routes) //Add
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
