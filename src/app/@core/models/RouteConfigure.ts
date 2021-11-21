



export interface RouteConfigure {
    title: string;
    icon?: string;
    link?: string;
    open?: boolean;
    selected?: boolean;
    disabled?: boolean;
    children?: RouteConfigure[];
}