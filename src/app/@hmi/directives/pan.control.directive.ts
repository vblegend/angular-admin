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
        if (ev.button == 2) {
            this.buttonDown = true;
            this.disX = ev.clientX;
            this.disY = ev.clientY;
            this.element.style.cursor = 'grab';
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    @HostListener('document:mousemove@outside', ['$event'])
    public onMouseMove(ev: MouseEvent): void {

        if (this.buttonDown) {
            // this.zone.runOutsideAngular(() => {
                const scrollWidth = this.element.scrollWidth - this.element.clientWidth;
                const scrollHeight = this.element.scrollHeight - this.element.clientHeight;
                let left = -(ev.clientX - this.disX);
                let top = -(ev.clientY - this.disY);
                this.element.scrollLeft += left;
                this.element.scrollTop += top;
                if (left < 0) left = 0;
                if (top < 0) top = 0;
                if (left > scrollWidth) left = scrollWidth;
                if (top > scrollHeight) top = scrollHeight;

                this.disX = ev.clientX;
                this.disY = ev.clientY;
                ev.preventDefault();
            // });
        }
    }

    @HostListener('document:mouseup@outside', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown) {
            this.buttonDown = false;
            this.element.style.cursor = '';
            ev.preventDefault();
        }
    }





}