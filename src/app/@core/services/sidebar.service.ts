import { Injectable } from "@angular/core";
import { RouteConfigure } from "../models/RouteConfigure";


@Injectable({
    providedIn: 'root',
})
export class SidebarService {

    public isCollapsed: boolean;

    /**
     *
     */
    constructor() {
        this.isCollapsed = false;
    }

    public toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }



    public menus: RouteConfigure[] = [
        {
            title: 'Mail Group',
            icon: 'mail',
            open: true,
            children: [
                {
                    title: 'Group 1',
                    icon: 'bars',
                    open: true,
                    children: [
                        {
                            title: 'Option 1',
                            link: 'welcome?id=1',
                        },
                        {
                            title: 'Option 2',
                            link: 'welcome?id=2',
                        }
                    ]
                },
                {
                    title: 'Group 2',
                    icon: 'bars',
                    link: 'welcome?id=3',
                },
                {
                    title: 'Group 3',
                    icon: 'bars',
                    link: 'welcome?id=4',
                }
            ]
        },
        {
            title: 'Group 443',
            icon: 'bars',
            link: 'welcome?id=5',
        },
        {
            title: 'Team Group',
            icon: 'team',
            open: true,
            children: [
                {
                    title: 'User 1',
                    icon: 'user',
                    link: 'welcome?id=6',
                },
                {
                    title: 'User 2',
                    icon: 'user',
                    link: 'welcome?id=7',
                }
            ]
        }
    ];


}