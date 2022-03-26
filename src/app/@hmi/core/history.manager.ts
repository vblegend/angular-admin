import { BasicCommand } from "../commands/basic.command";
import { EditorComponent } from "../editor.component";



export class HistoryManager {

    private editor: EditorComponent;
    private undos: BasicCommand[];
    private redos: BasicCommand[];
    public disabled: boolean;
    private idCounter: number;


    public constructor(editor: EditorComponent) {
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
    public execute(cmd: BasicCommand):void {

        let newCommand = true;
        console.log(this.undos.length);

        if (this.undos.length > 0) {
            const lastCmd = this.undos[this.undos.length - 1];
            const timeDifference = new Date().getTime() - lastCmd.executeTime.getTime();
            if (lastCmd.type === cmd.type && lastCmd.attributeName === cmd.attributeName) {
                if (lastCmd.batchNo === cmd.batchNo) {
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