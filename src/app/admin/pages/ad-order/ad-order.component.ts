import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { Order } from '../../../models/order.model';
import { Status } from '../../../models/fields.model';
import { SpinerComponent } from '../../../share/spiner/spiner.component';
import { MessageComponent } from '../../../share/message/message.component';
import { catchError, throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ad-order',
  templateUrl: './ad-order.component.html',
  styleUrls: ['./ad-order.component.scss']
})
export class AdOrderComponent implements OnInit {

  constructor(private myservice:HttpMethodService, private title:Title) { 
    this.title.setTitle("Orders")
  }
  @ViewChild('message') mymessage!:MessageComponent;
  loading = false;
  orders:any;
  status:any = [];
  selectedStatus:string = "";
  loaddata(){
    this.loading = true;
    let order_url = this.myservice.getlink('order/getall');
    this.myservice.getData(order_url).subscribe((data:any) => {
      this.orders = data.data;
      this.loading = false;
    })

    let status_url = this.myservice.getlink('order/status');
    this.myservice.getData(status_url).subscribe((data:any) => {
      this.status = data.data;
    })
  }
  deleteOrder(id:number){
    // let url = this.myservice.getlink('order/delete',id);
    // this.loading = true;
    // this.myservice.deleteData(url).pipe(catchError(error => {
    //   this.mymessage.addmessage(3);
    //   this.loading = false;
    //   return throwError(() => new Error('Something bad happened; please try again later.'));
    // })).subscribe(()=>{
    //   let index = this.orders.findIndex((order:any) => {return order.id == id});
    //   this.orders.splice(index,1);
    //   this.mymessage.addmessage(2);
    //   this.loading = false;
    // })
  }
  updateStatus(status:string,id:number){
    let url = this.myservice.getlink('order/update',id);
    this.loading = true;
    this.myservice.putData(url,{status:status}).pipe(catchError(error => {
      this.mymessage.addmessage(3);

      this.loading = false;
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })).subscribe(()=>{
      let index = this.orders.findIndex((order:any) => {return order.id == id});
      this.orders[index].status = status;
      this.mymessage.addmessage(2);
      this.loading = false;
    })
  }

  ngOnInit() {
  this.loaddata();

  }

}
