import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Delivery } from '../../../models/fields.model';
import { HttpMethodService } from '../../../service/HttpMethod.service';

@Component({
  selector: 'app-delivery-table',
  templateUrl: './delivery-table.component.html',
  styleUrls: ['./delivery-table.component.scss']
})
export class DeliveryTableComponent implements OnInit {

  constructor(private myservice:HttpMethodService) { }

  @Input() parentvalue:Delivery = {name:"",cost:""};
  @Input() action:number = 0;
  @Output() sendmessagetoparent = new EventEmitter();
  visible: boolean = false;
  changedvalue:Delivery = {name:"",cost:""};
  isdisabled:boolean = false;
  missInfo ={missname:false,misscost:false}
  header = ["EDIT INFORMATION", "ADD NEW FIELD"]

  showDialog() {
      this.visible = true;
      this.isdisabled = false;
      this.changedvalue = this.parentvalue;
      this.missInfo = {missname:false,misscost:false};
  }
  closeDialog(){
    this.visible = false;
  }
  SaveUpdate(){
    if(!this.myservice.isEmptyOrSpaces(this.changedvalue.name)&&!this.myservice.isEmptyOrSpaces(this.changedvalue.cost)){
      this.changedvalue.cost = this.changedvalue.cost?.toString();
      this.sendmessagetoparent.emit(this.changedvalue);
      this.isdisabled = true;
    }
    else{
      if (this.myservice.isEmptyOrSpaces(this.changedvalue.name)) this.missInfo.missname = true;
      if (this.myservice.isEmptyOrSpaces(this.changedvalue.cost)) this.missInfo.misscost = true;
    }

  }

  ngOnInit() {
  }

}
