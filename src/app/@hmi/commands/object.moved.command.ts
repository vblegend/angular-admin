import { AgentComponent } from "../components/agent/agent.component";
import { ElementLocation } from "../configuration/component.element.configure";
import { BasicCommand } from "./basic.command";


export class ObjecrMovedCommand extends BasicCommand {

    protected oldValues: ElementLocation[];
    protected newValues: ElementLocation[];

    constructor(objects: AgentComponent[], newPositions: ElementLocation[], batchno?: number) {
        super();
        this.objects = objects;
        this.oldValues = [];
        this.newValues = [];
        if (batchno != null) this.batchNo = batchno;
        for (const object of this.objects) {
            this.oldValues.push(object.config.location);
        }
        this.newValues = newPositions;
        if (this.newValues.length != this.oldValues.length || this.objects.length != this.newValues.length) throw '输入参数不匹配。';
    }

    public execute(): void {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].config.location = this.newValues[i];
        }
    }

    public undo(): void {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].config.location = this.oldValues[i];
        }
    }

    public async update(cmd: BasicCommand) {

    }
}