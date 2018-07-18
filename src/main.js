// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Axios from 'axios';
import Moment from 'moment';

import App from './App';
import router from './router';
import store from './store';

import mavonEditor from 'mavon-editor'
// markdown-it对象：md.s_markdown, md => mavonEditor实例
// or
// mavonEditor.markdownIt 
import 'mavon-editor/dist/css/index.css';

Vue.use(mavonEditor);

Moment.locale('zh-cn');
Vue.prototype.$axios=Axios;
Vue.prototype.$moment=Moment;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
