export class Order{

    constructor(
        public productOrder:ProductOrder[],
        public user_id:number,
        public customer_name:string,
        public customer_tel:string,
        public customer_address:string,
        public customer_note:string = "",
        public delivery_id:number,
        public total:number,
        public status:string = "NEW_ORDER",
        public note:string = "",
    ){
        this.user_id = user_id
        this.productOrder = productOrder,
        this.customer_name = customer_name;
        this.customer_tel = customer_tel;
        this.customer_address = customer_address;
        this.customer_note = customer_note;
        this.note = note;
        this.status = status,
        this.delivery_id = delivery_id;
        this.total = total;
    }
}


export class ProductOrder{
    constructor(
        public productId:number,
        public size:string,
        public color:string,
        public quantity:number,
    ){
        this.productId = productId,
        this.size = size,
        this.color = color,
        this.quantity = quantity
    }

}