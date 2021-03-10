import Vue from "vue";
import Vuex from "vuex";
import weather from "./modules/weather";
import cities from "./modules/cities";
import  time from "./modules/time"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    weather,
    cities,
    time,
  },
});
