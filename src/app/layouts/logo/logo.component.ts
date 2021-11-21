import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../@core/services/sidebar.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { 
    
  }

  ngOnInit(): void {
  }

}
