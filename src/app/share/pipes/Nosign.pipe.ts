import { Pipe, PipeTransform } from "@angular/core";
import { HttpMethodService } from "../../service/HttpMethod.service";


@Pipe({
  name: 'Nosign'
})
export class NosignPipe implements PipeTransform {
  constructor(private myservice:HttpMethodService){}
  transform(value: string, args?: any): any {
    return this.myservice.convertToNoSign(value);
  }

}
