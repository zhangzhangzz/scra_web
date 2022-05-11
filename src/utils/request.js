/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-10-28 15:32:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\utils\request.js
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken,getProjectId } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})
// request interceptor
console.log(getProjectId()+'-----------')
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
      config.headers['projectId'] = getProjectId()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
console.log(getProjectId()+'-----------')
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200 && res.code!=undefined) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50011 || res.code === 50013 || res.code === 50014 || res.code === 50015 ) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
          store.dispatch('user/logout')
          router.push(`/login`)
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

 

export default service
