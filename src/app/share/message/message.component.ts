import { Component, Input, OnInit } from '@angular/core';
import { HttpMethodService } from '../../service/HttpMethod.service';
import { title } from 'process';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private myservice: HttpMethodService) { }
  @Input() index:number = 0;
  @Input() top:number = 0;
  @Input() right:string = '0';
  HideMessage(i:number){
    this.messages.splice(i,1);
  }
  messages:{title:string,detail:string,status:string}[] = [];
  message = [{title:"Đã thêm vào giỏ hàng",detail:"Đã cập nhật giỏ hàng thành công",status:"good"},
              {title:"Giỏ hàng trống",detail:"Bạn chưa có sản phẩm nào trong giỏ hàng",status:"bad"},
              {title:"Notification",detail:"Success!!!",status:"good"},
              {title:"Error",detail:"Can't execute this Request!!!",status:"bad"},
  ];

  addmessage(index:number){
    this.messages.push(this.message[index]);
    setTimeout(() => {
      this.messages.splice(0,1);
    }, 3000);
  }
  addCustomMessage(message:string,state:number){
    let title:string = "";
    let status:string = "";
    if(state == 0){
      title = "Notification";
      status = "good";
    }
    else{
      title = "Error";
      status = "bad";
    }
    this.messages.push({title:title,detail:message,status:status});
    setTimeout(() => {
      this.messages.splice(0,1);
    }, 3000);
  }
  ngOnInit() {
  }

}
