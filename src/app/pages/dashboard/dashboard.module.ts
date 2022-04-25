import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { HmiModule } from '@hmi/hmi.module';
import { CoreModule } from '@core/core.module';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SubmitButtonWidgetComponent } from './widgets/submit.button.widget/submit.button.widget.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ImgWidgetComponent } from './widgets/img.widget/img.widget.component';
import { SvgWidgetComponent } from './widgets/svg.widget/svg.widget.component';
import { TaskWidgetComponent } from './widgets/task-widget/task.widget.component';
import { CustomPropertiesComponent } from './custom.properties/custom.properties.component';
import { ViewerComponent } from './viewer/viewer.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';


/**
 * widget import ng-zerro-ant modules
 */
const NZMODULES = [
  NzInputNumberModule,
  NzButtonModule,
  NzIconModule,
  NzSpaceModule,
  NzToolTipModule
];

/**
 * widgets declare
 */
const WIDGETS = [
  CustomPropertiesComponent,
  ViewerComponent,
  SubmitButtonWidgetComponent,
  ImgWidgetComponent,
  SvgWidgetComponent,
  TaskWidgetComponent,

];

@NgModule({
  declarations: [
    ...WIDGETS,
  ],
  exports: [
    ...WIDGETS,
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    DashboardRoutingModule,
    CoreModule.forRoot(),
    HmiModule.forRoot(),
    ...NZMODULES,
  ],
  providers: [
    //   {
    //     provide: WidgetSchemaService,
    //     useClass: HmiSchemaService,
    //   }
  ]
})
export class DashboardModule { 

  // public static forRoot(): ModuleWithProviders<EditorModule> {
  //   return {
  //     ngModule: EditorModule,
  //     providers: [
  //       // ...PROVIDERS
  //     ]
  //   };
  // }
}
