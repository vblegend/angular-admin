import { Params } from "@angular/router";




export interface RouteConfigure {
    title: string;
    icon?: string;
    link?: string;
    queryParams?:Params;
    open?: boolean;
    selected?: boolean;
    disabled?: boolean;
    children?: RouteConfigure[];
}