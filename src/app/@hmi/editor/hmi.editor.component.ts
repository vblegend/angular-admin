import { Component, ComponentRef, ElementRef, Injector, Input, OnInit, QueryList, TemplateRef, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { BasicCommand } from './commands/basic.command';
import { DisignerCanvasComponent } from './components/disigner-canvas/disigner.canvas.component';
import { HistoryService } from './core/history.service';
import { SelectionService } from './core/selection.service';
import { AdsorbService } from './core/adsorb.service';
import { WidgetSchemaService } from '../services/widget.schema.service';
import { IOutputData } from 'angular-split'
import { WidgetAttributeCommand } from './commands/widget.attribute.command';
import { WidgetRemoveCommand } from './commands/widget.remove.command';
import { SelectionFillCommand } from './commands/selection.fill.command';
import { MetaDataService } from '@hmi/editor/services/meta.data.service';
import { BatchCommand } from './commands/batch.command';
import { ClipboardData, GraphicConfigure } from '@hmi/configuration/graphic.configure';
import { Subject } from 'rxjs';
import { WidgetAddCommand } from './commands/widget.add.command';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { ClipDocumentMagicCode, CurrentVersion, DocumentMagicCode, HmiZoomMode } from '@hmi/editor/core/common';
import { PropertiesTemplatesComponent } from './components/properties-templates/properties.templates.component';
import { BasicPropertiesComponent } from './basic.properties/basic.properties.component';
import { PropertyTemplateManager } from './core/property.template.manager';
import { WidgetPropertiesService } from '@hmi/editor/services/widget.properties.service';
import { verifyClipboardDocument, verifyDocument } from '@hmi/configuration/global.default.configure';
import { HmiMath } from '@hmi/utility/hmi.math';
import { ObjectListComponent } from './components/object-list/object.list.component';

@Component({
  selector: 'hmi-editor',
  templateUrl: './hmi.editor.component.html',
  styleUrls: ['./hmi.editor.component.less'],
  providers: [MetaDataService]
})
export class HmiEditorComponent extends GenericComponent {
  /**
   * ????????????????????????
   * ??????????????????????????????
   */
  public readonly DEFAULT_ADSORB_THRESHOLD: number = 7;
  // @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective>

  @ViewChild('canvas', { static: true }) canvas!: DisignerCanvasComponent;

  @ViewChild('objectList', { static: true }) objectList!: ObjectListComponent;


  private filterWidgets: ComponentRef<BasicWidgetComponent>[] = [];
  public leftAreaVisible: boolean = true;
  public rightAreaVisible: boolean = true;




  /**
   * ????????????
   */
  public readonly onSave: Subject<GraphicConfigure>;

  /**
   * ?????????????????????
   */
  public readonly templates: PropertyTemplateManager;

  /**
   * ??????????????????
   */
  public readonly adsorbService: AdsorbService;

  /**
   * ??????????????????
   */
  public readonly history: HistoryService;

  /**
   * ??????????????????
   */
  public readonly selection: SelectionService;


  /**
   * ????????????
   */
  public width: number = 1920;

  /**
   * ????????????
   */
  public height: number = 1080;

  /**
   * ??????????????????
   */
  public zoomMode: HmiZoomMode = HmiZoomMode.Scale;


  /**
   *
   */
  constructor(public injector: Injector, public provider: WidgetSchemaService) {
    super(injector);
    this.history = new HistoryService(this);
    this.selection = new SelectionService();
    this.adsorbService = new AdsorbService(this);
    this.onSave = new Subject<GraphicConfigure>();
    this.templates = new PropertyTemplateManager(this);
    this.templates.addTemplate(BasicPropertiesComponent);
  }

  protected onInit(): void {
    super.onInit();
    this.templates.install();
  }

  public gutterDblClick(vv: IOutputData): void {
    if (vv.sizes == null) {
      if (vv.gutterNum == 1) this.leftAreaVisible = !this.leftAreaVisible;
      if (vv.gutterNum == 2) this.rightAreaVisible = !this.rightAreaVisible;
    } else {
      if (vv.gutterNum == 2 || (vv.sizes[0].valueOf() === '*' && vv.gutterNum == 1)) {
        this.rightAreaVisible = !this.rightAreaVisible;
      } else if (vv.gutterNum == 1) {
        this.leftAreaVisible = !this.leftAreaVisible;
      }
    }
  }





  /**
   * ???????????????????????????????????????ObjectList ???????????????
   */
  public detachOutsideSelection(): void {
    this.reattachOutsideSelection();
    this.objectList.detachView();
    this.filterWidgets = this.canvas.children.filter(e => !this.selection.contains(e));
    for (const w of this.filterWidgets) {
      w.changeDetectorRef.detach();
    }
  }

  /**
   * ???????????????????????????????????????ObjectList???????????????
   */
  public reattachOutsideSelection(): void {
    for (const w of this.filterWidgets) {
      w.changeDetectorRef.reattach();
    }
    this.objectList.attachView();
    this.filterWidgets = [];
  }





  /**
   * ??????????????????
   * @param cmd 
   */
  public execute(cmd: BasicCommand | null): void {
    if (cmd) {
      this.history.execute(cmd);
    }
    this.selection.update();
    // if (this.canvas.selectionArea) this.canvas.selectionArea.detectChanges();

  }

  /**
   * ????????????????????????\
   * ?????????????????????????????????
   * @param cmds 
   * @returns 
   */
  public executes(...cmds: BasicCommand[]): void {
    if (cmds == null || cmds.length == 0) return;
    if (cmds.length == 1) {
      this.history.execute(cmds[0]);
    } else if (cmds.length > 0) {
      const cmd = new BatchCommand(this, ...cmds);
      this.history.execute(cmd);
    }
    this.selection.update();
    // this.canvas.selectionArea.detectChanges();
  }



  public appendFromJson(json: GraphicConfigure): void {
    verifyDocument(json);
    const objects: ComponentRef<BasicWidgetComponent>[] = [];
    if (json.zoomMode != null) this.zoomMode = json.zoomMode;
    if (json.width != null) this.width = json.width;
    if (json.height != null) this.height = json.height;
    for (const config of json.widgets) {
      const compRef = this.canvas.parseComponent(config);
      if (compRef) objects.push(compRef);
    }
    // ??????????????? ???????????????
    this.execute(new WidgetAddCommand(this, objects, true));
    this.canvas.updatezIndexs();
  }


  /**
   * ???Json?????????????????????
   * @param json 
   */
  public loadFromJson(json: GraphicConfigure, cleanHistory?: boolean): void {
    verifyDocument(json);
    const objects: ComponentRef<BasicWidgetComponent>[] = [];
    if (json.zoomMode != null) this.zoomMode = json.zoomMode;
    if (json.width != null) this.width = json.width;
    if (json.height != null) this.height = json.height;
    for (const config of json.widgets) {
      const compRef = this.canvas.parseComponent(config);
      if (compRef) objects.push(compRef);
    }
    if (cleanHistory) this.history.clear();
    // ??????????????? ???????????????
    this.execute(new BatchCommand(this,
      // ????????????????????????
      new SelectionFillCommand(this, []),
      // ??????????????????
      new WidgetRemoveCommand(this, this.canvas.children),
      // ??????????????????
      new WidgetAddCommand(this, objects, false),
    ));
    this.canvas.updatezIndexs();
  }



  /**
  * ???????????????????????????json
  */
  public toJson(): GraphicConfigure {
    const widgets = this.canvas.children.map(e => e.instance.configure);
    return {
      magic: DocumentMagicCode,
      version: CurrentVersion,
      width: this.width,
      height: this.height,
      zoomMode: this.zoomMode,
      widgets: widgets
    };
  }


  /**
   * ????????????
   */
  public executeSelectAll(): void {
    this.execute(new SelectionFillCommand(this, this.canvas.children));
  }

  /**
   * ????????????
   */
  public executeUndo(): void {
    this.history.undo();
    this.selection.update();
  }

  /**
   * ????????????
   */
  public executeRedo(): void {
    this.history.redo();
    this.selection.update();
  }

  /**
   * ??????????????????
   * @returns 
   */
  public executeGroupCommand(): void {
    const hasGroupObjects = this.canvas.children.filter(e => e.instance.groupId != null);
    const groupIds = hasGroupObjects.map(e => e.instance.groupId!);
    groupIds.push(0);
    const maxGroupId = Math.max(...groupIds);
    this.execute(new WidgetAttributeCommand(this, this.selection.objects, 'configure/group', [maxGroupId + 1]));
  }

  /**
   * ??????????????????
   * @returns 
   */
  public executeUnGroupCommand(): void {
    this.execute(new WidgetAttributeCommand(this, this.selection.objects, 'configure/group', [null]));
  }


  /**
   * ??????????????????
   */
  public executeLockCommand(): void {
    this.execute(new WidgetAttributeCommand(this, this.selection.objects, 'configure/locked', [true]));
  }


  /**
   * ????????????
   */
  public executeUnlockCommand(): void {
    this.execute(new WidgetAttributeCommand(this, this.selection.objects, 'configure/locked', [null]));
  }




  /**
   * ??????????????????
   */
  public executeCutCommand(): void {
    if (this.selection.length > 0) {
      const document: ClipboardData = {
        magic: ClipDocumentMagicCode,
        version: CurrentVersion,
        widgets: this.selection.objects.map(e => e.instance.configure)
      }
      window.navigator.clipboard.writeText(JSON.stringify(document)).then(() => {
        this.execute(new WidgetRemoveCommand(this, this.selection.objects));
      });
    }
  }



  /**
   * ??????
   */
  public executeCopyCommand(): void {
    if (this.selection.length > 0) {
      const document: ClipboardData = {
        magic: ClipDocumentMagicCode,
        version: CurrentVersion,
        widgets: this.selection.objects.map(e => e.instance.configure)
      }
      window.navigator.clipboard.writeText(JSON.stringify(document)).then(() => {
      });
    }
  }

  /**
   * ??????
   */
  public executePasteCommand(): void {
    window.navigator.clipboard.readText().then(data => {
      try {
        const document = JSON.parse(data) as ClipboardData;
        verifyClipboardDocument(document);
        this.randomDocument(document);
        const widgets: ComponentRef<BasicWidgetComponent>[] = [];
        for (const widgetConfig of document.widgets) {
          const widget = this.canvas.parseComponent(widgetConfig);
          widgets.push(widget!);
        }
        // ??????????????? ???????????????
        this.execute(new WidgetAddCommand(this, widgets, true));
        window.navigator.clipboard.writeText(JSON.stringify(document)).then(() => { });
      } catch (e) {
        console.error(e);
      }
    });
  }

  private randomDocument(document: ClipboardData) {
    for (const widget of document.widgets) {
      widget.id = this.generateId();
      widget.name = this.generateName(widget.name);
      widget.rect!.left! += 10;
      widget.rect!.top! += 10;
    }
  }









  public executeDeleteCommand(): void {
    if (this.selection.length > 0) {
      this.execute(new WidgetRemoveCommand(this, this.selection.objects));
    }
  }







  protected onDestroy(): void {
    super.onDestroy();
    console.log('?????????????????????');
  }




  private generateName(baseName: string): string {
    let i = 1;
    for (; ;) {
      const name = baseName + i.toString();
      if (this.canvas.findWidgetByName(name) == null) return name;
      i++;
    }
  }

  private generateId(): string {
    for (; ;) {
      const id = HmiMath.randomString(6);
      if (this.canvas.findWidgetById(id) == null) return id;
    }
  }




}

