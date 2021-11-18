import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '首页',
    icon: { icon: 'home', pack: 'grace' },
    link: '/dashboard'
  },
  {
    title: '主控面板',
    icon: { icon: 'ios-speedometer', pack: 'ion' },
    link: '/dashboard'
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
    title: '布局',
    icon: 'layout-outline',
    children: [
      {
        title: '步进器',
        link: '/pages/layout/stepper'
      },
      {
        title: '列表',
        link: '/pages/layout/list'
      },
      {
        title: '无限列表',
        link: '/pages/layout/infinite-list'
      },
      {
        title: '手风琴',
        link: '/pages/layout/accordion'
      },
      {
        title: '标签页',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs'
      }
    ]
  },
  {
    title: '表单',
    icon: 'edit-2-outline',
    children: [
      {
        title: '输入框',
        link: '/pages/forms/inputs'
      },
      {
        title: '表单布局',
        link: '/pages/forms/layouts'
      },
      {
        title: '按钮',
        link: '/pages/forms/buttons'
      },
      {
        title: '日期选择器',
        link: '/pages/forms/datepicker'
      }
    ]
  },
  {
    title: 'UI功能',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: '表格',
        link: '/pages/ui-features/grid'
      },
      {
        title: '图标',
        link: '/pages/ui-features/icons'
      },
      {
        title: '排版',
        link: '/pages/ui-features/typography'
      },
      {
        title: '动画搜索',
        link: '/pages/ui-features/search-fields'
      }
    ]
  },
  {
    title: '模态和叠加',
    icon: 'browser-outline',
    children: [
      {
        title: '对话框',
        link: '/pages/modal-overlays/dialog'
      },
      {
        title: '窗口',
        link: '/pages/modal-overlays/window'
      },
      {
        title: '弹出框',
        link: '/pages/modal-overlays/popover'
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr'
      },
      {
        title: '工具提示',
        link: '/pages/modal-overlays/tooltip'
      }
    ]
  },
  {
    title: '额外组件',
    icon: 'message-circle-outline',
    children: [
      {
        title: '日历',
        link: '/pages/extra-components/calendar'
      },
      {
        title: '进度条',
        link: '/pages/extra-components/progress-bar'
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner'
      },
      {
        title: '警报',
        link: '/pages/extra-components/alert'
      },
      {
        title: '日历套件',
        link: '/pages/extra-components/calendar-kit'
      },
      {
        title: '聊天',
        link: '/pages/extra-components/chat'
      }
    ]
  },
  {
    title: '图表',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts'
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs'
      },
      {
        title: 'D3',
        link: '/pages/charts/d3'
      }
    ]
  },
  {
    title: '表格和数据',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table'
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid'
      }
    ]
  },
  {
    title: '各种各样的',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404'
      }
    ]
  },
  {
    title: '认证',
    icon: 'lock-outline',
    children: [
      {
        title: '登录',
        link: '/login'
      },
      {
        title: '注册',
        link: '/register'
      },
      {
        title: '要求密码',
        link: '/request-password'
      },
      {
        title: '重置密码',
        link: '/resetPassword'
      }
    ]
  }
];
