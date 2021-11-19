import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '首页',
    icon: { icon: 'home', pack: 'grace' },
    link: '/pages/dashboard'
  },
  {
    title: '主控面板',
    icon: { icon: 'ios-speedometer', pack: 'ion' },
    link: '/pages/buttons'
  },
  {
    title: '健康监控',
    icon: 'heart-outline',
    link: '/iot-dashboard'
  },
  {
    title: '服务进程',
    icon: 'activity-outline',
    link: '/iot-dashboard'
  },
  {
    title: '在线终端',
    icon: { icon: 'terminal3', pack: 'grace' },
    link: '/iot-dashboard'
  },
  {
    title: '日志管理',
    icon: { icon: 'wj-rz', pack: 'grace' },
    children: [
      {
        title: '服务日志',
        icon: 'alert-triangle-outline',
        link: '/layout/stepper'
      },
      {
        title: '聊天日志',
        icon: 'message-square-outline',
        link: '/layout/stepper'
      },
      {
        title: '列表',
        icon: 'message-square-outline',
        link: '/layout/list'
      }]
  },
  {
    title: '数据管理',
    icon: { icon: 'soup-can', pack: 'ion' },
    children: [
      {
        title: '数据库',
        icon: 'alert-triangle-outline',
        link: '/stepper'
      },
      {
        title: '账号管理',
        icon: 'message-square-outline',
        link: '/stepper'
      },
      {
        title: '角色管理',
        icon: 'person-outline',
        link: '/list'
      },
      {
        title: '功能管理',
        icon: 'message-square-outline',
        link: '/list'
      },
      {
        title: '文件管理',
        icon: 'file-text-outline',
        link: '/list'
      }]
  },
  {
    title: '工具箱',
    icon: 'layout-outline',
    children: [
      {
        title: '邮件',
        icon: 'email-outline',
        link: '/list'
      }, {
        title: '在线消息',
        icon: 'message-circle-outline',
        link: '/list'
      }, {
        title: '广播消息',
        icon: 'volume-mute-outline',
        link: '/list'
      }]
  },
  {
    title: '部署',
    icon: { icon: 'bushu', pack: 'grace' },
    children: [
      {
        title: '服务部署',
        link: '/stepper'
      },
      {
        title: '列表',
        link: '/list'
      }]
  },


  {
    title: '电子商务',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true
  },
  {
    title: '物联网仪表板',
    icon: 'home-outline',
    link: '/pages/iot-dashboard'
  },
  {
    title: '功能分类',
    group: true
  },
  {
    title: '认证',
    icon: 'lock-outline',
    children: [
      {
        title: '登录',
        link: '/login'
      }
    ]
  }
];
