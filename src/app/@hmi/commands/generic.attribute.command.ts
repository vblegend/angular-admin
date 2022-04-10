import { AnyObject } from '@core/common/types';
import { ObjectUtil } from '@core/util/object.util';
import { HmiEditorComponent } from '@hmi/hmi.editor.component';
import { BasicCommand } from './basic.command';

export class GenericAttributeCommand extends BasicCommand {
    protected _objects: AnyObject[];
    /**
     * 设置对象属性值
     * 如果_objects 对象含有 setXXX() 方法时会调用该方法更新
     * @param editor 
     * @param _objects 
     * @param path  属性路径 如‘configure/rect’
     * @param newValues
     */
    public constructor(editor: HmiEditorComponent, _objects: AnyObject[], path: string, newValues: Object[], batchNo?: number) {
        super(editor);
        this.name = '修改属性';
        this._objects = _objects;
        this.oldValues = [];
        const paths = path.split('/');
        this.attributeName = paths.pop();
        this.attributePaths = paths;
        if (batchNo != null) this.batchNo = batchNo;
        for (const object of _objects) {
            const target = this.getTarget(object);
            this.oldValues.push(ObjectUtil.clone(target[this.attributeName]));
        }
        if (newValues.length == 1 && this.oldValues.length > 1) {
            this.newValues = Array(this.oldValues.length).fill(newValues[0]);
        } else if (this.oldValues.length == newValues.length) {
            this.newValues = newValues;
        } else {
            throw 'error';
        }
    }

    public getTarget(object: AnyObject): AnyObject {
        let root = object;
        for (let i = 0; i < this.attributePaths.length; i++) {
            const key = this.attributePaths[i];
            root = root[key];
        }
        return root;
    }




    public execute(): void {
        for (let i = 0; i < this._objects.length; i++) {
            const rootObject = this._objects[i];
            const object = this.getTarget(rootObject);
            object[this.attributeName] = this.newValues[i];
        }
    }

    public undo(): void {
        for (let i = 0; i < this._objects.length; i++) {
            const rootObject = this._objects[i];
            const object = this.getTarget(rootObject);
            object[this.attributeName] = this.oldValues[i];
        }
    }

    public update(command: GenericAttributeCommand) {
        this.newValues = command.newValues;
    }

}
