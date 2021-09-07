
const getters = {
  language: state => state.app.language,
  token: state => state.app.orderingManageToken,
  curentStore: state => state.app.curentStore,
  user: state => state.app.user,
  loginInfo: state => state.app.loginInfo,
  storeList: state => state.app.storeList,
  curentTab: state => state.app.curentTab,
  businessModel: state => state.app.businessModel,
  environMent:state => state.app.environMent,
  serverUrl:state => state.app.serverUrl,
}
export default getters