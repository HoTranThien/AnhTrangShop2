import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, Size } from '../../../models/fields.model';
import { MyServiceService } from '../../../service/my-service.service';

@Component({
  selector: 'app-single-table',
  templateUrl: './single-table.component.html',
  styleUrls: ['./single-table.component.scss']
})
export class SingleTableComponent implements OnInit {

  constructor(private myservice:MyServiceService) { }
  @Input() parentvalue:Size = {name:""};
  @Input() action:number = 0;
  @Output() sendmessagetoparent = new EventEmitter();
  visible: boolean = false;
  changedvalue:Size = {name:""};
  isdisabled:boolean = false;
  header = ["EDIT INFORMATION", "ADD NEW FIELD"]
  missInfo:boolean = false;

  showDialog() {
      this.missInfo = false
      this.visible = true;
      this.isdisabled = false;
      this.changedvalue = this.parentvalue;
  }
  closeDialog(){
    this.visible = false;
  }
  SaveUpdate(){
    if(this.myservice.isEmptyOrSpaces(this.changedvalue.name))
    {
      this.missInfo = true;
      return;
    }
    else{
      this.missInfo = false;
      this.sendmessagetoparent.emit(this.changedvalue);
      this.isdisabled = true;
    }

  }
  ngOnInit() {

  }

}
