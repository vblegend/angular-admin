import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { LoginPageComponent } from '@core/components/login/loginpage.component';
import { NotFoundComponent } from '@core/components/notfound/not-found.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent extends GenericComponent {
  @Output() public deleteRequest: EventEmitter<Object> = new EventEmitter<Object>(true);
  public id: string;
  public name: string = null;


  // private subscription: Subscription;

  constructor(injector: Injector) {
    super(injector)
  }

  protected onQueryChanges() {
    this.id = this.queryParams.get('id');
    console.log(`app-welcome onRouter ${this.id}`);
    // this.deleteRequest.emit(this.id);

    // this.subscribe(this.deleteRequest);
  }


  protected onInit() {
    this.id = this.queryParams.get('id');
    console.log(`app-welcome onInit ${this.id}`);

    const ref = this.generateComponent(NotFoundComponent);
    // ref.destroy();
    // this.subscription = this.deleteRequest.subscribe(e => {
    //   console.log(`app-welcome subscribe ${this.id}`);
    // })

  }

  protected onDestroy() {
    // this.subscription.unsubscribe();
    console.log(`app-welcome onDestroy`);
  }



}
