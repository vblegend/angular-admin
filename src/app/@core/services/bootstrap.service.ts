import { ComponentRef, Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Delegate, DelegateContext } from '../common/delegate';
@Injectable({
    providedIn: 'root',
})
export class BootstrapService {
    /**
     * loading animation element
     */
    public loadingElement: HTMLElement;


    private _bootstrapInits: DelegateContext[];


    constructor() {
        this._bootstrapInits = [];
    }


    public runAtBootstrap(delegate: Delegate, context: any) {
        this._bootstrapInits.push({ delegate, context });
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
        // console.warn('initialization Bootstrap');
        const promises: Promise<void>[] = [];
        for (const init of this._bootstrapInits) {
            const result = <any>init.delegate.apply(init.context);
            if (result instanceof Promise) {
                promises.push(result);
            }
        }
        if (promises.length > 0) {
            await Promise.all(promises);
        }
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
