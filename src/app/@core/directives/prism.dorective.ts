import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import * as Prism from 'prismjs';
import { BaseDirective } from './base.directive';

@Directive({
    selector: '[prism]'
})
export class ProsmDirective extends BaseDirective {
    // @Input() language: string = 'javascript';
    // @Input() cursor?: string;


    protected onInit(): void {
        // Prism.highlightElement(this.element);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const Prism = require('prismjs');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
         const loadLanguages = require('prismjs/components/');
         loadLanguages(['typescript']);
        // prism-typoscript.js
        // prism-typescript
        const code = `protected onQueryChanges(): void {
        this.id = this.queryParams.get('id');
        console.log('app-welcome onRouter');
        // this.deleteRequest.emit(this.id);
        // this.subscribe(this.deleteRequest);
      }`;
        this.element.innerHTML = Prism.highlight(code, Prism.languages.typescript, 'typescript'); //Prism.highlight(code, Prism.languages['typescript']);
    }


}