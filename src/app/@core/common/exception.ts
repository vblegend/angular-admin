
export class Exception {
    private _code: number;
    private _message: string;

    /**
     *
     */
    protected constructor(message: string, code?: number) {
        this._code = code != null ? code : -1;
        this._message = message
    }

    public get code(): number {
        return this._code;
    }

    public get message(): string {
        return this._message;
    }

    public static build(message: string, code?: number): Exception {
        return new Exception(message, code);
    }

    public toString(): string {
        return `[${this._code}]${this._message}`;
    }


}