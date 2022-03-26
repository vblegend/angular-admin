import { Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { TemplateService } from '@core/services/template.service';

@Component({
  selector: 'ngx-global-templates',
  templateUrl: './global-templates.component.html',
  styleUrls: ['./global-templates.component.less']
})
export class GlobalTemplatesComponent {

  @ViewChild('globalErrorNotification', { static: true }) globalErrorNotification: TemplateRef<any>;

  constructor(private templateService: TemplateService) { }

  public ngAfterViewInit(): void {
    this.templateService.registerTemplate('#globalErrorNotification', this.globalErrorNotification);
  }


}
