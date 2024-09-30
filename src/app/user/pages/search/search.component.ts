import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HttpMethodService } from '../../../service/HttpMethod.service';
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
    private myservice: HttpMethodService,
    private router: Router,
    private searchInfo:SearchInfoService,
    private title:Title,
  ){ 

  }
  Info:string = "";
  isnull = false;
  loading = false;
  query:string = "";
  collection:any;
  
  NavigateToSearchPage(){
    if(!this.myservice.isEmptyOrSpaces(this.Info)) {
      this.loading =true;
      this.searchInfo.SendInfo(this.Info);
      this.router.navigate(['/search', this.Info]);
      localStorage.setItem('search',this.Info);
    }
  }
  loaddata(){
    //window.location.reload();
    this.searchInfo.GetSearchInfo.subscribe(d =>{
      this.Info = d;
      localStorage.setItem('search',d)
      this.query = `product/search/${this.Info}`;
      this.title.setTitle(`Search: ${this.Info}`);
    });
  }
  ngOnInit() {
    this.loaddata();
  }
}
