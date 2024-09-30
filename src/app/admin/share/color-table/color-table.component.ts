import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color } from '../../../models/fields.model';
import { HttpMethodService } from '../../../service/HttpMethod.service';

@Component({
  selector: 'app-color-table',
  templateUrl: './color-table.component.html',
  styleUrls: ['./color-table.component.scss']
})
export class ColorTableComponent implements OnInit {

  constructor(private myservice:HttpMethodService) { }

  @Input() parentvalue:Color = {name:"",code:""};
  @Input() action:number = 0;
  @Output() sendmessagetoparent = new EventEmitter();
  visible: boolean = false;
  changedvalue:Color = {name:"",code:""};
  isdisabled:boolean = false;
  missInfo:boolean = false;
  header = ["EDIT INFORMATION", "ADD NEW FIELD"]

  showDialog() {
    this.missInfo = false;
      this.visible = true;
      this.isdisabled = false;
      this.changedvalue = this.parentvalue;
  }
  closeDialog(){
    this.visible = false;
  }
  SaveUpdate(){
    if(this.myservice.isEmptyOrSpaces(this.changedvalue.name)){
      this.missInfo = true;
    }
    else{
      this.sendmessagetoparent.emit(this.changedvalue);
      this.isdisabled = true;
    }
  }

  ngOnInit() {
  }

}
