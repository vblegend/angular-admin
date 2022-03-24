import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef, NgZone } from '@angular/core';
import { AgentComponent } from '../components/agent/agent.component';
import { CanvasComponent } from '../components/canvas/canvas.component';

// interface MouseEvent {
//     wheelDelta: number;
// }




@Directive({
    selector: '[panViewer]'
})

export class PanViewerDirective {
    @Input() canvas: CanvasComponent;
    private element: HTMLElement = null;
    private buttonDown: boolean;
    private disX: number;
    private disY: number;



    constructor(private el: ElementRef, public viewContainerRef: ViewContainerRef, private zone: NgZone) {
        this.element = this.el.nativeElement;
        this.buttonDown = false;
    }





    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        if (ev.button == 2) {
            this.buttonDown = true;
            this.disX = ev.clientX;
            this.disY = ev.clientY;
            this.element.style.cursor = 'grab';
            ev.preventDefault();
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(ev: MouseEvent): void {

        if (this.buttonDown) {
            this.zone.runOutsideAngular(() => {
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
            });
        }
    }

    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown) {
            this.buttonDown = false;
            this.element.style.cursor = '';
            ev.preventDefault();
        }
    }





}