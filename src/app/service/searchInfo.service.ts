import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchInfoService {

constructor() { }
  SearchInfo = new BehaviorSubject("");
  GetSearchInfo = this.SearchInfo.asObservable();
  SendInfo(info:string){
    if(info){
      this.SearchInfo.next(info);
    }
  }
}
