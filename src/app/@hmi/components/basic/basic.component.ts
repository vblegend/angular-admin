import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { LoginPageComponent } from '@core/components/login/loginpage.component';
import { NotFoundComponent } from '@core/components/notfound/not-found.component';
import { ComponentDataConfigure } from '../../configuration/component.element.configure';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basic-comp',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less']
})
export class BasicComponent extends GenericComponent {

  private _data: ComponentDataConfigure;

  public get data(): ComponentDataConfigure {
    return this._data;
  }

  constructor(injector: Injector) {
    super(injector)
  }

  /**
   * 保证变量data不可修改
   * @param _data 
   */
  public initialization(_data: ComponentDataConfigure): void {
    if(this._data) throw 'This method is only available on first run ';
    this._data = _data;
  }



  /**
   * 布局更新
   */
  protected onLayoutChanged() {

  }


  /**
   * 绑定数据更新
   * @param data 
   */
  protected onDataChanged(data: ComponentDataConfigure) {

  }

}
