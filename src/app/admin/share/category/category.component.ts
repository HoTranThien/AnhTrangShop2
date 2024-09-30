import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { SingleTableComponent } from '../single-table/single-table.component';
import { Category } from '../../../models/fields.model';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private myservice:HttpMethodService) { }
  @Input() category:any;
  @Output() sendmessagetoparent = new EventEmitter();
  @ViewChild('mcdialog') mcdialog!:SingleTableComponent;
  @ViewChild('createmcdialog') createmcdialog!:SingleTableComponent;
  @ViewChildren('scdialog') scdialog!:QueryList<SingleTableComponent>;
  @ViewChild('createscdialog') createscdialog!:SingleTableComponent;

  //  #region Functions for Parent Category
showMCDialog(){
  this.mcdialog.parentvalue.name = JSON.parse(JSON.stringify(this.category.name));
  this.mcdialog.showDialog();
  }

  receiveMCMessage(e:Category,id:number){
    let url = this.myservice.getlink("parentcategory/update",id)
    this.myservice.putData(url,e).pipe(catchError(error => {
      this.mcdialog.closeDialog();
      this.sendmessagetoparent.emit(false);
      return throwError(() => new Error('Something bad happened; please try again later.'));;
    })).subscribe(()=>{
      this.mcdialog.closeDialog();
      this.sendmessagetoparent.emit(true);
    });
  }

deleteMC(id:number){
  try{
    this.myservice.deleteData(this.myservice.getlink("parentcategory/delete",id)).pipe(catchError(error => {
      this.sendmessagetoparent.emit(false);
      return throwError(() => new Error('Something bad happened; please try again later.'));;
    })).subscribe(()=>{
      this.sendmessagetoparent.emit(true);
    })
  }
  catch{

  }
}
//  #endregion

//  #region Functions for Children Category
showSCDialog(index:number){
  this.scdialog.toArray()[index].parentvalue.name = JSON.parse(JSON.stringify(this.category.childrenCategories[index].name));
  this.scdialog.toArray()[index].showDialog();
  }
  showCreateSCDialog(){
  this.createscdialog.parentvalue = {name:undefined};
  this.createscdialog.showDialog();
  }
receiveSCMessage(e:Category,id?:number,index?:number){
  if(id==undefined || index == undefined){
    let url = this.myservice.getlink('childrencategory/create');
    e.pacaId = this.category.id.toString();
    this.myservice.postData(url,e).pipe(catchError(error => {
      this.createscdialog.closeDialog();
      this.sendmessagetoparent.emit(false);
      return throwError(() => new Error('Something bad happened; please try again later.'));;
    })).subscribe(()=>{
        this.createscdialog.closeDialog();
        this.sendmessagetoparent.emit(true);
    })

  }
  else{
    let url = this.myservice.getlink("childrencategory/update",id)
    e.pacaId = JSON.parse(JSON.stringify(this.category.id)).toString();
    this.myservice.putData(url,e).pipe(catchError(error => {
      this.scdialog.toArray()[index].closeDialog();
      this.sendmessagetoparent.emit(false);
      return throwError(() => new Error('Something bad happened; please try again later.'));;
    })).subscribe(()=>{
      this.scdialog.toArray()[index].closeDialog();
      this.sendmessagetoparent.emit(true);
    });
  }
}

deleteSC(id:number){
  this.myservice.deleteData(this.myservice.getlink("childrencategory/delete",id)).pipe(catchError(error => {
    this.sendmessagetoparent.emit(false);
    return throwError(() => new Error('Something bad happened; please try again later.'));;
  })).subscribe(()=>{
    this.sendmessagetoparent.emit(true);
  })
}
//  #endregion

  ngOnInit() {
  }

}
