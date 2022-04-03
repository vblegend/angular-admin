import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { HmiEditorComponent } from '@hmi/hmi.editor.component';
import { BasicCommand } from './basic.command';

export class ObjectAttributeCommand extends BasicCommand {

    /**
     * 设置对象属性值
     * 如果objects 对象含有 setXXX() 方法时会调用该方法更新
     * @param editor 
     * @param objects 
     * @param path  属性路径 如‘configure/rect’
     * @param newValues
     */
    public constructor(editor: HmiEditorComponent, objects: BasicWidgetComponent[], path: string, newValues: Object[], batchNo?: number) {
        super(editor);
        this.name = '修改属性';
        this.objects = objects;
        this.oldValues = [];
        const paths = path.split('/');
        this.attributeName = paths.pop();
        this.attributePaths = paths;
        if (batchNo != null) this.batchNo = batchNo;
        for (const object of objects) {
            const target = this.getTarget(object);
            this.oldValues.push(target[this.attributeName]);
        }
        if (newValues.length == 1 && this.oldValues.length > 1) {
            this.newValues = Array(this.oldValues.length).fill(newValues[0]);
        } else if (this.oldValues.length == newValues.length) {
            this.newValues = newValues;
        }else{
            throw 'error';
        }
    }

    public getTarget(object: BasicWidgetComponent): Object {
        let root = object;
        for (let i = 0; i < this.attributePaths.length; i++) {
            const key = this.attributePaths[i];
            root = root[key];
        }
        return root;
    }




    public execute(): void {
        for (let i = 0; i < this.objects.length; i++) {
            const rootObject = this.objects[i];
            const object = this.getTarget(rootObject);
            object[this.attributeName] = this.newValues[i];
            // call setXXX();
            const setter = `set${this.attributeName[0].toUpperCase()}${this.attributeName.substring(1)}`;
            if (rootObject[setter] && typeof rootObject[setter] === 'function') {
                rootObject[setter](this.newValues[i]);
            }
        }
    }

    public undo(): void {
        for (let i = 0; i < this.objects.length; i++) {
            const rootObject = this.objects[i];
            const object = this.getTarget(rootObject);
            object[this.attributeName] = this.oldValues[i];
            // call setXXX();
            const setter = `set${this.attributeName[0].toUpperCase()}${this.attributeName.substring(1)}`;
            if (rootObject[setter] && typeof rootObject[setter] === 'function') {
                rootObject[setter](this.oldValues[i]);
            }
        }
    }

    public update(command: ObjectAttributeCommand) {
        this.newValues = command.newValues;
    }

}
