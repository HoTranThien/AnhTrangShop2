import { Component, Input, OnInit } from '@angular/core';
import { MyServiceService } from '../../../service/my-service.service';
import { Product } from '../../../models/product.model';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(private myservice: MyServiceService) { }
  @Input() myitem:any;
  ngOnInit() {

  }

}
