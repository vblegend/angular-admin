import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[hitHover]'
})
export class HoverDirective {
    @Input('hitHover') color: string = '#007ACC';
    @Input() cursor: string = null;

    private isHover: boolean;
    private _oldColor: string;
    private _oldCursor: string;
    constructor(private el: ElementRef) {
        this.isHover = false;
    }

    @HostListener('mouseenter')
    public onMouseEnter(): void {
        if (!this.isHover) {
            this.isHover = true;
            this._oldCursor = this.el.nativeElement.style.cursor;
            this._oldColor = this.el.nativeElement.style.color;
            this.el.nativeElement.style.color = this.color;
            if (this.cursor) this.el.nativeElement.style.cursor = this.cursor;
        }
    }


    @HostListener('mouseleave')
    public onMouseLeave(): void {
        if (this.isHover) {
            this.isHover = false;
            this.el.nativeElement.style.color = this._oldColor;
            if (this.cursor) this.el.nativeElement.style.cursor = this._oldCursor;
            this._oldColor = null;
        }
    }

}