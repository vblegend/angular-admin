import { Injectable, TemplateRef } from "@angular/core";
import { Exception } from "@core/common/exception";

@Injectable({
    providedIn: 'root',
})
export class TemplateService {

    private _templates: Map<string, TemplateRef<Object>>;
    /**
     *
     */
    constructor() {
        this._templates = new Map();
    }

    public registerTemplate(templateName: string, template: TemplateRef<Object>) {
        if (this._templates.has(templateName)) {
            throw Exception.build('Template Service', `The name ${templateName} has been registered as a template and cannot be registered twice.`);
        }
        this._templates.set(templateName, template);
    }

    public getTemplate(templateName: string): TemplateRef<Object> {
        return this._templates.get(templateName);
    }

}



/**
 *

 *
 */