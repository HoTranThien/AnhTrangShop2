import { Collection, Color, Size } from "./fields.model";


export class Product{
    id?:string;
    name?:string;
    img_product?:Img_Porduct[];
    cost?:string;
    sale_cost?:string;
    description?:string;
    quantity?:string;
    new?:Boolean;
    collection?:Collection;
    parent_category?:any;
    children_category?:any;
    productColor?:Color[];
    productSize?:Size[];

}
export class Img_Porduct{
    id?:string;
    link?:string;
}