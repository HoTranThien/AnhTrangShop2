import { Component, Input, input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageComponent } from '../../../share/message/message.component';
import { SpinerComponent } from '../../../share/spiner/spiner.component';
import { Router } from '@angular/router';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { Order } from '../../../models/order.model';
import { Status } from '../../../models/fields.model';
import { catchError, throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  constructor(
    private router:Router,
    private myservice:HttpMethodService,
    private title:Title,
  ) {
    this.title.setTitle(`Order detail`)
   }
   @Input() isAdmin:boolean = true;
   @ViewChild('message') mymessage!:MessageComponent;
   isreadonly = true;
  Customer: FormGroup = new FormGroup({
    customer_name : new FormControl(null,Validators.required),
    customer_tel: new FormControl(null,Validators.required),
    customer_address: new FormControl(null,Validators.required),
    customer_note: new FormControl(null),
    note:new FormControl(null),
    status:new FormControl(null,Validators.required),
  });
  loading = false;
  MyOrder:any = {};
  total:number = 0;
  delivery:any;
  selectedDelivery:any;
  isSuccess = false;
  status:any = [];

  edit(){
    this.isreadonly = false;
  }
  save(){
    if(this.Customer.valid){
      this.loading = true;
      this.isreadonly = true;
      let url = this.myservice.getlink('order/update',this.MyOrder.id);
      this.myservice.putData(url,this.Customer.value).pipe(catchError(error => {
        this.mymessage.addmessage(3);
        this.loading = false;
        this.isreadonly = false;
        return throwError(() => new Error('Something bad happened; please try again later.'));;
      })).subscribe(()=>{
        this.mymessage.addmessage(2);
        this.loading = false;
        location.reload();
      })
    }
    else{
      this.mymessage.addmessage(3);
    }

  }
  cancel(){
    this.isreadonly = true;
    this.setFirstValue();
  }
  setFirstValue(){
    this.Customer.setValue({
      customer_name:this.MyOrder.customerName,
      customer_tel: this.MyOrder.customerTel,
      customer_address: this.MyOrder.customerAddress,
      customer_note: this.MyOrder.customerNote || "",
      note:this.MyOrder.note || "",
      status:this.MyOrder.status,
    });
  }
  getData(){
    let url = this.myservice.getlink('order/getone',history.state.id)
    this.myservice.getData(url).subscribe((data:any)=>{
      this.MyOrder = data.data;
      this.setFirstValue();
    })
    let status_url = this.myservice.getlink('order/status');
    this.myservice.getData(status_url).subscribe((data:any) => {
      this.status = data.data;
    })
  }
  ngOnInit() {
    this.getData();
  }

}
