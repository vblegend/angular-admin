import { AnyObject } from "./types";


export declare type Delegate = () => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type Action = (...params: any[]) => void;




export interface DelegateContext {
    delegate: Delegate;
    context: Object;
}

