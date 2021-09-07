<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-04-06 14:06:40
 * @LastEditors: Please set LastEditors
 * @Description: 商业信息
 * @FilePath: \sjoyOrderingManage\src\views\branchStore\editBussinessInfo.vue
-->
<template>
    <div class="main branchStyle">
        <el-row style="padding-left: 20px">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="210px"
            >
                <el-row class="top20">
                    <el-col>
                        <div class="grid-content bg-purple top20">
                            <el-form-item
                                :label="$t('addBranchStore.companyName')"
                                prop="company_name"
                            >
                                <el-input
                                    v-model="ruleForm.company_name"
                                    class="value-input"
                                    :placeholder="
                                        $t('addBranchStore.inputCompanyName')
                                    "
                                ></el-input>
                            </el-form-item>

                            <el-form-item
                                :label="$t('addBranchStore.bus_code')"
                                prop="business_register_num"
                            >
                                <el-input
                                    v-model="ruleForm.business_register_num"
                                    class="value-input"
                                    :placeholder="
                                        $t('addBranchStore.inputbus_code')
                                    "
                                ></el-input>
                            </el-form-item>

                            <el-form-item
                                :label="$t('addBranchStore.sst_code')"
                            >
                                <el-input
                                    v-model="ruleForm.server_rate_num"
                                    class="value-input"
                                    :placeholder="
                                        $t('addBranchStore.inputsst_code')
                                    "
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                :label="$t('addBranchStore.sst_rate')"
                            >
                                <el-radio
                                    v-model="taxes_rate"
                                    style="margin-left: 10px"
                                    label="6"
                                    >6%</el-radio
                                >
                                <el-radio v-model="taxes_rate" label="0"
                                    >0%</el-radio
                                >
                            </el-form-item>

                            <el-form-item :label="$t('addBranchStore.sc')">
                                <el-input
                                    v-model="ruleForm.cost_rate"
                                    class="value-input"
                                    type="number"
                                ></el-input>
                                <span style="margin-left: 10px">%</span>
                            </el-form-item>
                            <el-form-item class="takeCollection" v-if="isShowTakeColl">
                                <span>外带收取</span>
                                <el-switch
                                    v-model="takeCollection"
                                    class="left15"
                                    active-color="#2082ED"
                                    inactive-color="#D8D8D8"
                                    :active-text="takeCollection==true?this.$t('systemManage.on'):this.$t('systemManage.off')"
                                ></el-switch>
                            </el-form-item>
                            <el-form-item style="padding-left: 100px;margin-top:40px;">
                                <el-button
                                    class="themeBtn"
                                    style="width: 100px"
                                    type="primary"
                                    @click="submitForm('ruleForm')"
                                    >{{ $t("ok") }}</el-button
                                >
                                <el-button
                                    class="cancelBtn left30"
                                    type="primary"
                                    style="width: 100px"
                                    @click="$router.back(-1)"
                                    >{{ $t("cancel") }}</el-button
                                >
                            </el-form-item>
                        </div>
                    </el-col>
                    
                </el-row>
            </el-form>
        </el-row>
    </div>
</template>

