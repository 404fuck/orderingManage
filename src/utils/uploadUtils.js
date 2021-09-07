
import store from '../store'
import {
    toast
} from '@/utils/toast'
import i18n from './i18n'
var uploadUtils = function () {
    var self = {};

    //上传图片地址
    self.uploadAction = function () {
        return store.getters.serverUrl + ":18091/apis/file/put/imgupload";
    };
    //上传图片传参数
    self.uploadData = function () {
        return {
            "token": store.getters.token,
        }
    };
    self.beforeAvatarUpload = function (file) {
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            toast.error(i18n.t('uploadUtils.bbb'));
        }
        return isLt2M;
    };

   

    //上传xls地址
    self.uploadActionXls = function () {
        return store.getters.serverUrl + ":18091/apis/dish/info/importDishesByExcle";
    };
    //上传xls传参数
    self.uploadDataXls = function () {
        return {
            "token": store.getters.token,
            "dep_id": store.getters.curentStore.dep_ID,
        }
    };
    self.beforeAvatarUploadXls = function (file) {
        console.log(file.type);
        const isXLS = file.type === 'application/vnd.ms-excel';
        if (!isXLS) {
            toast.error(i18n.t('uploadUtils.ddd'));
        }
        
    };

    return self;
}();

export {
    uploadUtils
}