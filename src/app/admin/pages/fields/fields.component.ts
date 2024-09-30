import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SingleTableComponent } from '../../share/single-table/single-table.component';
import { MessageComponent } from '../../../share/message/message.component';
import { ColorTableComponent } from '../../share/color-table/color-table.component';
import { CollectionTableComponent } from '../../share/collection-table/collection-table.component';
import { Category, Collection, Color, Delivery, Size, Status } from '../../../models/fields.model';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { DeliveryTableComponent } from '../../share/delivery-table/delivery-table.component';
import { catchError, throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ApiResponse } from '../../../models/ApiResponse.model';
@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit,AfterViewInit {

  constructor( private myservice:HttpMethodService, private title:Title) { 
    this.title.setTitle("Handle Field")
  }
  @ViewChild('message') mymessage!:MessageComponent;
  @ViewChildren('sizedialog') sizedialog!:QueryList<SingleTableComponent>;
  @ViewChild('createsizedialog') createsizedialog!:SingleTableComponent;

  // @ViewChildren('statusdialog') statusdialog!:QueryList<ColorTableComponent>;
  // @ViewChild('createstatusdialog') createstatusdialog!:ColorTableComponent;

  @ViewChildren('deliverydialog') deliverydialog!:QueryList<DeliveryTableComponent>;
  @ViewChild('createdeliverydialog') createdeliverydialog!:DeliveryTableComponent;

  @ViewChildren('collectiondialog') collectiondialog!:QueryList<CollectionTableComponent>;
  @ViewChild('createcollectiondialog') createcollectiondialog!:CollectionTableComponent;

  @ViewChildren('colordialog') colordialog!:QueryList<ColorTableComponent>;
  @ViewChild('createcolordialog') createcolordialog!:ColorTableComponent;
  
  @ViewChildren('mcdialog') mcdialog!:QueryList<SingleTableComponent>;
  @ViewChild('createmcdialog') createmcdialog!:SingleTableComponent;

  loading = false;
  messages:any;
  isdone:boolean = false;

  colors:any;
  sizes:any;
  //statuses:any;
  deliveries:any;
  collections:any;
  categories:any;

  
//  #region Functions for Size
  showSizeDialog(i:number){
    this.sizedialog.toArray()[i].parentvalue = JSON.parse(JSON.stringify(this.sizes[i]));
    this.sizedialog.toArray()[i].showDialog();
    }
  showCreateSizeDialog(){
    this.createsizedialog.parentvalue = {name:undefined};
    this.createsizedialog.showDialog();
    }
  receiveSizeMessage(e:Size,index?:number,id?:number){
    if(index == undefined){
      let url = this.myservice.getlink('size/create');
      this.myservice.postData(url,e).pipe(catchError(error => {
        this.createsizedialog.closeDialog();
        this.mymessage.addmessage(3);
        return throwError(() => new Error('Something bad happened; please try again later.'));;
      })).subscribe(()=>{
          this.getSize();
          this.createsizedialog.closeDialog();
          this.mymessage.addmessage(2);
      })

    }
    else{
      let url = this.myservice.getlink("size/update",id)
      this.myservice.putData(url,e).pipe(catchError(error => {
        this.createsizedialog.closeDialog();
        this.mymessage.addmessage(3);
        return throwError(() => new Error('Something bad happened; please try again later.'));;
      })).subscribe(()=>{
        this.sizedialog.toArray()[index].closeDialog();
        this.mymessage.addmessage(2);
        this.getSize();
      });
    }
  }
  getSize() {
    this.myservice.getData(this.myservice.getlink("size/getall")).subscribe((data: any) => {
      this.sizes = data.data;
    });
  }
  deleteSize(id: number) {
    try{
      this.myservice.deleteData(this.myservice.getlink("size/delete",id)).pipe(catchError(error => {
        this.mymessage.addmessage(3);
        return throwError(() => new Error('Something bad happened; please try again later.'));;
      })).subscribe(()=>{
        this.mymessage.addmessage(2);
        this.getSize();
      })
    }
    catch{
      this.mymessage.addmessage(3);
    }
  }
//  #endregion

// #region Functions for Color
showColorDialog(i:number){
  this.colordialog.toArray()[i].parentvalue = JSON.parse(JSON.stringify(this.colors[i]));
  this.colordialog.toArray()[i].showDialog();
}
showCreateColorDialog(){
  this.createcolordialog.parentvalue = {name:undefined,code:undefined};
  this.createcolordialog.showDialog();
}
receiveColorMessage(e:Color,index?:number,id?:number){
  if(index == undefined){
    let url = this.myservice.getlink('color/create');
    this.myservice.postData(url,e).pipe(catchError(error => {
      this.createcolordialog.closeDialog();
      this.mymessage.addmessage(3);
      return throwError(() => new Error('Something bad happened; please try again later.'));;
    })).subscribe(()=>{
      this.getColor();
      this.createcolordialog.closeDialog();
      this.mymessage.addmessage(2);
    });
  }
  else{
    let url = this.myservice.getlink("color/update",id)
    this.myservice.putData(url,e).pipe(catchError(error => {
      this.colordialog.toArray()[index].closeDialog();
      this.mymessage.addmessage(3);
      return throwError(() => new Error('Something bad happened; please try again later.'));;
    })).subscribe(()=>{
      this.colordialog.toArray()[index].closeDialog();
      this.mymessage.addmessage(2);
      this.getColor();
    });
  }
}
getColor(){
    this.myservice.getData(this.myservice.getlink("color/getall")).subscribe((data:any) => this.colors = data.data)
}
deleteColor(id:number){
  this.myservice.deleteData(this.myservice.getlink("color/delete",id)).pipe(catchError(error => {
    this.mymessage.addmessage(3);
    return throwError(() => new Error('Something bad happened; please try again later.'));;
  })).subscribe(()=>{
    this.mymessage.addmessage(2);
    this.getColor();})
  }

// #region Functions for Delivery
showDeliveryDialog(i:number){
  this.deliverydialog.toArray()[i].parentvalue = JSON.parse(JSON.stringify(this.deliveries[i]));
  this.deliverydialog.toArray()[i].showDialog();
}
showCreateDeliveryDialog(){
  this.createdeliverydialog.parentvalue = {name:undefined,cost:undefined};
  this.createdeliverydialog.showDialog();
}
receiveDeliveryMessage(e:Delivery,index?:number,id?:number){
  if(index == undefined){
    let url = this.myservice.getlink('delivery/create');
    this.myservice.postData(url,e).pipe(catchError(error => {
      this.createdeliverydialog.closeDialog();
      this.mymessage.addmessage(3);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })).subscribe(()=>{
      this.getDelivery();
      this.createdeliverydialog.closeDialog();
      this.mymessage.addmessage(2);
    });
  }
  else{
    let url = this.myservice.getlink("delivery/update",id)
    this.myservice.putData(url,e).pipe(catchError(error => {
      this.deliverydialog.toArray()[index].closeDialog();
      this.mymessage.addmessage(3);
      return throwError(() => new Error('Something bad happened; please try again later.'));;
    })).subscribe(()=>{
      this.deliverydialog.toArray()[index].closeDialog();
      this.mymessage.addmessage(2);
      this.getDelivery();
    });
  }
}
getDelivery(){
    this.myservice.getData(this.myservice.getlink("delivery/getall")).subscribe((data:any) => this.deliveries = data.data)
}
deleteDelivery(id:number){
  this.myservice.deleteData(this.myservice.getlink("delivery/delete",id)).pipe(catchError(error => {
    this.mymessage.addmessage(3);
    return throwError(() => new Error('Something bad happened; please try again later.'));;
  })).subscribe(()=>{
    this.mymessage.addmessage(2);
    this.getDelivery();})
  }

// #endregion

//#region Function for Collection
showCollectionDialog(i:number){
  this.collectiondialog.toArray()[i].parentvalue = JSON.parse(JSON.stringify(this.collections[i]));
  this.collectiondialog.toArray()[i].showDialog();
  }
showCreateCollectionDialog(){
  this.createcollectiondialog.parentvalue = {id:"",name:"",img:"",file:undefined};
  this.createcollectiondialog.showDialog();
  }
receiveCollectionMessage(e:Collection,index?:number,id?:number){
  if(index == undefined){
    let url = this.myservice.getlink('collection/create');
    const formData:FormData = new FormData();
    if(e.name && e.file){
      formData.append('name',e.name);
      formData.append('file',e.file);
    }
    this.myservice.postDataWithImg(url,formData).pipe(catchError(error => {
      this.createcollectiondialog.closeDialog();
      this.mymessage.addmessage(3);
      return throwError(() => new Error('Something bad happened; please try again later.'));;
    })).subscribe(()=>{
      this.getCollection();
      this.createcollectiondialog.closeDialog();
      this.mymessage.addmessage(2);
    });
  }
  else{
    let url = this.myservice.getlink("collection/update",id)
    const formData:FormData = new FormData();
    if(e.name){
      formData.append('name',e.name);
    }
    if(e.file){
      formData.append('file',e.file);
    }
    this.myservice.putData(url,formData).pipe(catchError(error => {
      this.collectiondialog.toArray()[index].closeDialog();
      this.mymessage.addmessage(3);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })).subscribe(()=>{
      this.collectiondialog.toArray()[index].closeDialog();
      this.mymessage.addmessage(2);
      this.getCollection();
    });
  }
}
getCollection(){
  this.myservice.getData(this.myservice.getlink("collection/getall")).subscribe((data:any) => this.collections = data.data)
}
deleteCollection(id:number){
  this.myservice.deleteData(this.myservice.getlink("collection/delete",id)).pipe(catchError(error => {
    this.mymessage.addmessage(3);
    return throwError(() => new Error('Something bad happened; please try again later.'));;
  })).subscribe(()=>{
    this.mymessage.addmessage(2);
    this.getCollection();
  })

}
//#endregion

//#region Function for Category
showCreateMCDialog(){
  this.createmcdialog.parentvalue = {name:undefined};
  this.createmcdialog.showDialog();
  }
receiveMCMessage(e:Category,index?:number,id?:number){
  if(index == undefined){
    let url = this.myservice.getlink('parentcategory/create');
    this.myservice.postData(url,e).pipe(catchError(error => {
      this.createmcdialog.closeDialog();
      this.mymessage.addmessage(3);
      return throwError(() => new Error('Something bad happened; please try again later.'));;
    })).subscribe(()=>{
        this.getAllCategories();
        this.createmcdialog.closeDialog();
        this.mymessage.addmessage(2);
    })

  }
  else{
    let url = this.myservice.getlink("parentcategory/update",id)
    this.myservice.putData(url,e).pipe(catchError(error => {
      this.mcdialog.toArray()[index].closeDialog();
      this.mymessage.addmessage(3);
      return throwError(() => new Error('Something bad happened; please try again later.'));;
    })).subscribe(()=>{
      this.mcdialog.toArray()[index].closeDialog();
      this.mymessage.addmessage(2);
      this.getAllCategories();
    });
  }
}
getAllCategories(){
  this.myservice.getData(this.myservice.getlink("parentcategory/getall")).subscribe((data:any) => {
    this.categories = data.data;
    this.loading = false;
  })
}
receiveCategoryMessage(e:boolean){
  if(e){
    this.mymessage.addmessage(2);
    this.getAllCategories()
  }
  else{
    this.mymessage.addmessage(3);
  }
}
//#endregion

  ngOnInit() {
    this.loading = true;
    this.getSize();
    this.getColor();
    this.getCollection();
    //this.getStatus();
    this.getDelivery();
    this.getCollection();
    this.getAllCategories();
  }
  ngAfterViewInit(): void {

  }
}
