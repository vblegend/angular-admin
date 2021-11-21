import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LogoComponent } from './logo/logo.component';

@NgModule({
    imports: [
        CommonModule,
        // NbActionsModule,
        // NbRadioModule,
        // NbDatepickerModule,
        // NbLayoutModule,
        // NbCheckboxModule,
        // NbAlertModule,
        // NbInputModule,
        // NbButtonModule,
        RouterModule,
        NzIconModule,
        NzMenuModule,
        NzLayoutModule,
        NzGridModule,
        //   NzInputModule,
        //   RouterModule,
        //   FormsModule,
        //   NzSpaceModule,
        //   NzButtonModule,
        //   NzFormModule,
        //   ReactiveFormsModule,
        //   NzMessageModule,
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        LogoComponent
    ],
    declarations: [
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        LogoComponent
    ],
})

export class LayoutModule {
    constructor() {

    }

    public static forRoot(): ModuleWithProviders<LayoutModule> {
        return {
            ngModule: LayoutModule,
            providers: [
            ]
        };
    }
}
