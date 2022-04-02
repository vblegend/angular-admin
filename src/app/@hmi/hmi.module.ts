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

import { SnapLineComponent } from './components/snap-line/snap.line.component';
import { PanControlComponent } from './components/pan-control/pan.control.component';
import { HmiViewerComponent } from './hmi.viewer.component';
import { AngularSplitModule } from 'angular-split';

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
  DisignerHotkeysDirective
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
  PanControlComponent
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
    AngularSplitModule
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
