import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef } from '@angular/core';
import { AgentComponent } from '../components/agent/agent.component';

@Directive({
    selector: '[selectRectangle]'
})

export class SelectRectangleDirective implements OnInit {
    @Input() host: AgentComponent;
    private element: HTMLElement = null;
    private buttonDown = false;
    private disX: number;
    private disY: number;


    constructor(private el: ElementRef, public viewContainerRef: ViewContainerRef) {
        this.element = this.el.nativeElement;
    }

    public ngOnInit(): void {

    }


    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        if (ev.button === 0) {
            this.buttonDown = true;
            this.element.style.cursor = 'crosshair';
            // this.disX = ev.clientX;
            // this.disY = ev.clientY;
            ev.preventDefault();
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        if (this.buttonDown) {

            ev.preventDefault();
        }
    }

    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown && ev.button === 0) {
            this.element.style.cursor = '';
            this.buttonDown = false;
            ev.preventDefault();
        }
    }

}