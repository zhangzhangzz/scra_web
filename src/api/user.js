/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:56
 * @LastEditTime: 2021-08-06 16:18:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\api\user.js
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login/def_login',
    // url: '/api1/pLogin',
    method: 'post',
    data
  })
}

//路由获取
export function getRoute(params) {
  return request({
      url: '/sys/login/getRoute',
      method: 'post',
      data:params
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
