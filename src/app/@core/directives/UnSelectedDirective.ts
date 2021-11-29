import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[selectdisable]'
})
export class UnSelectedDirective {

    constructor(private el: ElementRef<HTMLElement>) {
        el.nativeElement.style.userSelect = 'none';
    }
}