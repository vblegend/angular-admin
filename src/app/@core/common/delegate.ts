export declare type Delegate = () => void;


export interface DelegateContext {
    delegate: Delegate;
    context: any;
}

