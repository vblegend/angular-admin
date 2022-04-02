import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef, ComponentRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { BasicCommand } from '@hmi/commands/basic.command';
import { SelectionFillCommand } from '@hmi/commands/selection.fill.command';
import { SelectionToggleCommand } from '@hmi/commands/selection.toggle.command';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { DisignerCanvasComponent } from '@hmi/components/disigner-canvas/disigner.canvas.component';
import { RubberbandComponent } from '@hmi/components/rubber-band/rubber.band.component';
import { SelectionAreaComponent } from '@hmi/components/selection-area/selection.area.component';
import { Rectangle } from '@hmi/core/common';
import { HmiEditorComponent } from '@hmi/hmi.editor.component';
import { Console } from 'console';

@Directive({
    selector: '[rubber-band]'
})

export class RubberBandDirective extends BaseDirective {
    @Input() editor: HmiEditorComponent;
    @Input() canvas: DisignerCanvasComponent;
    private rectComponent: ComponentRef<RubberbandComponent>;
    /**
     * 橡皮筋所选区域窗口坐标
     */
    private rubberBandArea: Rectangle;

    /**
     * 橡皮筋所选中的视图区域
     */
    private selectionArea: Rectangle;


    private buttonDown = false;
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;

    constructor(protected injector: Injector) {
        super(injector);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory<RubberbandComponent>(RubberbandComponent);
        this.rectComponent = this.viewContainerRef.createComponent<RubberbandComponent>(componentFactory, null, this.injector);
        this.rectComponent.hostView.detach();
        this.rubberBandArea = { left: 0, top: 0, width: 0, height: 0 };
        this.selectionArea = { left: 0, top: 0, width: 0, height: 0 };
    }

    public onInit(): void {
        this.editor = this.canvas.editor;
    }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        if (ev.buttons === 1 || ev.buttons == 2) {
            // 过滤滚动条上的点击事件
            if (ev.clientX - this.element.offsetLeft > this.element.clientWidth ||
                ev.clientY - this.element.offsetTop > this.element.clientHeight) return;
            this.buttonDown = true;
            const rect = this.element.getBoundingClientRect();
            // 仅限左键更改指针,右键为菜单项 不修改指针样式
            if (ev.buttons == 1) this.element.style.cursor = 'crosshair';
            this.endX = this.startX = (ev.clientX - rect.left);
            this.endY = this.startY = (ev.clientY - rect.top);
            this.updatePosition();
            this.viewContainerRef.insert(this.rectComponent.hostView);
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    /**
     * 一个逃离Anugular 数据检测框架之外的方法用于处理mousemove事件
     * 具体查看 OutSideEventPluginService  的 @outside
     * @param ev 
     */
    @HostListener('document:mousemove@outside', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        if (this.buttonDown && ev.buttons === 1) {
            const rect = this.element.getBoundingClientRect();
            this.endX = ev.clientX - rect.left;
            this.endY = ev.clientY - rect.top;
            this.updatePosition();
            ev.preventDefault();
            ev.stopPropagation();
        }
    }


    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown) {
            this.element.style.cursor = '';
            this.buttonDown = false;
            const rect = this.element.getBoundingClientRect();
            this.element.style.cursor = '';
            this.updateSelectionArea(this.startX === this.endX && this.startY === this.endY, ev.ctrlKey);
            const index = this.viewContainerRef.indexOf(this.rectComponent.hostView);
            if (index >= 0) {
                this.viewContainerRef.detach(index);
            }
            this.rectComponent.instance.updateRectangle({ left: 0, top: 0, width: 0, height: 0 });
            ev.preventDefault();
            ev.stopPropagation();
        }
    }


    /**
     * 更新橡皮筋等坐标
     */
    private updatePosition() {
        // 限制橡皮筋的坐标区域防止溢出
        this.startX = Math.max(Math.min(this.startX, this.element.clientWidth), 0);
        this.startY = Math.max(Math.min(this.startY, this.element.clientHeight), 0);
        this.endX = Math.max(Math.min(this.endX, this.element.clientWidth), 0);
        this.endY = Math.max(Math.min(this.endY, this.element.clientHeight), 0);
        // 更新橡皮筋
        const scale = this.editor.canvas.zoomScale;


        const left = Math.min(this.endX, this.startX);
        const top = Math.min(this.endY, this.startY);
        const width = Math.abs(this.endX - this.startX);
        const height = Math.abs(this.endY - this.startY);


        this.rubberBandArea = {
            left: Math.min(this.endX, this.startX),
            top: Math.min(this.endY, this.startY),
            width: Math.abs(this.endX - this.startX),
            height: Math.abs(this.endY - this.startY)
        };
        this.rectComponent.instance.updateRectangle(this.rubberBandArea);
        // 更新选中区域
        this.selectionArea = {
            left: left / scale + this.element.scrollLeft / scale,
            top: top / scale + this.element.scrollTop / scale,
            width: width / scale,
            height: height / scale
        };
    }



    /**
     * 更新Selection选择器
     */
    private updateSelectionArea(isClick: boolean, ctrlKey: boolean) {
        const selecteds: ComponentRef<BasicWidgetComponent>[] = [];
        let command: BasicCommand = null;
        const children = this.editor.canvas.children;
        if (isClick) {
            const selected = children.find(comp => {
                return this.checkRectangleCross(comp.instance.configure.rect, this.selectionArea);
            });
            selecteds.push(selected);
        } else {
            const hitObjects = children.filter(comp => {
                return this.checkRectangleCross(comp.instance.configure.rect, this.selectionArea);
            });
            selecteds.push(...hitObjects);
        }
        // if (selecteds.length > 0) {
        if (ctrlKey) {
            command = new SelectionToggleCommand(this.editor, selecteds);
        } else {
            command = new SelectionFillCommand(this.editor, selecteds);
        }
        this.editor.execute(command);
        // }
    }







    /**
     * 检测两个矩形是否碰撞
     * @param rect1 
     * @param rect2 
     * @returns 
     */
    public checkRectangleCross(rect1: Rectangle, rect2: Rectangle): boolean {
        return rect1.left + rect1.width >= rect2.left &&
            rect1.left <= rect2.left + rect2.width &&
            rect1.top + rect1.height >= rect2.top &&
            rect1.top <= rect2.top + rect2.height;
    }



}