import { Component, OnInit, ViewChild } from '@angular/core';

import { MyServiceService } from '../../../service/my-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../../../service/cart.service';
import { BadgeService } from '../../../service/badge.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageComponent } from '../../../share/message/message.component';
import { Order, ProductOrder } from '../../../models/order.model';
import { catchError, throwError } from 'rxjs';
import { SpinerComponent } from '../../../share/spiner/spiner.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-Cart-detail',
  templateUrl: './Cart-detail.component.html',
  styleUrls: ['./Cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  constructor(
    private cart:CartService,
    private badge: BadgeService, 
    private router:Router,
    private myservice:MyServiceService,
    private title:Title,
  ) {
      this.title.setTitle("Giỏ hàng")
   }

   @ViewChild('message') mymessage!:MessageComponent;
   
  MyCart: FormGroup = new FormGroup({
    customer_name : new FormControl(null,Validators.required),
    customer_tel: new FormControl(null,Validators.required),
    customer_address: new FormControl(null,Validators.required),
    customer_note: new FormControl(null),
  });
  MyProducts:any;
  total:number = 0;
  delivery:any;
  selectedDelivery:any;
  isSuccess = false;
  loading = false;

  deleteItem(index:number){
    this.cart.removeItem(index);
    if(this.cart.MyProduct.length>0){
      this.badge.setdata(this.cart.MyProduct.length);
      this.Total();
    }
    else{
      this.badge.setdata(0);
      this.router.navigateByUrl('/home');
    }
  }
  reset(){
    this.badge.setdata(0);
    this.MyCart.reset();
    this.cart.reset();
  }
  Buy(){
    if(this.MyCart.valid){
      let products:ProductOrder[]=[];
      for(let el of this.MyProducts){
        products.push(new ProductOrder(el.id,el.size.name,el.color.name,el.quantity))
      }
      let order = new Order(
        products,
        this.MyCart.value.customer_name,
        this.MyCart.value.customer_tel,
        this.MyCart.value.customer_address,
        this.MyCart.value.customer_note || "",
        this.selectedDelivery.id,
        this.total
      );
      this.loading = true;
      let url = this.myservice.getlink('api/order/create');
      this.myservice.postData(url,JSON.stringify(order)).pipe(catchError(error => {
        this.mymessage.addmessage(3);
        this.loading = false;
        return throwError(() => new Error('Something bad happened; please try again later.'));;
      })).subscribe(()=>{
        this.mymessage.addmessage(2);
        this.loading = false;
        this.reset();
        this.isSuccess=true;
      })
    }
    
  }
  GotoHome(){
    this.router.navigate(["home"]);
  }
  Total(){
    this.total = this.selectedDelivery.cost;
    this.MyProducts.forEach((d:any) =>{
      this.total +=  d.cost*d.quantity 
    })
  }
  getDelivery(){
    let url = this.myservice.getlink('api/delivery/getall');
    this.myservice.getData(url).subscribe(data => {
      this.delivery = data;
      this.selectedDelivery = this.delivery[0];
      this.Total();
    });
    
  }
  checkProducts(){
    if(!this.cart.MyProduct || this.cart.MyProduct.length<=0){
      this.GotoHome();
    }
  }
  ngOnInit() {
    this.checkProducts();
    this.cart.MyProduct = this.cart.MyProduct.map((d)=> {return {...d,total:d.cost*d.quantity}});
    this.MyProducts = this.cart.MyProduct;
    this.getDelivery();
    this.isSuccess = false;
  }

}
