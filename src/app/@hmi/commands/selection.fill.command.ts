import { ComponentRef } from "@angular/core";
import { BasicComponent } from "@hmi/components/basic-component/basic.component";
import { EditorComponent } from "@hmi/editor.component";
import { BasicCommand } from "./basic.command";

/**
 * 编辑器选区对象填充命令\
 * 将编辑器的选区内所有选中对象全部取消选中，选中当前对象数组
 */
export class SelectionFillCommand extends BasicCommand {
    protected oldObjects: ComponentRef<BasicComponent>[];
    protected newObjects: ComponentRef<BasicComponent>[];

    constructor(editor: EditorComponent, objects: ComponentRef<BasicComponent>[]) {
        super(editor);
        this.oldObjects = editor.selection.objects;
        this.newObjects = objects;
    }

    public execute(): void {
        this.editor.selection.fill(this.newObjects);
    }

    public undo(): void {
        this.editor.selection.fill(this.oldObjects);
    }

    public update(cmd: BasicCommand): void {

    }
}