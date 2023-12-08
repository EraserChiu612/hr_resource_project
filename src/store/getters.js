const getters = {
  sidebar: (state) => state.app.sidebar, // 取app模塊屬性
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 取user模塊屬性
  avatar: (state) => state.user.userInfo.staffPhoto,
  name: (state) => state.user.userInfo.username,
  userId: (state) => state.user.userInfo.userId,
};

//getters便捷訪問
export default getters;
