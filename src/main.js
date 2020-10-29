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

// Navigation guard
const allowedRoutes = ["/"]; // allowed to visit without getting logged in

router.beforeEach((to, _, next) => {
  if (!allowedRoutes.includes(to.path)) {
    if (!localStorage.getItem("userId")) {
      return next("/");
    }
  } else if (localStorage.getItem("userId")) {
    return next("/posts");
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
