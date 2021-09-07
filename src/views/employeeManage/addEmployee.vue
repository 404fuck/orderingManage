<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-29 20:36:22
 * @LastEditors: Please set LastEditors
 * @Description: 添加员工
 * @FilePath: \sjoyOrderingManage\src\views\employeeManage\addEmployee.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <router-link tag="a" to='employeeManage' class="crumbsLink">{{ $t("sidebar.yuangong") }}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span style="color: #232426">{{
                    $t("addEmployee.add")
                }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("addEmployee.add") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 20px;">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="180px"
                    class="demo-ruleForm"
                >
                    <el-form-item :label="$t('addEmployee.grade')" prop="gradeId">
                        <el-select
                            :style="{'width':(language=='zh_CN'?'292px':'265px')}"
                            v-model="rankModel"
                            :placeholder="$t('addEmployee.selectGrade')"
                            @change="rankChange"
                            value-key="job_level_code"
                        >
                            <el-option
                                v-for="item in rankList"
                                :key="item.job_level_code"
                                :label="`${item.class_name} ${item.cross_store == 0 ? '('+$t('employeeManage.single')+')': item.cross_store == 1? '('+$t('employeeManage.multi')+')': ''}`"
                                :value="item"
                            ></el-option>
                        </el-select>
                        <el-button class="themeImportBtn left10" type="primary" @click="addGrade">{{$t('addEmployee.addJobLevel')}}</el-button>
                    </el-form-item>

                    <el-form-item :label="$t('addEmployee.name_')" prop="name">
                        <el-input
                            v-model="ruleForm.name"
                            class="value-input"
                            :placeholder="$t('addEmployee.inputName')"
                            auto-complete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('addEmployee.mail_')" prop="email">
                        <el-input
                            v-model="ruleForm.email"
                            class="value-input"
                            :placeholder="$t('addEmployee.inputMail')"
                            auto-complete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        :label="$t('addEmployee.phone_')"
                        prop="phone"
                    >
                        <el-input
                            v-model="ruleForm.phone"
                            class="value-input"
                            :placeholder="$t('addEmployee.inputPhone')"
                            auto-complete="off"
                        ></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('addEmployee.pwd_')" prop="pass">
                        <el-input
                            type="text"
                            v-model="ruleForm.pass"
                            class="value-input"
                            :placeholder="$t('addEmployee.aaa')"
                            show-password
                            auto-complete="new-password"
                        ></el-input> 
                    </el-form-item>
                    <el-form-item
                        :label="$t('addEmployee.twoPWD_')"
                        prop="repass"
                    >
                        <el-input
                            type="password"
                            v-model="ruleForm.repass"
                            class="value-input"
                            :placeholder="$t('addEmployee.aaa')"
                            show-password
                            auto-complete="new-password"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <div class="changeMore">
                        <div style="cursor: pointer;float:right;color: #2082ed;" @click="openClick">
                            <span
                                style="position: relative;right:6px;top:0;z-index:999;"
                                v-text="btnText"
                                >{{ $t("more") }}</span
                            >
                            <img
                                style="position: relative;right:0;top:2px;z-index:999;"
                                src="../../static/images/down.png"
                                alt
                                width="13"
                                v-show="downIcon"
                            />
                            <img
                                style="position: relative;right:0;top:2px;z-index:999;"
                                src="../../static/images/up.png"
                                alt
                                width="13"
                                v-show="!downIcon"
                            />
                        </div>
                    </div>
                    <div
                        v-if="show"
                    >
                        <el-form-item
                            :label="$t('addEmployee.sex_')"
                            prop
                        >
                            <el-radio v-model="ruleForm.sexType" label="1">{{
                                $t("man")
                            }}</el-radio>
                            <el-radio v-model="ruleForm.sexType" label="2">{{
                                $t("woman")
                            }}</el-radio>
                        </el-form-item>
                        <el-form-item
                            :label="$t('addEmployee.icon_')"
                            prop
                        >
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUtils.uploadAction()"
                                :data="uploadUtils.uploadData()"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img
                                    v-if="imageUrl"
                                    :src="imageUrl"
                                    class="avatar"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                            </el-upload>
                            <span style="color: #899599">{{
                                $t("addBranchStore.imgRemark")
                            }}</span>
                        </el-form-item>
                        <el-form-item
                            :label="$t('addEmployee.idCard_')"
                            prop
                        >
                            <el-input
                                v-model="ruleForm.idcard"
                                class="value-input"
                                :placeholder="$t('addEmployee.inputIDCard')"
                            ></el-input>
                        </el-form-item>
                    </div>

                    <el-row 
                        style="
                            margin-top: 40px;
                            margin-left: 120px;
                        "
                    >
                        <!-- 保存 -->
                        <el-button
                            class="themeBtn"
                            type="primary"
                            @click="submitForm('ruleForm')"
                            >{{ $t("save") }}</el-button
                        >
                        <!-- 保存并继续添加员工  -->
                        <el-button
                            class="themeBtn"
                            type="primary"
                            @click="submitFormReset('ruleForm')"
                            >{{ $t("addEmployee.saveAndBegin") }}</el-button
                        >
                        <!-- 取消 -->
                        <el-button
                            class="cancelBtn"
                            type="primary"
                            @click="resetForm('ruleForm')"
                            >{{ $t("cancel") }}</el-button
                        >
                    </el-row>
                </el-form>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        curentStore() {
            this.dep_ID = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        language(){
            return this.$store.getters.language;
        },
    },
    data() {
        var message = "";
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        var validatePhone = (rule, value, callback) => {
            if (message) {
                callback(new Error(message));
            } else {
                callback();
            }
        };
        var validateRepass = (rule, value, callback) => {
            if (this.ruleForm.pass != value) {
                callback(new Error(this.$t("regist.pwdWarro")));
            } else {
                callback();
            }
        };

        return {
            dep_ID: "",
            reset: false,
            imageUrl: "",
            show: false,
            btnText: this.$t("more"),
            downIcon: true,
            //职级选择
            rankModel:null,
            rankList: [],
            ruleForm: {
                gradeId: "",
                name: "",
                phone: "",
                email:"",
                pass: "",
                repass: "",
                sexType: "1",
                avatar: "",
                idcard: "",
                role_code: "",
            },
            rules: {
                gradeId: [
                    {
                        required: true,
                        message: this.$t("addEmployee.selectGrade"),
                        trigger: "blur",
                    },
                ],
                name: [
                    {
                        required: true,
                        message: this.$t("addEmployee.inputName"),
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 20,
                        message: this.$t("dishFeedingManage.zzz"),
                        trigger: "blur",
                    },
                ],
                email:[
                    {
                        required: true,
                        message: this.$t('addEmployee.inputMail'),
                        trigger: "blur",
                    },
                ],
                phone: [
                    {
                        required: true,
                        message: this.$t("addEmployee.inputPhone"),
                        trigger: "blur",
                    },
                    { validator: validatePhone, trigger: "blur" },
                ],
                pass: [
                    {
                        required: true,
                        message: this.$t("login.inputPWD"),
                        trigger: "blur",
                    },
                    {
                        min: 4,
                        max: 10,
                        message: this.$t("addEmployee.aaa"),
                        trigger: "blur",
                    },
                ],
                repass: [
                    {
                        required: true,
                        message: this.$t("addEmployee.inputPWD"),
                        trigger: "blur",
                    },
                    {
                        min: 4,
                        max: 10,
                        message: this.$t("addEmployee.aaa"),
                        trigger: "blur",
                    },
                    { validator: validateRepass, trigger: "blur" },
                ],
            },
          
        };
    },
    methods: {
        //更多
        openClick() {
            this.show = !this.show;
            this.downIcon = !this.downIcon;
            if (this.show) {
                this.btnText = this.$t("branchStoreList.retract");
            } else {
                this.btnText = this.$t("more");
            }
        },
        //职级选择
        rankChange(){
            this.ruleForm.gradeId = this.rankModel.job_level_code;
        },
        //新增职级
        addGrade() {
            this.$router.push({
                path: "/addGrade",
            });
        },
        //获取职级列表
        getGradeList() {
            let data = {
                dep_id: this.dep_ID,
            };
            let that = this;
            this.request.classList(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.rankList = res.data;
                        // console.log(that.rankList);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

        handleAvatarSuccess(res, file) {
            if (Number(res.code) > 0) {
                this.ruleForm.avatar = res.msg;
                this.imageUrl = URL.createObjectURL(file.raw);
            } else {
                this.ruleForm.avatar = "";
                this.imageUrl = "";
                this.toast.error(res.msg);
            }
        },
        beforeAvatarUpload(file) {
            return this.uploadUtils.beforeAvatarUpload(file);
        },
        
        // 表单提交
        workerAdd() {
            let data = {
                dept_id: this.dep_ID,
                class_id: this.ruleForm.gradeId,
                class_name: this.rankModel.class_name,
                cross_store: this.rankModel.cross_store,
                employ_name: this.ruleForm.name,
                email: this.ruleForm.email,
                mobile_inf: this.ruleForm.phone,
                pwd: this.ruleForm.pass,
                confirmPwd: this.ruleForm.repass,
                sex:
                    this.ruleForm.sexType == "1"
                        ? this.$t("man")
                        : this.$t("woman"),
                logo: this.ruleForm.avatar,
                id_card: this.ruleForm.idcard,
            };
            let that = this;
            this.request.workerAdd(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("addEmployee.saveSucc"));
                    if (that.reset) {
                        that.imageUrl = "";
                        that.rankModel = null;
                        that.$refs["ruleForm"].resetFields();
                    } else {
                        that.$router.back(-1);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        // 保存
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.reset = false;
                    this.workerAdd();
                } else {
                    return false;
                }
            });
        },
        //保存并继续添加员工
        submitFormReset(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.reset = true;
                    this.workerAdd();
                } else {
                    return false;
                }
            });
        },
        //取消
        resetForm(formName) {
            this.imageUrl = "";
            this.$refs[formName].resetFields();
            this.$router.back(-1);
        },
        
        
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_ID = curentStore.dep_ID;
            this.getGradeList();
        }
    },
};
</script>
<style scoped>
.demo-ruleForm {
    min-height: 684px;
    float: left;
}

.value-input {
    width: 400px;
    height: 35px;
}
.avatar-uploader {
    margin-left: 19px;
    margin-top: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 87px;
    height: 87px;
    display: block;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #899599;
    width: 87px;
    height: 87px;
    line-height: 87px;
    text-align: center;
}

.avatar {
    width: 87px;
    height: 87px;
}

.changeMore{
    width: 490px;
    height:40px;
    line-height:40px;
    border-top:1px solid #eff2f3;
    float:right;
    overflow: hidden;
}
</style>