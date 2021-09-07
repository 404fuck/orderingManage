<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-02-22 17:03:57
 * @LastEditors: Please set LastEditors
 * @Description: 账户管理
 * @FilePath: \sjoyOrderingManage\src\views\user\user.vue
-->

<template>
    <div class="main userStyle">
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("user.account") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 20px 50px">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUtils.uploadAction()"
                    :data="uploadUtils.uploadData()"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-col class="top10">
                    <span class="font12" style="color: #8c939b">{{
                        $t("user.imgRemark")
                    }}</span>
                </el-col>
            </el-row>
            <el-row style="padding: 15px 50px; font-size: 14px">
                <span class="fontWeight">{{ $t("user.businessNo")+'：' }}</span
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>{{ curentStore.faher_ID }}</span>
            </el-row>
            <el-row style="padding: 15px 50px; font-size: 14px">
                <span class="fontWeight">{{ $t("user.currAccount") }}</span
                >&nbsp;&nbsp;&nbsp; <span>{{ companyData.phone }}</span
                >&nbsp;&nbsp;&nbsp;
                <el-link type="primary" @click="dialogEditPass = true">{{
                    $t("user.changePWD")
                }}</el-link
                >&nbsp;&nbsp;&nbsp;
                <el-link type="primary" @click="dialogEditPhone = true">{{
                    $t("user.changPhone")
                }}</el-link>
            </el-row>
            <el-row style="padding: 20px 50px; font-size: 14px">
                <span class="fontWeight">{{ $t("user.contactStore") }}</span
                >&nbsp;&nbsp;&nbsp;
                <span>{{ companyData.allDepName }}</span>
            </el-row>
            <!-- <el-row style="padding: 20px 50px 0px 50px; font-size: 14px">
                <el-col :span="12" class="left">
                    <span class="fontWeight">{{ $t("user.myTag") }}</span>
                </el-col>
                <el-col :span="12" class="right">
                    <el-button
                        type="success"
                        size="mini"
                        icon="el-icon-circle-plus"
                        @click="addCertifyClick"
                        class="themeAddBtn"
                        >{{ $t("user.addTag") }}</el-button
                    >
                </el-col>
            </el-row> -->
            <!-- <el-row style="padding: 5px 50px 0px 50px">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%; text-align: center"
                >
                    <el-table-column
                        prop="apply_time"
                        :label="$t('user.createTime')"
                    ></el-table-column>
                    <el-table-column
                        prop="company_name"
                        :label="$t('user.storeName')"
                    ></el-table-column>
                    <el-table-column
                        prop="check_sts_name"
                        :label="$t('user.state')"
                    >
                        <template slot-scope="scope">
                            <el-tag
                                :type="
                                    scope.row.check_sts_name == '审核中'
                                        ? 'primary'
                                        : scope.row.check_sts_name ===
                                          '审核通过'
                                        ? 'success'
                                        : 'danger'
                                "
                                disable-transitions
                                >{{ scope.row.check_sts_name }}</el-tag
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-row> -->
            <!-- 新建修改密码弹窗 -->
            <el-dialog
                :title="$t('user.verOldPhone')"
                :visible.sync="dialogEditPass"
                width="25%"
            >
                <div class="line" style="margin-left: 0px"></div>
                <div class="dialog-content top10" append-to-body>
                    <el-form>
                        <el-form-item :label="$t('user.oldPhone')">
                            <span>{{ companyData.phone }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('user.code')">
                            <el-input
                                v-model.trim="code"
                                :placeholder="$t('code')"
                                clearable
                                size="large"
                            >
                                <el-button
                                    slot="append"
                                    @click="sendCode"
                                    :disabled="!show"
                                >
                                    <span
                                        class="checkbox-text font16"
                                        v-show="show"
                                        >{{ $t("login.getCode") }}</span
                                    >
                                    <span class="checkbox-text" v-show="!show"
                                        >{{ count }} s</span
                                    >
                                </el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div class="from-bottom center">
                        <el-button
                            type="primary"
                            class="add-certify themeBtn"
                            style="width: 100px"
                            @click="confirmCodeClick"
                            >{{ $t("user.ver") }}</el-button
                        >
                    </div>
                </div>
            </el-dialog>
            <!-- 修改密码 -->
            <el-dialog
                :title="$t('user.changePWD')"
                :visible.sync="dialogConfirmPass"
                width="25%"
            >
                <div class="line" style="margin-left: 0px"></div>
                <div class="dialog-content top20" append-to-body>
                    <el-form :model="resetPWDForm" label-width="80">
                        <el-form-item :label="$t('user.newPWD_')" prop="oldPwd">
                            <el-input
                                class="left15"
                                v-model.trim="resetPWDForm.oldPwd"
                                show-password
                                :placeholder="$t('user.newPWD')"
                            ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('user.okPWD_')" prop="pwd">
                            <el-input
                                v-model.trim="resetPWDForm.pwd"
                                show-password
                                :placeholder="$t('user.okPWD')"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="from-bottom center">
                        <el-button
                            type="primary"
                            class="add-certify themeBtn"
                            style="width: 100px"
                            @click="changePwdClick"
                            >{{ $t("update") }}</el-button
                        >
                    </div>
                </div>
            </el-dialog>
            <!-- 修改手机号 -->
            <el-dialog
                :title="$t('user.verOldPhone')"
                :visible.sync="dialogEditPhone"
                width="25%"
            >
                <div class="line" style="margin-left: 0px"></div>
                <div class="dialog-content top10" append-to-body>
                    <el-form>
                        <el-form-item :label="$t('user.oldPhone')">
                            <span>{{ companyData.phone }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('user.code')">
                            <el-input
                                v-model="changePhoneCode"
                                class="pass widthStyle"
                                :placeholder="$t('code')"
                                clearable
                                size="large"
                            >
                                <el-button
                                    slot="append"
                                    @click="sendCode"
                                    :disabled="!show"
                                >
                                    <span
                                        class="checkbox-text font16"
                                        v-show="show"
                                        >{{ $t("login.getCode") }}</span
                                    >
                                    <span class="checkbox-text" v-show="!show"
                                        >{{ count }} s</span
                                    >
                                </el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div class="from-bottom center">
                        <el-button
                            type="primary"
                            class="add-certify themeBtn"
                            style="width: 100px"
                            @click="changePhoneClick"
                            >{{ $t("user.ver") }}</el-button
                        >
                    </div>
                </div>
            </el-dialog>
            <!-- 新建修改手机号弹窗 -->
            <el-dialog
                :title="$t('user.changeBindPhone')"
                :visible.sync="dialogConfirmPhone"
                width="25%"
            >
                <div class="line" style="margin-left: 0px"></div>
                <div class="dialog-content top10" append-to-body>
                    <el-form>
                        <el-form-item :label="$t('user.oldPhone')">
                            <span>{{ companyData.phone }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('user.newPhone')">
                            <el-input
                                v-model="changePhoneT"
                                :placeholder="$t('login.phonePH')"
                                clearable
                                size="large"
                                width="100%"
                            ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('user.code_')">
                            <el-input
                                v-model="codeT"
                                :placeholder="$t('user.code_')"
                                clearable
                                size="large"
                            >
                                <el-button
                                    slot="append"
                                    @click="sendCodeT"
                                    :disabled="!showT"
                                >
                                    <span
                                        class="checkbox-text font16"
                                        v-show="showT"
                                        >{{ $t("login.getCode") }}</span
                                    >
                                    <span class="checkbox-text" v-show="!showT"
                                        >{{ countT }} s</span
                                    >
                                </el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div class="from-bottom center">
                        <el-button
                            type="primary"
                            class="add-certify themeBtn"
                            style="width: 100px"
                            @click="bandClick"
                            >{{ $t("user.bind") }}</el-button
                        >
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script>
export default {
    name: "user",
    computed: {
        curentStore() {
            return this.$store.getters.curentStore;
        },
        user() {
            return this.$store.getters.user;
        },
    },
    data() {
        return {
            dialogEditPass: false,
            dialogEditPhone: false,
            dialogConfirmPass: false,
            dialogConfirmPhone: false,
            // tableData: [],
            companyData: {},

            filterTag: null,

            imageUrl: null,

            show: true,
            count: 0,

            changePhoneCode: null,
            showT: true,
            countT: 0,
            changePhoneT: null,
            codeT: null,

            code: null,

            resetPWDForm: {
                oldPwd: "",
                pwd: "",
            },
            timer: null,
            timerT: null,
        };
    },
    methods: {
        bandClick() {
            let that = this;
            this.request.updatephone(
                { phone: this.changePhoneT, verifyCode: this.codeT },
                function (res) {
                    if (res.code == "1") {
                        that.toast.success(that.$t("user.changeSuccLogin"));

                        that.stringutils.clearData();
                        that.$router.replace("/login");
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        changePhoneClick() {
            let that = this;
            this.request.checkcode(
                { code: this.changePhoneCode },
                function (res) {
                    if (res.code == "1") {
                        that.dialogConfirmPhone = true;
                        that.dialogEditPhone = false;
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        getData() {
            let that = this;
            this.request.findcominfo({}, function (res) {
                if (res.code == "1") {
                    that.companyData = res.data;
                    var temp = [];
                    for (var i in res.data.data) {
                        temp.push(res.data.data[i].dep_comp_name);
                    }
                    that.companyData.allDepName = temp.join(
                        "\xa0\xa0|\xa0\xa0"
                    );
                    that.imageUrl = that.user.logo;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        sendCode() {
            // 验证码倒计时
            if (!this.timer) {
                let data = { phone: this.companyData.phone };
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
        sendCodeT() {
            if (!this.timerT) {
                let data = { phone: this.changePhoneT };
                let that = this;
                this.request.sendSmsPhone(data, function (res) {
                    if (res.code == "1") {
                        that.toast.success(that.$t("regist.sendSec"));
                        that.countT = 60;
                        that.showT = false;
                        that.timerT = setInterval(() => {
                            if (that.countT > 0 && that.countT <= 60) {
                                that.countT--;
                            } else {
                                that.showT = true;
                                clearInterval(that.timerT);
                                that.timerT = null;
                            }
                        }, 1000);
                    } else {
                        that.toast.error(res.msg);
                    }
                });
            }
        },
        //更改用户头像
        updataLogo(url) {
            let data = {
                logo: url,
            };
            let that = this;
            this.request.updatelogo(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("user.changeLogoSucc"));
                    that.$store.dispatch("setUser", {
                        name: that.user.name,
                        logo: url,
                    });
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //修改密码
        updataPwd(oldPwd, pwd) {
            if (oldPwd.length <= 0 || pwd.length <= 0) {
                return;
            } else if (oldPwd != pwd) {
                this.toast.info(this.$t("regist.pwdWarro"));
            }
            let data = {
                id: this.companyData.company_id,
                confirm_pwd: oldPwd,
                pwd: pwd,
            };
            let that = this;
            this.request.updatecominfo(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("user.changeSuccLogin"));

                    that.loginoutShow = false;
                    that.loginoutLoading = false;

                    that.stringutils.clearData();
                    that.$router.replace("/login");
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        // getListData() {
        //     let that = this;
        //     this.request.storeCertifyList({}, function (res) {
        //         if (res.code == "1") {
        //             for (var i in res.data) {
        //                 res.data[i].check_sts_name = [
        //                     that.$t("nomrl"),
        //                     that.$t("user.stating"),
        //                     that.$t("user.stateSucc"),
        //                     that.$t("user.stateNo"),
        //                     that.$t("timeout"),
        //                 ][res.data[i].check_sts];
        //                 res.data[i].apply_time = that
        //                     .moment(res.data[i].apply_time)
        //                     .format("YYYY-MM-DD hh:mm");
        //             }
        //             that.tableData = res.data;
        //         } else {
        //             that.toast.error(res.msg);
        //         }
        //     });
        // },
        // addCertifyClick() {
        //     if (this.curentStore != null) {
        //         this.$router.push("/storeCertify");
        //     } else {
        //         this.toast.info(this.$t("user.selectStore"));
        //     }
        // },
        changePwdClick() {
            this.updataPwd(this.resetPWDForm.oldPwd, this.resetPWDForm.pwd);
        },
        handleAvatarSuccess(res, file) {
            if (Number(res.code) > 0) {
                this.companyData.logo = res.msg;
                this.imageUrl = URL.createObjectURL(file.raw);
                this.updataLogo(res.msg);
            } else {
                this.companyData.logo = "";
                this.imageUrl = "";
                this.toast.error(res.msg);
            }
        },
        beforeAvatarUpload(file) {
            return this.uploadUtils.beforeAvatarUpload(file);
        },
        confirmCodeClick() {
            let that = this;
            this.request.checkcode({ code: this.code }, function (res) {
                if (res.code == "1") {
                    that.dialogConfirmPass = true;
                    that.dialogEditPass = false;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.getData();
            // this.getListData();
        }
        
    },
};
</script>

<style scoped>
.avatar {
    width: 87px;
    height: 87px;
    object-fit: cover;
}
</style>