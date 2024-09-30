import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpMethodService } from '../../../service/HttpMethod.service';
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
    private myservice: HttpMethodService,
    private route:ActivatedRoute,
    private router:Router,
    private title:Title
  ) { 
    this.title.setTitle("Create new product")
  }
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('message') mymessage!:MessageComponent;
  loading = false;
  initProduct:Product = {
    name:"",
    imgProduct:[],
    cost:undefined,
    sale_cost:undefined,
    description:"",
    quantity:undefined,
    isnew:true,
    collection:undefined,
    parentCategory:null,
    childrenCategory:null,
    productColor:[],
    productSize:[],
  };
  product:Product = this.initProduct;
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
      let url_product = this.myservice.getlink('product/create')
      let formData = new FormData();
      formData.append('name',this.product.name!);
      formData.append('cost',String(this.product.cost!));
      this.product.sale_cost?formData.append('sale_cost',String(this.product.sale_cost!)):formData.append('sale_cost','0');
      formData.append('quantity',String(this.product.quantity!));
      formData.append('description',this.product.description!);
      formData.append('isnew',String(this.product.isnew!));
      formData.append('collectionId',String(this.product.collection?.id!));
      formData.append('parentCategoryId',String(this.product.parentCategory.id!));
      formData.append('childrenCategoryId',String(this.product.childrenCategory.id!));
      
      for(let i=0;i<this.product.productSize!.length;i++){
        formData.append('sizeIds',String(this.product.productSize![i].id));
      }
      for(let i=0;i<this.product.productColor!.length;i++){
        formData.append('colorIds',String(this.product.productColor![i].id));
      }

      for(let i=0; i<this.imgFile!.length;i++){
        formData.append('files',this.imgFile![i]);
      }
      this.loading = true;
      this.myservice.postDataWithImg(url_product,formData).pipe(catchError(error => {
        this.mymessage.addmessage(3);
        this.loading = false;
        return throwError(() => new Error('Something bad happened; please try again later.'));;
      })).subscribe(()=>{
        this.resetAfterSent();
        this.mymessage.addmessage(2);
        this.loading = false;
      })
    }else this.mymessage.addmessage(3);
  }
resetAfterSent(){
  this.product.name = "";
  this.product.imgProduct = [];
  this.product.cost = undefined;
  this.product.sale_cost = undefined;
  this.product.description = "";
  this.product.quantity = undefined;
  this.product.isnew = true;
  this.product.collection = undefined;
  this.product.parentCategory = null;
  this.product.childrenCategory = null;
  this.product.productColor = [];
  this.product.productSize = [];
  this.changedimg = [];
}
getsubcategory(e:any){
  this.product.parentCategory = e;
  this.subcategories = e.childrenCategories;
  this.product.childrenCategory=e.childrenCategories[0];
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
  if(!this.product.parentCategory||this.myservice.isEmptyOrSpaces(this.product.parentCategory.name)){
    this.missInfo.maincategory = true;
    return true;
  }else return false;
}
invalidSubcategory(){
  if(!this.product.childrenCategory||this.myservice.isEmptyOrSpaces(this.product.childrenCategory.name)){
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
  let url_category = this.myservice.getlink('parentcategory/getall');
  let url_size = this.myservice.getlink('size/getall');
  let url_color = this.myservice.getlink('color/getall');
  let url_collection = this.myservice.getlink('collection/getall');
  this.myservice.getData(url_size).subscribe((data:any) => {this.sizedata = data.data;});
  this.myservice.getData(url_color).subscribe((data:any) => {this.colordata = data.data;});
  this.myservice.getData(url_collection).subscribe((data:any)=>this.allCollections = data.data);
  let allCategory:any = await lastValueFrom(this.myservice.getData(url_category));
   this.category = allCategory.data;
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
