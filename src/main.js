import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment/moment'
Vue.prototype.moment = moment
import VueLazyload from 'vue-lazyload'
import echarts from 'echarts'
import axios from 'axios'

import locale from 'element-ui/lib/locale/lang/zh-CN'
import localeEN from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, {
	locale,
	localeEN
})

import "./utils/excel/Blob.js"
import "./utils/excel/Export2Excel.js"
import 'xlsx'

Vue.prototype.$echarts = echarts

import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

//http请求
import {
	request
} from './http/apiService'
Vue.prototype.request = request

Vue.prototype.$http= axios
//字符工具类
import {
	stringutils
} from './utils/stringutils'
Vue.prototype.stringutils = stringutils

//上传头像工具类
import {
	uploadUtils
} from './utils/uploadUtils'
Vue.prototype.uploadUtils = uploadUtils

import {
	toast
} from './utils/toast'
Vue.prototype.toast = toast

import format from 'vue-text-format';
Vue.use(format);
Vue.use(VueLazyload)

/*
  ---过滤器filter---
*/
//日期
Vue.filter('moment', function (value, formatString) {
	if (!value) {
		return '-'
	}
	formatString = formatString || 'YYYY-MM-DD'
	return moment(value).format(formatString)
})
//日期
Vue.filter('moment_ss', function (value, formatString) {
	if (!value) {
		return '-'
	}
	formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
	return moment(value).format(formatString)
})

Vue.filter('priceNum', function (value) {
	if (!value) {
		return  '0.00'
	}
	value = Number(value).toFixed(2); //保留两位小数 四舍五入
	return value;
})
Vue.filter('priceNum0', function (value) {
	if (!value) {
		return  '0.0'
	}
	value = Number(value).toFixed(1); //保留一位小数 四舍五入
	return value;
})
//价格
Vue.filter('price', function (value) {
	if (!value||Number(value<0)) {
		return '-'
	}
	value = Number(value).toFixed(2); //保留两位小数 四舍五入
	return value;
})
//数量
Vue.filter('count', function (value) {
	if (!value) {
		return '0'
	}
	//如果小数位大于3就保留三位小数，其他按照原数据展示
	let localNum = value.toString().indexOf(".") + 1; //获取小数点的位置
	let countNum = value.toString().length - localNum; //获取小数点后的个数

	if (localNum > 0) {
		if (countNum > 3) {
			value = Number(value).toFixed(3); //保留三位小数 四舍五入
		} else {
			value = value;
		}
	} else {
		value = Number(value);
	}
	return value;
})

// 损益数量判断值的正负值
Vue.filter('addSubCount', function (value) {
	if (!value) {
		return '0'
	}
	//如果小数位大于3就保留三位小数，其他按照原数据展示
	let localNum = value.toString().indexOf(".") + 1; //获取小数点的位置
	let countNum = value.toString().length - localNum; //获取小数点后的个数

	let numValue = Number(value);
	let numToFixed = Number(value).toFixed(3); //保留三位小数 四舍五入

	if (localNum > 0) {
		if (countNum > 3) {
			value = siteNum(numToFixed);
		} else {
			value = siteNum(value);
		}
	} else {
		value = siteNum(numValue);
	}

	function siteNum(value) {
		let num = Number(value);
		if (num > 0) {
			value = "+" + value;
		} else if (num = 0) {
			value = "0";
		} else {
			value = value;
		}
		return value;
	}

	return value;
})
// 损益价格判断值的正负值
Vue.filter('addSubPrice', function (value) {
	if (!value) {
		return '0.00'
	}
	let num = Number(value);
	if (num > 0) {
		value = "+" + Number(value).toFixed(2);
	} else if (num = 0) {
		value = "0.00";
	} else {
		value = Number(value).toFixed(2);
	}
	return value;
})
// 正取负，负取正。价格
Vue.filter('turnOverPrice', function (value) {
	if (!value) {
		return '0.00'
	}
	let num = Number(value);
	if (num > 0) {
		value = "-" + Math.abs(Number(value).toFixed(2));
	} else if (num <0) {
		value ="+" + Math.abs(Number(value).toFixed(2));
	} else {
		value = "0.00";
	}
	return value;
})
//字段
Vue.filter('text', function (value) {
	if (!value) {
		return '-'
	}
	return value;
})

Vue.config.productionTip = false
//路由拦截
router.beforeEach((to, from, next) => {
	
	// if (to.meta.title) {
	// 	document.title =`${i18n.t('sidebar.commitChike')}-${to.meta.title}`; 
	// }
	if (to.matched.some(res => res.meta.requireAuth)) {
		let token = store.getters.token
		// 验证是否需要登陆
		if (token !== '' && token !== null && token !== undefined) {
			// 查询本地存储信息是否已经登陆 sessionStorage.getItem('sid')
			next()
		} else {
		    if(store.getters.environMent=='HD'){
				if(window.android!=undefined&&window.android!=null){
					window.android.reLogin();
				}
		    }else{
				next({
					// path: '/login' // 未登录则跳转至login页面
					//  query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
				})

		    }
			
		}
	}
	next()
})
// Internationalization
import i18n from './utils/i18n'
document.title = i18n.t('sidebar.commitChike');

new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')