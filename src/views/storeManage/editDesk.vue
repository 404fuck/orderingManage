<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-23 17:37:14
 * @LastEditors: Please set LastEditors
 * @Description: 编辑桌台
 * @FilePath: \sjoyOrderingManage\src\views\storeManage\editDesk.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <router-link tag="a" :to="{name: 'deskManage', params: {obj:getPropOjb}}" class="crumbsLink">{{ $t("sidebar.zhuotai") }}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span style="color: #232426">{{ $t("deskModel.update") }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("deskModel.update") }}</div>
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
                        :label="$t('deskModel.quyu_')"
                        prop="regionName"
                    >
                        <el-select
                            class="value-input"
                            v-model="ruleForm.regionName"
                            :placeholder="$t('deskModel.selectQuyu')"
                            @change="selectOne"
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
                        :label="$t('deskModel.tableName')+'：'"
                        prop="deskName"
                    >
                        <el-input
                            v-model="ruleForm.deskName"
                            class="value-input"
                            :placeholder="$t('deskModel.inputTableName')"
                        ></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('deskModel.tableNum')+'：'" prop="deskNum">
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
                regionName: [
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
            getPropOjb:null,
        };
    },
    methods: {
        getInfo() {
            let that = this;

            that.request.tableSel(
                { tb_id: that.$route.query.tb_id },
                function (res) {
                    if (res.code == "1") {
                        that.ruleForm.deskName = res.data.tb_name;
                        that.ruleForm.regionName = res.data.position_name;
                        that.ruleForm.position_id = res.data.position_id;
                        that.ruleForm.deskNum = res.data.seat_number;
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        selectOne(item) {
            //change 触发事件
            //直接就拿到当前的这个对象了
            if (item != null) {
                this.ruleForm.position_id = item;
            }
        },
        //获取区域列表
        getRegionList() {
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
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
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
                this.$router.push({ name: "deskManage", params: { obj:this.getPropOjb} });
            } else {
                this.showDialog = false;
            }
        },
        submit() {
            let data = {
                position_id: this.ruleForm.position_id,
                seat_number: this.ruleForm.deskNum,
                tb_name: this.ruleForm.deskName,
                tb_id: this.$route.query.tb_id,
                dep_id: this.dep_ID,
            };
            let that = this;
            this.request.tableUpdate(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("updateSucc"));
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
                    that.toast.success(that.$t("deskModel.addSucc"));
                    that.reloadData();
                } else {
                    that.toast.error(res.msg);
                    that.showDialog = false;
                }
            });
        },
        reloadData() {
            this.showDialog = false;
            this.getRegionList();
        },
        addRegion() {
            let that = this;
            that.regionForm.newregionName = "";
            that.showDialog = true;
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_ID)
            this.dep_ID = curentStore.dep_ID;
            let getPropOjb = this.$route.params.obj;
            if(getPropOjb!=undefined&&getPropOjb!=null){
                this.getPropOjb = getPropOjb;
                console.log(this.getPropOjb);
            }
            this.getInfo();
            this.getRegionList();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    this.dep_ID = newVal.dep_ID;
                    this.getRegionList();
                    this.ruleForm.regionName = "";
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