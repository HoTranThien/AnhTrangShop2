import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Img_Porduct, Product } from '../../../models/product.model';
import { MessageComponent } from '../../../share/message/message.component';
import { catchError, concatMapTo, lastValueFrom, map, of, switchMap, throwError,} from 'rxjs';
import { SpinerComponent } from '../../../share/spiner/spiner.component';
import { Category } from '../../../models/fields.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    
  constructor(
    private myservice: HttpMethodService,
    private route:ActivatedRoute,
    private router:Router,
    private title:Title,
  ) { }
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('message') mymessage!:MessageComponent;
  loading = false;
  firstdata?:Product;
  product:Product = {
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

  changedimg?:string[] = [];
  newImgFiles?:string[] = [];
  removedImgs:Img_Porduct[] = [];
  maincategory:Category={name:"",id:""};
  subcategory:Category={name:"",id:"",pacaId:""};
  category:any;
  subcategories:Category[]=[{name:"Subcategory",id:"",pacaId:""}];
  sizedata:any;
  colordata:any;
  allCollections!:any;

  isreadonly:boolean = true;
  iscreate:boolean =false;
  missInfo = {name:false,img:false,cost:false,quantity:false,collection:false,
              maincategory:false,subcategory:false,size:false,color:false,des:false}
  edit(){
    this.isreadonly = false;
  }
  save(){
    this.isreadonly = true;
    this.CheckForReadyToSend();
    this.updateProduct()
  }
  cancel(){
    this.setData();
  }
  updateProduct(){
    if(this.CheckForReadyToSend()){
      let url_product = this.myservice.getlink('product/update',Number(this.product.id))
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

      for(let i=0; i<this.newImgFiles!.length;i++){
        formData.append('files',this.newImgFiles![i]);
      }
      
      if(this.removedImgs.length>0){
        for(let i=0; i<this.removedImgs!.length;i++){
          formData.append('removedImgs',JSON.stringify(this.removedImgs[i].id));
        }
        
      }
      else{
        formData.append('removedImgs',JSON.stringify(0));
      }


      this.loading = true;
      this.myservice.putDataWithImg(url_product,formData).pipe(catchError(error => {
        this.mymessage.addmessage(3);
        this.loading = false;
        return throwError(() => new Error('Something bad happened; please try again later.'));;
      })).subscribe(()=>{
        this.mymessage.addmessage(2);
        this.loading = false;
        location.reload();
      })
    }else this.mymessage.addmessage(3);
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
          this.newImgFiles?.push(input.target.files[i]);
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
  this.newImgFiles?.splice(i,1);
}
deleteImgInCloudinary(i:number){
  if(this.product.imgProduct)this.removedImgs.push(this.product.imgProduct[i]);
  this.product.imgProduct?.splice(i,1);
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
setData(){
  this.changedimg = [];
  this.removedImgs = [];
  this.newImgFiles = [];
  this.isreadonly = true;
  this.product = JSON.parse(JSON.stringify(this.firstdata));
    // this.product.productColor = this.product.productColor?.map((cid:any)=>{
    //   return this.colordata.find((d:any) =>{return d.id == cid.colorId})
    // });
    // this.product.productSize = this.product.productSize?.map((sid:any)=>{
    //   return this.sizedata.find((d:any)=>{return d.id == sid.sizeId})
    // });
    this.maincategory = this.product.parentCategory;
    this.subcategories = this.category.find((data:any)=>{return data.id == this.product.parentCategory.id}).childrenCategories;
    this.subcategory = this.product.childrenCategory.name;
    this.title.setTitle(`Product detail: ${this.product.name||""}`)
}
async ReadData(){
    let data:any = await lastValueFrom(this.myservice.getData(this.myservice.getlink('product/getone',history.state.id)));
    this.firstdata = data.data;
    this.setData();
    this.loading = false;
}
getfeilds(){
  let url_category = this.myservice.getlink('parentcategory/getall');
  let url_size = this.myservice.getlink('size/getall');
  let url_color = this.myservice.getlink('color/getall');
  let url_collection = this.myservice.getlink('collection/getall');
  this.myservice.getData(url_size).subscribe((data:any) => {this.sizedata = data.data;});
  this.myservice.getData(url_color).subscribe((data:any) => {this.colordata = data.data;});
  this.myservice.getData(url_collection).subscribe((data:any)=>this.allCollections = data.data);

  return this.myservice.getData(url_category).pipe(
    switchMap((data:any)=>{
      this.category = data.data;
      return of(data.data)
    })
  )
  
  //return this.category;
}
mydata:any;
  ngOnInit() {
    this.loading = true;
    this.getfeilds().subscribe(()=>this.ReadData());
    
    
  }
}
