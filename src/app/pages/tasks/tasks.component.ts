import { Component, OnInit } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';

import { NzTableFilterFn, NzTableFilterList, NzTableFilterValue, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { SchedulingTask, TaskMode } from './tasks.model';


@Component({
  selector: 'ngx-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.less']
})
export class TasksComponent extends GenericComponent {
  public searchValue: string;
  public serviceFilters: NzTableFilterList;
  public listOfRandomUser: SchedulingTask[] = [];
  public listOfDisplay: SchedulingTask[] = [];
  public loading: boolean;
  public visible: boolean;





  protected onInit(): void {
    this.searchValue = '';
    this.visible = false;
    this.loading = false;
    this.loadDataFromServer();
  }


  private async loadDataFromServer(): Promise<void> {
    this.loading = true;
    this.serviceFilters = [{ text: '数据服务', value: 'data.service' }, { text: '网关服务', value: 'gateway.service' }, { text: '登陆服务', value: 'login.service' }];
    this.loading = false;
    this.listOfRandomUser = [
      { taskId: 1, taskName: '张三', service: 'data.service', serviceId: 'a001', mode: TaskMode.Manual, ipAddress: '123@gmail.com' },
      { taskId: 2, taskName: '李四', service: 'gateway.service', serviceId: 'a002', mode: TaskMode.Automatic, ipAddress: '234@gmail.com' },
      { taskId: 3, taskName: '王五', service: 'login.service', serviceId: 'a003', mode: TaskMode.Manual, ipAddress: '345@gmail.com' },
    ];
    this.search();
  }


  public editRow(task: SchedulingTask): void {

  }

  public deleteRow(task: SchedulingTask): void {
    this.listOfRandomUser = this.listOfRandomUser.filter(d => d.taskId !== task.taskId);
    this.listOfDisplay = this.listOfDisplay.filter(d => d.taskId !== task.taskId);
  }







  /**
   * 
   */
  public search(): void {
    this.visible = false;
    this.listOfDisplay = this.listOfRandomUser.filter((item: SchedulingTask) => item.taskName.indexOf(this.searchValue) !== -1);
  }

  public reset(): void {
    this.searchValue = '';
    this.search();
  }

  public serviceFilterFn(list: string[], item: SchedulingTask): boolean {
    return list.some(serviceName => item.service.indexOf(serviceName) !== -1)
  }

  public taskNameSortFn(a: SchedulingTask, b: SchedulingTask): number {
    return a.taskName.localeCompare(b.taskName);
  }

}
