import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.scss']
})
export class SpinerComponent{

  constructor() { }
  @Input()isshow:boolean = false;
  show(){
    this.isshow = true;
  }
  close(){
    this.isshow = false;
  }
}
