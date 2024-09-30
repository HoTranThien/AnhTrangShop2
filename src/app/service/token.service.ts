import { Injectable } from '@angular/core';
import { HttpMethodService } from './HttpMethod.service';
import { BehaviorSubject, catchError, lastValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

constructor(private httpMethod:HttpMethodService) { 
}
private TOKEN:string = "token";
private NAME:string = "name";
  getToken():String|null{
    return localStorage.getItem(this.TOKEN);
  }
  setToken(token:string){
    localStorage.setItem(this.TOKEN,token);
    let url = this.httpMethod.getlink("user/getusername");
    let name:string|null = null;
    this.httpMethod.postData(url,token).subscribe((data:any)=> {
      name = data.data;
      if(name != null) {
        localStorage.setItem(this.NAME,name);
        this.setUserName(name);
      }
    });
    
  }
  removeToken(){
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.NAME);
    // localStorage.removeItem("search");
    // localStorage.removeItem("badge");
    // localStorage.removeItem("MyProduct");
    this.setUserName(null);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if(token){
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    else return true;
  }
  getUserId():number{
    const token = this.getToken();
    if(token!=null) return (JSON.parse(atob(token.split('.')[1]))).userId;
    return 0;
  }
  async getRole():Promise<string>{
    let url = this.httpMethod.getlink("user/getrole");
    let role:string = "";
    try{
      let result:any = await lastValueFrom(this.httpMethod.postData(url,this.getToken()));
      role = result.data;
    }
    catch{
    }
    return role;
  }
//get Username from token
public userName = new BehaviorSubject<string|null>(null);
getUserName = this.userName.asObservable();
setUserName(data: string|null) {
  this.userName.next(data);
}
}
