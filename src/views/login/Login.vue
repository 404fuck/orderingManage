<template>
    <el-container class="login-container">
        <img class="container-logo" src="../../static/images/logo.png" />
        <div class="container-left">
            <img src="../../static/images/loginCn.png"  v-if="$store.getters.language =='zh_CN' "/>
            <img src="../../static/images/loginEn.png"  v-if="$store.getters.language =='en_US' "/>
        </div>
        <div class="container-right">
            <div class="login-main">
                <div class="container-right-header">
                    <div class="left-title">
                        <img v-if="status==0" src="../../static/images/loginCode.png"  @click="scanCodeClick(1)"/>
                        <img v-if="status==1" src="../../static/images/loginComputer.png"  @click="scanCodeClick(0)"/>
                    </div>
                    <div class="right-title">
                        <a class="title-company" :href="$store.getters.language =='zh_CN'?'http://www.mjoyapp.com/cn/index.php':'http://www.mjoyapp.com/en/index.php'" target="_blank">
                            {{ $t("website") }}
                        </a>
                        <selectLang></selectLang>
                    </div>
                </div>
            </div>
            <!-- 账号短信登录 -->
            <div v-if="status==0">
                <div class="container-tabs font22">
                    <span
                        @click="clickLeft"
                        :class="
                            curentabs == 0 ? 'tabs-active' : 'tabs-unactive'
                        "
                        style="padding-bottom: 10px;"
                        >{{ $t("login.loginForPWD") }}</span
                    >
                    <span style="padding-right: 50px"></span>
                    <span
                        @click="clickRight"
                        :class="
                            curentabs == 1 ? 'tabs-active' : 'tabs-unactive'
                        "
                        style="padding-bottom: 10px;"
                        >{{ $t("login.loginForCode") }}</span
                    >
                </div>
                <div class="container-body">
                    <el-input
                        :placeholder="$t('login.phonePH')"
                        v-model.trim="phone"
                        class="input-with-select font16"
                        size="large"
                    >
                        <el-select
                            v-model.trim="selectPhone"
                            slot="prepend"
                            class="text-style"
                            style="width: 75px"
                        >
                            <el-option
                                label="+60"
                                value="1"
                                class="text-style"
                            ></el-option>
                            <el-option
                                label="+86"
                                value="2"
                                class="text-style"
                            ></el-option>
                        </el-select>
                    </el-input>

                    <el-input
                        v-show="curentabs == 0"
                        class="pass font16"
                        :placeholder="$t('login.pwdPH')"
                        v-model.trim="pass"
                        show-password
                        size="large"
                        @keyup.enter.native="handleLogin"
                        style="
                            border-right: 1px solid #dcdfe6;
                            border-radius: 4px;
                        "
                    ></el-input>
                    <el-input
                        v-show="curentabs == 1"
                        class="pass font16"
                        :placeholder="$t('login.codePH')"
                        v-model.trim="code"
                        clearable
                        size="large"
                        @keyup.enter.native="handleLogin"
                    >
                        <el-button
                            slot="append"
                            @click="sendCode"
                            :disabled="!show"
                        >
                            <span class="font16 font16" v-show="show">{{
                                $t("login.getCode")
                            }}</span>
                            <span class="font16" v-show="!show"
                                >{{ count }} s</span
                            >
                        </el-button>
                    </el-input>
                    <el-row class="right top10">
                        <el-link type="info" @click="resetPass">
                            <span class="font12" style="color: #808080">{{
                                $t("login.forgotPWD")
                            }}</span>
                        </el-link>
                    </el-row>
                    <div class="top50">
                        <el-row>
                            <el-button
                                type="primary"
                                class="primary loginBtn"
                                @click="handleLogin"
                                style="height: 50px"
                                :loading="loginLoading"
                            >
                                <span class="font16">{{
                                    $t("login.login")
                                }}</span>
                            </el-button>
                        </el-row>
                        <el-row class="top20">
                            <span class="registTxt" @click="regist">
                                {{ $t("login.Regist") }}
                            </span>
                        </el-row>
                    </div>
                </div>
            </div>
            <!-- 扫码登录 -->
            <div v-if="status==1">
                <div class="container-tabs font22">
                    <span
                        class="tabs-active"
                        style="padding-bottom:10px;"
                        >{{$t('login.loginForScan')}}</span
                    >
                </div>
                <div>
                    <el-row class="top20">
                        <vue-qr 
                            v-if="QRcode!=''"
                            class="scan-code-img"
                            :text="QRcode" 
                            >
                        </vue-qr> 
                    </el-row>
                    <el-row>
                        <span
                            class="scanTxt">
                            {{$t('login.pleaseScan')}}
                        </span>
                    </el-row>
                    <el-row class="top20">
                        <span
                            class="registTxt"
                            @click="status=0"
                            >
                            {{$t('login.backLoginForPWD')}}
                        </span>
                    </el-row>
                </div>
            </div>
        </div>
    </el-container>
