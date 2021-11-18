import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translator' })
export class TranslatorPipe implements PipeTransform {
    public transform(value: string, length: number, symbol: string): string {
        return value.toString() + '...';
    }
}