import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//  注册全局组件
import "./components/common";

//  reset.css
import './assets/css/reset.css'
//  rem.js
import './assets/js/rem'

import './assets/js/Date'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
