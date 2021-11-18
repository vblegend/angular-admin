import { Component, OnDestroy } from '@angular/core';




export interface User {
  name: string;
  picture: string;
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}


@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnDestroy {

  private alive: boolean = true;

  public contacts: Contacts[];
  public recent: RecentUsers[];

  constructor() {
    this.contacts = [
      { user: { name: 'Nick Jones', picture: 'assets/images/nick.png' }, type: 'mobile' },
      { user: { name: 'Eva Moor', picture: 'assets/images/eva.png' }, type: 'home' },
      { user: { name: 'Jack Williams', picture: 'assets/images/jack.png' }, type: 'mobile' },
      { user: { name: 'Lee Wong', picture: 'assets/images/lee.png' }, type: 'mobile' },
      { user: { name: 'Alan Thompson', picture: 'assets/images/alan.png' }, type: 'home' },
      { user: { name: 'Kate Martinez', picture: 'assets/images/kate.png' }, type: 'work' }
    ];
    this.recent = [
      { user: { name: 'Alan Thompson', picture: 'assets/images/alan.png' }, type: 'home', time: new Date().setHours(21, 12) },
      { user: { name: 'Eva Moor', picture: 'assets/images/eva.png' }, type: 'home', time: new Date().setHours(17, 45) },
      { user: { name: 'Nick Jones', picture: 'assets/images/nick.png' }, type: 'mobile', time: new Date().setHours(5, 29) },
      { user: { name: 'Lee Wong', picture: 'assets/images/lee.png' }, type: 'mobile', time: new Date().setHours(11, 24) },
      { user: { name: 'Jack Williams', picture: 'assets/images/jack.png' }, type: 'mobile', time: new Date().setHours(10, 45) },
      { user: { name: 'Kate Martinez', picture: 'assets/images/kate.png' }, type: 'work', time: new Date().setHours(9, 42) },
      { user: { name: 'Kate Martinez', picture: 'assets/images/kate.png' }, type: 'work', time: new Date().setHours(9, 31) },
      { user: { name: 'Jack Williams', picture: 'assets/images/jack.png' }, type: 'mobile', time: new Date().setHours(8, 0) }
    ];

  }

  public ngOnDestroy(): void {
    this.alive = false;
  }
}
