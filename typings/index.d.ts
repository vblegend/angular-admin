
declare module 'raw-loader!*' {
    const contents: string;
    export = contents;
}

declare module '!raw-loader!*' {
    const contents: string;
    export = contents;
}


declare module '!!raw-loader!*' {
    const contents: string;
    export = contents;
}


declare module "*.txt" {
    const content: string;
    export default content;
}
