import { getToken, setToken, removeToken } from "@/utils/auth";
import { login } from "@/api/user";

const state = {
  token: getToken(), //從緩存讀取token初始值
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
};

export default {
  namespaced: true, //開啟命名空間
  state,
  mutations,
  actions,
};
