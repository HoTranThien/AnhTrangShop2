import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-button',
  templateUrl: './quantity-button.component.html',
  styleUrls: ['./quantity-button.component.scss']
})
export class QuantityButtonComponent implements OnInit {

  @Output() sendmessagetoparent = new EventEmitter();
  num:number = 1;
  Minus(){
    if (this.num > 1) this.num = this.num - 1;
    this.sendmessagetoparent.emit(this.num);
  }
  Plus(){
    this.num = this.num +1;
    this.sendmessagetoparent.emit(this.num);
  }
  constructor() { }

  ngOnInit() {
  }

}
