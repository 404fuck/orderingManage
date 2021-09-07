<!--
 * @Author: zzt
 * @Date: 2021-01-15 11:57:36
 * @LastEditTime: 2021-03-29 16:44:29
 * @LastEditors: Please set LastEditors
 * @Description: 通知栏顶部
 * @FilePath: \sjoyOrderingManage\src\views\waiterHD\components\navBar.vue
-->

<template>
    <div class="navBar">
        <el-row>
            <el-col :span="16">
                <span class="storeTxt">{{ $t("store") }}</span>
                <el-select
                    v-model="curentStore"
                    :disabled="selectEdit"
                    :placeholder="$t('navbar.selectStore')"
                    size="small"
                    @change="selectOne"
                    value-key="dep_ID"
                    :boder='false'
                >
                    <el-option
                        v-for="item in storeList"
                        :key="item.dep_ID"
                        :label="item.dep_comp_name"
                        :value="item"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <div class="flex ali-c jus-b">
                    <div class="download flex ali-c" @click="downClick">
                        <img src="../../../static/images/downRj.png">
                        <span class="left10">{{$t("sidebar.download")}}</span>
                    </div>
                    <div class="headTx flex ali-c" @click="userClick">
                        <div class="txImg">
                            <img :src="curentUser.logo">
                        </div>
                        <span class="left10">{{curentUser.name}}</span>
                    </div>
                    <div class="changeLang flex ali-c" @click="handleSetLanguage">
                        <img src="../../../static/images/en_icon.png" v-if="language=='en_US'">
                        <img src="../../../static/images/zh_icon.png" v-else>
                    </div>
                    <div class="getEmail flex ali-c" @click="noticeClick">
                        <img src="../../../static/images/email.png" >
                        <span v-if="systemNotiCount > 0" class="newMessage"></span>
                    </div>
                    <div class="backHD" @click="backHD">
                        返回收银
                        <!-- 清空所有的缓存 -->
                    </div>
                </div>
                
            </el-col>
           
        </el-row>
        
    </div>
