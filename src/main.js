import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import Axios from "axios";
import VueContentPlaceholders from "vue-content-placeholders";

Vue.use(VueContentPlaceholders);
Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
