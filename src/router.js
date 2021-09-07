import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
Vue.use(Router)

export default new Router({
	linkActiveClass: 'active',
	// mode: 'history',
	base: "/",
	routes: [{
			path: '/login',
			component: () => import('@/views/login/Login'),
			name: 'login',
			meta: {
				title: 'login',
				requireAuth: false,
				selectEdit: false,
			}
		},
		{
			path: '/regist',
			component: () => import('@/views/login/Regist'),
			name: 'regist',
			meta: {
				title: 'regist',
				requireAuth: false,
				selectEdit: false,
			}

		},
		{
			path: '/resetPass',
			component: () => import('@/views/login/ResetPassWord'),
			name: 'resetPass',
			meta: {
				title: 'resetPass',
				requireAuth: false,
				selectEdit: false,
			}

		},
		// 帮助中心 --模块
		{
			path: '/helpManage',
			component: () => import('@/views/help/helpManage'),
			name: 'helpManage',
			meta: {
				title: 'helpManage',
				requireAuth: false,
				selectEdit: false,
			},

		},
		
		{
			path: '/helpManage/search',
			component: () => import('@/views/help/search'),
			name: 'search',
			meta: {
				title: 'search',
				requireAuth: false,
				selectEdit: false,
			},

		},
        //收银机管家后台 ---模块
		{
			path: '/waiterHD',
			component: () => import('@/views/waiterHD/waiterHD'),
			name: 'waiterHD',
			meta: {
				title: 'waiterHD',
				requireAuth: false,
				selectEdit: false,
			},
		},
		{
			path: '/review',
			component: () => import('@/views/waiterHD/reviewContainer/review'),
			name: 'review',
			meta: {
				title: 'review',
				requireAuth: false,
				selectEdit: false,
			},
			redirect: '/review/reReportManage',
			children: [
				{
                  path: '/review/reReportManage',
					component: () => import('@/views/report/reportManage'),
					name: 'reReportManage',
					meta: {
						title: 'reReportManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reOrderDetail',
					component: () => import('@/views/businessData/orderDetail'),
					name: 'reOrderDetail',
					meta: {
						title: 'reOrderDetail',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reRefoundDetail',
					component: () => import('@/views/businessData/refoundDetail'),
					name: 'reRefoundDetail',
					meta: {
						title: 'reRefoundDetail',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reDishReport',
					component: () => import('@/views/businessData/dishReport'),
					name: 'reDishReport',
					meta: {
						title: 'reDishReport',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reSetMealReport',
					component: () => import('@/views/businessData/setMealReport'),
					name: 'reSetMealReport',
					meta: {
						title: 'reSetMealReport',
						requireAuth: true,
						selectEdit: false,
					}
				},
				
				{
					path: '/review/reBranchStoreList',
					component: () => import('@/views/branchStore/branchStoreList'),
					name: 'reBranchStoreList',
					meta: {
						title: 'reBranchStoreList',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reDeskManage',
					component: () => import('@/views/storeManage/deskManage'),
					name: 'reDeskManage',
					meta: {
						title: 'reDeskManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reEmployeeManage',
					component: () => import('@/views/employeeManage/employeeManage'),
					name: 'reEmployeeManage',
					meta: {
						title: 'reEmployeeManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				
				{
					path: '/review/rePayManage',
					component: () => import('@/views/employeeManage/payManage'),
					name: 'rePayManage',
					meta: {
						title: 'rePayManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reSystemManage',
					component: () => import('@/views/system/systemManage'),
					name: 'reSystemManage',
					meta: {
						title: 'reSystemManage',
						requireAuth: true,
						selectEdit: false,
					}
				},

				{
					path: '/review/reDishList',
					component: () => import('@/views/dishManager/dishList'),
					name: 'reDishList',
					meta: {
						title: 'reDishList',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reUnitManage',
					component: () => import('@/views/dishManager/unitManage'),
					name: 'reUnitManage',
					meta: {
						title: 'reUnitManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reDishClassifyManage',
					component: () => import('@/views/dishManager/dishClassifyManage'),
					name: 'reDishClassifyManage',
					meta: {
						title: 'reDishClassifyManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reDishFeedingManage',
					component: () => import('@/views/dishManager/dishFeedingManage'),
					name: 'reDishFeedingManage',
					meta: {
						title: 'reDishFeedingManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reTasteManage',
					component: () => import('@/views/dishManager/tasteManage'),
					name: 'reTasteManage',
					meta: {
						title: 'reTasteManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reTakeOutManage',
					component: () => import('@/views/dishManager/takeOutManage'),
					name: 'reTakeOutManage',
					meta: {
						title: 'reTakeOutManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reSaleTagsManage',
					component: () => import('@/views/dishManager/saleTagsManage'),
					name: 'reSaleTagsManage',
					meta: {
						title: 'reSaleTagsManage',
						requireAuth: true,
						selectEdit: false,
					}
				},

				{
					path: '/review/reDownManage',
					component: () => import('@/views/down/downManage'),
					name: 'reDownManage',
					meta: {
						title: 'reDownManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/review/reUser',
					component: () => import('@/views/user/user'),
					name: 'reUser',
					meta: {
						title: 'reUser',
						requireAuth: false,
						selectEdit: false,
					}
				},
				{
					path: '/review/reNoticeManage',
					component: () => import('@/views/notice/noticeManage'),
					name: 'reNoticeManage',
					meta: {
						title: 'reNoticeManage',
						requireAuth: false,
						selectEdit: false,
					}
				},
		    ]
		},
		{
			path: '/',
			name: 'layout',
			component: Layout,
			meta: {
				title: 'layout',
				requireAuth: true,
				selectEdit: false,
			},
			redirect: '/reportManage',

			children: [{
					path: '/reportManage',
					component: () => import('@/views/report/reportManage'),
					name: 'reportManage',
					meta: {
						title: 'reportManage',
						requireAuth: true,
						selectEdit: false,
					}
				}, {
					path: '/storeState',
					component: () => import('@/views/singleStore/storeState'),
					name: 'storeState',
					meta: {
						title: 'storeState',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/systemManage',
					component: () => import('@/views/system/systemManage'),
					name: 'systemManage',
					meta: {
						title: 'systemManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/supplyManage',
					component: () => import('@/views/supplyManage/supplyManage'),
					name: 'supplyManage',
					meta: {
						title: 'supplyManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/addSupply',
					component: () => import('@/views/supplyManage/addSupply'),
					name: 'addSupply',
					meta: {
						title: 'addSupply',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/materialManage',
					component: () => import('@/views/supplyManage/materialManage'),
					name: 'materialManage',
					meta: {
						title: 'materialManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/storageManage',
					component: () => import('@/views/supplyManage/storageManage'),
					name: 'storageManage',
					meta: {
						title: 'storageManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/outManage',
					component: () => import('@/views/supplyManage/outManage'),
					name: 'outManage',
					meta: {
						title: 'outManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/stocktakManage',
					component: () => import('@/views/supplyManage/stocktakManage'),
					name: 'stocktakManage',
					meta: {
						title: 'stocktakManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/transferManage',
					component: () => import('@/views/supplyManage/transferManage'),
					name: 'transferManage',
					meta: {
						title: 'transferManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/cardManage',
					component: () => import('@/views/supplyManage/cardManage'),
					name: 'cardManage',
					meta: {
						title: 'cardManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/inventoryReport',
					component: () => import('@/views/supplyManage/inventoryReport'),
					name: 'inventoryReport',
					meta: {
						title: 'inventoryReport',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/lossReport',
					component: () => import('@/views/supplyManage/lossReport'),
					name: 'lossReport',
					meta: {
						title: 'lossReport',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/materialsReport',
					component: () => import('@/views/supplyManage/materialsReport'),
					name: 'materialsReport',
					meta: {
						title: 'materialsReport',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/statisticalReport',
					component: () => import('@/views/supplyManage/statisticalReport'),
					name: 'statisticalReport',
					meta: {
						title: 'statisticalReport',
						requireAuth: true,
						selectEdit: false,
					}
				},

				{
					path: '/downManage',
					component: () => import('@/views/down/downManage'),
					name: 'downManage',
					meta: {
						title: 'downManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/user',
					component: () => import('@/views/user/user'),
					name: 'user',
					meta: {
						title: 'user',
						requireAuth: false,
						selectEdit: false,
					}

				},
				{
					path: '/noticeManage',
					component: () => import('@/views/notice/noticeManage'),
					name: 'noticeManage',
					meta: {
						title: 'noticeManage',
						requireAuth: false,
						selectEdit: false,
					}
				},
				{
					path: '/lowDishList',
					component: () => import('@/views/notice/lowDishList'),
					name: 'lowDishList',
					meta: {
						title: 'lowDishList',
						requireAuth: false,
						selectEdit: false,
					}
				},
				{
					path: '/storeCertify',
					component: () => import('@/views/singleStore/storeCertify'),
					name: 'storeCertify',
					meta: {
						title: 'storeCertify',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/myCertify',
					component: () => import('@/views/singleStore/myCertify'),
					name: 'myCertify',
					meta: {
						title: 'myCertify',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/branchStoreList',
					component: () => import('@/views/branchStore/branchStoreList'),
					name: 'branchStoreList',
					meta: {
						title: 'branchStoreList',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/deskManage',
					component: () => import('@/views/storeManage/deskManage'),
					name: 'deskManage',
					meta: {
						title: 'deskManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/newDesk',
					component: () => import('@/views/storeManage/newDesk'),
					name: 'newDesk',
					meta: {
						title: 'newDesk',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/editDesk',
					component: () => import('@/views/storeManage/editDesk'),
					name: 'editDesk',
					meta: {
						title: 'editDesk',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/branchStoreManage',
					component: () => import('@/views/branchStore/branchStoreManage'),
					name: 'branchStoreManage',
					meta: {
						title: 'branchStoreManage',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/dishList',
					component: () => import('@/views/dishManager/dishList'),
					name: 'dishList',
					meta: {
						title: 'dishList',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/addDish',
					component: () => import('@/views/dishManager/addDish'),
					name: 'addDish',
					meta: {
						title: 'addDish',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/dishClassifyManage',
					component: () => import('@/views/dishManager/dishClassifyManage'),
					name: 'dishClassifyManage',
					meta: {
						title: 'dishClassifyManage',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/addDishSetmeal',
					component: () => import('@/views/dishManager/addDishSetmeal'),
					name: 'addDishSetmeal',
					meta: {
						title: 'addDishSetmeal',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/updateDishSetmeal',
					component: () => import('@/views/dishManager/updateDishSetmeal'),
					name: 'updateDishSetmeal',
					meta: {
						title: 'updateDishSetmeal',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/dishRecomManage',
					component: () => import('@/views/dishManager/dishRecomManage'),
					name: 'dishRecomManage',
					meta: {
						title: 'dishRecomManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/specsManage',
					component: () => import('@/views/dishManager/specsManage'),
					name: 'specsManage',
					meta: {
						title: 'specsManage',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/dishFeedingManage',
					component: () => import('@/views/dishManager/dishFeedingManage'),
					name: 'dishFeedingManage',
					meta: {
						title: 'dishFeedingManage',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/unitManage',
					component: () => import('@/views/dishManager/unitManage'),
					name: 'unitManage',
					meta: {
						title: 'unitManage',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/tasteManage',
					component: () => import('@/views/dishManager/tasteManage'),
					name: 'tasteManage',
					meta: {
						title: 'tasteManage',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/takeOutManage',
					component: () => import('@/views/dishManager/takeOutManage'),
					name: 'takeOutManage',
					meta: {
						title: 'takeOutManage',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/saleTagsManage',
					component: () => import('@/views/dishManager/saleTagsManage'),
					name: 'saleTagsManage',
					meta: {
						title: 'saleTagsManage',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/employeeManage',
					component: () => import('@/views/employeeManage/employeeManage'),
					name: 'employeeManage',
					meta: {
						title: 'employeeManage',
						requireAuth: true,
						selectEdit: false,
					},
				},
				{
					path: '/operatingDiary',
					component: () => import('@/views/employeeManage/operatingDiary'),
					name: 'operatingDiary',
					meta: {
						title: 'operatingDiary',
						requireAuth: true,
						selectEdit: false,
					},
				},
				{
					path: '/printerManage',
					component: () => import('@/views/printerManage/printerManage'),
					name: 'printerManage',
					meta: {
						title: 'printerManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/payManage',
					component: () => import('@/views/employeeManage/payManage'),
					name: 'payManage',
					meta: {
						title: 'payManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/addPrinter',
					component: () => import('@/views/printerManage/addPrinter'),
					name: 'addPrinter',
					meta: {
						title: 'addPrinter',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/editPrinter',
					component: () => import('@/views/printerManage/editPrinter'),
					name: 'editPrinter',
					meta: {
						title: 'editPrinter',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/addEmployee',
					component: () => import('@/views/employeeManage/addEmployee'),
					name: 'addEmployee',
					meta: {
						title: 'addEmployee',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/editEmployee',
					component: () => import('@/views/employeeManage/editEmployee'),
					name: 'editEmployee',
					meta: {
						title: 'editEmployee',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/addGrade',
					component: () => import('@/views/employeeManage/addGrade'),
					name: 'addGrade',
					meta: {
						title: 'addGrade',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/editGrade',
					component: () => import('@/views/employeeManage/editGrade'),
					name: 'editGrade',
					meta: {
						title: 'editGrade',
						requireAuth: true,
						selectEdit: true,
					}
				},

				{
					path: '/updateDish',
					component: () => import('@/views/dishManager/updateDish'),
					name: 'updateDish',
					meta: {
						title: 'updateDish',
						requireAuth: true,
						selectEdit: true,
					}
				},
				
				{
					path: '/orderDetail',
					component: () => import('@/views/businessData/orderDetail'),
					name: 'orderDetail',
					meta: {
						title: 'orderDetail',
						requireAuth: true,
						selectEdit: false,

					}
				},
				{
					path: '/refoundDetail',
					component: () => import('@/views/businessData/refoundDetail'),
					name: 'refoundDetail',
					meta: {
						title: 'refoundDetail',
						requireAuth: true,
						selectEdit: false,

					}
				},
				{
					path: '/setMealReport',
					component: () => import('@/views/businessData/setMealReport'),
					name: 'setMealReport',
					meta: {
						title: 'setMealReport',
						requireAuth: true,
						selectEdit: false,

					}
				},
				{
					path: '/orderDetailInfo',
					component: () => import('@/views/businessData/orderDetailInfo'),
					name: 'orderDetailInfo',
					meta: {
						title: 'orderDetailInfo',
						requireAuth: true,
						selectEdit: false,

					}
				},
				// {
				//   path: '/returnGiveManage',
				//   component: () => import('@/views/businessData/returnGiveManage'),
				//   name: 'returnGiveManage',
				//   meta: {
				//     title: 'returnGiveManage',
				//     requireAuth: true,
				//     selectEdit: false,

				//   }
				// },
				{
					path: '/dishReport',
					component: () => import('@/views/businessData/dishReport'),
					name: 'dishReport',
					meta: {
						title: 'dishReport',
						requireAuth: true,
						selectEdit: false,

					}
				},
				{
					path: '/gateManage',
					component: () => import('@/views/merchantManage/gateManage'),
					name: 'gateManage',
					meta: {
						title: 'gateManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/financeManage',
					component: () => import('@/views/merchantManage/financeManage'),
					name: 'financeManage',
					meta: {
						title: 'financeManage',
						requireAuth: true,
						selectEdit: false,
					}
				},

				{
					path: '/cashOut',
					component: () => import('@/views/merchantManage/cashOut'),
					name: 'cashOut',
					meta: {
						title: 'cashOut',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/cashOutDetail',
					component: () => import('@/views/merchantManage/cashOutDetail'),
					name: 'cashOutDetail',
					meta: {
						title: 'cashOutDetail',
						requireAuth: true,
						selectEdit: true,
					}
				},
				{
					path: '/addPayAccount',
					component: () => import('@/views/merchantManage/addPayAccount'),
					name: 'addPayAccount',
					meta: {
						title: 'addPayAccount',
						requireAuth: true,
						selectEdit: true,
					}
				},
			]
		},
	]
	
})