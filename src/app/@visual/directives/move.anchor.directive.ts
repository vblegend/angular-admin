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
            const scale = this.host.canvas.viewScale;
            this.host.config.location.left += (ev.clientX - this.disX) / scale;
            this.host.config.location.top += (ev.clientY - this.disY) / scale;
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