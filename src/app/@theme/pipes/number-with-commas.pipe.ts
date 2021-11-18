import { Pipe, PipeTransform } from '@angular/core';


/**
 * 带逗号的数字处理
 */
@Pipe({ name: 'ngxNumberWithCommas' })
export class NumberWithCommasPipe implements PipeTransform {

  transform(input: number): string {
    return new Intl.NumberFormat().format(input);
  }
}
