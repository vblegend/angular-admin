import { Component, ElementRef, HostListener, Injector, Input, ViewChild } from '@angular/core';
import { TimerTask, TimeState } from '@core/common/timer.task';
import { GenericComponent } from '@core/components/basic/generic.component';
import { FileUtil } from '@core/util/file.util';
import { DisignerCanvasComponent } from '@hmi/components/disigner-canvas/disigner.canvas.component';
import { GraphicConfigure } from '@hmi/configuration/graphic.configure';
import { HmiEditorComponent } from '@hmi/editor/hmi.editor.component';
import { HmiEditorService } from '@hmi/services/hmi.editor.service';
import { Subject } from 'rxjs';
import { CanvasSettingComponent } from '../canvas-setting/canvas.setting.component';


@Component({
  selector: 'hmi-editor-toolbar',
  styleUrls: ['./toolbar.component.less'],
  templateUrl: './toolbar.component.html',
})
export class EditorToolbarComponent extends GenericComponent {
  public toolbarState: boolean = false;

  public readonly onSave: Subject<GraphicConfigure>;

  constructor(injector: Injector, public editor: HmiEditorComponent, private hmiEditorService: HmiEditorService) {
    super(injector);
    this.onSave = new Subject<GraphicConfigure>();
  }

  public fullscreen_click(): void {
    if (this.isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  public get fullScreenIcon(): string {
    return document.body.scrollHeight === window.screen.height &&
      document.body.scrollWidth === window.screen.width ?
      'icon-hide-sidebar' : 'icon-full-screen';
  }


  public get isFullScreen(): boolean {
    return document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width;
  }


  @HostListener('mouseenter', ['$event'])
  public onMouseEnter(event: MouseEvent): void {
    this.toolbarState = true;
    if (this.animateTimer && this.animateTimer.state == TimeState.Runing) {
      this.animateTimer.cancel();
    }
  }

  @HostListener('mouseleave@outside', ['$event'])
  public onMouseLeave(event: MouseEvent): void {
    this.animateTimer = this.timeout(0.3, () => {
      this.run(() => { this.toolbarState = false; });
    });
  }
  private animateTimer!: TimerTask;

  public save_click(): void {
    const json = this.editor.toJson();
    this.editor.onSave.next(json);
  }


  public async setting_click(): Promise<void> {
    const drawerRef = this.openDrawer<CanvasSettingComponent, DisignerCanvasComponent, number>({
      nzTitle: '组态设置',
      nzContent: CanvasSettingComponent,
      nzMaskClosable: false,
      nzWidth: 'auto',
      nzContentParams: {
        canvas: this.editor.canvas
      }
    });
    const result = await this.waitDrawer(drawerRef);
    console.log(result);
  }


  public async import_click(): Promise<void> {
    const file = await FileUtil.selectLocalFile('application/json');
    if (file && file.length == 1) {
      const json = await FileUtil.loadJsonFromFile<GraphicConfigure>(file[0]);
      try {
        this.editor.loadFromJson(json);
        this.notification.success('提示', '导入成功');
      } catch (ex) {
        this.notification.error('导入失败', `${ex}`);
      }
    }
  }

  public export_click(): void {
    const json = this.editor.toJson();
    FileUtil.download(json, 'widgets.json');
  }

  public close_click(): void {
    this.hmiEditorService.close();
  }




  public retracted_click(): void {
    this.toolbarState = !this.toolbarState;
  }


}
