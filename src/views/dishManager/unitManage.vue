<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-01-27 22:00:52
 * @LastEditors: Please set LastEditors
 * @Description: 单位管理
 * @FilePath: \sjoyOrderingManage\src\views\dishManager\unitManage.vue
-->

<template>
    <div class="dishStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.danwei") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px">
                <el-col>
                    <!-- 单位列表信息-->
                    <div class="content-wrap">
                        <div class="addClassTit" @click="showDialog = true">
                            <i class="el-icon-circle-plus font15"></i>
                            <span>{{ $t("unitManage.newUnit") }}</span>
                        </div>
                        <ul class="infinite-list">
                            <li
                                v-for="(item, index) in infiniteData"
                                :class="{ active: selectIndex == index }"
                                @click="clickItem(index)"
                                :key="index"
                            >
                                <span class="li-title">{{ item.dict_value }}</span>
                                <i
                                    v-show="
                                        selectIndex == index &&
                                        item.id != 0 &&
                                        item.dep_id != 0
                                    "
                                    class="addClass-del li-icon el-icon-close font18"
                                    @click="delItem(index)"
                                ></i>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>

            <!-- 新增单位弹窗 -->
            <el-dialog
                :title="$t('unitManage.newUnit')"
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
                <div class="top30" append-to-body>
                    <el-form
                       :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        :label-width="language=='zh_CN'?'100px':'120px'"
                    
                    >
                        <el-form-item :label="$t('unitManage.unitName')+'：'" prop="unit">
                            <el-input
                                style="width:93%"
                                v-model="ruleForm.unit"
                                :placeholder="$t('unitManage.inputUnit')"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="top30 center">
                        <el-button
                            class="themeBtn"
                            size="small"
                            style="width: 100px"
                            :loading="alertButtonLoading"
                            @click="submitForm('ruleForm')"
                            >{{ $t("ok") }}</el-button
                        >
                        <el-button
                            class="cancelBtn"
                            size="small"
                            style="width: 100px"
                            @click="resetForm('ruleForm')"
                            >{{ $t("cancel") }}</el-button
                        >
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        curentStore() {
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        language(){
            return this.$store.getters.language;
        },
    },
    data() {
        return {
            dep_id: "",
            selectIndex: 0,
            selectItem: {
                add_name: "",
                add_id: 0,
            },
            showDialog: false,
            alertButtonLoading: false,
            ruleForm: {
                unit: ""
            },
            rules: {
                unit: [
                    {
                        required: true,
                        message: this.$t('unitManage.inputUnit'),
                        trigger: "blur",
                    },
                ],
            },
            infiniteData: [], //填充数据
           
        };
    },

    methods: {
        addDishUnit() {
            //判断单位是否重复添加
            for (let i in this.infiniteData) {
                if(this.ruleForm.unit==this.infiniteData[i].dict_value||this.ruleForm.unit==this.infiniteData[i].dict_value_en||this.ruleForm.unit==this.infiniteData[i].dict_value_zh){
                    this.toast.info(this.$t('unitManage.txtMess'));
                    return false;
                }
            }
            let that = this;
            that.alertButtonLoading = true;
            that.request.addDic(
                {
                    dep_id: this.dep_id,
                    dict_value: this.ruleForm.unit,
                    dict_type: "DISH_UNIT_DICT",
                },
                function (res) {
                    if (res.code == "1") {
                        that.showDialog = false;
                        that.alertButtonLoading = false;
                        that.toast.success(that.$t("addSucc"));
                        that.ruleForm.unit = "";
                        that.getDicList();
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        // 获取单位字典列表
        getDicList() {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                str_param: "DISH_UNIT_DICT",
            };
            this.request.getDicList(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.infiniteData = res.data;
                        if (res.data.length > 0) {
                            that.selectItem =
                                that.infiniteData[that.selectIndex];
                        }
                        // console.log(res.data);
                        console.log(that.infiniteData);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

        clickItem(index) {
            this.selectIndex = index;
            this.selectItem = this.infiniteData[index];
        },
        delItem(index) {
            let that = this;
            this.request.delDic(
                {
                    dep_id: this.dep_id,
                    param: this.selectItem.id,
                    str_param: this.selectItem.dict_value,
                    dict_del_type:'2',
                },
                function (res) {
                    if (res.code == "1") {
                        that.toast.success(that.$t("delSucc"));
                        that.selectIndex = 0;
                        that.selectItem = null;
                        that.showDialog = false;
                        that.getDicList();
                    } else {
                        that.toast.error(res.msg);
                        that.showDialog = false;
                    }
                }
            );
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addDishUnit();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.showDialog = false;
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            this.getDicList();
            
        }
    },
};
</script>
<style>
</style>