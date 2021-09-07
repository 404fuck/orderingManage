<!--
 * @Author: zzt
 * @Date: 2021-01-15 11:44:41
 * @LastEditTime: 2021-03-29 21:20:52
 * @LastEditors: Please set LastEditors
 * @Description: 收银机管家后台--主界面菜单
 * @FilePath: \sjoyOrderingManage\src\views\waiterHD\waiterHD.vue
-->
<template>
    <div class="waiterHD">
        <navBar></navBar>
        <div class="main-menu">
            <div class="menu-wrap">
                <div class="menu-title">{{$t('sidebar.yinye')}}</div>
                <div class="menu-items">
                    <router-link :to="{name:'reReportManage',params:{activeIndex:0}}" class="item">
                        <img src="../../static/images/menu1.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t('sidebar.dandian')}}</div>
                    </router-link>
                    <router-link :to="{name:'reOrderDetail',params:{activeIndex:0}}" class="item">
                        <img src="../../static/images/menu2.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.dingdan")}}</div>
                    </router-link>
                    <router-link :to="{name:'reRefoundDetail',params:{activeIndex:0}}" class="item">
                        <img src="../../static/images/menu3.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.tuikuan")}}</div>
                    </router-link>
                    <router-link :to="{name:'reDishReport',params:{activeIndex:0}}" class="item">
                        <img src="../../static/images/menu4.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.xiaoshou")}}</div>
                    </router-link>
                    <router-link :to="{name:'reSetMealReport',params:{activeIndex:0}}" class="item">
                        <img src="../../static/images/menu5.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.taocan")}}</div>
                    </router-link>
                </div>
            </div>
            <div class="menu-wrap">
                <div class="menu-title">{{$t("sidebar.mengdianguanli")}}</div>
                <div class="menu-items">
                    <router-link :to="{name:'reBranchStoreList',params:{activeIndex:1}}" class="item">
                        <img src="../../static/images/menu6.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.mengdianXinxi")}}</div>
                    </router-link>
                    <router-link :to="{name:'reDeskManage',params:{activeIndex:1}}" class="item">
                        <img src="../../static/images/menu7.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.zhuotai")}}</div>
                    </router-link>
                    <router-link :to="{name:'reEmployeeManage',params:{activeIndex:1}}" class="item">
                        <img src="../../static/images/menu8.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.yuangong")}}</div>
                    </router-link>
                    <router-link :to="{name:'rePayManage',params:{activeIndex:1}}" class="item">
                        <img src="../../static/images/menu9.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("payManage.shoukuan")}}</div>
                    </router-link>
                    <router-link :to="{name:'reSystemManage',params:{activeIndex:1}}" class="item">
                        <img src="../../static/images/menu10.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.xitongguanli")}}</div>
                    </router-link>
                </div>
            </div>
            <div class="menu-wrap">
                <div class="menu-title">{{  $t("sidebar.caiping")}}</div>
                <div class="menu-items">
                    <router-link :to="{name:'reDishList',params:{activeIndex:2}}" class="item">
                        <img src="../../static/images/menu11.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.caipingliebiao")}}</div>
                    </router-link>
                    <router-link :to="{name:'reUnitManage',params:{activeIndex:2}}" class="item">
                        <img src="../../static/images/menu12.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.danwei")}}</div>
                    </router-link>
                    <router-link :to="{name:'reDishClassifyManage',params:{activeIndex:2}}" class="item">
                        <img src="../../static/images/menu13.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.fenlei")}}</div>
                    </router-link>
                    <router-link :to="{name:'reDishFeedingManage',params:{activeIndex:2}}" class="item">
                        <img src="../../static/images/menu14.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.jialiao")}}</div>
                    </router-link>
                    <router-link :to="{name:'reTasteManage',params:{activeIndex:2}}" class="item">
                        <img src="../../static/images/menu15.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.kouwei")}}</div>
                    </router-link>
                    <router-link :to="{name:'reTakeOutManage',params:{activeIndex:2}}" class="item">
                        <img src="../../static/images/menu16.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.takeout")}}</div>
                    </router-link>
                    <router-link :to="{name:'reSaleTagsManage',params:{activeIndex:2}}" class="item">
                        <img src="../../static/images/menu17.png" class="menu-icon" alt="">
                        <div class="menu-txt">{{$t("sidebar.saletags")}}</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navBar from './components/navBar';
export default {
    components: {
        navBar,
    },
    computed: {
        token() {
            return this.$store.getters.token;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
            set() {
                //
            },
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
    },
    data() {
        return {
            
        };
    },

    methods: {
        setLoginInfo(loginInfo) {
            this.$store.dispatch("setLoginInfo", loginInfo);
        },
        setUser(user) {
            this.$store.dispatch("setUser", user);
        },
        setStoreList(storeList) {
            this.$store.dispatch("setStoreList", storeList);
        },
        setLoginInfo(loginInfo) {
            this.$store.dispatch("setLoginInfo", loginInfo);
        },
        setCurentStore(curentStore) {
            this.$store.dispatch("setCurentStore", curentStore);
        },
        setLanguage(language) {
            this.$store.dispatch("setLanguage", language);
        },
        setEnvironMent(environMent) {
            this.$store.dispatch("setEnvironMent", environMent);
        },
        setToken(token) {
            this.$store.dispatch("setToken", token);
        },
        //获取用户登录信息缓存起来
        logintoManage(){
            let that = this;
            let data = {
                token: this.$route.query.token
            }
            this.request.logintoManage(data,function(res){
                if (res.code == "1") {
                    let res_data = res.data;
                    console.log(res_data);
                    //缓存登录数据
                    that.setLoginInfo(res_data);
                    if (res.data != null) {
                        let storeList = res.data.data;
                        let name = res.data.phone;
                        let logo = res.data.logo;

                        if (storeList != null) {
                            that.setStoreList(storeList);
                        } else {
                            that.setStoreList(null);
                        }
                        //这里要判断一下带过来的dep_id一致
                        // var getStore={};
                        // if (storeList.length > 0) {
                        //     for (let i in storeList) {
                        //         if(storeList[i].dep_ID == that.$route.query.dep_id){
                        //             getStore = storeList[i];
                        //             // that.setCurentStore(storeList[i]);
                                    
                        //         }
                        //     }
                        // }
                        // console.log(getStore);
                        // that.setCurentStore(getStore);
                        if (name != null && logo != null) {
                            let user = {
                                name: name,
                                logo: logo,
                            };
                            that.setUser(user);
                        }
                    }
                } else {
                    that.toast.error(res.msg);
                }
            })
        },
        
       
    },
    // beforeCreate(){
    //     this.stringutils.clearData();
    // },
    created() {
        this.setEnvironMent('HD');
        this.setLanguage(this.$route.query.lang);
        this.language = this.$route.query.lang;
        this.logintoManage();
    },
};
</script>
<style>
    .main-menu{
        margin-top: 15px;
        overflow: hidden;
    }
    .menu-wrap{
        overflow: hidden;
        margin-bottom: 35px;
    }
    .menu-title{
        padding-left: 60px;
        font-weight: bold;
        font-size: 20px;
        color: #474744;
        height: 55px;
        line-height: 55px;
        border-bottom: 2px solid #f9f9f9;
    }
    .menu-items {
        overflow: hidden;
    }
    .menu-items .item{
        float: left;
        display: block;
        text-decoration: none;
        margin: 20px 40px 0 60px;
        text-align: center;
    }
    .menu-icon{
        width: 100px;
        height: 100px;
    }
    .menu-txt{
        font-size: 16px;
        margin-top: 15px;
        color: #393939;
    }
</style>