import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SearchComponent } from './user/pages/search/search.component';
import { MyServiceService } from './service/my-service.service';
import { CartDetailComponent } from './user/pages/Cart-detail/Cart-detail.component';
import { ProductComponent } from './user/pages/product/product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{
  constructor(private myservice:MyServiceService){
  }
  title = 'AnhTrangShop';
}

