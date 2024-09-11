import { Pipe, PipeTransform } from "@angular/core";
import { MyServiceService } from "../../service/my-service.service";


@Pipe({
  name: 'Nosign'
})
export class NosignPipe implements PipeTransform {
  constructor(private myservice:MyServiceService){}
  transform(value: string, args?: any): any {
    return this.myservice.convertToNoSign(value);
  }

}
