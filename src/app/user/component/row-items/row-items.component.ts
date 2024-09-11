import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, input } from '@angular/core';
import { MyServiceService } from '../../../service/my-service.service';

@Component({
  selector: 'app-row-items',
  templateUrl: './row-items.component.html',
  styleUrls: ['./row-items.component.scss']
})
export class RowItemsComponent implements OnInit {

  constructor(private myservice: MyServiceService) { }
  @Input() all = false;
  @Input() start = 0;
  @Input() sum = 5;
  @Input() items?:any;

  ngOnInit() {

  }

}
