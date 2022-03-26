import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef, Injector } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { ObjectAttributeCommand } from '@hmi/commands/object.attribute.command';
import { ElementLocation } from '@hmi/configuration/component.element.configure';
import { Rectangle } from '@hmi/core/common';
import { EditorComponent } from '@hmi/editor.component';
import { AgentComponent } from '../components/agent/agent.component';

@Directive({
    selector: '[moveAnchor]'
})

export class MoveAnchorDirective extends BaseDirective {
    @Input() host: AgentComponent;
    @Output() mouseEnter = new EventEmitter<boolean>();

    private editor: EditorComponent;
    private buttonDown = false;
    private batchNo: number;
    private offsetX: number;
    private offsetY: number;


    constructor(protected injector: Injector) {
        super(injector);
    }

    public onInit(): void {
        if (this.host == null) throw 'args host notfound.';
        this.editor = this.host.editor;
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
            this.batchNo = Math.floor(Math.random() * Number.MAX_VALUE);
            this.element.style.cursor = 'move';
            const scale = this.editor.canvas.zoomScale;
            this.offsetX = (ev.clientX / scale - this.host.config.rect.left);
            this.offsetY = (ev.clientY / scale - this.host.config.rect.top);
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        if (this.buttonDown) {
            const scale = this.editor.canvas.zoomScale;
            const ox = Math.max((ev.clientX / scale - this.offsetX), 0);
            const oy = Math.max((ev.clientY / scale - this.offsetY), 0);
            if (Number.isNaN(oy) || Number.isNaN(ox) ||
                (this.host.config.rect.left === ox && this.host.config.rect.top === oy)) {
                ev.preventDefault();
                return;
            }
            const locaotion: Rectangle = { left: ox, top: oy, width: this.host.config.rect.width, height: this.host.config.rect.height };
            this.editor.execute(new ObjectAttributeCommand(this.editor,
                [this.host],
                'config/rect',
                [locaotion],
                this.batchNo
            ));
            ev.preventDefault();
        }
    }

    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown && ev.button === 0) {
            this.element.style.cursor = '';// grab
            this.buttonDown = false;
            ev.preventDefault();
        }
    }

}