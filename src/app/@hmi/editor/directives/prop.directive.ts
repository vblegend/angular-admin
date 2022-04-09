import { Directive, EventEmitter, HostListener, Inject, Injector, Input, OnChanges, Optional, Output, Self, SimpleChanges, ViewChild } from "@angular/core";
import { ControlValueAccessor, DefaultValueAccessor, NgModel, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Action } from "@core/common/delegate";
import { BaseDirective } from "@core/directives/base.directive";
import { WidgetRemoveCommand } from "@hmi/commands/widget.remove.command";
import { HmiEditorComponent } from "@hmi/hmi.editor.component";
import { NzSelectComponent } from "ng-zorro-antd/select";


@Directive({
    selector: '[hmi-data-property]'
})
/**
 * 快捷键指令
 */
export class DataPropertyDirective extends BaseDirective implements OnChanges {
    @ViewChild(NgModel, { static: false }) model?: NgModel;



    @Input()
    public name: string;

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('ngModel')
    public ngModel: any;



    private valueAccessor:ControlValueAccessor;

    /**
     *
     */
    constructor(@Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[], protected injector: Injector) {
        super(injector);
        this.valueAccessor = this.selectValueAccessor(valueAccessors)
    }


    private selectValueAccessor(valueAccessors: ControlValueAccessor[]): ControlValueAccessor {
        // for (const accessor of valueAccessors) {
        //     if (accessor.constructor === DefaultValueAccessor) {
        //         return accessor;
        //     }else if(Object.getPrototypeOf(accessor.constructor) === BuiltInControlValueAccessor)
        // }
        return valueAccessors[0];
    }






    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.dataControl) {
            if(this.valueAccessor){
                // this.valueAccessor!.registerOnChange((e) => {
                //     console.log(e);
                    
                // });


                // if(this.valueAccessor instanceof NzSelectComponent){
                //     this.valueAccessor.ngModelChange
                // }

          


            }


        }
    }






    protected onInit(): void {

        console.log(this.model);
    }


    @HostListener('input@outside', ['$event'])
    public onInput(event: InputEvent): void {
        console.log(this.ngModel);

    }


    @HostListener('click@outside', ['$event'])
    public onClick(event: MouseEvent): void {

        console.log(event);
    }

    @HostListener('ngModelChange@outside', ['$event'])
    public onChange(event: MouseEvent): void {

        console.log(event);
    }



    public getValue() {

    }




}