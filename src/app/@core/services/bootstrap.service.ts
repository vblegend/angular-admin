import { ComponentRef, Inject, Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class BootstrapService {
    /**
     * loading animation element
     */
    public loadingElement: HTMLElement;

    constructor(private commonService: CommonService) {

    }

    /**
     * Angular bootstrap completion trigger  
     * @param component 
     */
    private async bootstrap(component: ComponentRef<AppComponent>): Promise<void> {
        if (this.loadingElement) this.loadingElement.style.display = 'none';
    }

    /**
     * Angular initialization trigger 
     */
    private async initializer(): Promise<void> {
        if (this.loadingElement) this.loadingElement.style.display = '';
        await this.commonService.sleep(1000);
    }

    /**
     * bootstrap completion Factory
     * @param bootstrapService 
     * @returns 
     */
    public static BootstrapFactory(bootstrapService: BootstrapService) {
        return bootstrapService.bootstrap.bind(bootstrapService);
    }

    /**
     * initialization Factory
     * @param bootstrapService 
     * @returns 
     */
    public static InitializerFactory(bootstrapService: BootstrapService) {
        return bootstrapService.initializer.bind(bootstrapService);
    }

}
