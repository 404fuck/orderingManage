<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-04-01 20:35:39
 * @LastEditors: Please set LastEditors
 * @Description: 通知栏
 * @FilePath: \sjoyOrderingManage\src\views\layout\Navbar.vue
-->
<template>
    <div class="header-root">
        <div class="fl">
            <span class="select-store">
                <span>{{ $t("store") }}：</span>
                <el-select
                    class="store-select"
                    v-model="curentStore"
                    :disabled="selectEdit"
                    :placeholder="$t('navbar.selectStore')"
                    size="small"
                    @change="selectOne"
                    value-key="dep_ID"
                >
                    <el-option
                        v-for="item in storeList"
                        :key="item.dep_ID"
                        :label="item.dep_comp_name"
                        :value="item"
                    ></el-option>
                </el-select>
            </span>
        </div>
        <div class="fr right">
            <span class="right-logo">
                <img
                    class="avater"
                    style="
                        width: 30px;
                        height: 30px;
                        border-radius: 15px;
                        position: relative;
                        top: 10px;
                        object-fit: cover;
                    "
                    :src="curentUser.logo"
                />

                <el-dropdown trigger="click" @command="handleDropdown">
                    <span class="el-dropdown-link" style="color: #303336">
                        {{ curentUser.name }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            style="
                                padding-left: 10px;
                                color: #303336 !important;
                                font-size: 14px;
                            "
                            command="settings"
                            >{{ $t("navbar.set") }}</el-dropdown-item
                        >
                        <span
                            style="
                                padding-left: 10px;
                                color: #303336;
                                font-size: 14px;
                            "
                            >{{ $t("navbar.systemLang") }}</span
                        >
                        <el-dropdown-item
                            :command="stringutils.zh_CN()"
                            :disabled="language === stringutils.zh_CN()"
                            class="text-style"
                            >中文</el-dropdown-item
                        >
                        <el-dropdown-item
                            :command="stringutils.en_US()"
                            :disabled="language === stringutils.en_US()"
                            class="text-style"
                            >English</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </span>
            <span style="padding: 0px 10px">|</span>
            <span style="color: #303336; cursor: pointer" @click="message">
                <img
                    src="../../static/images/notice.png"
                    alt
                    width="14"
                    style="position: relative; top: 1px"
                />
                <span v-if="systemNotiCount > 0" class="newMessage">{{
                    systemNotiCount
                }}</span>
                {{ $t("navbar.systemNote") }}
            </span>
            <span style="padding: 0px 10px">|</span>
            <span
                style="color: #303336; cursor: pointer"
                @click="loginoutShow = true"
            >
                <img
                    src="../../static/images/sign_out.png"
                    alt
                    width="14"
                    style="position: relative; top: 3px"
                />
                {{ $t("navbar.loginOut") }}
            </span>
        </div>
        <el-dialog
            :visible.sync="loginoutShow"
            width="20%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <p class="center font14 fontWeight">{{ $t("navbar.logoutNow") }}</p>
            <div class="top30 center">
                <el-button
                    class="themeBtn"
                    size="small"
                    style="width: 90px"
                    @click="loginout"
                    :loading="loginoutLoading"
                    >{{ $t("ok") }}</el-button
                >
                <el-button
                    class="cancelBtn"
                    size="small"
                    style="width: 90px"
                    @click="loginoutShow = false"
                    >{{ $t("cancel") }}</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    inject:['reload'], 
    name: "nav-bar",
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
            //change 触发事件
            //直接就拿到当前的这个对象了
            if (item != null) {
                this.handlesetCurentStore(item);
            }
        },
        open(val) {
            this.changeDeptguide(val);
        },
        handleSetLanguage(lang) {
            this.$store.dispatch("setLanguage", lang);
            this.$i18n.locale = lang;
        },
        handlesetCurentStore(curentStore) {
            this.$store.dispatch("setCurentStore", curentStore);
        },
        handlesetBusinessModel(businessModel) {
            this.$store.dispatch("setBusinessModel", businessModel);
        },
        setStoreList(storeList) {
            this.$store.dispatch("setStoreList", storeList);
        },
        message() {
            this.$router.replace("/noticeManage");
        },
        handleDropdown(commands) {
            if (commands == "loginout") {
                this.loginout();
            } else if (
                commands == this.stringutils.zh_CN() ||
                commands == this.stringutils.en_US()
            ) {
                this.handleSetLanguage(commands);
            } else if (commands == "settings") {
                // this.toast.info('账户设置')
                this.$router.replace("/user");
            } else {
                this.changeDeptguide(commands);
            }
        },
        loginout() {
            this.loginoutLoading = false;
            this.loginoutShow = false;
            setTimeout(() => {
                this.stringutils.clearData();
                window.location.href="/orderingManage"
            }, 300);
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
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

        changeDeptguide(bl) {
            this.curentStore.guide_status = bl;

            let that = this;
            this.request.deptguide(
                {
                    guide_status: this.curentStore.guide_status,
                    dept_id: this.curentStore.dep_ID,
                },
                function (res) {
                    if (res.code == "1") {
                        that.toast.success(that.$t("navbar.updateOK"));

                        that.$store.dispatch(
                            "setCurentStore",
                            that.curentStore
                        );

                        let index = -1;
                        for (var i in that.storeList) {
                            if (
                                that.storeList[i].dep_ID ==
                                that.curentStore.dep_ID
                            ) {
                                index = i;
                                break;
                            }
                        }
                        that.storeList[index].guide_status =
                            that.curentStore.guide_status;
                        that.$store.dispatch("setStoreList", that.storeList);
                    } else {
                        that.toast.error(res.msg);
                        that.checked = !that.checked;
                    }
                }
            );
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
        this.getStoreList();
        this.startTimer();
        this.selectDishSet();
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
<style scoped>
.header-root {
    position: relative;
    height: 68px;
    line-height: 68px;
    padding: 0 40px 0 20px;
    overflow: hidden;
}
.newMessage {
    background: red;
    border-radius: 50%;
    width: 0.9%;
    height: 25%;
    line-height: 14px;
    font-size: 0.185185rem;
    color: white;
    text-align: center;
    display: inline-block;
    position: absolute;
    top: 7px;
}
.left-logo {
    position: absolute;
    background-color: #33ccf5;
    text-align: center;
    line-height: 40px;
    width: 174px;
    color: #fff;
    display: block;
    align-content: center;
}

.left-logo-img {
    width: 86px;
    height: 30px;
    margin-top: 5px;
}
.right-title {
    position: relative;
    margin-left: 174px;
    margin-right: 0px;
    background-color: #fff;
    line-height: 50px;
    height: 50px;
    color: #000;
}

.select-store {
    color: #666;
    font-size: 16px;
}
.el-option {
    color: #666;
    float: left;
    size: mini;
    line-height: 39px;
    text-align: center;
    margin-left: 18px;
    display: flex;
    align-items: center;
}

.store-select {
    margin-left: 15px;
    width: 180px;
    color: #8e8d8d;
    height: 32px;
}
.right-logo {
    line-height: 39px;
    text-align: center;
    display: inline-block;
    align-items: center;
}
.right-logo img {
    align-items: center;
    margin-right: 10px;
}

</style>