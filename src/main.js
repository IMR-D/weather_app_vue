import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import UUID from "vue-uuid";

Vue.config.productionTip = false;
Vue.use(UUID);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
