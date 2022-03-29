import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
// import { AgentComponent } from './components/agent/agent.component';
import { ReSizeAnchorDirective } from './directives/resize.anchor.directive';
import { MoveAnchorDirective } from './directives/move.anchor.directive';
import { BasicComponent } from './components/basic-component/basic.component';
import { PlayCanvasComponent } from './components/play-canvas/play.canvas.component';
import { ZoomControlDirective } from './directives/zoom.control.directive';
import { EditorComponent } from './editor.component';
import { ComponentSchemaService } from './services/component.schema.service';
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

export declare const HMI_COMPONENT_SCHEMA_DECLARES: ComponentSchemaService;

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
  PlayCanvasComponent,
  DisignerCanvasComponent,
  EditorComponent,
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
    NzDropDownModule
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
