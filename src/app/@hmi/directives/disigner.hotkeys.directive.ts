import { Directive, HostListener, Input } from "@angular/core";
import { BaseDirective } from "@core/directives/base.directive";
import { WidgetRemoveCommand } from "@hmi/commands/widget.remove.command";
import { HmiEditorComponent } from "@hmi/hmi.editor.component";


@Directive({
    selector: '[hmi-disigner-hotkey]'
})
/**
 * 快捷键指令
 * 用于在编辑器下快捷键的实现
 */
export class DisignerHotkeysDirective extends BaseDirective {
    @Input() editor: HmiEditorComponent;

    protected onInit(): void {

    }

    @HostListener('document:keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        switch (event.code.toLowerCase()) {
            case 'delete':
                if (this.editor.selection.length > 0) {
                    this.editor.execute(new WidgetRemoveCommand(this.editor, this.editor.selection.objects));
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case 'keyc':
                if (event.ctrlKey) {
                    // this.editor.executeCopy();
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case 'keyv':
                if (event.ctrlKey) {
                    // this.editor.executePaste();
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case 'keyz':
                if (event.ctrlKey) {
                    this.editor.undo();
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case 'keyy':
                if (event.ctrlKey) {
                    this.editor.redo();
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;

        }

    }





}