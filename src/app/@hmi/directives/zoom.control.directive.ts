import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef, Injector } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { DisignerCanvasComponent } from '@hmi/components/disigner-canvas/disigner.canvas.component';
import { Vector2 } from '@hmi/core/common';

@Directive({
    selector: '[zoom-control]'
})
/**
 * 编辑器的缩放指令
 * 实现了鼠标滚轮的缩放功能。
 */
export class ZoomControlDirective extends BaseDirective {
    // @Input() editor: EditorComponent;
    @Output() mouseEnter = new EventEmitter<boolean>();
    private readonly scales: number[] = [0.1, 0.2, 0.5, 0.8, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    private index!: number;

    /**
     *
     */
    constructor(protected injector: Injector, private canvas: DisignerCanvasComponent) {
        super(injector);
    }

    public onInit(): void {
        this.index = this.scales.indexOf(1);
    }


    @HostListener('mousewheel', ['$event'])
    public onMouseWheel(ev: WheelEvent): void {
        const srcollRect = this.canvas.scrollViewer.nativeElement.getBoundingClientRect();
        const scale = this.canvas.zoomScale;
        const pointOnScrollView: Vector2 = {
            x: ev.clientX - srcollRect.left,
            y: ev.clientY - srcollRect.top
        };
        const pointOnCanvas: Vector2 = {
            x: (pointOnScrollView.x / scale + this.canvas.scrollViewer.nativeElement.scrollLeft / scale),
            y: (pointOnScrollView.y / scale + this.canvas.scrollViewer.nativeElement.scrollTop / scale)
        };
        // console.log(`${pointOnScrollView.x}，${pointOnScrollView.y}            ${pointOnCanvas.x}，${pointOnCanvas.y}`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const delta = (<any>ev).wheelDelta / 120;  /* wheelDelta */
        this.index = Math.max(0, Math.min(this.index + delta, this.scales.length - 1));
        this.canvas.zoomScale = this.scales[this.index];
        this.element.scrollTo();

        const offsetX = (pointOnCanvas.x / scale);
        const offsetY = (pointOnCanvas.y / scale);
        // this.canvas.scrollViewer.nativeElement.scrollLeft = offsetX;
        // this.canvas.scrollViewer.nativeElement.scrollTop = offsetY;
        console.log(`${this.canvas.zoomScale}`)

        ev.preventDefault();
        ev.stopPropagation();
    }

}