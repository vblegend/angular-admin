import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      {
        path: 'inputs',
        title: { value: 'inputs', needsTranslator: true },
        component: FormInputsComponent,
      },
      {
        path: 'layouts',
        title: { value: 'layouts', needsTranslator: true },
        component: FormLayoutsComponent,
      },
      {
        path: 'layouts',
        title: { value: 'layouts', needsTranslator: true },
        component: FormLayoutsComponent,
      },
      {
        path: 'buttons',
        title: { value: 'buttons', needsTranslator: true },
        component: ButtonsComponent,
      },
      {
        path: 'datepicker',
        title: { value: 'datepicker', needsTranslator: true },
        component: DatepickerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class FormsRoutingModule {
}

