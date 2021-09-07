const app = {
	state: {
		isClear: true,
		// 中英文
		language: localStorage.getItem('language') || 'en_US',
		//本地orderingManageToken
		orderingManageToken: localStorage.getItem('orderingManageToken') || '',
		curentStore: localStorage.getItem('curentStore') && JSON.parse(localStorage.getItem('curentStore')) || {},
		storeList: localStorage.getItem('storeList') && JSON.parse(localStorage.getItem('storeList')) || {},
		user: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')) || {
			name: "admin",
			logo: "../../static/images/defaultTx.png",
		},
		//员工管理选中的标签页
		curentTab: 0,
		//保存登录信息
		loginInfo: localStorage.getItem('loginInfo') && JSON.parse(localStorage.getItem('loginInfo')) || {},
		//门店配置 经营设置
		businessModel: localStorage.getItem('businessModel') && JSON.parse(localStorage.getItem('businessModel')) || {},
		//当前运行环境 web：web端环境  HD：收银员运行环境
		environMent : localStorage.getItem('environMent') || '',
		//获取登录之后的serverUrl
		serverUrl : localStorage.getItem('serverUrl') || '',
	},
	mutations: {
		//清空缓存
		CLEAR_COOKIES: (state, isClear) => {
			state.isClear = isClear
			localStorage.clear()
			//初始化state
			state.language = 'en_US'
			state.orderingManageToken = ''
			state.curentStore = {}
			state.storeList = {}
			state.loginInfo = {}
			state.user = {
				name: "admin",
				logo: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2183650519,4258643236&fm=27&gp=0.jpg",
			}
			state.businessModel = {}
			state.environMent = ''
			state.serverUrl = ''
			
		},

		// 中英文
		SET_LANGUAGE: (state, language) => {
			state.language = language
			localStorage.setItem('language', language)
		},
		// orderingManageToken
		SET_TOKEN: (state, orderingManageToken) => {
			state.orderingManageToken = orderingManageToken
			localStorage.setItem('orderingManageToken', orderingManageToken)
		},
		// curentStore
		SET_CURENTSTORE: (state, curentStore) => {
			state.curentStore = curentStore
			localStorage.setItem('curentStore', JSON.stringify(curentStore))
		},
		// user
		SET_USER: (state, user) => {
			state.user = user
			localStorage.setItem('user', JSON.stringify(user))
		},
		// loginInfo
		SET_LOGIN_INFO: (state, loginInfo) => {
			state.loginInfo = loginInfo
			localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
		},

		// storeList
		SET_STORELIST: (state, storeList) => {
			state.storeList = storeList
			localStorage.setItem('storeList', JSON.stringify(storeList))
		},
		// curentTab
		SET_CURENTTAB: (state, curentTab) => {
			state.curentTab = curentTab
		},
		//businessModel
		SET_BUSINESSMODEL: (state, businessModel) => {
			state.businessModel = businessModel
			localStorage.setItem('businessModel', JSON.stringify(businessModel))
		},
        // environMent
		SET_ENVIRONMENT: (state, environMent) => {
			state.environMent = environMent
			localStorage.setItem('environMent', environMent)
		},
		//serverUrl
		SET_SERVERURL: (state, serverUrl) => {
			state.serverUrl = serverUrl
			localStorage.setItem('serverUrl', serverUrl)
		},
	},
	actions: {

		//清空缓存
		clearCookies({
			commit
		}, isClear) {
			commit('CLEAR_COOKIES', isClear)
		},

		// 中英文
		setLanguage({
			commit
		}, language) {
			commit('SET_LANGUAGE', language)
		},
		// orderingManageToken
		setToken({
			commit
		}, orderingManageToken) {
			commit('SET_TOKEN', orderingManageToken)
		},
		// curentStore
		setCurentStore({
			commit
		}, curentStore) {
			commit('SET_CURENTSTORE', curentStore)
		},
		// USER
		setUser({
			commit
		}, user) {
			commit('SET_USER', user)
		},
		// setLoginInfo
		setLoginInfo({
			commit
		}, loginInfo) {
			commit('SET_LOGIN_INFO', loginInfo)
		},
		// storeList
		setStoreList({
			commit
		}, storeList) {
			commit('SET_STORELIST', storeList)
		},
		// curentTab
		setCurentTab({
			commit
		}, curentTab) {
			commit('SET_CURENTTAB', curentTab)
		},
		//businessModel
		setBusinessModel({
			commit
		}, businessModel) {
			commit('SET_BUSINESSMODEL', businessModel)
		},
		// environMent
		setEnvironMent({
			commit
		}, environMent) {
			commit('SET_ENVIRONMENT', environMent)
		},
		// serverUrl
		setServerUrl({
			commit
		}, serverUrl) {
			commit('SET_SERVERURL', serverUrl)
		},
		
	}

}

export default app