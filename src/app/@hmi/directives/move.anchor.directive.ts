import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef, Injector } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { ObjectAttributeCommand } from '@hmi/commands/object.attribute.command';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { SelectionAreaComponent } from '@hmi/components/selection-area/selection.area.component';
import { ElementLocation } from '@hmi/configuration/component.element.configure';
import { Rectangle, Vector2 } from '@hmi/core/common';
import { HmiEditorComponent } from '@hmi/hmi.editor.component';

@Directive({
    selector: '[moveAnchor]'
})

export class MoveAnchorDirective extends BaseDirective {
    @Input() host: SelectionAreaComponent;
    @Input() editor: HmiEditorComponent;

    private buttonDown = false;
    private batchNo: number;
    private offsetX: number;
    private offsetY: number;


    constructor(protected injector: Injector) {
        super(injector);
    }

    public onInit(): void {

    }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        if (ev.buttons === 1) {
            this.buttonDown = true;
            this.batchNo = Math.floor(Math.random() * Number.MAX_VALUE);
            this.element.style.cursor = 'move';
            const scale = this.editor.canvas.zoomScale;
            this.editor.adsorb.captureAnchors();
            this.offsetX = (ev.clientX / scale - this.editor.selection.bounds.left);
            this.offsetY = (ev.clientY / scale - this.editor.selection.bounds.top);
            ev.preventDefault();
            ev.stopPropagation();
        }
        // hook 右键事件
        if(ev.buttons === 2){
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
            const loc = this.locationFix({ x: ox, y: oy });
            this.objectsMoveToCommand(loc);
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    /**
     * 位置修复/辅助线更新(待优化)
     * @param pos 
     * @returns 
     */
    private locationFix(pos: Vector2): Vector2 {
        const result: Vector2 = { x: pos.x, y: pos.y };
        const bounds = this.editor.selection.bounds;
        this.editor.canvas.hideSnapLines();

        // 横轴吸附坐标辅助线
        const l = this.editor.adsorb.matchXAxis(pos.x, this.editor.DEFAULT_ADSORB_THRESHOLD);
        const c = this.editor.adsorb.matchXAxis(pos.x + bounds.width / 2, this.editor.DEFAULT_ADSORB_THRESHOLD);
        const r = this.editor.adsorb.matchXAxis(pos.x + bounds.width, this.editor.DEFAULT_ADSORB_THRESHOLD);
        const xOffset = bounds.width / 2;
        // 把左中右侧左边全部转换为左侧坐标
        const xRes = [l, c ? c - xOffset : null, r ? r - bounds.width : null];
        const xIndex = this.getMinValueInArray([l, c, r]);
        for (let i = 0; i < xRes.length; i++) {
            // 循环左中右侧坐标点  如果索引相同  或者 坐标数值相同则显示坐标辅助线
            if (xRes[i] != null && (i == xIndex || (xRes[i] == xRes[xIndex]))) {
                result.x = xRes[i];
                const abspos = xRes[i] + xOffset * i;
                this.editor.canvas.vSnapLines[i] = { x: abspos * this.editor.canvas.zoomScale, y: this.editor.canvas.scrollViewer.nativeElement.scrollTop };
            }
        }
        // 纵轴吸附坐标辅助线
        const t = this.editor.adsorb.matchYAxis(pos.y, this.editor.DEFAULT_ADSORB_THRESHOLD);
        const m = this.editor.adsorb.matchYAxis(pos.y + bounds.height / 2, this.editor.DEFAULT_ADSORB_THRESHOLD);
        const b = this.editor.adsorb.matchYAxis(pos.y + bounds.height, this.editor.DEFAULT_ADSORB_THRESHOLD);
        const yOffset = bounds.height / 2;
        const yRes = [t, m ? m - yOffset : null, b ? b - bounds.height : null];
        const yIndex = this.getMinValueInArray([t, m, b]);
        for (let i = 0; i < yRes.length; i++) {
            if (yRes[i] != null && (i == yIndex || (yRes[i] == yRes[yIndex]))) {
                result.y = yRes[i];
                const abspos = yRes[i] + yOffset * i;
                this.editor.canvas.hSnapLines[i] = { x: this.editor.canvas.scrollViewer.nativeElement.scrollLeft, y: abspos * this.editor.canvas.zoomScale };
            }
        }

        return result;
    }




    /**
     * 获取数组中的最小值索引
     * @param arry 
     * @returns 
     */
    private getMinValueInArray(arry: number[]): number {
        let value = null;
        let index = -1;
        for (let i = 0; i < arry.length; i++) {
            if (arry[i] != null) {
                if (value == null || arry[i] < value) {
                    value = arry[i];
                    index = i;
                }
            }
        }
        return index;
    }


    /**
     * 执行修改属性命令
     * @param pos 
     */
    private objectsMoveToCommand(pos: Vector2): void {
        const objects: BasicWidgetComponent[] = [];
        const propertys: Rectangle[] = [];
        const bounds = this.editor.selection.bounds;
        for (const component of this.editor.selection.objects) {
            const selfRect = component.instance.configure.rect;
            const newRect = {
                left: selfRect.left - bounds.left + pos.x,
                top: selfRect.top - bounds.top + pos.y,
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






        // this.editor.canvas.hSnapLines[0] = {
        //     x: this.editor.canvas.scrollViewer.nativeElement.scrollLeft,
        //     y: (this.editor.selection.bounds.top + this.editor.selection.bounds.height / 2) * this.editor.canvas.zoomScale
        // };
        // this.editor.canvas.hSnapLines[1] = {
        //     x: this.editor.canvas.scrollViewer.nativeElement.scrollLeft,
        //     y: this.editor.selection.bounds.top * this.editor.canvas.zoomScale
        // };
        // this.editor.canvas.hSnapLines[2] = {
        //     x: this.editor.canvas.scrollViewer.nativeElement.scrollLeft,
        //     y: (this.editor.selection.bounds.top + this.editor.selection.bounds.height) * this.editor.canvas.zoomScale
        // };


        // console.log(`left:${l}，center:${c}，left:${r}，`);


        // this.editor.canvas.vSnapLines[0] = {
        //     x: (this.editor.selection.bounds.left + this.editor.selection.bounds.width / 2) * this.editor.canvas.zoomScale,
        //     y: this.editor.canvas.scrollViewer.nativeElement.scrollTop
        // };
        // this.editor.canvas.vSnapLines[1] = {
        //     x: this.editor.selection.bounds.left * this.editor.canvas.zoomScale,
        //     y: this.editor.canvas.scrollViewer.nativeElement.scrollTop
        // };
        // this.editor.canvas.vSnapLines[2] = {
        //     x: (this.editor.selection.bounds.left + this.editor.selection.bounds.width) * this.editor.canvas.zoomScale,
        //     y: this.editor.canvas.scrollViewer.nativeElement.scrollTop
        // };






    }



















    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown) {
            this.element.style.cursor = '';// grab
            this.buttonDown = false;
            this.editor.canvas.hideSnapLines();
            ev.preventDefault();
        }
    }

}