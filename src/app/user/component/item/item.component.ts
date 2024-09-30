import { Component, Input, OnInit } from '@angular/core';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { Product } from '../../../models/product.model';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(private myservice: HttpMethodService) { }
  @Input() myitem:any;
  ngOnInit() {

  }

}
