import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef } from '@angular/core';
import { AgentComponent } from '../components/agent/agent.component';
import { CanvasComponent } from '../components/canvas/canvas.component';


@Directive({
    selector: '[zoomViewer]'
})

export class ZoomViewerDirective implements OnInit {
    @Input() canvas: CanvasComponent;
    @Output() mouseEnter = new EventEmitter<boolean>();
    private readonly scales: number[] = [0.1, 0.2, 0.5, 0.8, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    private index: number;


    constructor(private el: ElementRef, public viewContainerRef: ViewContainerRef) {
        this.index = this.scales.indexOf(1);
    }

    public ngOnInit(): void {

    }


    @HostListener('mousewheel', ['$event'])
    public onMouseWheel(ev: MouseEvent): void {
        const delta = ev['wheelDelta'] / 120;
        this.index += delta;
        this.index = Math.max(0, Math.min(this.index, this.scales.length));
        const zoom = this.scales[this.index];
        this.canvas.viewScale = zoom;
        this.el.nativeElement.scrollTo();
        ev.preventDefault();
    }

}