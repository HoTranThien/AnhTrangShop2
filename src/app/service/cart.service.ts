import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService{

constructor() { }
MyProduct: any[] = [];

reset(){
  this.MyProduct = [];
  localStorage.setItem('MyProduct',JSON.stringify(this.MyProduct));
}
removeItem(index:number){
  this.MyProduct.splice(index,1);
  localStorage.setItem('MyProduct',JSON.stringify(this.MyProduct))
}
addToCart(product: any) {
  this.MyProduct.push(product);
  localStorage.setItem('MyProduct',JSON.stringify(this.MyProduct))
}
updateQuantity(index:number, quan:number){
  this.MyProduct[index].quantity =  this.MyProduct[index].quantity + quan;
  localStorage.setItem('MyProduct',JSON.stringify(this.MyProduct));
}

}
