import {
  ajax,
  ajaxFile
} from '@/http/api'


var request = function () {
  var self = {};

  //获取餐饮类型信息字典
  self.getcateringtype = function (data, successfn) {
    ajax('/apis/dept/post/getcateringtype', data, false, 'post', successfn);
  };
  //获取州 城市列表
  self.getCityList = function (data, successfn) {
    ajax('/apis/dept/post/citylist', data, false, 'post', successfn);
  };


  //发送验证码
  self.sendSms = function (data, successfn) {
    ajax('/apis/company/get/vcode', data, false, 'post', successfn);
  };
  //发送验证码 带手机号是否存在验证
  self.sendSmsPhone = function (data, successfn) {
    ajax('/apis/company/get/verifycode', data, false, 'post', successfn);
  };

  //注册请求
  self.regist = function (data, successfn) {
    ajax('/apis/company/post/entreg', data, false, 'post', successfn);
  };
  //账号密码登录
  self.login = function (data, successfn) {
    ajax('/apis/company/get/entlogin', data, false, 'post', successfn);
  };
  //手机号登录
  self.phonelogin = function (data, successfn) {
    ajax('/apis/company/get/entphonelogin', data, false, 'post', successfn);
  };
  //密码重置
  self.resetpass = function (data, successfn) {
    ajax('/apis/company/put/entresetpwd', data, false, 'post', successfn);
  };
  //提交认证
  self.storeCertifyInfo = function (data, successfn) {
    ajax('/apis/company/put/cominfo', data, false, 'post', successfn);
  };
  //获取验证码 -- 企业资质
  self.codeforphone = function (data, successfn) {
    ajax('/apis/company/codeforphone', data, false, 'post', successfn);
  };
  //验证验证码 -- 企业资质
  self.verifyphonecode = function (data, successfn) {
    ajax('/apis/company/verifyphonecode', data, false, 'post', successfn);
  };
  //退出登录
  self.loginout = function (data, successfn) {
    ajax('/apis/company/get/loginout', data, false, 'post', successfn);
  };
  //修改手机号码
  self.updatephone = function (data, successfn) {
    ajax('/apis/company/put/updatephone', data, false, 'post', successfn);
  };
  //请求获取登录二维码
  self.entapplyQRcode = function (data, successfn) {
    ajax('/apis/company/get/entapplyQRcode', data, false, 'post', successfn);
  };
  //轮询接口
  self.pollingLogon = function (data, successfn) {
    ajax('/apis/company/get/pollingLogon', data, false, 'post', successfn);
  };


  //资质列表
  self.storeCertifyList = function (data, successfn) {
    ajax('/apis/company/get/comqua', data, false, 'post', successfn);
  };

  //添加门店
  self.addBranchStore = function (data, successfn) {
    ajax('/apis/dept/post/deptreg', data, false, 'post', successfn);
  };
  //门店列表
  self.branchStoreList = function (data, successfn) {
    ajax('/apis/dept/post/deptlist', data, false, 'post', successfn);
  };
  //门店列表无分页
  self.branchStoreListAll = function (data, successfn) {
    ajax('/apis/dept/post/deptall', data, false, 'post', successfn);
  };
  //门店详情
  self.branchStoreDetail = function (data, successfn) {
    ajax('/apis/dept/post/deptdetail', data, false, 'post', successfn);
  };
  //查询门店信息
  self.getdpdepinfo = function (data, successfn) {
    ajax('/dp/depart/getdpdepinfo', data, false, 'post', successfn);
  };
  //查询商业信息
  self.getBussinessInfo = function (data, successfn) {
    ajax('/apis/dept/config/findbusiness', data, false, 'post', successfn);
  };
  //门店修改
  self.editBranchStore = function (data, successfn) {
    ajax('/apis/dept/deptupdate', data, false, 'post', successfn);
  };
  //复制菜品
  self.sycDish = function (data, successfn) {
    ajax('/apis/dish/info/copydish', data, false, 'post', successfn);
  };
  //门店入驻
  self.adddepinfo = function (data, successfn) {
    ajax('/dp/depart/adddepinfo', data, false, 'post', successfn);
  };
  //添加门店信息
  self.addNewDepInfo = function (data, successfn) {
    ajax('/apis/dept/post/appdeptAdd', data, false, 'post', successfn);
  };

  //更新门店商业信息
  self.addbusiness = function (data, successfn) {
    ajax('/apis/dept/config/addbusiness', data, false, 'post', successfn);
  };
  //支付类型
  self.getpaytype = function (data, successfn) {
    ajax('/apis/dept/post/getpaytype', data, false, 'post', successfn);
  };

  //桌台区域列表
  self.tablePosList = function (data, successfn) {
    ajax('/apis/table/post/tableposlist', data, false, 'post', successfn);
  };
  //桌台区域添加
  self.tablePosAdd = function (data, successfn) {
    ajax('/apis/table/post/tableposadd', data, false, 'post', successfn);
  };
  //桌台区域删除
  self.tablePosDel = function (data, successfn) {
    ajax('/apis/table/post/tableposdel', data, false, 'post', successfn);
  };
  //桌台区域修改
  self.tablePosUpdate = function (data, successfn) {
    ajax('/apis/table/post/tableposupdate', data, false, 'post', successfn);
  };
  //桌台区域查询
  self.tablePosSelect = function (data, successfn) {
    ajax('/apis/table/post/tableposselect', data, false, 'post', successfn);
  };

  //桌台列表
  self.tableList = function (data, successfn) {
    ajax('/apis/table/post/tablelist', data, false, 'post', successfn);
  };
  //桌台添加
  self.tableAdd = function (data, successfn) {
    ajax('/apis/table/post/tableadd', data, false, 'post', successfn);
  };
  //桌台删除
  self.tableDel = function (data, successfn) {
    ajax('/apis/table/post/tabledel', data, false, 'post', successfn);
  };
  //桌台修改
  self.tableUpdate = function (data, successfn) {
    ajax('/apis/table/post/tableupdate', data, false, 'post', successfn);
  };
  //桌台查询
  self.tableSel = function (data, successfn) {
    ajax('/apis/table/post/tablesel', data, false, 'post', successfn);
  };

  //获取字典列表 
  self.getDicList = function (data, successfn) {
    ajax('/apis/dish/dt/get/list', data, false, 'post', successfn);
  };
  //删除字典
  self.delDic = function (data, successfn) {
    ajax('/apis/dish/dt/del/dt', data, false, 'post', successfn);
  };
  //新增字典
  self.addDic = function (data, successfn) {
    ajax('/apis/dish/dt/put/add', data, false, 'post', successfn);
  };
  //菜品标签和规格列表查询
  self.tagspeclist = function (data, successfn) {
    ajax('/apis/dish/dt/tagspeclist', data, false, 'post', successfn);
  };
  //新增打包盒
  self.addPack = function (data, successfn) {
    ajax('/apis/dish/info/addPack', data, false, 'post', successfn);
  };
  //删除打包盒
  self.delPack = function (data, successfn) {
    ajax('/apis/dish/info/delPack', data, false, 'post', successfn);
  };
  //修改打包盒
  self.updatePack = function (data, successfn) {
    ajax('/apis/dish/info/updatePack', data, false, 'post', successfn);
  };
  //获取打包盒列表
  self.getPackList = function (data, successfn) {
    ajax('/apis/dish/info/getPackList', data, false, 'post', successfn);
  };
  

  //新增菜品
  self.addDish = function (data, successfn) {
    ajax('/apis/dish/info/put/add', data, false, 'post', successfn);
  };
  //导入菜品 
  self.batchadd = function (data, successfn) {
    ajax('/apis/dish/info/put/batchadd', data, false, 'post', successfn);
  };

  //修改菜品
  self.updateDish = function (data, successfn) {
    ajax('/apis/dish/info/put/modify', data, false, 'post', successfn);
  };
  //菜品查询
  self.dishList = function (data, successfn) {
    ajax('/apis/dish/info/get/list', data, false, 'post', successfn);
  };
  //下架菜品 
  self.soldouts = function (data, successfn) {
    ajax('/apis/dish/info/del/soldouts', data, false, 'post', successfn);
  };
  //上架菜品
  self.resold = function (data, successfn) {
    ajax('/apis/dish/info/put/resold', data, false, 'post', successfn);
  };
  //删除商品 
  self.delDishs = function (data, successfn) {
    ajax('/apis/dish/info/del/bydishids', data, false, 'post', successfn);
  };
  //菜品详情 
  self.dishInfo = function (data, successfn) {
    ajax('/apis/dish/info/get/dishdetail', data, false, 'post', successfn);
  };
  //库存低于100的菜品 
  self.under100 = function (data, successfn) {
    ajax('/apis/dish/info/under100', data, false, 'post', successfn);
  };

  //菜品分类列表 一级
  self.typeInfoFirstList = function (data, successfn) {
    ajax('/apis/dish/type/get/flist', data, false, 'post', successfn);
  };
  //菜品分类列表 二级
  self.typeInfoSecondList = function (data, successfn) {
    ajax('/apis/dish/type/get/slist', data, false, 'post', successfn);
  };
  //菜品分类添加 
  self.typeInfoAdd = function (data, successfn) {
    ajax('/apis/dish/type/put/add', data, false, 'post', successfn);
  };
  //菜品分类删除
  self.typeInfoDel = function (data, successfn) {
    ajax('/apis/dish/type/del/typeinfo', data, false, 'post', successfn);
  };
  //菜品分类排序
  self.sort = function (data, successfn) {
    ajax('/apis/dish/type/sort', data, false, 'post', successfn);
  };
  //菜品分类修改
  self.typeInfoUpdate = function (data, successfn) {
    ajax('/apis/dish/type/put/modify', data, false, 'post', successfn);
  };
  //菜品分类信息
  self.typeInfoGet = function (data, successfn) {
    ajax('/apis/dish/type/get/typeinfo', data, false, 'post', successfn);
  };
  //库存预警
  self.updatewain = function (data, successfn) {
    ajax('/apis/dept/config/updatewain', data, false, 'post', successfn);
  };
  //更新配置表
  self.updateBranchStoreSet = function (data, successfn) {
    ajax('/apis/dept/config/update', data, false, 'post', successfn);
  };
  //查询门店配置
  self.selectDishSet = function (data, successfn) {
    ajax('/apis/dept/config/select', data, false, 'post', successfn);
  };
  //套餐里面菜品查询
  self.dishesnotsuits = function (data, successfn) {
    ajax('/apis/dish/info/get/dishesnotsuits', data, false, 'post', successfn);
  };
  //获取套餐分类id
  self.getSetMealId = function (data, successfn) {
    ajax('/apis/dish/type/typebyname', data, false, 'post', successfn);
  };

  //菜品加料添加 
  self.feedingAdd = function (data, successfn) {
    ajax('/apis/dish/additional/put/add', data, false, 'post', successfn);
  };
  //菜品加料删除
  self.feedingDel = function (data, successfn) {
    ajax('/apis/dish/additional/del/deladt', data, false, 'post', successfn);
  };
  //删除配菜内关联的一个或菜品
  self.feedingDelRef = function (data, successfn) {
    ajax('/apis/dish/additional/del/delref', data, false, 'post', successfn);
  };
  //菜品加料修改
  self.feedingUpdate = function (data, successfn) {
    ajax('/apis/dish/additional/put/modify', data, false, 'post', successfn);
  };
  //菜品加料信息
  self.feedingGet = function (data, successfn) {
    ajax('/apis/dish/additional/get/adt', data, false, 'post', successfn);
  };
  //菜品加料列表
  self.feedingList = function (data, successfn) {
    ajax('/apis/dish/additional/get/adtlist', data, false, 'post', successfn);
  };
  //配菜对应的已关联菜品列表（带分页的
  self.feedingRefList = function (data, successfn) {
    ajax('/apis/dish/additional/get/dishadtrefList', data, false, 'post', successfn);
  };
  //未关联当前配菜的菜品列表根据分类查询（分页）
  self.feedingNoRefList = function (data, successfn) {
    ajax('/apis/dish/additional/get/dishbytypeexctadt', data, false, 'post', successfn);
  }
  //设置单个加料的禁用启用状态
  self.feedingEnabled = function (data, successfn) {
    ajax('/apis/dish/additional/put/adtenable', data, false, 'post', successfn);
  };
  //一个配菜与多个菜品建立关联
  self.feedingRef = function (data, successfn) {
    ajax('/apis/dish/additional/put/ref', data, false, 'post', successfn);
  };

  //口味列表
  self.kouweiList = function (data, successfn) {
    ajax('/apis/dish/dt/kouwei', data, false, 'post', successfn);
  };

  //新增，修改口味
  self.saveorupdatekouwei = function (data, successfn) {
    ajax('/apis/dish/dt/saveorupdatekouwei', data, false, 'post', successfn);
  };
  //菜品口味删除前确认
  self.canDeleteTaste = function (data, successfn) {
    ajax('/apis/dish/dt/canDeleteTaste', data, false, 'post', successfn);
  };
  
  


  //单店概览
  //门店销售概览统计
  self.overviewdata = function (data, successfn) {
    ajax('/apis/dept/count/overviewdata', data, false, 'post', successfn);
  };
  //菜品销售排名
  self.dishrank = function (data, successfn) {
    ajax('/apis/dept/count/dishrank', data, false, 'post', successfn);
  };
  //订单来源统计
  self.orderSource = function (data, successfn) {
    ajax('/apis/dept/count/orderSource', data, false, 'post', successfn);
  };
  //时段统计
  self.timecount = function (data, successfn) {
    ajax('/apis/dept/count/timecount', data, false, 'post', successfn);
  };
  //支付方式统计
  self.paycount = function (data, successfn) {
    ajax('/apis/dept/count/paycount', data, false, 'post', successfn);
  };
  //获取Redis中的门店配置信息
  self.getRedisDeptConfigInfo = function (data, successfn) {
    ajax('/apis/dept/config/getRedisDeptConfigInfo', data, false, 'post', successfn);
  };
  //报表
  //订单明细
  self.orderDetail = function (data, successfn) {
    ajax('/apis/dept/order/detail', data, false, 'post', successfn);
  };
  //退款明细
  self.pagerefund = function (data, successfn) {
    ajax('/apis/dept/report/pagerefund', data, false, 'post', successfn);
  };
  //退赠菜
  self.regive = function (data, successfn) {
    ajax('/apis/dept/dish/regive', data, false, 'post', successfn);
  };
  //菜品销售报表
  self.saleDish = function (data, successfn) {
    ajax('/apis/dept/report/dishsale', data, false, 'post', successfn);
  };
  //店铺所有服务员
  self.waiter = function (data, successfn) {
    ajax('/apis/dept/order/waiter', data, false, 'post', successfn);
  };
  //订单详情
  self.details = function (data, successfn) {
    ajax('/apis/dept/order/details', data, false, 'post', successfn);
  };
  self.details = function (data, successfn) {
    ajax('/apis/dept/order/details', data, false, 'post', successfn);
  };

  //门店页面套餐报表
  self.setmeal = function (data, successfn) {
    ajax('/apis/dept/report/setmeal', data, false, 'post', successfn);
  };

  //查询后台管理系统企业信息
  self.findcominfo = function (data, successfn) {
    ajax('/apis/company/put/findcominfo', data, false, 'post', successfn);
  };
  //修改后台管理系统企业信息
  self.updatecominfo = function (data, successfn) {
    ajax('/apis/company/put/updatecominfo', data, false, 'post', successfn);
  };
  //验证验证码
  self.checkcode = function (data, successfn) {
    ajax('/apis/company/put/checkcode', data, false, 'post', successfn);
  };
  //更改用户头像
  self.updatelogo = function (data, successfn) {
    ajax('/apis/company/updatelogo', data, false, 'post', successfn);
  };

  //点评接口
  //获取点评店铺信息
  self.getdpdepinfo = function (data, successfn) {
    ajax('/dp/depart/getdpdepinfo', data, false, 'post', successfn);
  };
  //修改点评店铺信息
  self.updatedpdepinfo = function (data, successfn) {
    ajax('/dp/depart/updatedpdepinfo', data, false, 'post', successfn);
  };
  //发送验证手机号是否有效，同时手机号也是钱包的账号的验证码
  self.codeforwp = function (data, successfn) {
    ajax('/apis/company/codeforwp', data, false, 'post', successfn);
  };
  //绑定钱包账号
  self.bandwallet = function (data, successfn) {
    ajax('/dp/depart/bandwallet', data, false, 'post', successfn);
  };

  //商户回复评论设置
  self.replyset = function (data, successfn) {
    ajax('/apis/company/post/replyset', data, false, 'post', successfn);
  };
  //查询商户回复评论设置
  self.findreplyset = function (data, successfn) {
    ajax('/apis/company/post/findreplyset', data, false, 'post', successfn);
  };
  //商户回复用户评论
  self.replyuser = function (data, successfn) {
    ajax('/apis/company/post/replyuser', data, false, 'post', successfn);
  };
  //查询点评管理
  self.findcommentlist = function (data, successfn) {
    ajax('/apis/company/post/findcommentlist', data, false, 'post', successfn);
  };
  //商户删除评论
  self.delcomment = function (data, successfn) {
    ajax('/apis/company/post/delcomment', data, false, 'post', successfn);
  };
  //新增提现银行信息
  self.addbank = function (data, successfn) {
    ajax('/wfinacial/addbank', data, false, 'post', successfn);
  };
  //删除银行信息
  self.delDepBank = function (data, successfn) {
    ajax('/wfinacial/delDepBank', data, false, 'post', successfn);
  };
  //获取门店钱包信息
  self.getWalletInfo = function (data, successfn) {
    ajax('/wfinacial/getWalletInfo', data, false, 'post', successfn);
  };
  //提现
  self.cashwithdraw = function (data, successfn) {
    ajax('/wfinacial/cashwithdraw', data, false, 'post', successfn);
  };
  //提现记录
  self.getsettlelist = function (data, successfn) {
    ajax('/wfinacial/finacial/getsettlelist', data, false, 'post', successfn);
  };
  //获取银行列表
  self.getbanklist = function (data, successfn) {
    ajax('/wfinacial/getbanklist', data, false, 'post', successfn);
  };
  //对账中心
  self.getRecPages = function (data, successfn) {
    ajax('/apis/financial3/getRecPages', data, false, 'post', successfn);
  };

  //开关引导页
  self.deptguide = function (data, successfn) {
    ajax('/apis/dept/post/deptguide', data, false, 'post', successfn);
  };

  //获取系统消息
  self.allpushmess = function (data, successfn) {
    ajax('/apis/company/info/allpushmess', data, false, 'post', successfn);
  };
  // 查看系统消息
  self.updatepush = function (data, successfn) {
    ajax('/apis/company/info/updatepush', data, false, 'post', successfn);
  };
  //获取新的的业务消息，轮询使用
  self.newbusiness = function (data, successfn) {
    ajax('/apis/company/info/newbusiness', data, false, 'post', successfn);
  };

  //获取全部的业务消息
  self.allbusiness = function (data, successfn) {
    ajax('/apis/company/info/allbusiness', data, false, 'post', successfn);
  };

  //查看消息后，修改更新消息状态
  self.updatenews = function (data, successfn) {
    ajax('/apis/company/info/updatenews', data, false, 'post', successfn);
  };

  //获取库存或者估清预警菜品信息
  self.warndish = function (data, successfn) {
    ajax('/apis/company/info/warndish', data, false, 'post', successfn);
  };
 
  /*

    ---打印机管理模块---

  */
  //添加打印机
  self.addPrint = function (data, successfn) {
    ajax('/apis/dept/print/add', data, false, 'post', successfn);
  };
  //获取单个打印机信息
  self.printDetail = function (data, successfn) {
    ajax('/apis/dept/print/get', data, false, 'post', successfn);
  };
  //删除打印机
  self.delPrint = function (data, successfn) {
    ajax('/apis/dept/print/delete', data, false, 'post', successfn);
  };
  //获取所有打印机信息
  self.getPrint = function (data, successfn) {
    ajax('/apis/dept/print/getall', data, false, 'post', successfn);
  };
  //获取菜品全部分类
  self.getdish = function (data, successfn) {
    ajax('/apis/dept/print/getdish', data, false, 'post', successfn);
  };
  //修改打印机
  self.editPrint = function (data, successfn) {
    ajax('/apis/dept/print/update', data, false, 'post', successfn);
  };
  //新增收银打印机，获取打印机可选的打印订单类型
  self.ordertype = function (data, successfn) {
    ajax('/apis/dept/print/ordertype', data, false, 'post', successfn);
  };

  //获取商圈
  self.getareainfo = function (data, successfn) {
    ajax('/apis/dept/post/getareainfo', data, false, 'post', successfn);
  };

  //获取支付方式
  self.getpaytype = function (data, successfn) {
    ajax('/apis/dept/post/getpaytype', data, false, 'post', successfn);
  };

  //更新支付设置
  self.updatepay = function (data, successfn) {
    ajax('/apis/dept/payset/post/update', data, false, 'post', successfn);
  };

  //门店数据统计
  self.managedata = function (data, successfn) {
    ajax('/apis/dept/count/managedata', data, false, 'post', successfn);
  };

  //帮助中心
  self.doc = function (data, successfn) {
    ajax('/apis/dept/post/doc', data, false, 'post', successfn);
  };
  /*
   * @Author: zzt
   * @Date: 2020-09-02 21:54:39
   * @LastEditTime: 2020-10-12 16:28:06
   * @LastEditors: zzt
   * @Description: 接口地址迁移
   * @FilePath: \sjoyOrderingManage\src\http\apiService.js
   */


  /*

    ---门店管理模块---

  */

  //---员工管理
  self.appworkInfo = function (data, successfn) {
    ajax('/apis/company/put/appworkinfo', data, false, 'post', successfn); //按单店跨店分的员工列表
  };
  //---添加员工 
  self.workerAdd = function (data, successfn) {
    ajax('/apis/company/put/workeradd', data, false, 'post', successfn);
  };
  //员工列表 分页
  self.workerList = function (data, successfn) {
    ajax('/apis/company/put/workerlist', data, false, 'post', successfn);
  };

  //员工删除
  self.workerDel = function (data, successfn) {
    ajax('/apis/company/put/comdel', data, false, 'post', successfn);
  };
  //员工修改
  self.workerUpdate = function (data, successfn) {
    ajax('/apis/company/put/workerupdate', data, false, 'post', successfn);
  };
  //员工搜索
  self.workerSearch = function (data, successfn) {
    ajax('/apis/company/put/workersear', data, false, 'post', successfn);
  };
  //员工密码重置
  self.workerResetPwd = function (data, successfn) {
    ajax('/apis/company/put/workresetpwd', data, false, 'post', successfn);
  };

  //职级列表 分页
  self.classList = function (data, successfn) {
    ajax('/apis/company/put/classlist', data, false, 'post', successfn);
  };
  //职级添加 
  self.classAdd = function (data, successfn) {
    ajax('/apis/company/put/classadd', data, false, 'post', successfn);
  };
  //职级删除
  self.classDel = function (data, successfn) {
    ajax('/apis/company/put/classdel', data, false, 'post', successfn);
  };
  //职级修改
  self.classUpdate = function (data, successfn) {
    ajax('/apis/company/put/classupdate', data, false, 'post', successfn);
  };
  //职级信息
  self.classGet = function (data, successfn) {
    ajax('/apis/company/put/classsel', data, false, 'post', successfn);
  };
  //职级权限列表
  self.findauthlist = function (data, successfn) {
    ajax('/apis/company/put/findauthlist', data, false, 'post', successfn);
  };

  // 职级列表带权限名称的详细信息
  self.classlistdetails = function (data, successfn) {
    ajax('/apis/company/get/classlistdetails', data, false, 'post', successfn);
  };

  // 系统除管理员外，最大的权限
  self.sysauth2nd = function (data, successfn) {
    ajax('/apis/company/get/sysauth2nd', data, false, 'post', successfn);
  };


  // 获取单个职级的详细信息以及系统内置的权限列表
  self.classDetail = function (data, successfn) {
    ajax('/apis/company/get/classdetail', data, false, 'post', successfn);
  };

  // 职级添加或修改
  self.classAddOrModify = function (data, successfn) {
    ajax('/apis/company/put/classaddormodify', data, false, 'post', successfn);
  };

  // 操作日志列表查询
  self.operationlist = function (data, successfn) {
    ajax('/apis/company/put/operationlist', data, false, 'post', successfn);
  };
  // 获取收款银行账户
  self.getDepBankInfo = function (data, successfn) {
    ajax('/apis/financial3/getDepBankInfo', data, false, 'post', successfn);
  };
  // 获取企业支付信息
  self.getCollecitonInfo = function (data, successfn) {
    ajax('/wfinacial/getCollecitonInfo', data, false, 'post', successfn);
  };
  //获取系统字典
  self.getDictlist = function (data, successfn) {
    ajax('/apis/dept/post/dictlist', data, false, 'post', successfn);
  };
  /*
   
    ---菜品管理模块---
   
  */

  // 获取所有的菜品分类
  self.allType = function (data, successfn) {
    ajax('/apis/dish/type/alltype', data, false, 'post', successfn);
  };
  //获取菜品标签类型字典
  self.dishTags = function (data, successfn) {
    ajax('/apis/dept/post/dishtags', data, false, 'post', successfn);
  };
  //查询店铺所有菜品并且二级分类处理好
  self.queryList = function (data, successfn) {
    ajax('/apis/dish/info/list', data, false, 'post', successfn);
  };
  //获取门店内所有菜品（不分页）
  self.alldish = function (data, successfn) {
    ajax('/apis/dish/info/alldish', data, false, 'post', successfn);
  };
  //获取自定义套餐的分组信息(不分页)
  self.getDishTeams = function (data, successfn) {
    ajax('/apis/dish/set/getTeams', data, false, 'post', successfn);
  };
  //删除自定义套餐分组
  self.delDishTeams = function (data, successfn) {
    ajax('/apis/dish/set/delTeams', data, false, 'post', successfn);
  };
  //新建菜品分组
  self.addDishTeams = function (data, successfn) {
    ajax('/apis/dish/set/addTeam', data, false, 'post', successfn);
  };

  //更新门店配置单个的开关
  self.updateConfigSwitch = function (data, successfn) {
    ajax('/apis/dept/config/updateConfigSwitch', data, false, 'post', successfn);
  };

  /*
   
    ---服务员HD模块---
   
  */
  //员工登入到管家--登录信息
  self.logintoManage = function (data, successfn) {
    ajax('/apis/company/logintomanage', data, false, 'post', successfn);
  };
  return self;
}();

export {
  request
}