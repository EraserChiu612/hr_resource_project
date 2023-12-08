import router from "@/router";
import store from "@/store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/404"]; // no redirect whitelist
// 路由前置守衛
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  if (store.getters.token) {
    //如果有token
    if (to.path === "/login") {
      //如果是登入頁面
      next("/"); //跳到首頁
      NProgress.done();
    } else {
      next();
    }
  } else {
    // 沒有token
    if (whiteList.includes(to.path)) {
      //如果在白名單
      next();
    } else {
      next("/login"); //跳到登入頁面
      NProgress.done();
    }

    next();
  }
});
//路由後置守衛
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
