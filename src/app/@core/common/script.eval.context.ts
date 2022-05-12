/* eslint-disable @typescript-eslint/no-explicit-any */

import { environment } from 'environments/environment';

/**
 * 脚本的执行上下文环境
 * 被注册的对象可以在脚本中直接以名称访问
 */
export class ScriptEvalContext {
    private registerNames: string[] = [];
    private registerValues: any[] = [];

    /**
     * 创建一个脚本执行上下文对象
     * @param baseContext 从一个旧的复制所有注册环境
     */
    constructor(baseContext?: ScriptEvalContext) {
        if (baseContext) {
            this.registerNames = baseContext.names;
            this.registerValues = baseContext.values;
        } else {
            this.register('$floor', Math.floor);
            this.register('$random', Math.random);
            this.register('$max', Math.max);
            this.register('$min', Math.min);
            this.register('$round', Math.round);
            this.register('$abs', Math.abs);
            this.register('$pow', Math.pow);
            this.register('$log', console.log);
            this.register('$error', console.error);
            this.register('$warn', console.warn);
            this.register('$vars', {});
        }
    }

    /**
     * 注册一个变量/对象/函数 到脚本的执行上下文中\
     * 不要注册值类型，值类型只能作为常量 不能修改。
     * @param name 名字
     * @param object 对象
     */
    public register(name: string, object: any): void {
        const index = this.registerNames.indexOf(name);
        if (index > -1) {
            if (!environment.production) console.warn(`EvalContext => ${name} 已存在，原记录被覆盖掉。`);
            this.registerValues[index] = object;
        } else {
            this.registerNames.push(name);
            this.registerValues.push(object);
        }
    }

    /**
     * 移除一个已注册的对象
     * @param name 
     */
    public remove(name: string): void {
        const index = this.registerNames.indexOf(name);
        if (index > -1) {
            this.registerNames.splice(index, 1);
            this.registerValues.splice(index, 1);
        }
    }

    /**
     * 获取一个注册的对象
     */
    public get(name: string): any {
        const index = this.registerNames.indexOf(name);
        if (index > -1) return this.registerValues[index];
        return null;
    }


    /**
     * 获取已注册的所有名字
     */
    public get names(): string[] {
        return this.registerNames.slice();
    }

    /**
     * 获取已注册的所有对象
     */
    public get values(): string[] {
        return this.registerValues.slice();
    }



    public dispose(): void {
        this.registerNames.length = 0;
        this.registerValues.length = 0;
    }


}

