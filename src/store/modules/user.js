import { getToken, setToken, removeToken } from "@/utils/auth";
import { login, getUserInfo } from "@/api/user";

const state = {
  token: getToken(), //從緩存讀取token初始值
  userInfo: {}, //用戶基本資料
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    //同步到緩存
    setToken(token);
  },
  removeToken(state) {
    //清除token
    state.token = null;
    //清除緩存
    removeToken();
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};

const actions = {
  // context 上下文,傳入參數
  async login(context, data) {
    console.log(data);
    // todo: 調用登入接口
    const token = await login(data);
    //返回一個token
    context.commit("setToken", token);
  },
  //獲取用戶基本資料
  async getUserInfo(context) {
    const result = await getUserInfo();
    context.commit("setUserInfo", result);
  },

  //登出
  logout(context) {
    //清除token
    context.commit("removeToken");
    //清除用戶資料
    context.commit("setUserInfo", {});
  },
};

export default {
  namespaced: true, //開啟命名空間
  state,
  mutations,
  actions,
};
