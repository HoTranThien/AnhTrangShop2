import { Component, NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './user/pages/home/home.component';
import { CollectionComponent } from './user/pages/collection/collection.component';
import { ProductComponent } from './user/pages/product/product.component';
import { SearchComponent } from './user/pages/search/search.component';
import { CartDetailComponent } from './user/pages/Cart-detail/Cart-detail.component';
import { AdminComponent } from './admin/admin.component';
import { FieldsComponent } from './admin/pages/fields/fields.component';
import { AdProductComponent } from './admin/pages/ad-product/ad-product.component';
import { AdOrderComponent } from './admin/pages/ad-order/ad-order.component';
import { ProductDetailComponent } from './admin/pages/product-detail/product-detail.component';
import { NewProductComponent } from './admin/pages/new-product/new-product.component';
import { UserComponent } from './user/user.component';
import { OrderDetailComponent } from './admin/pages/order-detail/order-detail.component';

const routes: Routes = [
  {path:"",component:UserComponent,
    children:[
      {path:"",redirectTo : "home", pathMatch: "full"},
      {path:"home",component:HomeComponent,title:"Trang chủ"},
      {path: "collection/:collection-name", component:CollectionComponent,},
      {path: "product/:product-name", component:ProductComponent},
      {path: "search/:keyword",component:SearchComponent},
      {path: "cart",component:CartDetailComponent},
    ]
  },
  {path: "admin",component:AdminComponent,
    children:[
      {path:"", redirectTo: "product", pathMatch: "full"},
      {path: "fields",component:FieldsComponent},
      {path: "product",
        children:[
          {path:"",component:AdProductComponent},
          {path:"create",component:NewProductComponent},
          {path:"detail/:name",component:ProductDetailComponent,},
        ]
      },
      {path: "order",
        children:[
          {path:"",component:AdOrderComponent},
          {path:"detail/:name",component:OrderDetailComponent},
        ]
      },
    ]
  },
  {path: "**", redirectTo : "home", pathMatch: "full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
