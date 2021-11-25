import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../@core/services/sidebar.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { 
    
  }

  public ngOnInit(): void {
    // console.log(`app-logo ngOnInit`);
  }

}
