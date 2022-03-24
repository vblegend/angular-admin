import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, ViewContainerRef } from '@angular/core';
import { AgentComponent } from '../components/agent/agent.component';


export enum AnchorPosition {
    Top = 'top',
    RightTop = 'rTop',
    Right = 'right',
    RightDown = 'rDown',
    Down = 'down',
    LeftDown = 'lDown',
    Left = 'left',
    LeftTop = 'lTop'
}

@Directive({
    selector: '[resizeAnchor]'
})

export class ReSizeAnchorDirective implements OnInit {
    @Input() host: AgentComponent;
    @Input() position: AnchorPosition;
    private element: HTMLElement = null;
    private buttonDown: boolean;
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
            this.disX = ev.clientX;
            this.disY = ev.clientY;
            ev.preventDefault();
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        if (this.buttonDown) {
            // 
            // this.host.config.location.left += (ev.clientX - this.disX) / scale;
            // this.host.config.location.top += (ev.clientY - this.disY) / scale;
            // this.disX = ev.clientX;
            // this.disY = ev.clientY;
            this.onMove(ev);
            ev.preventDefault();
        }
    }

    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown && ev.button === 0) {
            this.buttonDown = false;
            ev.preventDefault();
        }
    }







    private onMove(ev: MouseEvent) {
        const scale = this.host.canvas.viewScale;
        const xLength = (ev.clientX - this.disX) / scale;
        const yLength = (ev.clientY - this.disY) / scale;
        switch (this.position) {
            case AnchorPosition.Left:
                this.host.config.location.left += xLength;
                this.host.config.size.width -= xLength;
                break;
            case AnchorPosition.Top:
                this.host.config.location.top += yLength;
                this.host.config.size.height -= yLength;
                break;
            case AnchorPosition.Right:
                this.host.config.size.width += xLength;
                break;
            case AnchorPosition.Down:
                this.host.config.size.height += yLength;
                break;
        }
        this.disX = ev.clientX;
        this.disY = ev.clientY;
    }










}