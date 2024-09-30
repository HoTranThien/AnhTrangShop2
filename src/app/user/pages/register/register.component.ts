import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { TokenService } from '../../../service/token.service';
import { Register } from '../../../models/register.model';
import { catchError, throwError } from 'rxjs';
import { MessageComponent } from '../../../share/message/message.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private title:Title,
    private httpMethodService: HttpMethodService,
    private tokenService:TokenService,
    private router:Router
  ) { 
    this.title.setTitle("Đăng Kí");
  }
  @ViewChild('message') mymessage!:MessageComponent;

  registerForm: FormGroup = new FormGroup({
    phoneNumber : new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required),
    recheckPassword: new FormControl(null,Validators.required),
    fullname: new FormControl(null,Validators.required),
    email: new FormControl(null,Validators.required),
    address: new FormControl(null)
  });
  register(){
    if(this.registerForm.valid){
      if(this.registerForm.get("password")?.value !== this.registerForm.get("recheckPassword")?.value)
      {
        this.mymessage.addCustomMessage("Recheck password fails",1);
        return;
      }
      let url = this.httpMethodService.getlink("user/register");
      const data = new Register(
        this.registerForm.value.phoneNumber,
        this.registerForm.value.password,
        this.registerForm.value.fullname,
        this.registerForm.value.email
      );
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
