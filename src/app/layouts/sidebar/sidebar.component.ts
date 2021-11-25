import { Component, OnInit } from '@angular/core';
import { RouteConfigure } from '../../@core/models/RouteConfigure';
import { SidebarService } from '../../@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  constructor(public sidebarService: SidebarService) {

  }

  public menus: RouteConfigure[];


  public ngOnInit(): void {
    this.menus = this.sidebarService.menus;

    // console.log(`app-sidebar ngOnInit`);
  }
}
