<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-04-02 21:07:08
 * @LastEditors: Please set LastEditors
 * @Description: 基础信息
 * @FilePath: \sjoyOrderingManage\src\views\branchStore\editBranchStore.vue
-->
<template>
    <div class="main branchStyle">
        <el-row style="padding-left: 20px">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="200px"
            >
                <el-row class="top30">
                    <el-col v-if="showSelectMode" class="mode-box">
                        <!-- 营业模式 -->
                        <el-form-item
                            :label="`${$t('systemManage.businessModel')}：`"
                            prop="business_model"
                        >
                            <span style="display: block"
                                >({{ $t("addBranchStore.important") }})：</span
                            >
                            <el-col>
                                <el-form-item
                                    class="systemStyle"
                                >
                                    <el-radio-group
                                        v-model="ruleForm.business_model"
                                        class="radio-group"
                                    >
                                        <div class="top20">
                                            <!-- 桌台点餐 -->
                                            <el-radio
                                                label="1"
                                                style="display: inline-block"
                                                >{{
                                                    $t(
                                                        "systemManage.orderMode1"
                                                    )
                                                }}
                                            </el-radio>
                                            <el-tooltip
                                                effect="light"
                                                :content="$t('systemManage.content1')"
                                                placement="right"
                                            >
                                                <img
                                                    src="../../static/images/tips.png"
                                                    class="left5"
                                                />
                                            </el-tooltip>
                                        </div>
                                        <div>
                                            <!-- 叫号取餐/餐牌送餐 -->
                                            <el-radio
                                                label="0"
                                                style="display: inline-block"
                                                class="top20"
                                                >{{
                                                    $t(
                                                        "systemManage.orderMode2"
                                                    )
                                                }}
                                            </el-radio>
                                            <el-tooltip
                                                effect="light"
                                                content=""
                                                placement="right"
                                            >
                                                <span 
                                                    slot="content"
                                                    v-if="language=='zh_CN'"
                                                    
                                                    >适用于快餐、茶饮店形式，需餐前付款。<br />牌号送餐指给点餐顾客餐牌，服务员按餐牌上菜。</span
                                                >
                                                <span 
                                                    slot="content"
                                                    v-else
                                                    >For fast food,beverage,etc.Support payment before meal.<br />[Food service by number] refers to a store that gives
                                                    <br />numbers to customers and waiters serve products according to the numbers.</span
                                                >
                                                <img
                                                    src="../../static/images/tips.png"
                                                    class="left5"
                                                />
                                            </el-tooltip>
                                        </div>
                                        <!-- 兼容模式 -->
                                        <div>
                                            <el-radio
                                                label="2"
                                                class="top20"
                                                style="display: inline-block"
                                                >{{
                                                    $t(
                                                        "systemManage.orderMode3"
                                                    )
                                                }}
                                            </el-radio>
                                            <el-tooltip
                                                effect="light"
                                                :content="$t('systemManage.content2')"
                                                placement="right"
                                            >
                                                <img
                                                    src="../../static/images/tips.png"
                                                    class="left5"
                                                />
                                            </el-tooltip>
                                        </div>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                       
                    </el-col>
                    <el-col>
                        <!-- 门店logo -->
                        <el-form-item
                            :label="$t('addBranchStore.storeLogo')"
                            prop
                        >
                            <el-upload
                                style="margin-left:10px"
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
                            <div class="top5 el-col el-col-24">
                                <span
                                    style="color: rgb(140, 147, 155); font-size: 12px;padding-left:10px"
                                    >{{ $t("addDish.imgSetting") }}</span
                                >
                            </div>
                        </el-form-item>
                        <!-- 门店名称 -->
                        <el-form-item
                            :label="$t('addBranchStore.storeName_')"
                            prop="dep_comp_name"
                        >
                            <el-input
                                v-model="ruleForm.dep_comp_name"
                                class="value-input"
                                :placeholder="
                                    $t('addBranchStore.inputStoreName')
                                "
                            ></el-input>
                        </el-form-item>
                        <!-- 经营地址 -->
                        <el-form-item
                            :label="$t('addBranchStore.storeAdd')"
                            prop="dep_city"
                        >
                            <el-cascader
                                style="width: 400px; margin-left: 10px"
                                v-model="selectCity"
                                :options="cityOptions"
                                @change="handleChangeCity"
                                :placeholder="
                                    $t('addBranchStore.selectCity')
                                "
                            ></el-cascader>
                        </el-form-item>

                        <el-form-item label prop="dep_address">
                            <el-input
                                v-model="ruleForm.dep_address"
                                style="width: 400px; margin-left: 10px"
                                :placeholder="
                                    $t('addBranchStore.selectStreet')
                                "
                            ></el-input>
                        </el-form-item>
                        <!-- 邮政编码 -->
                        <el-form-item
                            :label="$t('addBranchStore.postCode')"
                        >
                            <el-input
                                v-model="ruleForm.postal_code"
                                class="value-input"
                                :placeholder="
                                    $t('addBranchStore.inputPostCode')
                                "
                            ></el-input>
                        </el-form-item>
                        <!-- 门店电话 -->
                        <el-form-item
                            :label="$t('addBranchStore.strorePhone')"
                            prop="dep_phone"
                        >
                            <el-input
                                type="number"
                                v-model="ruleForm.dep_phone"
                                class="value-input"
                                :placeholder="
                                    $t('addBranchStore.inputstorePhone')
                                "
                            ></el-input>
                        </el-form-item>
                        <!-- 电子邮件 -->
                        <el-form-item
                            :label="$t('addBranchStore.email')"
                            prop="email"
                        >
                            <el-input
                                v-model="ruleForm.email"
                                class="value-input"
                                :placeholder="
                                    $t('addBranchStore.inputEmail')
                                "
                            ></el-input>
                        </el-form-item>
                        <!-- 主营业态 -->
                        <el-form-item
                            :label="$t('addBranchStore.mainBusiness')"
                        >
                            <el-select
                                v-model="ruleForm.main_open_id"
                                class="value-input"
                                :placeholder="
                                    $t('addBranchStore.inputDishType')
                                "
                            >
                                <el-option
                                    v-for="item in businessOptions"
                                    :key="item.id"
                                    :label="item.dict"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 餐饮类型 -->
                        <el-form-item
                            :label="$t('addBranchStore.dishType')"
                        >
                            <el-select
                                v-model="ruleForm.food_type_id"
                                class="value-input"
                                :placeholder="
                                    $t('addBranchStore.selectMainBus')
                                "
                            >
                                <el-option
                                    v-for="item in foodTypeOptions"
                                    :key="item.id"
                                    :label="item.dict"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
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
    },
    data() {
        var validateCity = (rule, value, callback) => {
            if (this.selectCity == null || this.selectCity.length == 0) {
                callback(new Error(this.$t("addBranchStore.selectCity")));
            } else {
                callback();
            }
        };

        return {
            showGooleMap: false,
            showSelectMode: false,
            center: { lng: 0, lat: 0 },
            address: "",
            selectCity: [],
            show: true,
            count: 0,
            timer: null,
            imageUrl: "",
            contact: "",

            storeStateOptions: [
                {
                    value: "0",
                    label: this.$t("addBranchStore.stateing"),
                },
                {
                    value: "1",
                    label: this.$t("addBranchStore.nisonessing"),
                },
                {
                    value: "2",
                    label: this.$t("addBranchStore.closing"),
                },
                {
                    value: "3",
                    label: this.$t("addBranchStore.stoped"),
                },
            ],

            storeTypeOptions: [
                {
                    value: "0",
                    label: this.$t("addBranchStore.zhiying"),
                },
                {
                    value: "1",
                    label: this.$t("addBranchStore.jiameng"),
                },
            ],

            foodTypeOptions: [],
            foodTypeDic: null,
            cityOptions: [],
            cityDic: null,
            businessOptions:[],
            ruleForm: {
                business_model: "1", //点餐模式
                dep_address: "", // 门店地址 ,
                dep_comp_name: "", // 门店名称 ,
                email: "",
                postal_code: "",
                state_id: "",
                cityId: "",
                dep_logo: "", // 门店logo ,
                dep_phone: "", // 门店电话 ,
                dep_type: "0", // 门店类型 ,
                food_type_id: "1", // 餐饮类型 ,
                main_open_id: "1230", //主营业态
                open_time_start: "00:00",
                open_time_end: "24:00",
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
                dep_city: [
                    {
                        type: "array",
                        required: true,
                        validator: validateCity,
                        trigger: "change",
                    },
                ],
                dep_comp_name: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.inputStoreName"),
                        trigger: "blur",
                    },
                    // { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ],
                dep_phone: [
                    {
                        required: true,
                        message: this.$t("addBranchStore.inputPhoneNum"),
                        trigger: "blur",
                    },
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
        };
    },
    methods: {
        refreshAddress(lng, lat, address) {
            this.ruleForm.lan = lat;
            this.ruleForm.lon = lng;
            this.ruleForm.dep_address = address;
        },
        addressInputFocus() {
            this.showGooleMap = true;
        },
        getInfo() {
            let that = this;
            that.request.getdpdepinfo(
                { dep_id: this.$route.query.id },
                function (res) {
                    if (res.code == "1") {
                        that.ruleForm = res.data;
                        if(that.ruleForm.main_open_id ==null){
                           that.ruleForm.main_open_id = "";
                        }else{
                           that.ruleForm.main_open_id = String(that.ruleForm.main_open_id);
                        }
                        that.initSelectCity(res.data);
                        that.showSelectMode = res.data.dep_ID <= 0;
                        that.imageUrl = res.data.dep_logo;
                        that.center.lng = res.data.lon;
                        that.center.lat = res.data.lan;
                        that.address = res.data.dep_address;
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        initSelectCity(data) {
            let that = this;
            that.selectCity = [parseInt(data.state_id), parseInt(data.cityId)];
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
            that.ruleForm.state_id = that.selectCity[0];
            that.ruleForm.cityId = that.selectCity[1];
            if (that.showSelectMode) {
                that.request.addNewDepInfo(that.ruleForm, function (res) {
                    if (res.code == "1") {
                        that.toast.success(that.$t("addEmployee.saveSucc"));
                        localStorage.setItem("updateStoreList", "true");

                        that.$router.replace({
                            path: "/branchStoreManage",
                            query: { id: res.msg, index: 1 },
                        });
                    } else {
                        that.toast.error(res.msg);
                    }
                });
            } else {
                that.request.adddepinfo(that.ruleForm, function (res) {
                    if (res.code == "1") {
                        that.toast.success(that.$t("addEmployee.saveSucc"));
                        localStorage.setItem("updateStoreList", "true");
                        that.$router.push({
                            //你需要接受路由的参数再跳转
                            path: "/branchStoreList",
                        });
                    } else {
                        that.toast.error(res.msg);
                    }
                });
            }
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
        getFoodTypeOptions() {
            let that = this;
            this.request.getcateringtype({}, function (res) {
                if (res.code == "1") {
                    that.foodTypeDic = res.data;
                    that.getFootType(that.language);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        getCityOptions() {
            let that = this;
            this.request.getCityList({}, function (res) {
                if (res.code == "1") {
                    that.cityDic = res.data;
                    that.getCityList(['en_US']);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        getFootType(lang) {
            if (this.foodTypeDic != null) {
                this.foodTypeOptions = this.foodTypeDic[lang];
            }
        },
        getCityList(lang) {
            let that = this;
            if (this.cityDic != null) {
                var dic = this.cityDic[lang];
                var opitions = [];

                for (var i = 0; i < dic.length; i++) {
                    var item = dic[i];
                    var cityList = item.cityList;
                    var childs = [];
                    for (var j = 0; j < cityList.length; j++) {
                        var child = cityList[j];
                        childs[j] = { value: child.id, label: child.name };
                    }
                    opitions[i] = {
                        value: item.id,
                        label: item.name,
                        children: childs,
                    };
                }
                that.cityOptions = opitions;
            }
        },
        handleChangeCity(value) {
            this.selectCity = value;
        },
        // 获取系统字典--主营业态
        getDictlist() {
            let that = this;
            let data={
                dict_type:"MAIN_OPEN_STATUS",
            }
            this.request.getDictlist(data, function (res) {
                if (res.code == "1") {
                    let res_data = res.data[that.language];
                    console.log(res_data);
                    that.businessOptions = res_data;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
	},
	created() {
        if (this.$route.query.id > 0) {
            this.getInfo();
        } else {
            this.showSelectMode = true;
        }
        this.getFoodTypeOptions();
        this.getCityOptions();
        this.getDictlist();
    },
};
</script>

<style scoped>
.mode-box{
   margin-bottom: 20px;
   border-bottom: 1px solid #eff2f3;
}
.avatar {
    width: 87px;
    height: 87px;
}

.address-select {
    margin-left: 10px;
    width: 150px;
}
</style>