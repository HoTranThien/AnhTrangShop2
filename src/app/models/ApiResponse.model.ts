export interface ApiResponse<T>{
    message:String;
    status:String;
    data:T;
}