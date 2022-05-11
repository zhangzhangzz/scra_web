/*
 * @Author: your name
 * @Date: 2021-12-23 20:14:53
 * @LastEditTime: 2021-12-23 20:14:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \scra_web1\src\views\deviceManage\ScraMap1\directive.js
 */
/**
 * 点击空白区域,隐藏下拉选框
 */

 const clickOutside = {

    // 一般在vue项目中的main.js中
    // 添加点击空白处的指令
    bind: function (el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        //检查点击是在外面的el和他的子元素
        if (!(el == event.target || el.contains(event.target))) {
          // 如果是，则调用属性值中提供的方法
          vnode.context[binding.expression](event)
        }
      }
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    }
  
  };
  
  export default clickOutside
  