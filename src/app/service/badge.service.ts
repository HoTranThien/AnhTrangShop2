import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

constructor() { }
public data = new BehaviorSubject<number>(0);
getdata = this.data.asObservable();

setdata(data: number) {
  if(data>=0)
  {
    this.data.next(data);
  }
}
IncreaseOne(){
  this.data.next(this.data.getValue() +1)
}
}
