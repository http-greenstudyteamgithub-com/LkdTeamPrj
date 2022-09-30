const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.user.userToken.image, // 建立对于头像的快捷访问
  userName: state => state.user.loginUserInfo.userName, // 建立对用户名称的快捷访问
  token: state => state.user.userToken, // 建立对token的快捷访问
  loginTime: state => state.user.loginTime, // 建立对登录时间戳的快捷访问
  loginUserInfo: state => state.user.loginUserInfo
}
export default getters
