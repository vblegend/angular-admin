/**
 * 
 * 
 * 
 * 
 */

export class ObjectUtil {

    /**
     *  deep freeze object
     * @param target 
     */
    public static freeze<T>(target: T) {
        if (typeof target === 'object') {
            if (target instanceof Array) {
                for (let i = 0; i < target.length; i++) {
                    this.freeze(target[i]);
                }
            } else {
                var keys = Object.keys(target);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    this.freeze(target[key]);
                }
            }
            Object.freeze(target);
        }
    }



    /**
     * Merge object properties to target object 
     * @param target 
     * @param object 
     * @param override Overwrite existing options 
     */
    public static merge<T>(target: T, object: any, override?: boolean) {
        if (target == null || object == null) return;
        const deObject = this.clone(object);
        const keys = Object.keys(deObject);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (!target.hasOwnProperty(key) || override) {
                target[key] = deObject[key];
            }
        }
    }



    /**
     * deep clone object 
     * @param target 
     * @param thisContext 
     * @returns 
     */
    public static clone<T>(target: T, thisContext?: Object): T {
        if (typeof target === 'undefined') return undefined;
        if (typeof target === 'string') return target.substr(0) as any;
        if (typeof target === 'number') return target;
        if (typeof target === 'boolean') return target;
        if (typeof target === 'function') return target.bind(thisContext);
        if (target === null) return null;
        let result = null;
        if (target instanceof Array) {
            result = this.cloneArray<T>(target);
        } else {
            result = {};
            const keys = Object.keys(target);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                result[key] = this.clone(target[key], result);
            }
        }
        return result
    }

    /**
     * deep clone array
     * @param target 
     * @returns 
     */
    public static cloneArray<T>(target: T[]): T[] {
        const result: T[] = [];
        for (let i = 0; i < target.length; i++) {
            result.push(this.clone(target[i]));
        }
        return result;
    }

}