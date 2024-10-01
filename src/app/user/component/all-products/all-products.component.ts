import { Component, Input, OnInit } from '@angular/core';
import { Collection } from '../../../models/fields.model';
import { HttpMethodService } from '../../../service/HttpMethod.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  constructor(private myService:HttpMethodService) { }
  @Input() query:string = "";
  collection?:any;
  notFound = false;
  first: number = 0;
  rows: number = 10;
  total:number = 0;
    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
        this.queryData(event.page,event.rows);
    }
  queryData(page:number, limit:number){
    let url = this.myService.getlink(this.query);
    this.myService.getDataWithPageRequest(url,page, limit).subscribe((data:any)=> {
      this.collection = data.data.products;
      this.total = data.data.total;
      if(this.collection == null||this.collection.length<=0) this.notFound = true;
      else this.notFound = false;
    });
  }
  ngOnInit() {
    this.queryData(0,10);
  }
  ngOnChanges(){
    this.first = 0;
    this.rows = 10;
    this.queryData(0,10);
  }
}
