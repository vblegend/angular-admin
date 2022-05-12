/* eslint-disable @typescript-eslint/no-explicit-any */

import { ScriptEvalContext } from "@core/common/script.eval.context";

/**
 * 支持上下文的脚本执行器工具类
 */
export class EvalUtil {





    /**
     * 构建一个脚本方法对象
     * @param script 脚本
     * @param argNames 脚本的参数变量名列表
     * @param thisContext 脚本的this上下文对象
     * @param globalContext 脚本的全局变量对象，上下文中值类型对象在构建后将不可改变。
     * @returns 函数对象
     */
    public static buildFunction(script: string, argNames?: string[], thisContext?: any, globalContext?: ScriptEvalContext): Function {
        const globalVars = globalContext ? globalContext.names.join(', ') : '';
        const globalVarValues = globalContext ? globalContext.values : [];
        const funcScript = `function $MAIN______FUNCTION(${argNames ? argNames.join(', ') : ''}){\n${script}\n}\nreturn $MAIN______FUNCTION;`
        const func = Function(globalVars, funcScript);
        const myFunction = func(...globalVarValues);
        return thisContext ? myFunction.bind(thisContext) : myFunction;
    }


    /**
     * 执行一个无参数的脚本
     * @param script 脚本
     * @param params 脚本的调用参数
     * @param thisContext 脚本this 上下文对象 
     * @param globalContext 全局上下文对象，上下文中值类型对象在构建后将不可改变。
     * @returns 
     */
    public static eval<TResult>(script: string, params: Record<string, any>, thisContext?: any, globalContext?: ScriptEvalContext): TResult {
        if (params == null) params = {};
        const func = this.buildFunction(script, Object.keys(params), thisContext, globalContext);
        return func(...Object.values(params));
    }



}