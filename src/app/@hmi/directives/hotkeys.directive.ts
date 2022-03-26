import { Directive, HostListener, Input } from "@angular/core";
import { BaseDirective } from "@core/directives/base.directive";
import { EditorComponent } from "@hmi/editor.component";


@Directive({
    selector: '[hmi-hotkey]'
})

export class HotkeysDirective extends BaseDirective {
    @Input() editor: EditorComponent;

    protected onInit(): void {

    }






    @HostListener('document:keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        switch (event.key.toLowerCase()) {
            case 'c':
                if (event.ctrlKey) {
                    // this.editor.executeCopy();
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case 'v':
                if (event.ctrlKey) {
                    // this.editor.executePaste();
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case 'z':
                if (event.ctrlKey) {
                    this.editor.undo();
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case 'y':
                if (event.ctrlKey) {
                    this.editor.redo();
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;

        }

    }





}