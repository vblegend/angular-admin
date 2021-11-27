import { Injectable } from "@angular/core";
import { RouteConfigure } from "../models/RouteConfigure";


@Injectable({
    providedIn: 'root',
})
export class MenuService {

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
            icon: 'grace-iconfonticon-shouye',
            link: 'welcome/1',
        },
        {
            title: '主控面板',
            icon: 'grace-hudun',
            link: 'dashboard',
        },
        {
            title: '健康监控',
            icon: 'grace-jiankang2',
            link: 'welcome/3',
        },
        {
            title: '服务进程',
            icon: 'grace-memory',
            link: 'welcome/4',
        },
        {
            title: '计划任务',
            icon: 'grace-renwujihua',
            link: 'welcome/4444',
        },
        {
            title: '日志管理',
            icon: 'grace-rizhi',
            open: false,
            selected: false,
            children: [
                {
                    title: '服务日志',
                    icon: 'grace-wj-rz',
                    link: 'welcome/6',
                },
                {
                    title: '聊天日志',
                    icon: 'grace-rizhi',
                    link: 'welcome/7',
                }
            ]
        },
        {
            title: '数据管理',
            icon: 'grace-shujuku',
            open: false,
            selected: false,
            children: [
                {
                    title: '数据库',
                    icon: 'grace-database',
                    link: 'welcome/9',
                },
                {
                    title: '账号管理',
                    icon: 'grace-iconfontme',
                    link: 'welcome/78489',
                },
                {
                    title: '角色管理',
                    icon: 'grace-people',
                    link: 'welcome/45456',
                },
                {
                    title: '功能管理',
                    icon: 'grace-BIMfuneng',
                    link: 'welcome/775',
                },
                {
                    title: '文件管理',
                    icon: 'grace-zu',
                    link: 'welcome/454',
                }
            ]
        },
        {
            title: '工具箱',
            icon: 'grace-Tools',
            open: false,
            selected: false,
            children: [
                {
                    title: '邮件',
                    icon: 'grace-youjian1',
                    link: 'welcome/45342',
                },
                {
                    title: '在线消息',
                    icon: 'grace-iconfontzaixiankefu1',
                    link: 'welcome/4542',
                },
                {
                    title: '广播消息',
                    icon: 'grace-news-fill',
                    link: 'welcome/78524',
                },
                {
                    title: '在线终端',
                    icon: 'grace-terminal-fill',
                    link: 'welcome/545',
                },
            ]
        },
        {
            title: '部署',
            icon: 'grace-bushu',
            open: false,
            selected: false,
            children: [
                {
                    title: '服务部署',
                    icon: 'grace-iconfonticon-xitong',
                    link: 'welcome/3455',
                }
            ]
        },
        {
            title: '系统设置',
            icon: 'grace-shezhi2',
            link: 'welcome/34864523',
        },
        {
            title: '关于我们',
            icon: 'grace-guanyu1',
            link: 'welcome/4343213',
        },
        {
            title: '退出登录',
            icon: 'grace-guanji',
            link: 'welcome/4348343',
        }





    ];


}