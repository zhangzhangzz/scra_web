/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-09-04 01:45:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\store\modules\permission.js
 */
import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'
import {getRoute} from '@/api/user'
import { getToken } from '@/utils/auth'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}


function filterAsyncRouter1(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {//Layout组件特殊处理
        route.component = Layout
      }else{
        //处理组件---重点
        route.component =   loadView(route.component);
        // 
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter1(route.children)
    }
    return true
  })

  return accessedRouters
}

function loadView(view)
{
    // 路由懒加载
    return () => Promise.resolve(require(`@/views/${view}`).default)
}


/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_BUTTON: (state, button) => {
    state.button = button
  },
  SET_NAME1: (state, name1) => {
    state.name1 = name1
  }
}

const hasToken = getToken()

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin111')) {
        accessedRoutes = asyncRoutes || []
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      } else {
        const token = getToken();
        getRoute({ token:token  }).then(response => {
          const { data } = response
          let menu = data.route;
          menu.forEach(function(item,index,arr){
            item.children.forEach(function(item1,index1,arr1){
              item1.name = item.path==='/'?item1.name:item.name + ' / ' + item1.name
            })
          })
          accessedRoutes = filterAsyncRouter1(menu, roles)
          commit('SET_BUTTON', data.button)
          commit('SET_NAME1', JSON.parse(localStorage.getItem('user')).userName)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }).catch(error => {
          return Promise.reject(error)
        })
      }
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise(resolve => {
        commit('SET_ROUTES', [])
        commit('SET_NAME1', '')
        resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
