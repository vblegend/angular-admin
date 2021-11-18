import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbComponentSize, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';

export interface Camera {
  title: string;
  source: string;
}

@Component({
  selector: 'ngx-security-cameras',
  styleUrls: ['./security-cameras.component.scss'],
  templateUrl: './security-cameras.component.html',
})
export class SecurityCamerasComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  cameras: Camera[];
  selectedCamera: Camera;
  isSingleView = false;
  actionSize: NbComponentSize = 'medium';

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
  ) { }

  ngOnInit() {
    this.cameras = [
      {
        title: 'Camera #1',
        source: 'assets/images/camera1.jpg',
      },
      {
        title: 'Camera #2',
        source: 'assets/images/camera2.jpg',
      },
      {
        title: 'Camera #3',
        source: 'assets/images/camera3.jpg',
      },
      {
        title: 'Camera #4',
        source: 'assets/images/camera4.jpg',
      },
    ];
    this.selectedCamera = this.cameras[0];

    const breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(map(([, breakpoint]) => breakpoint.width))
      .subscribe((width: number) => {
        this.actionSize = width > breakpoints.md ? 'medium' : 'small';
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }
}
