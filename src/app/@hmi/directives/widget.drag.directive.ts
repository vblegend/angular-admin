import { ComponentRef, Directive, HostListener, Input } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { ObjectUtil } from '@core/util/object.util';
import { WidgetAddCommand } from '@hmi/commands/widget.add.command';
import { DragPreviewComponent } from '@hmi/components/drag-preview/drag.preview.component';
import { WidgetConfigure } from '@hmi/configuration/widget.configure';
import { WidgetSchema } from '@hmi/configuration/widget.schema';
import { HmiEditorComponent } from '@hmi/hmi.editor.component';
import { HmiMath } from '@hmi/utility/hmi.math';


@Directive({
    selector: '[widget-drag]'
})
/**
 * 编辑器的缩放指令
 * 实现了鼠标滚轮的缩放功能。
 */
export class WidgetDragDirective extends BaseDirective {
    @Input() editor!: HmiEditorComponent;
    private dragPreview!: ComponentRef<DragPreviewComponent> | null;
    public onInit(): void {

    }

    /**
     * 悬停
     * @param ev 
     */
    @HostListener('dragover', ['$event'])
    public onDragOver(ev: DragEvent): void {
        if (this.dragPreview) {
            const rect = this.element.getBoundingClientRect();
            const x = (ev.clientX - rect.x + this.editor.canvas.scrollViewer.nativeElement.scrollLeft) / this.editor.canvas.zoomScale;
            const y = (ev.clientY - rect.y + this.editor.canvas.scrollViewer.nativeElement.scrollTop) / this.editor.canvas.zoomScale;
            // 这里应该获取拖拽的小部件默认尺寸，但是。。。。这个事件里的数据是获取不到的。。另想它法
            const width = 200;
            const height = 100;
            this.dragPreview.instance.updateRectangle({ left: Math.floor(x - width / 2), top: Math.floor(y - height / 2), width, height });
        }
        ev.preventDefault();
        ev.stopPropagation();
    }


    /**
     * 离开了
     * @param ev 
     */
    @HostListener('dragenter', ['$event'])
    public onDragEnter(ev: DragEvent): void {
        // do some thing
        const target = ev.target as HTMLElement;
        if (target.className != 'scrollViewer') return;
        if (this.dragPreview == null) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory<DragPreviewComponent>(DragPreviewComponent);
            this.dragPreview = this.editor.canvas.container.createComponent<DragPreviewComponent>(componentFactory, undefined, this.injector);
            this.dragPreview.instance.rect = { left: 0, top: 0, width: 100, height: 100 };
            this.dragPreview.instance.updateRectangle({ left: 0, top: 0, width: 100, height: 100 });
        }
        ev.preventDefault();
        ev.stopPropagation();
    }


    /**
     * 离开了
     * @param ev 
     */
    @HostListener('dragleave', ['$event'])
    public onDragLeave(ev: DragEvent): void {
        const target = ev.target as HTMLElement;
        if (target.className != 'scrollViewer') return;
        if (this.dragPreview) {
            const index = this.editor.canvas.container.indexOf(this.dragPreview.hostView);
            this.editor.canvas.container.remove(index);
            this.dragPreview = null;
        }
        ev.preventDefault();
        ev.stopPropagation();
    }

    /**
     * 放置
     * @param ev 
     */
    @HostListener('drop', ['$event'])
    public onDrop(ev: DragEvent): void {
        this.onDragLeave(ev);
        // do some thing
        const rect = this.element.getBoundingClientRect();
        const x = (ev.clientX - rect.x + this.editor.canvas.scrollViewer.nativeElement.scrollLeft) / this.editor.canvas.zoomScale;
        const y = (ev.clientY - rect.y + this.editor.canvas.scrollViewer.nativeElement.scrollTop) / this.editor.canvas.zoomScale;
        const json = ev.dataTransfer!.getData('json/widget');
        const schema: WidgetSchema = JSON.parse(json) as WidgetSchema;
        const configure: WidgetConfigure = {
            id: this.generateId(),
            name: this.generateName(schema.name),
            type: schema.type!,
            zIndex: this.editor.canvas.children.length,
            style: ObjectUtil.clone(schema.default.style)!,
            data: ObjectUtil.clone(schema.default.data)!,
            interval : 10000,
            rect: {
                left: Math.floor(x - schema.default.rect!.width / 2),
                top: Math.floor(y - schema.default.rect!.height / 2),
                width: schema.default.rect!.width,
                height: schema.default.rect!.height
            },
            events: {}
        };
        const compRef = this.editor.canvas.parseComponent(configure);
        if (compRef) {
            this.editor.execute(new WidgetAddCommand(this.editor, [compRef], true));
        }
        ev.preventDefault();
        ev.stopPropagation();
    }






    private generateName(baseName: string): string {
        let i = 1;
        while (true) {
            const name = baseName + i.toString();
            if (this.editor.canvas.findWidgetByName(name) == null) return name;
            i++;
        }
    }

    private generateId(): string {
        while (true) {
            const id = HmiMath.randomString(6);
            if (this.editor.canvas.findWidgetById(id) == null) return id;
        }
    }







}