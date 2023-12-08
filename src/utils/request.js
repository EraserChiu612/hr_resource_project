import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import router from "@/router";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 請求的基礎路徑
  timeout: 10000,
}); // 創建一個實例

// 請求攔截器
service.interceptors.request.use(
  (config) => {
    // 注入token
    // store.getters.token => 請求頭裡面
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (error) => {
    // 錯誤抛到業務代碼
    return Promise.reject(error);
  }
);
// 響應攔截器
service.interceptors.response.use(
  (response) => {
    // axios 默認加了一層data
    const { success, message, data } = response.data;
    if (success) {
      return data;
    } else {
      Message({ type: "error", message });
      return Promise.reject(new Error(message));
    }
  },
  async (error) => {
    if (error.response.status === 401) {
      Message({ type: "warning", message: "登入超時" });
      //說明token過期
      await store.dispatch("user/logout"); //調用action,退出登入
      router.push("/login"); //跳轉到登入頁面
      return Promise.reject(error);
    }
    Message({ type: "error", message: error.message });
    return Promise.reject(error);
  }
);

export default service; // 把實例暴露出去，讓其他文件可以使用
