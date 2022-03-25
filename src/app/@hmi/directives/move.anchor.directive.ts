import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef } from '@angular/core';
import { AgentComponent } from '../components/agent/agent.component';

@Directive({
    selector: '[moveAnchor]'
})

export class MoveAnchorDirective implements OnInit {
    @Input() host: AgentComponent;
    @Output() mouseEnter = new EventEmitter<boolean>();
    private element: HTMLElement = null;
    private buttonDown = false;
    private disX: number;
    private disY: number;


    constructor(private el: ElementRef, public viewContainerRef: ViewContainerRef) {
        this.element = this.el.nativeElement;
    }

    public ngOnInit(): void {

    }

    @HostListener('mouseenter')
    public onMouseEnter(): void {
        this.mouseEnter.emit(true);
    }

    @HostListener('mouseleave')
    public onMouseLeave(): void {
        this.mouseEnter.emit(false);
    }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        if (ev.button === 0) {
            this.buttonDown = true;
            this.element.style.cursor = 'move';
            this.disX = ev.clientX;
            this.disY = ev.clientY;
            ev.preventDefault();
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        if (this.buttonDown) {
            const scale = this.host.canvas.zoomScale;
            let distanceX = (ev.clientX - this.disX) / scale;
            let distanceY = (ev.clientY - this.disY) / scale;
            if (Number.isNaN(distanceX) || Number.isNaN(distanceY) || (distanceX === 0 && distanceY === 0)) {
                ev.preventDefault();
                return;
            }
            let DestX = this.host.config.location.left + distanceX;
            let DestY = this.host.config.location.top + distanceY;
            if (DestX < 0) DestX = 0;
            if (DestY < 0) DestY = 0;
            this.host.config.location.left = DestX;
            this.host.config.location.top = DestY;
            this.disX = ev.clientX;
            this.disY = ev.clientY;
            ev.preventDefault();
        }
    }

    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown && ev.button === 0) {
            this.element.style.cursor = 'grab';
            this.buttonDown = false;
            ev.preventDefault();
        }
    }

}