import { ObjectUtil } from "@core/util/object.util";
import { Observable } from "rxjs";

export type DataCacheChangedHandle = () => void;


/**
 * Local data cache manager 
 */
export class LocalCache<TObject, TKey> {
    public readonly tableName: string;
    private _rows: Map<TKey, TObject>;
    public readonly primaryKeyFunc: (ev: TObject) => TKey;

    public readonly onUpdate: Observable<string>;



    /**
     * 
     * @param tableName 
     * @param primaryKey 
     * @param writable 
     */
    public constructor(tableName: string, primaryKey: (ev: TObject) => TKey, private writable: boolean = true) {
        this._rows = new Map();
        this.tableName = tableName;
        this.primaryKeyFunc = primaryKey;
        this.onUpdate = new Observable((observer )=>{
            observer.next();
        });

    }

    public load(objects: TObject[]) {
        for (let i = 0; i < objects.length; i++) {
            this.put(objects[i]);
        }
    }



    public put(object: TObject): boolean {
        if (object == null) return false;
        const key = this.primaryKeyFunc(object);
        // const fs = this.get(key);
        // if (fs) {
        //     if (this.isEqual(fs, object)) return false;
        // }
        const duplicate = ObjectUtil.clone(object);
        if (!this.writable) ObjectUtil.freeze(object);
        if (key == null) return false;
        this._rows.set(key, duplicate);
    }



    private isEqual(object1: TObject, object2: TObject) {
        const entrie1 = Object.entries(object1).toString();
        const entrie2 = Object.entries(object2).toString();
        return entrie1 === entrie2;
    }


    public remove(key: TKey): boolean {
        if (this._rows.has(key)) {
            this._rows.delete(key);
            return true;
        }
        return false;
    }

    public where(filter: (data: TObject) => boolean): TObject[] {
        const result = [];
        for (const row of this._rows) {
            if (filter(row[1])) {
                result.push(row[1]);
            }
        }
        return result;
    }


    public get(key: TKey): TObject {
        return this._rows.get(key);
    }

    public getAll(): TObject[] {
        const result = [];
        for (const row of this._rows) {
            result.push(row[1]);
        }
        return result;
    }








}