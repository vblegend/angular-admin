import { BasicComponent } from '@hmi/components/basic-component/basic.component';
import { EditorComponent } from '@hmi/editor.component';
import { BasicCommand } from './basic.command';

export class ObjectAttributeCommand extends BasicCommand {






    /**
     * 设置对象属性值
     * @param editor 
     * @param object 
     * @param path   $开头的变量将设置对象的binding的属性中
     * @param newValue 
     */
    public constructor(editor: EditorComponent, objects: BasicComponent[], path: string, newValues: Object[], batchNo?: number) {
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
        this.newValues = newValues;
        if (this.newValues.length == 1 && this.oldValues.length > 1) {
            this.newValues.fill(newValues[0], 0, this.oldValues.length);
        }
    }

    public getTarget(object: BasicComponent): Object {
        let root = object;
        for (let i = 0; i < this.attributePaths.length; i++) {
            const key = this.attributePaths[i];
            root = root[key];
        }
        return root;
    }




    public execute(): void {
        for (let i = 0; i < this.objects.length; i++) {
            const object = this.getTarget(this.objects[i]);
            object[this.attributeName] = this.newValues[i];
            // call setXXX();
            const setter = `set${this.attributeName[0].toUpperCase()}${this.attributeName.substring(1)}`;
            if (object[setter] && typeof object[setter] === 'function') {
                object[setter](this.newValues[i]);
            }
        }
    }

    public undo(): void {
        for (let i = 0; i < this.objects.length; i++) {
            const object = this.getTarget(this.objects[i]);
            object[this.attributeName] = this.oldValues[i];
            // call setXXX();
            const setter = `set${this.attributeName[0].toUpperCase()}${this.attributeName.substring(1)}`;
            if (object[setter] && typeof object[setter] === 'function') {
                object[setter](this.oldValues[i]);
            }
        }
    }

    public update(command: ObjectAttributeCommand) {
        this.newValues = command.newValues;
    }

}
