import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { DisignerCanvasComponent } from '@hmi/components/disigner-canvas/disigner.canvas.component';
import { EditorComponent } from '@hmi/editor.component';

@Directive({
    selector: '[zoomViewer]'
})

export class ZoomViewerDirective extends BaseDirective {
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
        this.index += delta;
        this.index = Math.max(0, Math.min(this.index, this.scales.length));
        const zoom = this.scales[this.index];
        this.canvas.zoomScale = zoom;
        this.element.scrollTo();
        ev.preventDefault();
        ev.stopPropagation();
    }

}