import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, ViewContainerRef } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { ObjectAttributeCommand } from '@hmi/commands/object.attribute.command';
import { SelectionAreaComponent } from '@hmi/components/selection-area/selection.area.component';
import { ElementLocation } from '@hmi/configuration/component.element.configure';
import { Rectangle } from '@hmi/core/common';
import { EditorComponent } from '@hmi/editor.component';



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

export class ReSizeAnchorDirective extends BaseDirective {
    @Input() host: SelectionAreaComponent;
    @Input() position: AnchorPosition;
    @Input() editor: EditorComponent;

    private buttonDown: boolean;
    private disX: number;
    private disY: number;
    private batchNo: number;



    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        if (ev.button === 0) {
            this.batchNo = Math.floor(Math.random() * Number.MAX_VALUE);
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
            // this.onMove(ev);
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown && ev.button === 0) {
            this.buttonDown = false;
            ev.preventDefault();
        }
    }






    // /**
    //  * 移动 这里仅做了四个方向的移动 而且没有做数据溢出检测
    //  * @param ev 
    //  * @returns 
    //  */
    // private onMove(ev: MouseEvent) {
    //     const scale = this.editor.canvas.zoomScale;
    //     const rectangle: Rectangle = {
    //         left: this.host.config.rect.left,
    //         top: this.host.config.rect.top,
    //         width: this.host.config.rect.width,
    //         height: this.host.config.rect.height
    //     };
    //     const xLength = (ev.clientX - this.disX) / scale;
    //     const yLength = (ev.clientY - this.disY) / scale;
    //     if (Number.isNaN(xLength)) return;
    //     if (Number.isNaN(yLength)) return;
    //     switch (this.position) {
    //         case AnchorPosition.Left:
    //             rectangle.left = this.host.config.rect.left + xLength;
    //             rectangle.width = this.host.config.rect.width - xLength;
    //             break;
    //         case AnchorPosition.Top:
    //             rectangle.top = this.host.config.rect.top + yLength;
    //             rectangle.height = this.host.config.rect.height - yLength;
    //             break;
    //         case AnchorPosition.Right:
    //             rectangle.width = this.host.config.rect.width + (ev.clientX - this.disX) / scale;
    //             break;
    //         case AnchorPosition.Down:
    //             rectangle.height = this.host.config.rect.height + (ev.clientY - this.disY) / scale;
    //             break;
    //     }
    //     // this.editor.execute(new ObjectAttributeCommand(this.editor,
    //     //     [this.host],
    //     //     'config/rect',
    //     //     [rectangle],
    //     //     this.batchNo
    //     // ));
    //     this.disX = ev.clientX;
    //     this.disY = ev.clientY;
    // }










}