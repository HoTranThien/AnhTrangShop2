import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MegaMenuSub } from 'primeng/megamenu';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { ProductComponent } from '../../pages/product/product.component';
import { MyServiceService } from '../../../service/my-service.service';
import { NosignPipe } from '../../../share/pipes/Nosign.pipe';
import { BadgeService } from '../../../service/badge.service';
import { SearchInfoService } from '../../../service/searchInfo.service';
import { MessageComponent } from '../../../share/message/message.component';
import { Collection } from '../../../models/fields.model';
import { CartService } from '../../../service/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers : [NosignPipe]
}) 
export class HeaderComponent implements OnInit {

  constructor(private myservice: MyServiceService,
              private router: Router,
              private Nosign:NosignPipe,
              private badgeService:BadgeService,
              private searchInfo:SearchInfoService,
              private cart:CartService,
              )
              {
                
                this.searchInfo.SendInfo(localStorage.getItem('search')||"");
                this.searchInfo.GetSearchInfo.subscribe(d => localStorage.setItem('search',d));
                this.badgeService.setdata(Number(JSON.parse(localStorage.getItem("badge")||"0")));
                this.badgeService.getdata.subscribe(d => {
                  localStorage.setItem("badge",JSON.stringify(d));
                  this.badge = d
                });
                this.cart.MyProduct = JSON.parse(localStorage.getItem("MyProduct")||JSON.stringify([]));
                localStorage.setItem("MyProduct",JSON.stringify(this.cart.MyProduct));
              }
@ViewChild('message') mymessage?:MessageComponent;
@ViewChild("search") search?:ElementRef;
badge?:number;
collection:any;
category:any;
IsShown = false;

navigateToCart(){
  if(this.badge&&this.badge >0){
    this.router.navigate(['/cart']);
  }
  else this.mymessage?.addmessage(1);
}
NavigateToSearchPage(searchValue:string){
  if(!this.myservice.isEmptyOrSpaces(searchValue)) {
    this.router.navigate(['/search', searchValue]);
    this.searchInfo.SendInfo(searchValue);
    localStorage.setItem('search',searchValue)
  }
  this.IsShownInput();
}
IsShownInput(){
  this.IsShown = !this.IsShown;
  if(this.IsShown) {
    setTimeout(()=>{this.search?.nativeElement.focus();});
    if(this.search) this.search.nativeElement.value = "";
  }
}
async GotoCollection(field:string,col?:any){
  if(col){
    let a = await this.router.navigate(['/collection',this.Nosign.transform(col.name)],{
      state:{field:field,id:col.id
      }});
  }
  else{
    let a = await this.router.navigate(['/collection',field],{
      state:{field:field
      }});
  }
  
  window.location.reload();
}
getCollection(){
  let url = this.myservice.getlink('api/collection/getall');
  this.myservice.getData(url).subscribe((data:any)=> {this.collection = data});
}
getcategory(){
  let url = this.myservice.getlink('api/parent_category/getallwithchildren');
  this.myservice.getData(url).subscribe(data=>{
    this.category = data;
    this.category.sort((a:any,b:any)=>a.id-b.id)
  })
  
}
  ngOnInit() {
    this.getCollection();
    this.getcategory();
  }

}
