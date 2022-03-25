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






    /**
     * 移动 这里仅做了四个方向的移动 而且没有做数据溢出检测
     * @param ev 
     * @returns 
     */
    private onMove(ev: MouseEvent) {
        const scale = this.host.canvas.zoomScale;
        const xLength = (ev.clientX - this.disX) / scale;
        const yLength = (ev.clientY - this.disY) / scale;
        if(Number.isNaN(xLength)) return;
        if(Number.isNaN(yLength)) return;
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