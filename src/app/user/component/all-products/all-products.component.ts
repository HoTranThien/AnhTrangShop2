import { Component, Input, OnInit } from '@angular/core';
import { Collection } from '../../../models/fields.model';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  constructor() { }
  @Input() collection?:Collection;
  first: number = 0;
  page:number = 1;
  rows: number = 10;
    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }
  ngOnInit() {

  }

}
