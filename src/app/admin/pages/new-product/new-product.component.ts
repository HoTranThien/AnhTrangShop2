import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MyServiceService } from '../../../service/my-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { MessageComponent } from '../../../share/message/message.component';
import { catchError, lastValueFrom, throwError,} from 'rxjs';
import { SpinerComponent } from '../../../share/spiner/spiner.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  constructor(
    private myservice: MyServiceService,
    private route:ActivatedRoute,
    private router:Router,
    private title:Title
  ) { 
    this.title.setTitle("Create new product")
  }
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('message') mymessage!:MessageComponent;
  loading = false;
  product:Product = {
    name:"",
    img_product:[],
    cost:undefined,
    sale_cost:undefined,
    description:"",
    quantity:undefined,
    new:true,
    collection:undefined,
    parent_category:null,
    children_category:null,
    productColor:[],
    productSize:[],
  };

  changedimg?:string[] = [];
  imgFile?:string[] = [];
  imgs:any;

  maincategory?:any;
  category:any;
  subcategories?:any;
  sizedata:any;
  colordata:any;
  allCollections!:any;

  missInfo = {name:false,img:false,cost:false,quantity:false,collection:false,
              maincategory:false,subcategory:false,size:false,color:false,des:false}

  async create(){
    if(this.CheckForReadyToSend()){
      let url_product = this.myservice.getlink('api/product/create')
      let formData = new FormData();
      formData.append('name',this.product.name!);
      formData.append('cost',String(this.product.cost!));
      this.product.sale_cost?formData.append('sale_cost',String(this.product.sale_cost!)):formData.append('sale_cost','0');
      formData.append('quantity',String(this.product.quantity!));
      formData.append('description',this.product.description!);
      formData.append('new',String(this.product.new!));
      formData.append('collectionId',String(this.product.collection?.id!));
      formData.append('parent_categoryId',String(this.product.parent_category.id!));
      formData.append('children_categoryId',String(this.product.children_category.id!));
      
      for(let i=0;i<this.product.productSize!.length;i++){
        formData.append('sizeId',String(this.product.productSize![i].id));
      }
      for(let i=0;i<this.product.productColor!.length;i++){
        formData.append('colorId',String(this.product.productColor![i].id));
      }

      for(let i=0; i<this.imgFile!.length;i++){
        formData.append('imgs',this.imgFile![i]);
      }
      this.loading = true;
      this.myservice.postDataWithImg(url_product,formData).pipe(catchError(error => {
        this.mymessage.addmessage(3);
        this.loading = false;
        return throwError(() => new Error('Something bad happened; please try again later.'));;
      })).subscribe(()=>{this.mymessage.addmessage(2),this.loading = false})
    }else this.mymessage.addmessage(3);
  }

getsubcategory(e:any){
  this.product.parent_category = e;
  this.subcategories = e.children_category;
  this.product.children_category=e.children_category[0];
}

//#region Function for Img{

openFileDialog(){
    this.fileInput.nativeElement.click();
  }
onFileSelected(input:any){
    if (input.target.files && input.target.files[0]) {
        for(let i = 0; i<input.target.files.length;i++){
          this.imgFile?.push(input.target.files[i]);
            var reader = new FileReader();
            reader.onload = (e:any) => {
              this.changedimg?.push(e.target?.result);
            };
            reader.readAsDataURL(input.target.files[i]);
        }
    }
}
deleteImg(i:number){
  this.changedimg?.splice(i,1);
  this.imgFile?.splice(i,1);
}
//#endregion

//#region check invalid
invalidName(){
  if(this.myservice.isEmptyOrSpaces(this.product.name)){
    this.missInfo.name = true;
    return true;
  }else return false;
}
invalidImg(){
  if(this.changedimg&&this.changedimg?.length>0)return false;
  else{
    this.missInfo.img = true;
    return true;
  }
}
invalidCost(){
  if(this.myservice.isEmptyOrSpaces(this.product.cost)){
    this.missInfo.cost = true;
    return true;
  }else return false;
}
invalidQuantity(){
  if(this.myservice.isEmptyOrSpaces(this.product.quantity)){
    this.missInfo.quantity = true;
    return true;
  }else return false;
}
invalidCollection(){
  if(!this.product.collection||this.myservice.isEmptyOrSpaces(this.product.collection?.name)){
    this.missInfo.collection = true;
    return true;
  }else return false;
}
invalidMaincategory(){
  if(!this.product.parent_category||this.myservice.isEmptyOrSpaces(this.product.parent_category.name)){
    this.missInfo.maincategory = true;
    return true;
  }else return false;
}
invalidSubcategory(){
  if(!this.product.children_category||this.myservice.isEmptyOrSpaces(this.product.children_category.name)){
    this.missInfo.subcategory = true;
    return true;
  }else return false;
}
invalidDes(){
  if(this.myservice.isEmptyOrSpaces(this.product.description)){
    this.missInfo.des = true;
    return true;
  }else return false;
}
invalidSize(){
  if(!this.product.productSize||this.product.productSize.length>0) return false;
  else{
    this.missInfo.size = true;
  } return true;
}
invalidColor(){
  if(!this.product.productColor||this.product.productColor.length>0) return false;
  else{
    this.missInfo.color = true;
  } return true;
}
CheckForReadyToSend(){
  if (this.invalidName()||this.invalidCollection()||this.invalidColor()||this.invalidCost()
    ||this.invalidDes()||this.invalidMaincategory()||this.invalidQuantity()
  ||this.invalidSize()||this.invalidSubcategory()
  // ||this.invalidImg()
) return false;
  else return true;
}
//#endregion

async getfeilds(){
  let url_category = this.myservice.getlink('api/parent_category/getallwithchildren');
  let url_size = this.myservice.getlink('api/size/getall');
  let url_color = this.myservice.getlink('api/color/getall');
  let url_collection = this.myservice.getlink('api/collection/getall');
  this.myservice.getData(url_size).subscribe(data => {this.sizedata = data;});
  this.myservice.getData(url_color).subscribe(data => {this.colordata = data;});
  this.myservice.getData(url_collection).subscribe(data=>this.allCollections = data);
  this.category = await lastValueFrom(this.myservice.getData(url_category));
}
mydata:any;
  ngOnInit() {
    this.getfeilds();
    
    

    // this.myservice.getData(this.product_url).subscribe(data => {
    //   this.product = data;
    //   this.isnew = this.product.new;
    //   this.name = this.product.name;
    //   this.collection = this.product.collection
    //   this.quantity = this.product.quantity;
    //   this.cost = this.product.cost;
    //   this.sale = this.product.sale_cost;
    //   this.maincategory = this.product.parent_category;
    //   this.sizes = this.product.productSize;
    //   this.subcategory = this.product.children_category;
    //   this.colors = this.product.productColor;
    //   this.imgs = this.product.img_product;
    //   this.description = this.product.description;
    // });
  }

}
