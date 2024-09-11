import { Component, OnInit, ViewChild } from '@angular/core';
import { MyServiceService } from '../../../service/my-service.service';
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

  constructor(private myservice:MyServiceService,private router:Router, private title:Title) {
    this.title.setTitle("Products")
   }
  @ViewChild('message') mymessage!:MessageComponent;
  loading = false;
  products:any;

  GotoCreateProduct(){
    this.router.navigateByUrl('admin/product/create');
  }
  getAllProducts(){
    this.loading = true;
    let url = this.myservice.getlink('api/product/getall');
    this.myservice.getData(url).subscribe(data => {
      this.products = data;
      this.loading = false;
    });
  }
  deleteProduct(id:number){
    let url = this.myservice.getlink('api/product/delete',id);
    this.loading = true;
    this.myservice.deleteData(url).subscribe(()=>{
    let index = this.products.findIndex((data:any)=>{return data.id === id});
    this.products.splice(index,1);
    this.mymessage.addmessage(2);
    this.loading = false;
    })
  }
  ngOnInit() {
    this.getAllProducts();

  }

}
