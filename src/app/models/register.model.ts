export class Register{
    constructor(
        public phoneNumber:string,
        public password:string,
        public fullname:string,
        public email:string,
        public address:string = ""
    ){
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.address = address;
    }
}