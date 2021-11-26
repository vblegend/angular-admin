import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
/**
 * services
 */
const PROVIDERS: Provider[] = [

];


const EXPORT_PIPES: Provider[] = [

];


const EXPORT_DIRECTIVES: Provider[] = [

];


/**
 * EXPORT CONPONENTS
 */
const EXPORT_COMPONENTS = [

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
export class DynamicModule {

  public static forRoot(): ModuleWithProviders<DynamicModule> {
    return {
      ngModule: DynamicModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
