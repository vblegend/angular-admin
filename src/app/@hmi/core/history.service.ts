import { BasicCommand } from "../commands/basic.command";
import { HmiEditorComponent } from "../hmi.editor.component";



export class HistoryService {

    private editor: HmiEditorComponent;
    private undos: BasicCommand[];
    private redos: BasicCommand[];
    public disabled: boolean;
    private idCounter: number;


    public constructor(editor: HmiEditorComponent) {
        this.editor = editor;
        this.undos = [];
        this.redos = [];
        this.idCounter = 0;
        this.disabled = false;
    }


    /**
     * 当前是否可以执行撤销操作
     */
    public get canUndo(): boolean {
        return this.undos.length > 0;
    }

    /**
     * 当前是否可以执行重做操作
     */
    public get canRedo(): boolean {
        return this.redos.length > 0;
    }


    /**
     * 执行某条可以被插销、重做的指令
     * 与上一条指令相同  且batchNo相同 合并 
     * 与上一条指令相同 且 stickTime内  合并
     * @param cmd 
     * @param optionalName 
     */
    public execute(cmd: BasicCommand): void {
        let newCommand = true;
        if (this.undos.length > 0) {
            const lastCmd = this.undos[this.undos.length - 1];
            if (this.commandsIsRepeated(cmd, lastCmd)) {
                const timeDifference = new Date().getTime() - lastCmd.executeTime.getTime();
                // 两次操作间隔小于300毫秒  或属于同一批次的 合并
                if (lastCmd.batchNo === cmd.batchNo || timeDifference < 300) {
                    lastCmd.update(cmd);
                    cmd = lastCmd;
                    newCommand = false;
                }
            }
        }
        if (newCommand) {
            this.undos.push(cmd);
            cmd.id = ++this.idCounter;
        }
        cmd.execute();
        cmd.executeTime = new Date();
        this.redos = [];
    }

    /**
     * 判断两个命令是否为重复的。
     * @param cmd1 
     * @param cmd2 
     * @returns 
     */
    public commandsIsRepeated(cmd1: BasicCommand, cmd2: BasicCommand): boolean {
        if (cmd1.type != cmd2.type) return false;
        if (cmd1.attributeName != cmd2.attributeName) return false;
        if (cmd1.objects.length != cmd2.objects.length) return false;
        for (let i = 0; i < cmd1.objects.length; i++) {
            if (cmd1.objects[i] != cmd2.objects[i]) {
                return false;
            }
        }
        return true;
    }



    /**
     * 执行撤销操作  并返回撤销的指令
     */
    public undo(): BasicCommand {
        if (this.disabled) {
            alert("Undo/Redo disabled while scene is playing.");
            return null;
        }
        let cmd = undefined;
        if (this.undos.length > 0) {
            cmd = this.undos.pop();
        }
        if (cmd !== undefined) {
            cmd.undo();
            this.redos.push(cmd);
            // this._onChanged.dispatch(cmd);
        }
        return cmd;
    }

    /*
    * 执行重做操作 并返回重做的指令
    */
    public redo(): BasicCommand {
        if (this.disabled) {
            alert("Undo/Redo disabled while scene is playing.");
            return null;
        }
        let cmd: BasicCommand = undefined;
        if (this.redos.length > 0) {
            cmd = this.redos.pop();
        }
        if (cmd !== undefined) {
            cmd.execute();
            this.undos.push(cmd);
            // this._onChanged.dispatch(cmd);
        }
        return cmd;
    }



    /**
     * 清除所有（撤销、重做）历史指令
     */
    public clear() {
        this.undos = [];
        this.redos = [];
        this.idCounter = 0;
        // this._onChanged.dispatch();
    }


}