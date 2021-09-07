<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-24 14:57:58
 * @LastEditors: Please set LastEditors
 * @Description: 添加桌台
 * @FilePath: \sjoyOrderingManage\src\views\storeManage\newDesk.vue
-->

<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <router-link tag="a" to="/deskManage" class="crumbsLink">{{ $t("sidebar.zhuotai") }}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span style="color: #232426">{{ $t("deskModel.add") }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("deskModel.add") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 20px">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="180px"
                >
                    <el-form-item
                        :label="$t('deskModel.quyu') + '：'"
                        prop="position_id"
                    >
                        <el-select
                            class="value-input"
                            v-model="ruleForm.position_id"
                            :placeholder="$t('deskModel.selectQuyu')"
                            value-key="id"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.position_name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                        <el-button
                            class="themeImportBtn"
                            type="primary"
                            @click="addRegion"
                            style="margin-left: 10px"
                        >
                            <i class="el-icon-circle-plus"></i>
                            {{ $t("deskModel.addQuyu") }}
                        </el-button>
                    </el-form-item>

                    <el-form-item
                        :label="$t('deskModel.tableName') + '：'"
                        prop="deskName"
                    >
                        <el-input
                            v-model="ruleForm.deskName"
                            class="value-input"
                            :placeholder="$t('deskModel.inputTableName')"
                        ></el-input>
                    </el-form-item>

                    <el-form-item
                        :label="$t('deskModel.tableNum') + '：'"
                        prop="deskNum"
                    >
                        <el-input
                            v-model="ruleForm.deskNum"
                            class="value-input"
                            :placeholder="$t('deskModel.inputCount')"
                            type="number"
                        ></el-input>
                    </el-form-item>

                    <el-row style="margin-left: 180px;margin-top:40px;">
                        <el-button
                            class="themeBtn"
                            type="primary"
                            @click="submitForm('ruleForm')"
                            >{{ $t("ok") }}</el-button
                        >
                        <el-button
                            class="cancelBtn"
                            type="primary"
                            @click="resetForm('ruleForm')"
                            >{{ $t("cancel") }}</el-button
                        >
                       
                    </el-row>
                </el-form>
            </el-row>

            <!-- 新建区域弹窗 -->
            <el-dialog
                :title="$t('deskModel.addQuyu')"
                :visible.sync="showDialog"
                width="25%"
            >    
                <div
                    style="
                        background-color: #eeeeee;
                        height: 1px;
                        margin-top: 10px;
                    "
                ></div>
                <div class="top20" append-to-body>
                    <el-form
                        :model="regionForm"
                        :rules="rules"
                        ref="regionForm"
                        label-width="100px"
                    >
                        <el-form-item
                            :label="$t('deskModel.quyuName')"
                            prop="newregionName"
                        >
                            <el-input
                                v-model="regionForm.newregionName"
                                :placeholder="$t('deskModel.inputQuyuName')"
                            ></el-input>
                        </el-form-item>
                        <el-row class="center top30">
                            <el-button
                                class="themeBtn"
                                type="primary"
                                size="small"
                                style="width: 100px"
                                @click="submitForm('regionForm')"
                                >{{ $t("ok") }}</el-button
                            >
                            <el-button
                                class="cancelBtn"
                                type="primary"
                                size="small"
                                style="width: 100px"
                                @click="resetForm('regionForm')"
                                >{{ $t("cancel") }}</el-button
                            >
                        </el-row>
                    </el-form>
                </div>
               
            </el-dialog>
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
    },
    data() {
        var validateDeskNum = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("deskModel.inputCount")));
            } else if (value <= 0) {
                callback(new Error(this.$t("deskModel.count_0")));
            } else {
                callback();
            }
        };

        return {
            showDialog: false,
            dep_ID: 0,
            regionForm: {
                newregionName: "",
            },
            options: [],
            ruleForm: {
                deskName: "",
                regionName: "",
                position_id: "",
                deskNum: "",
            },
            rules: {
                deskName: [
                    {
                        required: true,
                        message: this.$t("deskModel.inputTableName"),
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 20,
                        message: this.$t("dishFeedingManage.zzz"),
                        trigger: "blur",
                    },
                ],
                newregionName: [
                    {
                        required: true,
                        message: this.$t("deskModel.inputQuyuName"),
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 20,
                        message: this.$t("dishFeedingManage.zzz"),
                        trigger: "blur",
                    },
                ],
                position_id: [
                    {
                        required: true,
                        message: this.$t("deskModel.selectQuyu"),
                        trigger: "change",
                    },
                ],
                deskNum: [
                    {
                        required: true,
                        message: this.$t("deskModel.inputCount"),
                        trigger: "blur",
                    },
                    { validator: validateDeskNum, trigger: "change" },
                ],
            },
        };
    },
    methods: {
        // selectOne(item) {
        //     console.log(item);
        //     //change 触发事件
        //     //直接就拿到当前的这个对象了
        //     // if (item != null) {
        //     //     this.ruleForm.position_id = item;
        //     // }
        // },
        //获取区域列表
        getRegionList(isRest) {
            if (this.dep_ID) {
                let data = {
                    dept_id: this.dep_ID,
                    page: 1,
                    position_name: "",
                    size: 100,
                };
                let that = this;
                this.request.tablePosList(data, function (res) {
                    if (res.code == "1") {
                        if (res.data != null) {
                            that.options = res.data;
                            if(isRest){
                                that.reloadData();
                            }
                        }
                    } else {
                        that.toast.error(res.msg);
                    }
                });
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (formName == "ruleForm") {
                        this.submit();
                    } else {
                        this.submitRegion();
                    }
                } else {
                    //   console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            if (formName == "ruleForm") {
                this.$router.back(-1);
            } else {
                this.showDialog = false;
            }
        },
        submit() {
            let data = {
                dept_id: this.dep_ID,
                position_id: this.ruleForm.position_id,
                seat_number: this.ruleForm.deskNum,
                tb_name: this.ruleForm.deskName,
            };
            let that = this;
            this.request.tableAdd(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("addSucc"));
                    that.$router.back(-1);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        submitRegion() {
            let name = this.regionForm.newregionName;
            let data = {
                dept_id: this.dep_ID,
                position_name: name,
            };
            let that = this;
            this.request.tablePosAdd(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("addSucc"));
                    that.getRegionList(true);
                   
                } else {
                    that.showDialog = false;
                    that.toast.error(res.msg);
                }
            });
        },
        reloadData() {
            this.showDialog = false;
            this.ruleForm.position_id = this.options[0].id;//新增加的赋值给input 
        },
        addRegion() {
            this.regionForm.newregionName = "";
            this.showDialog = true;
        },
    },
    created() {
		let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_ID = curentStore.dep_ID;
            this.getRegionList(false);
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    this.dep_ID = newVal.dep_ID;
                    this.getRegionList(false);
                }
            },
        },
    },
};
</script>

<style scoped>
.value-input {
    width: 350px;
    height: 35px;
}

.remark-div {
    margin-top: 31px;
    margin-left: 98px;
    font-size: 12px;
    color: #899599;
}

</style>