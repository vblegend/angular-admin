import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, ViewContainerRef } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { ObjectAttributeCommand } from '@hmi/commands/object.attribute.command';
import { BasicComponent } from '@hmi/components/basic-component/basic.component';
import { SelectionAreaComponent } from '@hmi/components/selection-area/selection.area.component';
import { ElementLocation } from '@hmi/configuration/component.element.configure';
import { Rectangle } from '@hmi/core/common';
import { EditorComponent } from '@hmi/editor.component';



export enum AnchorPosition {
    Top = 't',
    RightTop = 'rt',
    Right = 'r',
    RightDown = 'rd',
    Down = 'd',
    LeftDown = 'ld',
    Left = 'l',
    LeftTop = 'lt'
}

@Directive({
    selector: '[resizeAnchor]'
})
/**
 * 组件大小调整指令\
 * 用于在编辑态调整组件大小
 */
export class ReSizeAnchorDirective extends BaseDirective {
    @Input() host: SelectionAreaComponent;
    @Input() position: AnchorPosition;
    @Input() editor: EditorComponent;

    private selectionRectangle: Rectangle;
    private buttonDown: boolean;
    private disX: number;
    private disY: number;
    private batchNo: number;
    private snapshots: Rectangle[] = [];


    /**
     * 抓取选中对象在选定区域的位置(0-1)
     */
    private captureComponents(): void {
        this.snapshots = [];
        for (const comp of this.editor.selection.objects) {
            const left = (comp.instance.left - this.editor.selection.bounds.left) / this.editor.selection.bounds.width;
            const top = (comp.instance.top - this.editor.selection.bounds.top) / this.editor.selection.bounds.height;
            const width = comp.instance.width / this.editor.selection.bounds.width;
            const height = comp.instance.height / this.editor.selection.bounds.height;
            this.snapshots.push({ left, top, width, height });
        }
    }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        if (ev.button === 0) {
            this.batchNo = Math.floor(Math.random() * Number.MAX_VALUE);
            this.selectionRectangle = {
                left: this.editor.selection.bounds.left,
                top: this.editor.selection.bounds.top,
                width: this.editor.selection.bounds.width,
                height: this.editor.selection.bounds.height
            };
            this.captureComponents();
            this.buttonDown = true;
            this.disX = ev.clientX;
            this.disY = ev.clientY;
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        if (this.buttonDown) {

            const scale = this.editor.canvas.zoomScale;
            let xLen = (ev.clientX - this.disX) / scale;
            let yLen = (ev.clientY - this.disY) / scale;
            if (Number.isNaN(xLen)) return;
            if (Number.isNaN(yLen)) return;
            if (this.position.indexOf(AnchorPosition.Left) > -1) {
                xLen = -Math.min(this.selectionRectangle.left, -xLen);
                this.selectionRectangle.left += xLen;
                this.selectionRectangle.width -= xLen;
            }
            if (this.position.indexOf(AnchorPosition.Top) > -1) {
                yLen = -Math.min(this.selectionRectangle.top, -yLen);
                this.selectionRectangle.top += yLen;
                this.selectionRectangle.height -= yLen;
            }
            if (this.position.indexOf(AnchorPosition.Right) > -1) {
                this.selectionRectangle.width += xLen;
            }
            if (this.position.indexOf(AnchorPosition.Down) > -1) {
                this.selectionRectangle.height += yLen;
            }
            this.selectionRectangle.top = Math.max(this.selectionRectangle.top, 0);
            this.executeResizeCommand();
            this.disX = ev.clientX;
            this.disY = ev.clientY;
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown) {
            this.buttonDown = false;
            ev.preventDefault();
        }
    }






    /**
     * 执行调整大小命令
     * @param ev 
     * @returns 
     */
    private executeResizeCommand() {
        const comps: BasicComponent[] = [];
        const attrs: Rectangle[] = [];
        for (let i = 0; i < this.editor.selection.objects.length; i++) {
            const rect: Rectangle = {
                left: this.selectionRectangle.left + this.selectionRectangle.width * this.snapshots[i].left,
                top: this.selectionRectangle.top + this.selectionRectangle.height * this.snapshots[i].top,
                width: this.selectionRectangle.width * this.snapshots[i].width,
                height: this.selectionRectangle.height * this.snapshots[i].height
            };
            comps.push(this.editor.selection.objects[i].instance);
            attrs.push(rect);
        }
        this.editor.execute(new ObjectAttributeCommand(this.editor,
            comps,
            'configure/rect',
            attrs,
            this.batchNo
        ));
    }










}