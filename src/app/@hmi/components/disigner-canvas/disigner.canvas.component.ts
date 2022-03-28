
import { ChangeDetectionStrategy, Component, ComponentRef, ElementRef, HostListener, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentSchemaService } from '@hmi/services/component.schema.service';
import { ComponentConfigure } from '../../configuration/component.element.configure';
import { EditorComponent } from '../../editor.component';
import { PlayCanvasComponent } from '../play-canvas/play.canvas.component';
import { SelectionAreaComponent } from '../selection-area/selection.area.component';

@Component({
  selector: 'ngx-disigner-canvas',
  templateUrl: './disigner.canvas.component.html',
  styleUrls: ['./disigner.canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisignerCanvasComponent extends PlayCanvasComponent {
  @Input() editor: EditorComponent;
  @ViewChild('ChildrenView', { static: true, read: ViewContainerRef }) container: ViewContainerRef;

  public selectionArea: ComponentRef<SelectionAreaComponent>;
  /**
   * 设置/获取 视图的缩放倍率
   */
  public zoomScale: number;
  private _ctrlPressed: boolean;


  public get isEditor(): boolean {
    return true;
  }
  public get ctrlPressed(): boolean {
    return this._ctrlPressed;
  }


  /**
   *
   */
  constructor(protected injector: Injector, public provider: ComponentSchemaService) {
    super(injector, provider);
    this.zoomScale = 1;
  }



  protected onInit(): void {
    super.onInit();
    this.initSelectionAreaComponent();
  }


  private initSelectionAreaComponent() {
    this.selectionArea = this.generateComponent(SelectionAreaComponent);
    this.selectionArea.instance.init(this);
    this.selectionArea.hostView.detach();
    this.container.insert(this.selectionArea.hostView);
  }





  @HostListener('document:keydown', ['$event'])
  public onKeybordDown(ev: KeyboardEvent): void {
    if (ev.key == 'Control') {
      this._ctrlPressed = true;
    }
  }


  @HostListener('document:keyup', ['$event'])
  public onKeybordUp(ev: KeyboardEvent): void {
    if (ev.key == 'Control') {
      this._ctrlPressed = false;
    }
  }


}
