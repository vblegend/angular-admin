import { AgentComponent } from "../components/agent/agent.component";
import { ElementLocation } from "../configuration/component.element.configure";
import { BasicCommand } from "./basic.command";


export class ObjecrAddedCommand extends BasicCommand {

    constructor(objects: AgentComponent[]) {
        super();
        this.objects = objects;
        this.oldValues = [];
        this.newValues = [];
        for (const object of this.objects) {
            this.oldValues.push(object.config.location);
        }
        if (this.newValues.length != this.oldValues.length || this.objects.length != this.newValues.length) throw '输入参数不匹配。';
    }

    public execute(): void {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i];
        }
    }

    public undo(): void {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i];
        }
    }

    public async update(cmd: BasicCommand) {

    }
}