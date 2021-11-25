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
            title: '首页',
            icon: 'bars',
            link: 'welcome/1',
        },
        {
            title: '主控面板',
            icon: 'bars',
            link: 'dashboard',
        },
        {
            title: '健康监控',
            icon: 'bars',
            link: 'welcome/3',
        },
        {
            title: '服务进程',
            icon: 'bars',
            link: 'welcome/4',
        },
        {
            title: '在线终端',
            icon: 'bars',
            link: 'welcome/5',
        },
        {
            title: '日志管理',
            icon: 'mail',
            open: false,
            selected: false,
            children: [
                {
                    title: '服务日志',
                    icon: 'bars',
                    link: 'welcome/6',
                },
                {
                    title: '聊天日志',
                    icon: 'bars',
                    link: 'welcome/7',
                },
                {
                    title: '列表',
                    icon: 'bars',
                    link: 'welcome/8',
                }
            ]
        },
        {
            title: '数据管理',
            icon: 'team',
            open: false,
            selected: false,
            children: [
                {
                    title: '数据库',
                    icon: 'user',
                    link: 'welcome/9',
                },
                {
                    title: '账号管理',
                    icon: 'user',
                    link: 'welcome?id=7',
                },
                {
                    title: '角色管理',
                    icon: 'user',
                    link: 'welcome?id=7',
                },
                {
                    title: '功能管理',
                    icon: 'user',
                    link: 'welcome?id=7',
                },
                {
                    title: '文件管理',
                    icon: 'user',
                    link: 'welcome?id=7',
                }
            ]
        },
        {
            title: '工具箱',
            icon: 'team',
            open: false,
            selected: false,
            children: [
                {
                    title: '邮件',
                    icon: 'user',
                    link: 'welcome?id=6',
                },
                {
                    title: '在线消息',
                    icon: 'user',
                    link: 'welcome?id=7',
                },
                {
                    title: '广播消息',
                    icon: 'user',
                    link: 'welcome?id=7',
                }
            ]
        },
        {
            title: '部署',
            icon: 'team',
            open: false,
            selected: false,
            children: [
                {
                    title: '服务部署',
                    icon: 'user',
                    link: 'welcome?id=6',
                },
                {
                    title: '列表',
                    icon: 'user',
                    link: 'welcome?id=7',
                }
            ]
        }



    ];


}