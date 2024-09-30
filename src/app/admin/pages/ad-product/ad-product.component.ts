import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { Router } from '@angular/router';
import { MessageComponent } from '../../../share/message/message.component';
import { SpinerComponent } from '../../../share/spiner/spiner.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ad-product',
  templateUrl: './ad-product.component.html',
  styleUrls: ['./ad-product.component.scss']
})
export class AdProductComponent implements OnInit {

  constructor(private myservice:HttpMethodService,private router:Router, private title:Title) {
    this.title.setTitle("Products")
   }
  @ViewChild('message') mymessage!:MessageComponent;
  loading = false;
  products:any;
  first: number = 0;
  rows: number = 10;
  total:number = 0;

  GotoCreateProduct(){
    this.router.navigateByUrl('admin/product/create');
  }
  getAllProducts(){
    this.loading = true;
    let url = this.myservice.getlink('product/getall');
    this.myservice.getData(url).subscribe((data:any) => {
      this.products = data.data.products;
      this.total = data.data.total;
      this.loading = false;
    });
  }
  deleteProduct(id:number){
    let url = this.myservice.getlink('product/delete',id);
    this.loading = true;
    this.myservice.deleteData(url).subscribe(()=>{
    let index = this.products.findIndex((data:any)=>{return data.id === id});
    this.products.splice(index,1);
    this.mymessage.addmessage(2);
    this.loading = false;
    })
  }
  onPageChange(event:any){
    this.loading = true;
    this.first = event.first;
    this.rows = event.rows;
    let url = this.myservice.getlink('product/getall');
    this.myservice.getDataWithPageRequest(url,event.page,event.rows).subscribe((data:any)=>{
      this.products = data.data.products;
      this.loading = false;
    });
  }
  ngOnInit() {
    this.getAllProducts();

  }

}
