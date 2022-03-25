import { AgentComponent } from "../components/agent/agent.component";


export class BasicCommand {
    public id: number;
    public type: string;
    public name: string;
    public batchNo: number;
    public attributeName: string;
    protected objects: AgentComponent[];
    protected oldValues: Object[];
    protected newValues: Object[];






    /**
     *
     */
    constructor() {
        this.id = -1;
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
    public async update(cmd: BasicCommand) {

    }

}