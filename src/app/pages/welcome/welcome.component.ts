import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { LoginPageComponent } from '@core/components/login/loginpage.component';
import { NotFoundComponent } from '@core/components/notfound/not-found.component';
import { Subscription } from 'rxjs';
import * as Prism from 'prismjs';
import txt from '!!raw-loader!./123.txt';





@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent extends GenericComponent {
  @Output() public deleteRequest: EventEmitter<Object> = new EventEmitter<Object>(true);
  public id!: string | null;
  public name!: string;
  public content: string = '';

  // private subscription: Subscription;

  constructor(injector: Injector) {
    super(injector)
    console.log(txt);
  }

  protected onQueryChanges(): void {
    this.id = this.queryParams.get('id');
    console.log(`app-welcome onRouter ${this.id}`);
    // this.deleteRequest.emit(this.id);

    // this.subscribe(this.deleteRequest);
  }


  protected onInit(): void {
    this.id = this.queryParams.get('id');
    console.log(`app-welcome onInit ${this.id}`);
    this.content = `protected onQueryChanges(): void {
      this.id = this.queryParams.get('id');
      console.log('app-welcome onRouter');
      // this.deleteRequest.emit(this.id);
      // this.subscribe(this.deleteRequest);
    }`;
    // const ref = this.generateComponent(NotFoundComponent);
    // ref.destroy();
    // this.subscription = this.deleteRequest.subscribe(e => {
    //   console.log(`app-welcome subscribe ${this.id}`);
    // })

  }

  protected onDestroy(): void {
    // this.subscription.unsubscribe();
    console.log(`app-welcome onDestroy`);
  }



}
