import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { AgentComponent } from './components/agent/agent.component';
import { ReSizeAnchorDirective } from './directives/resize.anchor.directive';
import { MoveAnchorDirective } from './directives/move.anchor.directive';
import { BasicComponent } from './components/basic/basic.component';
import { PlayCanvasComponent } from './components/play-canvas/play.canvas.component';
import { ZoomViewerDirective } from './directives/zoom.viewer.directive';
import { PanViewerDirective } from './directives/pan.viewer.directive';
import { EditorComponent } from './editor.component';
import { ComponentSchemaService } from './services/component.schema.service';
import { SelectRectangleDirective } from './directives/select.rectangle.directive';
import { DisignerCanvasComponent } from './components/disigner-canvas/disigner.canvas.component';
import { HotkeysDirective } from './directives/hotkeys.directive';


export declare const HMI_COMPONENT_SCHEMA_DECLARES : ComponentSchemaService;

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
  ZoomViewerDirective,
  PanViewerDirective,
  SelectRectangleDirective,
  HotkeysDirective
];


/**
 * EXPORT CONPONENTS
 */
const EXPORT_COMPONENTS = [
  AgentComponent,
  BasicComponent,
  PlayCanvasComponent,
  DisignerCanvasComponent,
  EditorComponent
];

/**
 *  Dynamic Module
 */
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
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
