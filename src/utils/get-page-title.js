/*
 * @Author: your name
 * @Date: 2021-07-01 16:31:11
 * @LastEditTime: 2021-09-04 00:28:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\utils\get-page-title.js
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || '蜀工云-智慧物联云平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
