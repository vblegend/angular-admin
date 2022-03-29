
export interface Vector2 {
    x: number;
    y: number;
}
export interface Rectangle {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface AnyObject {

}





export class RectangleBound {
    private _left: number = 0;
    private _top: number = 0;
    private _right: number = 0;
    private _bottom: number = 0;

    public static fromLTRB(left: number, top: number, right: number, bottom: number): RectangleBound {
        const rect = new RectangleBound();
        rect._left = left;
        rect._top = top;
        rect._right = right;
        rect._bottom = bottom;
        return rect;
    }

    public static fromLTWH(left: number, top: number, width: number, height: number): RectangleBound {
        const rect = new RectangleBound();
        rect._left = left;
        rect._top = top;
        rect.width = width;
        rect.height = height;
        return rect;
    }


    public get left(): number {
        return this._left;
    }

    public set left(value: number) {
        this._left = value;
    }

    public get top(): number {
        return this._top;
    }

    public set top(value: number) {
        this._top = null;
    }

    public get width(): number {
        return this._right - this._left;
    }
    public set width(value: number) {
        this._right = this._left + value;
    }

    public get height(): number {
        return this._bottom - this._top;
    }
    public set height(value: number) {
        this._bottom = this._top + value;
    }

    public get right(): number {
        return this._right;
    }
    public set right(value: number) {
        this._right = value;
    }

    public get bottom(): number {
        return this._bottom;
    }

    public set bottom(value: number) {
        this._bottom = value;
    }

}