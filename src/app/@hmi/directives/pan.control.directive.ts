import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef, NgZone, Injector } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { DisignerCanvasComponent } from '@hmi/components/disigner-canvas/disigner.canvas.component';



@Directive({
    selector: '[pan-control]'
})

export class PanControlDirective extends BaseDirective {
    @Input() canvas: DisignerCanvasComponent;
 
    
    private buttonDown: boolean;
    private disX: number;
    private disY: number;

    constructor(protected injector: Injector) {
        super(injector);
        this.buttonDown = false;
    }





    @HostListener('mousedown@outside', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        this.canvas.ignoreContextMenu = false;
        if (ev.buttons == 1) {
            this.buttonDown = true;
            this.disX = ev.clientX;
            this.disY = ev.clientY;
            ev.stopPropagation();
            ev.preventDefault();
        }
    }

    @HostListener('document:mousemove@outside', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        if (this.buttonDown) {
            this.canvas.ignoreContextMenu = true;
            const scrollWidth = this.element.parentElement.scrollWidth - this.element.parentElement.clientWidth;
            const scrollHeight = this.element.parentElement.scrollHeight - this.element.parentElement.clientHeight;
            let left = -(ev.clientX - this.disX);
            let top = -(ev.clientY - this.disY);
            this.element.parentElement.scrollLeft += left;
            this.element.parentElement.scrollTop += top;
            if (left < 0) left = 0;
            if (top < 0) top = 0;
            if (left > scrollWidth) left = scrollWidth;
            if (top > scrollHeight) top = scrollHeight;
            this.disX = ev.clientX;
            this.disY = ev.clientY;
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    @HostListener('document:mouseup@outside', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown) {
            this.buttonDown = false;
            ev.preventDefault();
            ev.stopPropagation();
        }
    }





}