import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  // 模塊
  modules: {
    app,
    settings,
    user,
  },
  // 計算屬性
  getters,
});

export default store;
