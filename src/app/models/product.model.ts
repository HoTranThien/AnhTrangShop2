import { Collection, Color, Size } from "./fields.model";


export class Product{
    id?:string;
    name?:string;
    imgProduct?:Img_Porduct[];
    cost?:string;
    sale_cost?:string;
    description?:string;
    quantity?:string;
    isnew?:Boolean;
    collection?:Collection;
    parentCategory?:any;
    childrenCategory?:any;
    productColor?:Color[];
    productSize?:Size[];

}
export class Img_Porduct{
    id?:string;
    link?:string;
}