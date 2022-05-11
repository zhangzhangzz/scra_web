/*
 * @Author: your name
 * @Date: 2021-07-01 16:26:38
 * @LastEditTime: 2021-10-15 11:01:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\babel.config.js
 */
module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      'plugins': ['dynamic-import-node']
    }
  },
  presets: [
    ['@vue/app',
    {
      'useBuiltIns': 'entry'
    }]
  ]
}
