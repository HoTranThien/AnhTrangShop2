import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Message } from 'primeng/api';
import { MessageComponent } from '../../../share/message/message.component';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { LogIn } from '../../../models/login.model';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../../../service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private title:Title,
    private httpMethodService: HttpMethodService,
    private tokenService:TokenService,
    private router:Router
  ) { 
    this.title.setTitle("Đăng Nhập");
  }
  @ViewChild('message') mymessage!:MessageComponent;
  logInForm: FormGroup = new FormGroup({
    phoneNumber : new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required),
  });
  logIn(){
    if(this.logInForm.valid){
      let url = this.httpMethodService.getlink("user/login");
      const data = new LogIn(this.logInForm.value.phoneNumber,this.logInForm.value.password);
      this.httpMethodService.postData(url,data).pipe(catchError((error:any) => {
        this.mymessage.addCustomMessage(error.error.message,1);
        return throwError(() => new Error('Something bad happened; please try again later.'));;
      })).subscribe((data:any)=>{
        this.tokenService.setToken(data.data);
        this.router.navigateByUrl("home");
      })
    }
  }
  ngOnInit() {

  }

}
