import { ComponentRef } from "@angular/core";
import { AnyObject } from "@core/common/types";
import { BasicWidgetComponent } from "@hmi/components/basic-widget/basic.widget.component";
import { HmiEditorComponent } from "@hmi/hmi.editor.component";


export class BasicCommand {
    public id: number;
    public type: string;
    public name: string;
    public batchNo: number;

    public attributeName: string;
    public attributePaths: string[];

    public objects: AnyObject[];


    protected oldValues: Object[];
    protected newValues: Object[];
    protected editor: HmiEditorComponent;

    public executeTime: Date;



    /**
     *
     */
    constructor(editor: HmiEditorComponent) {
        this.id = -1;
        this.editor = editor;
        this.objects = [];
        this.oldValues = [];
        this.newValues = [];
        this.batchNo = Math.round((Math.random() * Number.MAX_VALUE));
    }


    /**
     * 执行，重做
     */
    public execute(): void {

    }

    /**
     * 撤销
     */
    public undo(): void {

    }

    /**
     * 更新
     */
    public update(cmd: BasicCommand): void {

    }

}