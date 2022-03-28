import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef, Injector } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { ObjectAttributeCommand } from '@hmi/commands/object.attribute.command';
import { BasicComponent } from '@hmi/components/basic-component/basic.component';
import { SelectionAreaComponent } from '@hmi/components/selection-area/selection.area.component';
import { ElementLocation } from '@hmi/configuration/component.element.configure';
import { Rectangle } from '@hmi/core/common';
import { EditorComponent } from '@hmi/editor.component';
// import { AgentComponent } from '../components/agent/agent.component';

@Directive({
    selector: '[moveAnchor]'
})

export class MoveAnchorDirective extends BaseDirective {
    @Input() host: SelectionAreaComponent;
    @Input() editor: EditorComponent;

    @Output() mouseEnter = new EventEmitter<boolean>();

    private buttonDown = false;
    private batchNo: number;
    private offsetX: number;
    private offsetY: number;


    constructor(protected injector: Injector) {
        super(injector);
    }

    public onInit(): void {

    }

    @HostListener('mouseenter')
    public onMouseEnter(): void {
        this.mouseEnter.emit(true);
    }

    @HostListener('mouseleave')
    public onMouseLeave(): void {
        this.mouseEnter.emit(false);
    }

    @HostListener('mousewheel', ['$event'])
    public onMouseWheel(ev: MouseEvent): void {
        // 鼠标在选框内 按住ctrl可缩放 否则不可缩放
        if (ev.ctrlKey) return;
        ev.preventDefault();
        ev.stopPropagation();
    }


    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        if (ev.button === 0) {
            this.buttonDown = true;
            this.batchNo = Math.floor(Math.random() * Number.MAX_VALUE);
            this.element.style.cursor = 'move';
            const scale = this.editor.canvas.zoomScale;
            this.offsetX = (ev.clientX / scale - this.editor.selection.bounds.left);
            this.offsetY = (ev.clientY / scale - this.editor.selection.bounds.top);
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        if (this.buttonDown) {
            const scale = this.editor.canvas.zoomScale;
            const ox = Math.floor(Math.max((ev.clientX / scale - this.offsetX), 0));
            const oy = Math.floor(Math.max((ev.clientY / scale - this.offsetY), 0));
            if (Number.isNaN(oy) || Number.isNaN(ox) ||
                (this.editor.selection.bounds.left === ox && this.editor.selection.bounds.top === oy)) {
                ev.preventDefault();
                ev.stopPropagation();
                return;
            }
            this.objectsMoveToCommand(ox, oy);
            ev.preventDefault();
            ev.stopPropagation();
        }
    }


    private objectsMoveToCommand(offsetX: number, offsetY: number): void {
        // console.log(`${offsetX},${offsetY}`);
        const objects: BasicComponent[] = [];
        const propertys: Rectangle[] = [];
        const bounds = this.editor.selection.bounds;
        for (const component of this.editor.selection.objects) {
            const selfRect = component.instance.configure.rect;
            const newRect = {
                left: selfRect.left - bounds.left + offsetX,
                top: selfRect.top - bounds.top + offsetY,
                width: selfRect.width,
                height: selfRect.height
            };
            objects.push(component.instance);
            propertys.push(newRect);
        }
        this.editor.execute(new ObjectAttributeCommand(this.editor,
            objects,
            'configure/rect',
            propertys,
            this.batchNo
        ));

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