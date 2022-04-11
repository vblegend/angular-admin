import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { ReSizeAnchorDirective } from './directives/resize.anchor.directive';
import { MoveAnchorDirective } from './directives/move.anchor.directive';
import { ViewCanvasComponent } from './components/view-canvas/view.canvas.component';
import { ZoomControlDirective } from './directives/zoom.control.directive';
import { HmiEditorComponent } from './hmi.editor.component';
import { WidgetSchemaService } from './services/widget.schema.service';
import { RubberBandDirective } from './directives/rubber.band.directive';
import { DisignerCanvasComponent } from './components/disigner-canvas/disigner.canvas.component';
import { DisignerHotkeysDirective } from './directives/disigner.hotkeys.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectionAreaComponent } from './components/selection-area/selection.area.component';
import { RubberbandComponent } from './components/rubber-band/rubber.band.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';


import { SnapLineComponent } from './components/snap-line/snap.line.component';
import { PanControlComponent } from './components/pan-control/pan.control.component';
import { HmiViewerComponent } from './hmi.viewer.component';
import { AngularSplitModule } from 'angular-split';
import { ObjectListComponent } from './editor/components/object-list/object.list.component';
import { WidgetListComponent } from './editor/components/widget-list/widget.list.component';
import { WidgetDragDirective } from './directives/widget.drag.directive';
import { DragPreviewComponent } from './components/drag-preview/drag.preview.component';
import { PropertyGridComponent } from './editor/components/property-grid/property.grid.component';
import { WidgetEventComponent } from './editor/properties/widget.event/widget.event.component';
import { TextPropertyComponent } from './editor/properties/text.property/text.property.component';
import { NumberPropertyComponent } from './editor/properties/number.property/number.property.component';
import { SelectPropertyComponent } from './editor/properties/select.property/select.property.component';
import { PropertyElementComponent } from './editor/components/property-element/property.element.component';
// import { DataPropertyDirective } from './editor/directives/prop.directive';

export declare const HMI_COMPONENT_SCHEMA_DECLARES: WidgetSchemaService;

/**
 * services
 */
const PROVIDERS: Provider[] = [

];


const EXPORT_PIPES: Provider[] = [

];


const EXPORT_DIRECTIVES: Provider[] = [
  ReSizeAnchorDirective,
  MoveAnchorDirective,
  ZoomControlDirective,
  RubberBandDirective,
  DisignerHotkeysDirective,
  WidgetDragDirective,
  // DataPropertyDirective
];


/**
 * EXPORT CONPONENTS
 */
const EXPORT_COMPONENTS = [
  // AgentComponent,
  // BasicComponent,
  ViewCanvasComponent,
  DisignerCanvasComponent,
  HmiEditorComponent,
  HmiViewerComponent,
  SelectionAreaComponent,
  RubberbandComponent,
  SnapLineComponent,
  PanControlComponent,
  ObjectListComponent,
  WidgetListComponent,
  DragPreviewComponent,
  PropertyGridComponent,
  PropertyElementComponent,

  // propertys
  WidgetEventComponent,



  TextPropertyComponent,
  NumberPropertyComponent,
  SelectPropertyComponent
];

/**
 *  Dynamic Module
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NzDropDownModule,
    AngularSplitModule,
    NzTabsModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
    NzSelectModule,
    NzInputNumberModule
  ],
  exports: [
    EXPORT_COMPONENTS,
    EXPORT_DIRECTIVES,
    EXPORT_PIPES
  ],
  declarations: [
    EXPORT_COMPONENTS,
    EXPORT_DIRECTIVES,
    EXPORT_PIPES
  ]
})
export class HmiModule {

  public static forRoot(): ModuleWithProviders<HmiModule> {
    return {
      ngModule: HmiModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
