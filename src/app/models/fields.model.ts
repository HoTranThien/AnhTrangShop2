import { Image } from "primeng/image";
import { Product } from "./product.model";

export class Size{
    name?:string;
    id?:string;
}
export class Color{
    name?:string;
    code?:string;
    id?:string;
}
export class Delivery{
    name?:string;
    cost?:string;
    id?:string;
}
export class Collection{
    name?:string;
    file?:File;
    img?:string;
    id?:string;
    product?:Product[]
}
export class Category{
    name?:string;
    pacaId?:string;
    id?:string;
}

export class Status{
    status:string[] = []
    
}