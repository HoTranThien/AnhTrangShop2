import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Image } from 'primeng/image';
import { Collection } from '../../../models/fields.model';
import { MyServiceService } from '../../../service/my-service.service';

@Component({
  selector: 'app-collection-table',
  templateUrl: './collection-table.component.html',
  styleUrls: ['./collection-table.component.scss']
})
export class CollectionTableComponent implements OnInit {

  constructor(private myservice:MyServiceService) { }
  @Input() parentvalue:Collection = {name:"",img:"",imgFile:undefined};
  @Input() action:number = 0;
  @Output() sendmessagetoparent = new EventEmitter();
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  visible: boolean = false;
  changedvalue:Collection = {name:"",img:undefined};
  isdisabled:boolean = false;
  missInfo = {missName:false,missImg:false};
  header = ["EDIT INFORMATION", "ADD NEW FIELD"]

  showDialog() {
      this.visible = true;
      this.isdisabled = false;
      this.changedvalue = this.parentvalue;
      this.missInfo = {missName:false,missImg:false}
  }
  closeDialog(){
    this.visible = false;
  }
  async SaveUpdate(){
    if(this.changedvalue.img && !this.myservice.isEmptyOrSpaces(this.changedvalue.name)){
      this.sendmessagetoparent.emit(this.changedvalue);
      this.isdisabled = true;
    }
    else{
      if(!this.changedvalue.img) this.missInfo.missImg = true;
      if(this.myservice.isEmptyOrSpaces(this.changedvalue.name)) this.missInfo.missName = true;
    }
  }
  openFileDialog(){
    this.fileInput.nativeElement.click();
  }
  onFileSelected(input:any){
    if (input.target.files && input.target.files[0]) {
      this.changedvalue.imgFile= input.target.files[0];
      var reader = new FileReader();
      reader.onload = (e:any) => {
        this.changedvalue.img = e.target?.result;
      };
      reader.readAsDataURL(input.target.files[0]);
    }
    else{
      this.missInfo.missImg = true;
    }
  }
  ngOnInit() {
  }

}
