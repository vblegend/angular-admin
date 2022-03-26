import { EditorComponent } from "@hmi/editor.component";
import { AgentComponent } from "../components/agent/agent.component";


export class BasicCommand {
    public id: number;
    public type: string;
    public name: string;
    public batchNo: number;

    public attributeName: string;
    public attributePaths: string[];

    protected objects: AgentComponent[];
    protected oldValues: Object[];
    protected newValues: Object[];
    protected editor: EditorComponent;

    public executeTime: Date;



    /**
     *
     */
    constructor(editor: EditorComponent) {
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