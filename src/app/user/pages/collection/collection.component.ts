import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { Collection } from '../../../models/fields.model';
import { Title } from '@angular/platform-browser';
import { SpinerComponent } from '../../../share/spiner/spiner.component';



interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  constructor(private myservice: HttpMethodService,private title:Title) { }
  collection?:Collection;
  query:string = "";
  loading=true;

  ngOnInit() {
    let url:string;
    if(history.state.id){
      url = this.myservice.getlink(`${history.state.field}/getone`,history.state.id);
      this.query = history.state.field + "/getonewithproducts/" + history.state.id;
      this.myservice.getData(url).subscribe((data:any)=>{
      this.collection = data.data;
      this.title.setTitle(this.collection?.name||'Bộ sưu tập');
      this.loading=false;
    });
    }
    else {
      url = this.myservice.getlink(`product/${history.state.field}`);
      this.query = `product/${history.state.field}`;
      let name:string;
      if(history.state.field =='new') name = 'Sản phẩm mới';
      else name = 'Sản phẩm sale';
      this.myservice.getData(url).subscribe((data:any)=>{
        this.collection = {name:name,img:"",product:data.data.products};
        this.title.setTitle(name);
        this.loading = false;
    });
    }

    
  }

}