<script>
export default {
    
	computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
        businessModel() {
            return this.$store.getters.businessModel;
        },
        costRate(){
            return this.ruleForm.cost_rate;
        }

    },
    data() {
        var validateStartNo = (rule, value, callback) => {
            if (this.startNo.length < 5 || this.startNo.length > 8) {
                callback(new Error(this.$t("addBranchStore.start_no_tips")));
            } else {
                callback();
            }
        };

        return {
            center: { lng: 0, lat: 0 },
            startNo: "",
            taxes_rate: "",

            ruleForm: {
                dep_id: 0, //点餐模式
                company_name: "", // 门店地址 ,
                business_register_num: "", // 门店名称 ,
                server_rate_num: "",
                taxes_rate: "",
                cost_rate: "0.00",
                billing_number: "", // 门店logo ,
                print_info: "", // 门店电话 ,
                take_out_service_charge:'0',//当服务费非0时出现，默认为“1”开启，并且服务费大于0外带收取显示，==联动
            },

            rules: {
                pwd: [
                    {
                        //密码只能是6-20位英文或数字
                        required: true,
                        message: this.$t("login.inputPWD"),
                        trigger: "blur",
                        min: 6,
                        max: 20,
                        message: this.$t("addBranchStore.pwdWarro"),
                        trigger: "blur",
                    },
                ],
                dep_address: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.selectStreet"),
                        trigger: "blur",
                    },
                    // { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],

                company_name: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.inputCompanyName"),
                        trigger: "blur",
                    },
                    // { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ],

                business_register_num: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.inputbus_code"),
                        trigger: "blur",
                    },
                ],
                dep_mobile: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.inputPhoneNum"),
                        trigger: "blur",
                    },
                    // { type: 'number', message: '请输入数字', trigger: 'blur' },
                    // { min: 1, max: 11, message: "请输入11位手机号码", trigger: "blur" }
                ],
                dep_note: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.inputStoreDes"),
                        trigger: "blur",
                    },
                ],
                postal_code: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.inputPostCode"),
                        trigger: "blur",
                    },
                    // { min: 1, max: 11, message: '请输入11位手机号码', trigger: 'blur' }
                ],
                startNo: [
                    {
                        type: "number",
                        required: true,
                        validator: validateStartNo,
                        trigger: "blur",
                    },
                ],
                dep_phone: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.inputstorePhone"),
                        trigger: "blur",
                    },
                    // { min: 1, max: 11, message: '请输入11位手机号码', trigger: 'blur' }
                ],
                dep_shopowner: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.inputStoreBoss"),
                        trigger: "blur",
                    },
                ],
                open_time_start: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.selectTime"),
                        trigger: "blur",
                    },
                ],
            },
            takeCollection:false,//外带收取
            isShowTakeColl:false,
        };
    },
    methods: {
        refreshAddress(lng, lat, address) {
            this.ruleForm.lan = lat;
            this.ruleForm.lon = lng;
            this.ruleForm.dep_address = address;
        },
      
        getInfo() {
            let that = this;
            that.request.getBussinessInfo(
                { dep_id: this.$route.query.id },
                function (res) {
                    if (res.code == "1") {
                        that.ruleForm = res.data;
                        if (res.data.billing_number > 0) {
                            that.startNo = res.data.billing_number;
                        }
                        that.taxes_rate = "" + res.data.taxes_rate;
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.uploadInfo();
                } else {
                    //   console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        uploadInfo() {
            let that = this;
            var no = "" + that.startNo;
            if (no != "") {
                if (no.length < 5 || no.length > 8) {
                    that.toast.error(this.$t("addBranchStore.start_no_tips"));
                    return;
                }
            }
            that.ruleForm.dep_id = that.$route.query.id;
            that.ruleForm.billing_number = that.startNo;
            that.ruleForm.taxes_rate = parseInt(that.taxes_rate);
            that.ruleForm.take_out_service_charge = this.takeCollection == true?'1':'0';
            if(that.isShowTakeColl==false){
                that.ruleForm.take_out_service ='0';
            }
            that.request.addbusiness(that.ruleForm, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("addEmployee.saveSucc"));
                    localStorage.setItem("updateStoreList", "true");
                    that.$router.replace({ path: "/branchStoreList" });
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        handleAvatarSuccess(res, file) {
            if (Number(res.code) > 0) {
                this.ruleForm.dep_logo = res.msg;
                this.imageUrl = URL.createObjectURL(file.raw);
            } else {
                this.ruleForm.dep_logo = "";
                this.imageUrl = "";
                this.toast.error(res.msg);
            }
        },
        beforeAvatarUpload(file) {
            return this.uploadUtils.beforeAvatarUpload(file);
        },
    },
    created() {
        if (this.$route.query.id > 0) {
            this.takeCollection =  this.businessModel.take_out_service_charge==0?false:true;
            this.getInfo();
        }
    },
    
    watch: {
        businessModel: {
            handler(newVal, oldVal) {
                if (this.$route.query.id > 0) {
                    if (newVal) {
                        this.businessModel = newVal;
                        this.takeCollection =  newVal.take_out_service_charge==0?false:true;
                    }
                }
            },
        },
        costRate:{
            handler(newVal,oldVal){
                if(newVal){
                    let numVal = Number(newVal);
                    if(numVal>0||newVal!=''){
                        this.isShowTakeColl = true;
                    }else{
                        this.isShowTakeColl = false;
                        this.ruleForm.take_out_service ='0';
                    }

                }
            }
        }
       
    },
};
</script>

<style scoped>
.avatar {
    width: 87px;
    height: 87px;
}

.address-select {
    margin-left: 10px;
    width: 150px;
}
.takeCollection{
    padding-left: 272px !important;
    color: #232426;
    font-weight: bold;
    font-size: 14px;
}
</style>