import { BasicComponent } from "@hmi/components/basic-component/basic.component";
import { EditorComponent } from "@hmi/editor.component";
import { BasicCommand } from "./basic.command";


export class ObjecrAddedCommand extends BasicCommand {

    constructor(editor: EditorComponent, objects: BasicComponent[], indexs?: number[]) {
        super(editor);
        this.objects = objects;
    }

    public execute(): void {

        // this.editor.addComponent()

        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].viewContainerRef;
        }
    }

    public undo(): void {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i];
        }
    }

    public update(cmd: BasicCommand): void {

    }
}