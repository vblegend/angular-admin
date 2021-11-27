
export class Exception {

    public readonly host: string;

    public readonly code: number;

    public readonly message: string;

    /**
     *
     */
    protected constructor(host: string, message: string, code?: number) {
        this.host = host;
        this.code = code != null ? code : -1;
        this.message = message
    }



    public static build(host: string, message: string, code?: number): Exception {
        return new Exception(host, message, code);
    }

    public static fromCatch(host: string, ex: any, message: string): Exception {
        const exc = new Exception(host, message);
        return Object.assign(ex, exc);
    }

    public toString(): string {
        return `[${this.host}:${this.code}]=>${this.message}`;
    }


}