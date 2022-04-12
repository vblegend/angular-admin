import { AnyObject } from "./types";

export declare type Delegate = () => void;

export declare type Action = (...params: any[]) => void;




export interface DelegateContext {
    delegate: Delegate;
    context: any;
}

