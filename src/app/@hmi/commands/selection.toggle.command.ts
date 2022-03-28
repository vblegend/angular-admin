import { ComponentRef } from "@angular/core";
import { BasicComponent } from "@hmi/components/basic-component/basic.component";
import { EditorComponent } from "@hmi/editor.component";
import { BasicCommand } from "./basic.command";

/**
 * 编辑器选区对象状态切换命令\
 * 在编辑器选取内 切换当前数组的选中状态
 */
export class SelectionToggleCommand extends BasicCommand {
    protected newObjects: ComponentRef<BasicComponent>[];

    constructor(editor: EditorComponent, objects: ComponentRef<BasicComponent>[]) {
        super(editor);
        this.newObjects = objects;
    }

    public execute(): void {
        this.editor.selection.toggle(this.newObjects);
    }

    public undo(): void {
        this.editor.selection.toggle(this.newObjects);
    }

    public update(cmd: BasicCommand): void {

    }
}