<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-29 21:16:24
 * @LastEditors: Please set LastEditors
 * @Description: 编辑员工
 * @FilePath: \sjoyOrderingManage\src\views\employeeManage\editEmployee.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <router-link tag="a" :to="{name: 'employeeManage', params: {obj1:getPropOjb}}" class="crumbsLink">{{ $t("sidebar.yuangong") }}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span style="color: #232426">{{
                    $t("editEmployee.update")
                }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("editEmployee.update") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 20px">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="180px"
                    class="demo-ruleForm"
                >
                    <el-form-item :label="$t('addEmployee.grade')" prop>
                        <el-select
                            class="value-input"
                            v-model="rankModel"
                            :placeholder="$t('addEmployee.selectGrade')"
                            @change="rankChange"
                            value-key="job_level_code"
                        >
                            <el-option
                                v-for="(item,index) in rankList"
                                :key="index"
                                :label="`${item.class_name} ${item.cross_store == 0 ? '('+$t('employeeManage.single')+')': item.cross_store == 1? '('+$t('employeeManage.multi')+')': ''}`"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="$t('addEmployee.name_')" prop="employ_name">
                        <el-input
                            v-model="ruleForm.employ_name"
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
                        prop="mobile_inf"
                    >
                        <el-input
                            v-model="ruleForm.mobile_inf"
                            :disabled="true"
                            class="value-input"
                            auto-complete="off"
                            :placeholder="$t('addEmployee.inputPhone')"
                        ></el-input>
                    </el-form-item>

                    <el-form-item  prop>
                        <span slot="label">
                            <span>{{$t('editEmployee.pwd')}}</span>
                            <el-tooltip
                                effect="light"
                                content=""
                                placement="right"
                            >
                                <span 
                                    slot="content"
                                    >{{$t('editEmployee.pwdContent')}}</span
                                >
                                <img
                                    src="../../static/images/tips.png"
                                    class="left5"
                                />
                            </el-tooltip>
                            <span>：</span>
                        </span>
                        <el-input
                            type="password"
                            v-model="ruleForm.pwd"
                            class="value-input"
                            :placeholder="$t('addEmployee.aaa')"
                            auto-complete="new-password"
                            show-password
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        :label="$t('addEmployee.twoPWD_')"
                        prop
                    >
                        <el-input
                            type="password"
                            v-model="ruleForm.confirmPwd"
                            class="value-input"
                            :placeholder="$t('addEmployee.aaa')"
                            auto-complete="new-password"
                            show-password
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
                    <div v-if="show" style="clear: both; margin-top: 20px">
                        <el-form-item
                            :label="$t('addEmployee.sex_')"
                            prop
                        >
                            <el-radio v-model="sexRadio" label="1">{{
                                $t("man")
                            }}</el-radio>
                            <el-radio v-model="sexRadio" label="2">{{
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
                                v-model="ruleForm.id_card"
                                class="value-input"
                                :placeholder="$t('addEmployee.inputIDCard')"
                            ></el-input>
                        </el-form-item>
                    </div>

                    <el-row style="margin-left: 180px;margin-top:40px;">
                        <el-button
                            class="themeBtn"
                            type="primary"
                            @click="submitForm('ruleForm')"
                            >{{ $t("save") }}</el-button
                        >
                        <el-button
                            class="cancelBtn"
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
            isEdit:false,
            imageUrl: "",
            show: false,
            btnText: this.$t("more"),
            downIcon: true,
            //职级选择
            rankModel: null,
            rankList: [],
            ruleForm: {},
            sexRadio:"1",
            rules: {
                gradeId: [
                    {
                        required: true,
                        message: this.$t("addEmployee.selectGrade"),
                        trigger: "blur",
                    },
                ],
                employ_name: [
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
                mobile_inf: [
                    {
                        required: true,
                        message: this.$t("addEmployee.inputPhone"),
                        trigger: "blur",
                    },
                    { validator: validatePhone, trigger: "blur" },
                ],
                pwd: [
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
                confirmPwd: [
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
            getPropOjb:null,
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
            this.isEdit = true;
            // console.log(this.rankModel);
            this.ruleForm.gradeId = this.rankModel.job_level_code;
        },

        handleAvatarSuccess(res, file) {
            if (Number(res.code) > 0) {
                this.imageUrl = res.msg;
            } else {
                this.imageUrl = "";
                this.toast.error(res.msg);
            }
        },
        beforeAvatarUpload(file) {
            return this.uploadUtils.beforeAvatarUpload(file);
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
        //获取员工修改详情
        getDetail(){
            this.sexRadio = this.ruleForm.sex==this.$t("man")?"1":"2";
            this.rankModel =  `${this.ruleForm.class_name} ${this.ruleForm.cross_store==0?'('+this.$t('employeeManage.single')+')':this.ruleForm.cross_store==1?'('+this.$t('employeeManage.multi')+')':''}`;
            this.imageUrl =this.ruleForm.logo;
            // console.log(this.ruleForm);

        },
        //表单提交 员工修改更新
        workerUpdate() {
            // console.log(this.ruleForm);
            let that = this;
            let data={
                sex:this.sexRadio == "1"? this.$t("man"): this.$t("woman"),
                class_id:this.isEdit ===true?this.ruleForm.gradeId:this.ruleForm.class_id,
                class_name: this.isEdit ===true?this.rankModel.class_name:this.ruleForm.class_name,
                cross_store:this.isEdit ===true?this.rankModel.cross_store:this.ruleForm.cross_store,
                company_id:this.ruleForm.company_id,
                dept_id:this.dep_ID,
                employ_name:this.ruleForm.employ_name,
                email: this.ruleForm.email,
                face_data:this.ruleForm.face_data,
                id:this.ruleForm.id,
                id_card:this.ruleForm.id_card,
                logo: this.imageUrl,
                mobile_inf:this.ruleForm.mobile_inf,
                pwd:this.ruleForm.pwd,
            };
            
            this.request.workerUpdate(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("updateSucc"));
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
                    this.workerUpdate();
                } else {
                    //   console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm(formName) {
            this.imageUrl = "";
            this.$refs[formName].resetFields();
            this.$router.push({name:'employeeManage',params:{obj1:this.getPropOjb}});
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_ID = curentStore.dep_ID;
            this.getGradeList();
            let getPropOjb = this.$route.params.obj1;
            if(getPropOjb!=undefined&&getPropOjb!=null){
                this.ruleForm = getPropOjb.ruleForm;
                this.getPropOjb =  getPropOjb;
                this.getDetail(); 
                // console.log(this.getPropOjb);
            }
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