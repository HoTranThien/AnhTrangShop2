import { Component, OnInit, ViewChild } from '@angular/core';
import { MyServiceService } from '../../../service/my-service.service';
import { Message } from 'primeng/api';
import { CartService } from '../../../service/cart.service';
import { BadgeService } from '../../../service/badge.service';
import { MessageComponent } from '../../../share/message/message.component';
import { Title } from '@angular/platform-browser';
import { SpinerComponent } from '../../../share/spiner/spiner.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

  constructor(private myservice:MyServiceService,
              private cart:CartService,
              private badge:BadgeService,
              private title:Title,
            ) { }
  @ViewChild('message') mymessage?:MessageComponent;
  product?:any;
  index:number = 0;
  indexcolor:number = 0;
  indexsize:number = 0;

  mycolor?:any;
  quantity:number = 1;
  GetQuantity(e:number){
    this.quantity = e;
  }
  changeImg(event:number){
    this.index = event;
  };
  changeCol(e:number){
    this.indexcolor = e;
  }
  changesize(e:any){
    this.indexsize = e;
  }
  findcode(col:string){
    let obj = this.mycolor?.find((d:any) => d.color == col);
    return obj?.code;
  }
  AddToCart(){
    this.mymessage?.addmessage(0);
    let myproduct = {
      id:this.product.id,
      name:this.product.name,
      img:this.product.img_product[0].link,
      color:this.product.productColor[this.indexcolor].color,
      size:this.product.productSize[this.indexsize].size,
      quantity:this.quantity,
      cost:this.product.sale_cost?this.product.sale_cost:this.product.cost,
    };
    let duplicate = false;
    for(let i = 0; i < this.cart.MyProduct.length; i++){
      if(myproduct.name == this.cart.MyProduct[i].name && myproduct.size == this.cart.MyProduct[i].size
        && myproduct.color == this.cart.MyProduct[i].color)
        {
          this.cart.updateQuantity(i,myproduct.quantity); 
          duplicate = true;
          break;
        }
    }
    if (duplicate == false) {
      this.cart.addToCart(myproduct);
      this.badge.IncreaseOne();
    }
  }
  ngOnInit() {
    this.product = history.state.product;
    this.title.setTitle(`Sản phẩm: ${this.product.name}`)

  }

}
