import { AnyObject } from "./types";

export declare type Delegate = () => void;

export declare type Action = (...params: AnyObject[]) => void;




export interface DelegateContext {
    delegate: Delegate;
    context: any;
}

