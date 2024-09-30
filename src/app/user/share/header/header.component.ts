import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MegaMenuSub } from 'primeng/megamenu';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { ProductComponent } from '../../pages/product/product.component';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { NosignPipe } from '../../../share/pipes/Nosign.pipe';
import { BadgeService } from '../../../service/badge.service';
import { SearchInfoService } from '../../../service/searchInfo.service';
import { MessageComponent } from '../../../share/message/message.component';
import { Collection } from '../../../models/fields.model';
import { CartService } from '../../../service/cart.service';
import { TokenService } from '../../../service/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers : [NosignPipe]
}) 
export class HeaderComponent implements OnInit {

  constructor(private myservice: HttpMethodService,
              private router: Router,
              private Nosign:NosignPipe,
              private badgeService:BadgeService,
              private searchInfo:SearchInfoService,
              private cart:CartService,
              private tokenService:TokenService,
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
                this.tokenService.setUserName(localStorage.getItem("name")||null);
                this.tokenService.getUserName.subscribe(name => {
                  if(name!=null){
                    localStorage.setItem("name",name);
                  }
                  this.userName = name;
                })
              }
@ViewChild('message') mymessage?:MessageComponent;
@ViewChild("search") search?:ElementRef;
badge?:number;
collection:any;
category:any;
IsShown = false;
userName:string|null = null;
Logout(){
  this.tokenService.removeToken();
  this.router.navigateByUrl("/home")
}
goToUserDetail(e:string){
  this.router.navigateByUrl("userdetail/"+e);
}
navigateToCart(){
  if(this.badge&&this.badge >0){
    this.router.navigate(['/cart']);
  }
  else this.mymessage?.addmessage(1);
}
navigateToLogIn(){
  this.router.navigate(['/login'])
}
navigateToSearchPage(searchValue:string){
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
  let url = this.myservice.getlink('collection/getall');
  this.myservice.getData(url).subscribe((data:any)=> {this.collection = data.data});
}
getcategory(){
  let url = this.myservice.getlink('parentcategory/getall');
  this.myservice.getData(url).subscribe((data:any)=>{
    this.category = data.data;
    this.category.sort((a:any,b:any)=>a.id-b.id)
  })
}
  ngOnInit() {
    this.getCollection();
    this.getcategory();
  }

}
