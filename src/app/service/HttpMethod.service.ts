import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { SearchComponent } from '../user/pages/search/search.component';
import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class HttpMethodService {

constructor(private http:HttpClient) { }
//HOST
//HOST:string = "http://localhost:8080/api/v1";
//HOST:string = "https://anhtrangshopapi.onrender.com";
HOST:string = "https://anhtrangapi.onrender.com/api/v1";

getlink(link:string,id?:number){
  if(id)return this.HOST + "/" + link + "/" + id;
  else return this.HOST + "/" + link;
  
}
//Post data
postData(url: string,body:any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http.post(url,body,{headers});
}
postDataWithImg(url: string,body:any){
  return this.http.post(url,body);
}
//Get data
getData(url: string){
  return this.http.get(url);
}
getDataWithPageRequest(url:string, page:number,limit:number){
  let params = new HttpParams().set("page",page).set("limit",limit);
  return this.http.get(url,{params});
}
//Update data
putData(url: string,body:any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http.put(url,body);
}
putDataWithImg(url: string,body:any){
  return this.http.put(url,body);
}
//Delete data
deleteData(url: string){
  return this.http.delete(url);
}

//convert a string with signs to no sign
removeDiacritics(str:string) {
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ' ');
  str = str.normalize('NFD').replace(/[()]/g, '');
  return str.replaceAll(' ', '-');
}

convertToNoSign(str:string) {
  const withSigns = 'àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ';
  const withoutSigns = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeediiiiiooooooooooooooooouuuuuuuuuuuyyyyy';
  str = str.toLowerCase();
  let result = '';
  for (let i = 0; i < str.length; i++) {
      const index = withSigns.indexOf(str[i]);
      result += index !== -1 ? withoutSigns[index] : str[i];
  }
  
  return this.removeDiacritics(result);
}

//check  string
isEmptyOrSpaces(str?:string|number){
  if(!str) return true;
  else return str === null ||str.toString().match(/^ *$/) !== null
}

}
