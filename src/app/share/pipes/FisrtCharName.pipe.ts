import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FisrtCharName'
})
export class FisrtCharNamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let arr:string[] = value.split(" ");
    return arr.length >1 ? arr[0][0].toUpperCase() + arr[arr.length-1][0].toUpperCase() : arr[0][0].toUpperCase();
  }

}
