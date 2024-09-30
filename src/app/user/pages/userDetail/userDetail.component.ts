import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageComponent } from '../../../share/message/message.component';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../../../service/token.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-userDetail',
  templateUrl: './userDetail.component.html',
  styleUrls: ['./userDetail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(
    private router:Router,
    private myservice:HttpMethodService,
    private title:Title,
    private tokenService:TokenService,
  ) {
    this.title.setTitle(`Order detail`)
   }

   @ViewChild('message') mymessage!:MessageComponent;
   isreadonly = true;
   currentNavigation:string = "";
   User: FormGroup = new FormGroup({
    phoneNumber : new FormControl(null,Validators.required),
    email: new FormControl(null,Validators.required),
    password:new FormControl(null),
    recheckPassword: new FormControl(null),
    fullname: new FormControl(null,Validators.required),
    address: new FormControl(null),
  });
  userDetail:any = {};
  orders:any = [];
  isSuccess = false;

  edit(){
    this.isreadonly = false;
  }
  save(){
    if(this.User.valid){
      if(this.User.get("password")?.value!==this.User.get("recheckPassword")?.value){
        this.mymessage.addCustomMessage("Recheck passawork fails",1);
        return;
      }
      this.isreadonly = true;
      let url = this.myservice.getlink('user/update',this.userDetail.id);
      this.myservice.putData(url,this.User.value).pipe(catchError(error => {
        this.mymessage.addCustomMessage(JSON.stringify(error.error.message),1);
        this.isreadonly = false;
        return throwError(() => new Error('Something bad happened; please try again later.'));;
      })).subscribe(()=>{
        this.mymessage.addmessage(2);
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
    this.User.setValue({
      phoneNumber:this.userDetail.phoneNumber,
      password: "",
      recheckPassword:"",
      email: this.userDetail.email,
      fullname: this.userDetail.fullname,
      address:this.userDetail.address,
    });
  }
  getData(){
    let link = this.router.url;
    this.currentNavigation = (link!=null)? link:"home";
    let userDetail_url = this.myservice.getlink('user/getuserdetail');
    this.myservice.postData(userDetail_url,this.tokenService.getToken()).subscribe((data:any)=>{
      this.userDetail = data.data;
      this.setFirstValue();
    })
    let userOrder_url = this.myservice.getlink('user/getorders');
    this.myservice.postData(userOrder_url,this.tokenService.getToken()).subscribe((data:any) => {
      this.orders = data.data;
      console.log(data.data)
    })
  }
  ngOnInit() {
    this.getData();
  }

}
