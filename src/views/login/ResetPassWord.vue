<template>
    <el-container class="login login-container loginStyle">
        <img class="container-logo" src="../../static/images/logo.png" />
        <div class="container-left">
            <img src="../../static/images/loginCn.png"  v-if="$store.getters.language =='zh_CN' "/>
            <img src="../../static/images/loginEn.png"  v-if="$store.getters.language =='en_US' "/>
        </div>
        <div class="container-right">
            <div class="login-main">
                <div class="container-right-header">
                    <div class="right-title">
                        <a class="title-company" :href="$store.getters.language =='zh_CN'?'http://www.mjoyapp.com/cn/index.php':'http://www.mjoyapp.com/en/index.php'" target="_blank">
                            {{ $t("website") }}
                        </a>
                        <selectLang></selectLang>
                    </div>
                </div>
            </div>
            <div class="container-tabs font22">
				<span
					class="tabs-active"
					style="padding-bottom:10px;"
					>{{ $t("resetPwd.resetPwd") }}</span
				>
            </div>
            <!-- 修改密码 -->
            <div class="container-body" v-if="status==0">
                <el-input
                    :placeholder="$t('login.phonePH')"
                    v-model.trim="phone"
                    class="font16"
                    size="large"
					type="number"
                    autocomplete="new-password"
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
                    class="pass font16"
                    :placeholder="$t('login.codePH')"
                    v-model.trim="code"
                    clearable
                    size="large"
                    autocomplete="new-password"
                >
                    <el-button
                        slot="append"
                        @click="sendCode"
                        :disabled="!show"
                    >
                        <span class="font16" v-show="show">{{
                            $t("login.getCode")
                        }}</span>
                        <span class="font16" v-show="!show">{{ count }} s</span>
                    </el-button>
                </el-input>

                <el-input
                    class="pass font16"
                    :placeholder="$t('login.pwdPH')"
                    v-model.trim="pass"
                    show-password
                    size="large"
                    autocomplete="new-password"
                >
                </el-input>
                <el-input
                    class="pass font16"
                    :placeholder="$t('regist.okPwd')"
                    v-model.trim="repass"
                    show-password
                    size="large"
                    autocomplete="new-password"
                >
                </el-input>

                <div class="top30">
                    <el-row>
						<el-button
							type="primary"
							class="primary loginBtn"
							@click="handleReSetPass"
							style="height: 50px"
							:loading="loginLoading"
						>
							<span class="font16">{{
								$t("resetPwd.ok")
							}}</span>
						</el-button>
                    </el-row>
                    <el-row class="top20">
						<span
                            class="registTxt"
                            @click="login"
                            >
                            {{$t("regist.goLogin")}}
                        </span>
                    </el-row>
                </div>
            </div>
            <!-- 修改成功 -->
            <div class="container-body" v-if="status==1">
                <div class="top20">
                    <img src="../../static/images/chenggong.png" alt="">
                    <p style="font-size:16px;color:#505050;margin-top:10px">{{$t("resetPwd.resetOK")}}</p>
                </div>
                
                <div style="margin-top:100px">
                    <el-row>
						<el-button
							type="primary"
							class="primary loginBtn"
							@click="login"
							style="height: 50px"
							:loading="loginLoading"
						>
							<span class="font16">{{
								$t("resetPwd.sign")
							}}</span>
						</el-button>
                    </el-row>
                </div>
            </div>
        </div>
    </el-container>
</template>


<script>
import selectLang from "./selectLang";
export default {
    components: {
        selectLang,
    },
    computed: {},
    data() {
        return {
			loginLoading: false,
            phone: "",
            pass: "",
            repass: "",
            code: "",
            selectPhone: "+60",
            show: true,
            count: 0,
            timer: null,
            status:0,
        };
    },
    methods: {
        handleReSetPass() {
            //验证数据
            if (!this.stringutils.isMobileNumber(this.phone)) {
                return;
            }
            if (this.stringutils.isEmpty(this.code)) {
                this.toast.warning(this.$t("login.pleseInputCode"));
                return;
            }
            if (this.stringutils.isEmpty(this.pass)) {
                this.toast.warning(this.$t("login.inputPWD"));
                return;
            }
            if (this.stringutils.isEmpty(this.repass)) {
                this.toast.warning(this.$t("regist.inputOKPwd"));
                return;
            }

            if (this.pass !== this.repass) {
                this.toast.error(this.$t("regist.pwdWarro"));
                return;
            }

            //提交数据
            let data = {
                phone: this.phone,
                code: this.code,
                pwd: this.pass,
                confirmPwd: this.repass,
            };
			let that = this;
			this.loginLoading = true;
            this.request.resetpass(data, function (res) {
                that.loginLoading = false;
                if (res.code == "1") {
                    that.status=1;
                    that.toast.success(that.$t("resetPwd.resetOK"));
                   
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

        login() {
            this.$router.push({
                path: "/login",
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
                this.request.sendSmsPhone(data, function (res) {
                    if (res.code == "1") {
                        that.toast.success(that.$t("regist.sendSec"));
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
                        that.toast.error(res.msg);
                    }
                });
            }
        },
        handleSetToken(token) {
            this.$store.dispatch("setToken", token);
        },
    },
    created() {},
    mounted() {},
};
</script>
<style scoped>
</style>