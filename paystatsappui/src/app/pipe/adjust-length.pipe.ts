import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adjustLength'
})
export class AdjustLengthPipe implements PipeTransform {

  transform(value: string, maxlength: number): string {
    if (value.length > maxlength)
      value = value.substr(0, maxlength - 3) + "...";
    return value;
  }

}
