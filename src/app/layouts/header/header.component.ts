import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../@core/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;
  constructor(public sidebarService: SidebarService) { }


  public ngOnInit(): void {
    // console.log(`app-header ngOnInit`);
  }

}
