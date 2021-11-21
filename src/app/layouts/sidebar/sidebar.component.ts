import { Component, OnInit } from '@angular/core';
import { RouteConfigure } from '../../@core/models/RouteConfigure';
import { SidebarService } from '../../@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(public sidebarService: SidebarService) { }

  ngOnInit(): void {
  }

}
