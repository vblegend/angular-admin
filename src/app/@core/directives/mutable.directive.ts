import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';



@Directive({
    selector: '[mutable]'
})

export class MutableDirective {

    @Input() highlightColor: string;
    @Output() mouseEnter = new EventEmitter<boolean>();

    isDragging = false;
    isResizingX = false;
    isResizingY = false;
    shiftPosition = { x: 0, y: 0 };
    element: any = null;

    constructor(private el: ElementRef) {
        this.element = this.el.nativeElement;
    }



    @HostListener('mouseenter')
    onMouseEnter() {
        this.highlight(this.highlightColor || 'yellow');
        this.mouseEnter.emit(true);
    }



    @HostListener('mouseleave')
    onMouseLeave() {
        this.highlight(null);
        this.mouseEnter.emit(false);
    }



    private highlight(color: string) {
        this.element.style.backgroundColor = color;
    }



    makesureInParent(position: any) {
        const parent: any = this.element.parentNode;
        if (position.x < 0) {
            position.x = 0;
        } else if (position.x > parent.clientWidth - this.element.clientWidth) {
            position.x = parent.clientWidth - this.element.clientWidth;
        }
        if (position.y < 0) {
            position.y = 0;
        } else if (position.y > parent.clientHeight - this.element.clientHeight) {
            position.y = parent.clientHeight - this.element.clientHeight;
        }
        return position;
    }



    dragElement(ev: any) {
        // console.log('do drag element');
        const parentRect = this.element.parentNode.getBoundingClientRect();
        let newPosition = {
            x: ev.clientX - parentRect.left - this.shiftPosition.x,
            y: ev.clientY - parentRect.top - this.shiftPosition.y
        };

        newPosition = this.makesureInParent(newPosition);
        // 像素定位
        this.element.style.left = newPosition.x + 'px';
        this.element.style.top = newPosition.y + 'px';
        // 百分比方式, 四舍五入，保留整数
        // this.element.style.left = Number(newPosition.x * 100.0 / this.element.parentNode.clientWidth).toFixed(0) + '%';
        // this.element.style.top = Number(newPosition.y * 100.0 / this.element.parentNode.clientHeight).toFixed(0) + '%';
    }



    initDragging(ev: MouseEvent) {
        const elementRect = this.element.getBoundingClientRect();
        this.shiftPosition.x = ev.clientX - elementRect.left;
        this.shiftPosition.y = ev.clientY - elementRect.top;
        console.log('shiftPosition x:' + this.shiftPosition.x + ' y:' + this.shiftPosition.y);
    }



    setDragging(cursor: string, event: any) {
        this.isDragging = cursor === 'move';
        if (this.isDragging) {
            this.initDragging(event);
        }
    }



    resizeElementX(ev: any) {
        // console.log('do resize element x');
        const elementRect = this.element.getBoundingClientRect();
        const parentRect = this.element.parentNode.getBoundingClientRect();
        const min = this.element.parentNode.clientWidth / 10;
        // 改变宽度
        let right = ev.clientX + this.shiftPosition.x;
        if (right - elementRect.left < min) {
            right = elementRect.left + min;
        } else if (right > parentRect.right) {
            right = parentRect.right;
        }
        const width = right - elementRect.left;
        // this.element.style.width = Number(width * 100.0 / this.element.parentNode.clientWidth).toFixed(0) + '%';

        this.element.style.width = `${width}px`;
    }



    resizeElementY(ev: any) {
        // console.log('do resize element y');
        const elementRect = this.element.getBoundingClientRect();
        const parentRect = this.element.parentNode.getBoundingClientRect();
        const min = this.element.parentNode.clientHeight / 10;
        // 改变宽度
        let bottom = ev.clientY + this.shiftPosition.y;
        if (bottom - elementRect.top < min) {
            bottom = elementRect.top + min;
        } else if (bottom > parentRect.bottom) {
            bottom = parentRect.bottom;
        }
        const height = bottom - elementRect.top;
        // this.element.style.height = Number(height * 100.0 / this.element.parentNode.clientHeight).toFixed(0) + '%';
        this.element.style.height = `${height}px`;
    }



    initResizing(ev: any) {
        const elementRect = this.element.getBoundingClientRect();
        this.shiftPosition.x = elementRect.right - ev.clientX;
        this.shiftPosition.y = elementRect.bottom - ev.clientY;
        console.log('shiftPosition x:' + this.shiftPosition.x + ' y:' + this.shiftPosition.y);
    }




    setResizing(cursor: string, event: any) {
        if (cursor == null || cursor.indexOf('-resize') < 0) {
            this.isResizingX = false;
            this.isResizingY = false;
            return;
        }
        cursor = cursor.replace('-resize', '');
        this.isResizingX = cursor.indexOf('e') >= 0;
        this.isResizingY = cursor.indexOf('s') >= 0;
        this.initResizing(event);

    }



    getMutableCursor(ev): string {
        const elementRect = this.element.getBoundingClientRect();
        const padding = 20;
        const pt = { x: ev.clientX, y: ev.clientY };

        let cursor = '';
        if (pt.y >= elementRect.top && pt.y <= elementRect.top + padding) {
            // 上边缘
            cursor += 'n';
        } else if (pt.y >= elementRect.bottom - padding && pt.y <= elementRect.bottom) {
            // 下边缘
            cursor += 's';
        }

        if (pt.x >= elementRect.left && pt.x <= elementRect.left + padding) {
            // 左边缘
            cursor += 'w';
        } else if (pt.x >= elementRect.right - padding && pt.x <= elementRect.right) {
            // 右边缘
            cursor += 'e';
        }

        if (cursor === '') {
            return 'move';
        }
        return cursor + '-resize';
    }



    isParent(obj, parentObj) {
        while (obj !== undefined && obj != null && obj.tagName.toUpperCase() !== 'BODY') {
            if (obj === parentObj) {
                return true;
            }
            obj = obj.parentNode;
        }
        return false;
    }



    @HostListener('document:mousedown', ['$event'])
    onMouseDown(ev: any) {
        if (this.isParent(ev.target, this.element)) {
            console.log(ev.target.nodeName + ' x:' + ev.clientX + ' y:' + ev.clientY);
            const cursor = this.getMutableCursor(ev);
            if (cursor === 'move') {
                this.setDragging(cursor, ev);
            } else {
                this.setResizing(cursor, ev);
            }
        }
    }



    @HostListener('document:mousemove', ['$event'])
    onMouseMove(ev: any) {
        this.element.style.cursor = this.getMutableCursor(ev);
        if (this.isDragging) {
            this.dragElement(ev);
        }

        if (this.isResizingX) {
            this.resizeElementX(ev);
        }
        if (this.isResizingY) {
            this.resizeElementY(ev);
        }
    }



    @HostListener('document:mouseup', ['$event'])
    onMouseUp() {
        this.setDragging(null, null);
        this.setResizing(null, null);
    }

}