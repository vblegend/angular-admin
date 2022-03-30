import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { DisignerCanvasComponent } from '@hmi/components/disigner-canvas/disigner.canvas.component';
import { HmiEditorComponent } from '@hmi/hmi.editor.component';

@Directive({
    selector: '[zoom-control]'
})
/**
 * 编辑器的缩放指令
 * 实现了鼠标滚轮的缩放功能。
 */
export class ZoomControlDirective extends BaseDirective {
    // @Input() editor: EditorComponent;
    @Input() canvas: DisignerCanvasComponent;
    @Output() mouseEnter = new EventEmitter<boolean>();
    private readonly scales: number[] = [0.1, 0.2, 0.5, 0.8, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    private index: number;


    public onInit(): void {
        this.index = this.scales.indexOf(1);
    }


    @HostListener('mousewheel', ['$event'])
    public onMouseWheel(ev: MouseEvent): void {
        const delta = ev['wheelDelta'] / 120;
        this.index = Math.max(0, Math.min(this.index + delta, this.scales.length - 1));
        this.canvas.zoomScale = this.scales[this.index];
        this.element.scrollTo();
        ev.preventDefault();
        ev.stopPropagation();
    }

}