import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { AgentComponent } from './components/agent/agent.component';
import { ReSizeAnchorDirective } from './directives/resize.anchor.directive';
import { MoveAnchorDirective } from './directives/move.anchor.directive';
import { BasicComponent } from './components/basic/basic.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ZoomViewerDirective } from './directives/zoom.viewer.directive';
import { PanViewerDirective } from './directives/pan.viewer.directive';
import { EditorComponent } from './editor.component';
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
  PanViewerDirective
];


/**
 * EXPORT CONPONENTS
 */
const EXPORT_COMPONENTS = [
  AgentComponent,
  BasicComponent,
  CanvasComponent,
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
export class VisualModule {

  public static forRoot(): ModuleWithProviders<VisualModule> {
    return {
      ngModule: VisualModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
