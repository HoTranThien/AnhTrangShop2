import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MyServiceService } from '../../../service/my-service.service';
import { Router } from '@angular/router';
import { SearchInfoService } from '../../../service/searchInfo.service';
import { Collection } from '../../../models/fields.model';
import { Title } from '@angular/platform-browser';
import { SpinerComponent } from '../../../share/spiner/spiner.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  constructor(
    private myservice: MyServiceService,
    private router: Router,
    private searchInfo:SearchInfoService,
    private title:Title,
  ){ 

  }
  Info:string = "";
  isnull = false;
  loading = false;
  collection:{product:any} = {product:[]};
  
  NavigateToSearchPage(){
    if(!this.myservice.isEmptyOrSpaces(this.Info)) {
      this.loading =true;
      this.searchInfo.SendInfo(this.Info);
      this.router.navigate(['/search', this.Info]);
      this.searchInfo.SendInfo(this.Info);
      localStorage.setItem('search',this.Info);
    }
  }
  loaddata(){
    this.loading = true;
    this.searchInfo.GetSearchInfo.subscribe(d =>{
      this.Info = d;
      localStorage.setItem('search',d)
      let url = this.myservice.getlink(`api/product/search/${this.Info}`)
      this.title.setTitle(`Search: ${this.Info}`)
      this.myservice.getData(url).subscribe( (data:any) => {
        this.collection.product = data;
        if (!this.collection.product || this.collection.product.length <= 0) this.isnull = true;
        this.loading = false;
      });
      
    });
  }
  ngOnInit() {
    this.loaddata();
  }
}
