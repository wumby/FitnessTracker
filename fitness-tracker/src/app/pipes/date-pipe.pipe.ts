import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: any,val:any): unknown {
    console.log(value,val);
    
    var a = new Date(value.seconds * 1000).toLocaleDateString("en-US")

    return a;

  }

}