</template>


<script>
import VueQr from "vue-qr";
import selectLang from "./selectLang";
export default {
    inject:['reload'],      
    components: {
        selectLang,
        VueQr,
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
       
    },
    data() {
        return {
            curentabs: 0,
            phone: "",
            pass: "",
            code: "",
            select: "",
            selectPhone: "+60",
            checked: false,
            show: true,
            count: 0,
            timer: null,
            loginLoading: false,
            codeToken:'',//获取短信登录发送验证码返回的token

            QRcode: "",
            config: {
                value: "", //跳转的地址
            },

            getRealToken: "",
            status:0,
        };
    },
    methods: {
        clickLeft() {
            this.curentabs = 0;
        },
        clickRight() {
            this.curentabs = 1;
        },
        resetPass() {
            this.$router.push({
                path: "/resetPass",
            });
        },
        regist() {
            this.$router.push({
                path: "/regist",
            });
        },

        handleLogin() {
            if (this.curentabs == 0) {
                this.handlePassLogin();
            } else {
                this.handlePhoneLogin();
            }
        },
        //18000端口登录
        handlePassLogin() {
            window.location.href='/orderingManage'; //刷新页面 缓存用不到
            //验证数据
            if (!this.stringutils.isMobileNumber(this.phone)) {
                return;
            }
            if (this.stringutils.isEmpty(this.pass)) {
                this.toast.warning(this.$t("login.inputPWD"));
                return;
            }

            //提交数据
            let data = {
                phone: this.phone,
                pwd: this.pass,
            };
            let that = this;
            this.loginLoading = true;
            this.$http({
                method: "post",
                url: this.stringutils.getBaseUrlLogin()+'/apis/company/get/entlogin',
                data: data,
            }).then((res) => {
                that.loginLoading = false;
                if (res.data.code == "1") {
                    that.toast.success(that.$t("login.loginsuc"));
                    //缓存登录数据
                    that.setToken(res.data.token);
                    that.setServerUrl(res.data.data.upGradeInfo.serverUrl);
                    that.setLoginInfo(res.data.data);
                    that.setMemory(res.data);
                    setTimeout(() => {
                        window.location.href='/orderingManage'; //刷新页面 缓存用不到
                    }, 300);
                }else{
                    that.toast.error(res.data.msg);
                }
                
            }).catch((err) => {
                that.toast.error(err.data.msg);
            });
        },
        //18000端口登录
        handlePhoneLogin() {
            //验证数据
            if (!this.stringutils.isMobileNumber(this.phone)) {
                return;
            }
            if (this.stringutils.isEmpty(this.code)) {
                this.toast.warning(this.$t("login.pleseInputCode"));
                return;
            }

            //提交数据
            let data = {
                phone: this.phone,
                verifyCode: this.code,
                token: this.codeToken
            };
            let that = this;
            this.loginLoading = true;
            this.$http({
                method: "post",
                url: this.stringutils.getBaseUrlLogin()+'/apis/company/get/entphonelogin',
                data: data,
            }).then((res) => {
                that.loginLoading = false;
                if (res.data.code == "1") {
                    that.toast.success(that.$t("login.loginsuc"));
                    //缓存登录数据
                    that.setToken(res.data.token);
                    that.setServerUrl(res.data.data.upGradeInfo.serverUrl);
                    that.setLoginInfo(res.data.data);
                    that.setMemory(res.data);
                    setTimeout(() => {
                        window.location.href='/orderingManage'; //刷新页面 缓存用不到
                    }, 300);
                }else{
                    that.toast.error(res.data.msg);
                }
                
            }).catch((err) => {
                that.toast.error(err.data.msg);
            });
        },
        sendCode() {
            if (!this.stringutils.isMobileNumber(this.phone)) {
                return;
            }
            // 验证码倒计时
            if (!this.timer) {
                let data = { phone: this.phone };
                let that = this;
                this.$http({
                    method: "post",
                    url: this.stringutils.getBaseUrlLogin()+'/apis/company/get/verifycode',
                    data: data,
                }).then((res) => {
                    if (res.data.code == "1") {
                        that.toast.success(that.$t('regist.sendSec'));
                        that.codeToken = res.data.token;
                        that.count = 60;
                        that.show = false;
                        that.timer = setInterval(() => {
                            if (that.count > 0 && that.count <= 60) {
                                that.count--;
                            } else {
                                that.show = true;
                                clearInterval(that.timer);
                                that.timer = null;
                            }
                        }, 1000);
                    } else {
                        that.toast.error(res.data.msg);
                    }
                }).catch((err) => {
                    that.toast.error(err.data.msg);
                });
            }
        },
        setMemory(res) {
            if (res.data != null) {
                var storeList = res.data.data;

                var name = res.data.phone;
                var logo = res.data.logo;

                if (storeList != null) {
                    this.setStoreList(storeList);
                } else {
                    this.setStoreList(null);
                }

                if (name != null && logo != null) {
                    var user = {
                        name: name,
                        logo: logo,
                    };
                    this.setUser(user);
                }
            }
        },
        setServerUrl(serverUrl){
            this.$store.dispatch("setServerUrl", serverUrl);
        },
        setToken(token){
            this.$store.dispatch("setToken", token);
        },
        setLoginInfo(loginInfo) {
            this.$store.dispatch("setLoginInfo", loginInfo);
        },
        setUser(user) {
            this.$store.dispatch("setUser", user);
        },
        setStoreList(storeList) {
            this.$store.dispatch("setStoreList", storeList);
        },
        setEnvironMent(environMent) {
            this.$store.dispatch("setEnvironMent", environMent);
        },
        //18000端口登录
        //请求获取登录二维码
        entapplyQRcode() {
            let that = this;
            let data = {
                token: "noRealToken",
            };
            this.$http({
                method: "post",
                url: this.stringutils.getBaseUrlLogin()+'/apis/company/get/entapplyQRcode',
                data: data,
            }).then((res) => {
                if (res.data.code == "1") {
                    that.QRcode = res.data.data;
                } else {
                    that.toast.error(res.data.msg);
                }
            }).catch((err) => {
                that.toast.error(err.data.msg);
            });
            
        },
        pollingLogon() {
            let that = this;
            let data = {
                token: this.QRcode,
            };
            this.$http({
                method: "post",
                url: this.stringutils.getBaseUrlLogin()+'/apis/company/get/pollingLogon',
                data: data,
            }).then((res) => {
                //-6：授权失败或者二维码无效
                //4021：等待授权（此时需要继续轮训）
                if (res.code == "-6") {
                    that.toast.error(that.$t('login.messScan'));
                    that.reload();
                    return false;
                }
                if (res.data.code == "1") {
                    if (res.data.data != null) {
                        console.log(res.data.data);
                        that.getRealToken = res.data.token;
                        that.toast.success(that.$t("login.loginsuc"));
                        that.setToken(res.data.token);
                        that.setServerUrl(res.data.data.upGradeInfo.serverUrl);
                        that.setLoginInfo(res.data.data);
                        that.setMemory(res.data);
                        setTimeout(() => {
                            window.location.href='/orderingManage'; //刷新页面 缓存用不到
                        }, 300);
                    }
                }
            }).catch((err) => {
                that.toast.error(err.data.msg);
            });
            
        },
        scanCodeClick(val) {
            this.status = val;
            this.entapplyQRcode();
            //创建并执行定时器
            let that = this;
            this.timer = setInterval(() => {
                //当获取到了token时清除定时器
                if (that.getRealToken != ""||that.status==0) {
                    clearInterval(that.timer);
                    that.timer = null;
                } else {
                    that.pollingLogon();
                }
            }, 1000);
        },
    },
    created() {
        // console.log(this.stringutils.getBaseUrlLogin()+'/apis/company/get/entphonelogin');
        this.stringutils.clearData();
        this.setEnvironMent('WEB');
        this.setStoreList(null);
        clearTimeout(window.timer);
      
    },
};
</script>
<style scoped>
.scanTxt {
    color: #808080;
    font-size: 16px;
}
.scan-code-img {
    display: block;
    width: 240px;
    height: 240px;
    margin: 0 auto;
}
</style>