</template>
<script>
export default {
    inject:['reload'], 
    computed: {
        language() {
            return this.$store.getters.language;
        },
        curentStore: {
            get() {
                return this.$store.getters.curentStore;
            },
            set() {
                //
            },
        },
        storeList: {
            get() {
                return this.$store.getters.storeList;
            },
            set() {
                //
            },
        },
        businessModel:{
            get() {
                return this.$store.getters.businessModel;
            },
            set() {
                //
            },
        },
        curentUser() {
            return this.$store.getters.user;
        },
        token() {
            return this.$store.getters.token;
        },
    },
    data() {
        return {
            selectEdit: false,
            loginoutShow: false,
            loginoutLoading: false,
            timer: null,
            systemNotiCount: 0,
        };
    },

    methods: {
        selectOne(item) {
            if (item != null) {
                this.handlesetCurentStore(item);
            }
        },
        handleSetLanguage() {
            if(this.language=='en_US'){
                this.$store.dispatch("setLanguage", 'zh_CN');
                this.$i18n.locale = 'zh_CN';
            }else{
                this.$store.dispatch("setLanguage", 'en_US');
                this.$i18n.locale = 'en_US';
            }
        },
        handlesetCurentStore(curentStore) {
            this.$store.dispatch("setCurentStore", curentStore);
        },
        handlesetBusinessModel(businessModel) {
            this.$store.dispatch("setBusinessModel", businessModel);
        },
        handlesetStoreList(storeList) {
            this.$store.dispatch("setStoreList", storeList);
        },
         
        // 一些跳转入口
        downClick(){
            this.$router.push("/review/reDownManage");
        },
        userClick(){
            this.$router.push("/review/reUser");
        },
        noticeClick(){
            this.$router.push("/review/reNoticeManage")
        },
       
        backHD(){
            if(window.android!=undefined&&window.android!=null){
               this.stringutils.clearData();
               window.android.backMainCashier();
            }
        },
        //获取门店列表
        getStoreList() {
            var storeList = this.storeList;
            var curentStore = this.curentStore;

            if (curentStore && curentStore.dep_comp_name) {
                //
            } else {
                if (storeList.length > 0) {
                    this.handlesetCurentStore(storeList[0]);
                }
            }
           
            
        },
        //门店配置 经营设置
        selectDishSet() {
            let that = this;
            let data = {
                dept_id: this.curentStore.dep_ID,
            };
            this.request.selectDishSet(data, function (res) {
                if (res.code == "1") {
                    if (res.data == null) {
                        return false;
                    }
                    let res_data = res.data;
                    // console.log(res_data);
                    that.handlesetBusinessModel(res_data);
                } 
            });
        },
        startGetPot() {
            if (
                this.token !== null &&
                this.token !== "" &&
                typeof this.token !== "undefined"
            ) {
                let that = this;
                let data = {
                    id: this.id,
                    dep_id: this.curentStore.dep_ID,
                };
                this.request.newbusiness(data, function (res) {
                    if (res.code == "1") {
                        that.systemNotiCount =
                            res.data.businessNum + res.data.pushNum;
                    }
                });
            }
        },
        stopTimer() {
            clearTimeout(window.timer);
            clearInterval(this.timer);
            this.intervalId = null;
        },
        startTimer() {
            // let that = this;
            if (this.timer == null) {
                this.timer = setInterval(() => {
                    this.startGetPot();
                }, 1000 * 60);
            }
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore&&this.token) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.getStoreList();
            this.startTimer();
            this.selectDishSet();
        }
    },
    destroyed() {
        this.stopTimer();
    },
    watch: {
        storeList: {
            handler(newVal, oldVal) {
                this.storeList = newVal;
            },
        },
        curentStore: {
            handler(newVal, oldVal) {
                this.curentStore = newVal;
                this.reload();//刷新页面
                // this.$router.go(0);
            },
        },
        businessModel: {
            handler(newVal, oldVal) {
                this.businessModel = newVal;
            },
            // 深度观察监听
            deep: true,
        },
        language(){
            //刷新页面
            this.$router.go(0);
        },
        $route: {
            handler: function (newVal, oldVal) {
                this.selectEdit = newVal.meta.selectEdit;
            },
            // 深度观察监听
            deep: true,
        },
    },
};
</script>
<style>
    .navBar{
       width: 100%;
       height: 60px;
       line-height: 60px;
       background: #fff;
       padding-top: 5px;
    }
    .storeTxt{
        position: relative;
        top: -2px;
        padding: 2px 7px;
        font-size: 14px;
        color: #fff;
        background: linear-gradient(180deg, #F68331 0%, #EB3C1C 100%);
        border-radius: 4px;
    }
    .download{
        color: #F46F24;
        font-size: 15px;
        cursor: pointer;
    }
    .download img{
        width: 18px;
        height: 17px;
    }
    .headTx{
        font-size: 15px;
        color: #303336;
        cursor: pointer;
    }
    .headTx .txImg{
        width: 29px;
        height: 29px;
        border-radius: 50%;
        overflow: hidden;
    }
    .headTx .txImg img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .getEmail,.changeLang{
        position: relative;
        cursor: pointer;
    }
    .changeLang img{
        width: 28px;
        height: 28px;
    }
    .getEmail img{
        width: 28px;
        height: 27px;
    }
    .newMessage{
        display: block;
        width: 6px;
        height: 6px;
        position: absolute;
        top: 1px;
        right:0;
        color: #fff;
        font-size: 12px;
        border-radius: 50%;
        background: red;
        z-index: 99;
    }
    .backHD{
        width: 88px;
        height: 28px;
        line-height: 29px;
        text-align: center;
        font-size: 15px;
        font-weight: 500;
        color: #FE813C;
        background: rgba(254, 241, 234, 0.45);
        border-radius: 4px;
        border: 2px solid #FE813C;
        cursor: pointer;
    }
</style>
