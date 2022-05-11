import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */



export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/logins/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},

{ // 隐藏设置
  path: '/Set',
  component: Layout,
  redirect: '/Set/UserModify',
  hidden: true,
  name: 'Permission',
  meta: {
    title: '隐藏设置',
    icon: 'lock'
  },
  children: [{
    path: 'UserAdd',
    component: () => import('../components/custom/UserAdd/UserAdd.vue'),
    name: 'RolePermission1',
    meta: {
      title: '添加用户'
    }
  },
  {
    path: 'dock',
    component: () => import('@/views/projectManage/Dock/Dock.vue'),
    name: 'RolePermission6',
    meta: {
      title: '对接列表'
    }
  }
  ]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes =  [
  {
  path: '/',
  component: Layout,
  redirect: '/dashboard1',
  children: [
    {
      path: 'dashboard1',
      component: () => import('@/views/dashboard/index'),
      name: '',
      meta: { 
        title: '数据统计', 
        icon: 'dashboard',
        keepAlive: true // keep-alive 标识
      }
    }
  ]
},{
  path: '/projectManage',
  component: Layout,
  redirect: '/projectList',
  name: '项目管理',
  meta: {
    title: '项目管理',
    icon: 'lock'
  },
  children: [{
    path: 'ProjectList',
    component: () => import('@/views/projectManage/ProjectList/ProjectList.vue'),
    name: '项目列表',
    meta: {
      title: '项目列表'
    }
  },
  {
    path: 'projectSpeed',
    component: () => import('@/views/projectManage/projectSpeed/projectSpeed.vue'),
    name: '运维记录', 
    meta: {                     
       
      title: '运维记录'
    },
  },
  {
    path: 'projectDetail',
    component: () => import('@/views/projectManage/projectDetail/projectDetail.vue'),
    name: '项目详情', 
    meta: {                     
      title: '项目详情'
    }
  },
  {
    path: 'protectRecord',
    component: () => import('@/views/projectManage/protectRecord/protectRecord.vue'),
    name: '运维记录1', 
    meta: {                     
      title: '运维记录1'
    }
  },
  {
    path: 'partment',
    component: () => import('@/views/projectManage/partment/partment.vue'),
    name: '部门管理', 
    meta: {                     
      title: '部门管理'
    }
  },
  {
    path: 'projectDrawing',
    component: () => import('@/views/projectManage/projectDrawing/projectDrawing.vue'),
    name: '项目交付',
    meta: {
      title: '项目交付',
      roles: ['admin'] // or you can only set roles in sub nav
    }
  },
  {
    path: 'projectEdit',
    component: () => import('@/views/projectManage/projectEdit/projectEdit.vue'),
    name: '项目新增',
    meta: {
      title: '项目新增'
    },
    hidden: true,
  },
  ]
},
{
  path: '/humanManage',
  component: Layout,
  redirect: '/humanManage/realname',
  name: '人员管理',
  meta: {
    title: '人员管理',
    icon: 'lock'
  },
  children: [{
    path: 'permanage',
    component: () => import('@/views/humanManage/PerManage/PerManage.vue'),
    name: '人员花名册',
    meta: {
      title: '人员花名册'
    }
  },
  {
    path: 'perpolice',
    component: () => import('@/views/humanManage/PerPolice/PerPolice.vue'),
    name: '备案人员',
    meta: {
      title: '备案人员',
    }
  },
  {
    path: 'pertemp',
    component: () => import('@/views/humanManage/PerTemp/PerTemp.vue'),
    name: '临时人员',
    meta: {
      title: '临时人员',
    }
  },
  {
    path: 'perage',
    component: () => import('@/views/humanManage/PerAge/PerAge.vue'),
    name: '超龄人员',
    meta: {
      title: '超龄人员',
    }
  },
  {
    path: 'perstate',
    component: () => import('@/views/humanManage/PerState/PerState.vue'),
    name: '人员状态',
    meta: {
      title: '人员状态',
    }
  },
  {
    path: 'promanage',
    component: () => import('@/views/humanManage/ProManage/ProManage.vue'),
    name: '管理人员',
    meta: {
      title: '管理人员'
    }
  }
  ]
},
{
    path: '/attendanceManage',
    component: Layout,
    redirect: '/clockInRecord',
    name: '考勤管理',
    meta: {
      title: '考勤管理',
      icon: 'lock'
    },
    children: [
      {
              path: 'clockInRecord',
              component: () => import('@/views/attendanceManage/clockInRecord/clockInRecord.vue'),
              name: '当日考勤',
              meta: {
                title: '当日考勤'
              }
            },
            {
              path: 'dailyRecord',
              component: () => import('@/views/attendanceManage/dailyRecord/dailyRecord.vue'),
              name: '考勤详情',
              meta: {
                title: '考勤详情'
              },
              hidden: true
            },
            {
              path: 'onDailyRecord',
              component: () => import('@/views/attendanceManage/onDailyRecord/onDailyRecord.vue'),
              name: '考勤历史',
              meta: {
                title: '考勤历史'
              }
            },
            {
              path: 'unUpRecord',
              component: () => import('@/views/attendanceManage/unUpRecord/unUpRecord.vue'),
              name: '管理人员&备案人员',
              meta: {
                title: '管理人员&备案人员'
              }
            },
            {
              path: 'snapRecord',
              component: () => import('@/views/attendanceManage/snapRecord/snapRecord.vue'),
              name: '临时人员考勤',
              meta: {
                title: '临时人员考勤'
              }
            },
            {
              path: 'overOldRecord',
              component: () => import('@/views/attendanceManage/overOldRecord/overOldRecord.vue'),
              name: '超龄人员考勤',
              meta: {
                title: '超龄人员考勤'
              }
            },
            {
              path: 'monthlyRecord',
              component: () => import('@/views/attendanceManage/monthlyRecord/monthlyRecord.vue'),
              name: '考勤汇总',
              meta: {
                title: '考勤汇总'
              }
            },
    ]
  },
  {
    path: '/deviceManage',
    component: Layout,
    redirect: '/machine',
    name: '设备管理',
    meta: {
      title: '设备管理',
      icon: 'lock'
    },
    children: [
      {
        path: 'scraMap',
        component: () => import('@/views/deviceManage/ScraMap1/index.vue'),
        name: '环境检测',
        meta: {
          title: '环境检测'
        },
        hidden:true
      },
      {
        path: 'history',
        component: () => import('@/views/deviceManage/History1/History1.vue'),
        name: '历史记录',
        meta: {
          title: '历史记录'
        },
        hidden:true
      },
      {
        path: 'collection',
        component: () => import('@/views/deviceManage/machine/machine.vue'),
        name: '采集管理',
        meta: {
          title: '采集管理'
        }
      },
      {
        path: 'machine',
        component: () => import('@/views/deviceManage/machine'),
        name: '考勤设备',
        meta: {
          title: '考勤设备'
        }
      },
      {
        path: 'distributionBox',
        component: () => import('@/views/deviceManage/distributionBox'),
        name: '扬尘设备',
        meta: {
          title: '扬尘设备'
        }
      },
      {
        path: 'tower',
        component: () => import('@/views/deviceManage/tower'),
        name: 'LED屏幕',
        meta: {
          title: 'LED屏幕'
        }
      },
      {
        path: 'lifter',
        component: () => import('@/views/deviceManage/lifter'),
        name: '视频设备',
        meta: {
          title: '视频设备'
        }
      },
      {
        path: 'car',
        component: () => import('@/views/deviceManage/car'),
        name: '运渣车设备',
        meta: {
          title: '运渣车设备'
        }
      },
      {
        path: 'turnstile',
        component: () => import('@/views/deviceManage/turnstile'),
        name: '闸机管理',
        meta: {
          title: '闸机管理'
        },
        hidden:true
      },
      {
        path: 'docking',
        component: () => import('@/views/deviceManage/docking/docking.vue'),
        name: '对接',
        meta: {
          title: '对接'
        },
        hidden:true
      },
      {
        path: 'monitor',
        component: () => import('@/views/deviceManage/monitor'),
        name: '监控管理',
        meta: {
          title: '监控管理'
        },
        hidden:true
      },
    ]
  },
{
  path: '/Admin',
  component: Layout,
  redirect: '/Admin/user',
  name: '系统管理',
  meta: {
    title: '系统管理',
    icon: 'lock'
  },
  children: [{
    path: 'user',
    component: () => import('@/views/SystemAdmin/UserAdmin/UserAdmin.vue'),
    name: '用户管理',
    meta: {
      title: '用户管理'
    }
  },
  {
    path: 'Role',
    component: () => import('@/views/SystemAdmin/RoleAdmin/RoleAdmin.vue'),
    name: 'DirectivePermission',
    meta: {
      title: '角色管理'
    }
  },
  {
    path: 'Menu',
    component: () => import('@/views/SystemAdmin/MenuAdmin/MenuAdmin.vue'),
    name: '菜单管理',
    meta: {
      title: '菜单管理'
    }
  },
  {
    path: 'Cjournal',
    component: () => import('@/views/SystemAdmin/CjournalAdmin/CjournalAdmin.vue'),
    name: '操作日志管理',
    meta: {
      title: '操作日志管理'
    }
  },
  {
    path: 'Djournal',
    component: () => import('@/views/SystemAdmin/DjournalAdmin/DjournalAdmin.vue'),
    name: '登录日志管理',
    meta: {
      title: '登录日志管理'
    }
  },
  {
    path: 'personLog',
    component: () => import('@/views/SystemAdmin/PersonLog/PersonLog.vue'),
    name: '人员状态日志',
    meta: {
      title: '人员状态日志'
    }
  },
  {
    path: 'attendanceLog',
    component: () => import('@/views/SystemAdmin/AttendanceLog/AttendanceLog.vue'),
    name: '考勤上传日志',
    meta: {
      title: '考勤上传日志'
    }
  },
  {
    path: 'deviceLog',
    component: () => import('@/views/SystemAdmin/DeviceLog/DeviceLog.vue'),
    name: '设备状态日志',
    meta: {
      title: '设备状态日志'
    }
  },
  {
    path: 'messageLog',
    component: () => import('@/views/SystemAdmin/MessageLog/MessageLog.vue'),
    name: '信息推送日志',
    meta: {
      title: '信息推送日志'
    }
  },
  {
    path: 'systemLog',
    component: () => import('@/views/SystemAdmin/SystemLog/SystemLog.vue'),
    name: '系统日志',
    meta: {
      title: '系统日志'
    }
  }
  ]
},

/** when your routing map is too long, you can split it into small modules **/
// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode:'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
