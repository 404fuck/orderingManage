import {
    toast
} from '@/utils/toast'
import store from '../store'
import i18n from './i18n'
var stringutils = function () {
    var self = {};

    //判断字符串是否为空
    self.isEmpty = function (data) {
        return data == null || data == undefined || data == '';
    };
    self.isNotEmpty = function (data) {
        return !self.isEmpty(data);
    };
    //判断是否为手机号
    self.isMobileNumber = function (phone) {

        var flag = false;
        var message = "";
        // var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        if (phone == '') {
            // console.log("手机号码不能为空");
            message = "手机号码不能为空！";

        }else {
            flag = true;
        }
        if (message != "") {
            toast.warning(message);
        }
        return flag;

    };

    self.getJsonLength = function (json) {
        var jsonLength = 0;
        if (json.length === 0 || json === null) {
            return 0;
        }
        for (var i in json) {
            jsonLength++;
        }
        return jsonLength;
    }

    //深复制对象方法     
    self.simpleCopy = function (obj) {
        var _obj = JSON.stringify(obj),
            objClone = JSON.parse(_obj);
        return objClone;
    }

    //数组种插入数组的方法
    self.insert = function (arrfirst, arrlast, index) {
        if (index < 0) {
            index = 0;
        } else if (index > arrfirst.length) {
            index = arrfirst.length;
        }
        for (var i = arrlast.length - 1; i >= 0; i--) {
            arrfirst.splice(index, 0, arrlast[i]); //是在index位置用arrlast[i]替换掉arrfirst数组中的0个元素
        }
        return arrfirst;
    }
    /*
      ---登录时的请求地址---
      ---打包上线只改getBaseUrlLogin--
    */
    self.getBaseUrlLogin = function () {
        let base_url = ''
        switch (process.env.NODE_ENV) {
            case 'development': //http://192.168.1.207:18000
                base_url = "http://www.shule666.com" //这里是本地的请求url
                break
            case 'test': // 注意这里的名字要和步骤二中设置的环境名字对应起来  
                base_url = "http://www.shule666.com" //这里是测试环境中的url
                break
            case 'production'://http://www.shule666.com
                base_url = "http://www.shule666.com" //生产环境url
                break
        }
        return base_url;
    }
    self.clearData = function () {
        store.dispatch('setStoreList', null)
        store.dispatch('setToken', "")
        store.dispatch('setLoginInfo', null)
        store.dispatch('setUser', null)
        store.dispatch('setCurentStore', null)
        store.dispatch('setBusinessModel', null)
        store.dispatch('setServerUrl', null)
    }

    self.makePy = function (str) {
        if (typeof (str) != "string")
            throw new Error(-1, "函数makePy需要字符串类型参数!");
        var arrResult = new Array(); //保存中间结果的数组  
        for (var i = 0, len = str.length; i < len; i++) {
            //获得unicode码  
            var ch = str.charAt(i);
            //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理  
            arrResult.push(checkCh(ch));
        }
        //处理arrResult,返回所有可能的拼音首字母串数组  
        return mkRslt(arrResult);
    }

    function checkCh(ch) {
        var uni = ch.charCodeAt(0);
        //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数  
        if (uni > 40869 || uni < 19968)
            return ch; //dealWithOthers(ch);  
        //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母  
        return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)));
    }

    function mkRslt(arr) {
        var arrRslt = [""];
        for (var i = 0, len = arr.length; i < len; i++) {
            var str = arr[i];
            var strlen = str.length;
            if (strlen == 1) {
                for (var k = 0; k < arrRslt.length; k++) {
                    arrRslt[k] += str;
                }
            } else {
                var tmpArr = arrRslt.slice(0);
                arrRslt = [];
                for (k = 0; k < strlen; k++) {
                    //复制一个相同的arrRslt  
                    var tmp = tmpArr.slice(0);
                    //把当前字符str[k]添加到每个元素末尾  
                    for (var j = 0; j < tmp.length; j++) {
                        tmp[j] += str.charAt(k);
                    }
                    //把复制并修改后的数组连接到arrRslt上  
                    arrRslt = arrRslt.concat(tmp);
                }
            }
        }
        return arrRslt;
    }
    /*
     *获取当前的日期
     *返回格式: YYYY-mm-dd
    */
    self.getCurrentDate = function (date) {
        let month = parseInt(date.getMonth() + 1);
        let day = date.getDate();
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return date.getFullYear() + '-' + month + '-' + day;
    }
    /*
     *获取当前月的第一天
     *返回格式: YYYY-mm-dd
    */
    self.getCurrentMonthLastDay = function (date) {
        let currentMonth = date.getMonth();
        let nextMonth = ++currentMonth;
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        let oneDay = 1000 * 60 * 60 * 24;
        let lastTime = new Date(nextMonthFirstDay - oneDay);
        let month = parseInt(lastTime.getMonth() + 1);
        let day = lastTime.getDate();
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return date.getFullYear() + '-' + month + '-' + day;
    }

    //获取时间段包含的星期
    self.getWeeksFromDate = function (date) {
        let arr = date
        let beginDateObj = new Date(arr[0]);
        let endDateObj = new Date(arr[1]);
        let weeksArr = [];
        while (beginDateObj <= endDateObj) { //直到结束日期，跳出循环
            if (weeksArr.indexOf(beginDateObj.getDay()) == -1) { //数组中不存在，则push到数组中
                let weekNum = beginDateObj.getDay();
                weeksArr.push(weekNum);
            }
            beginDateObj.setTime(beginDateObj.getTime() + 24 * 60 * 60 * 1000); //每次递增1天
        }
        return  weeksArr.map(String);
    }
    //如果为null时字段变为空
    self.formatTxtNull = function (value) {
        if (!value||value==null) {
            return ''
        }
        return value;
    }

    //字段
    self.formatTxt = function (value) {
        if (!value||value==-1) {
            return '-'
        }
        return value;
    }
    //金额
    self.formatPrice = function (value) {
        if (!value) {
            return '0.00'
        }
        if(value==-1){
            return ''
        }
        value = Number(value).toFixed(2); //保留两位小数 四舍五入
        return value;
    }
    //数量
    self.formatNum = function (value) {
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
    }
    self.arrRemove = function (arr, delVal) {
        if (arr instanceof Array) {
            var index = arr.indexOf(delVal);
            if (index > -1) {
                arr.splice(index, 1);
            }
        }
    }
        
    self.isOSXMAC = function () {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
            return true
        }
        return false
    }
    self.en_US = function () {
        return 'en_US'
    };
    self.ms_MY = function () {
        return 'ms_MY'
    };
    self.zh_CN = function () {
        return 'zh_CN'
    };

    self.deepClone = function (obj) { //深拷贝
        let objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === "object") {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    //判断ojb子元素是否为对象，如果是，递归复制
                    if (obj[key] && typeof obj[key] === "object") {
                        objClone[key] = this.deepClone(obj[key]);
                    } else {
                        //如果不是，简单复制
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
    }
   
    return self;
}();

export {
    stringutils
}