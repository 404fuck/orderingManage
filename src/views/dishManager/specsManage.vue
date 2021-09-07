<!--
 * @Author: zzt
 * @Date: 2021-01-14 21:12:17
 * @LastEditTime: 2021-01-27 21:42:45
 * @LastEditors: Please set LastEditors
 * @Description: 规格管理
 * @FilePath: \sjoyOrderingManage\src\views\dishManager\specsManage.vue
-->
<template>
    <div class="dishStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.guige") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px">
                <el-col>
                    <!-- 规格列表信息-->
                    <div class="content-wrap">
                        <div class="addClassTit" @click="showDialog = true">
                            <i class="el-icon-circle-plus font15"></i>
                            <span>{{ $t("specsManage.newSpecs") }}</span>
                        </div>
                        <ul class="infinite-list">
                            <li
                                @click="activeIndex = index"
                                :class="{ active: activeIndex == index }"
                                v-for="(item, index) in infiniteData"
                                :key="index"
                            >
                                <div class="li-title center"
                                    >{{ language=="zh_CN"?item.name:item.name2==""?item.name:item.name2}}
                                </div>
                                <i
                                    v-show="activeIndex == index&&item.flag!=0"
                                    class="addClass-del li-icon el-icon-close font18"
                                    @click="delItem(item)"
                                ></i>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>

            <!-- 新增规格弹窗 -->
            <el-dialog
                :title="$t('specsManage.newSpecs')"
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
                        <el-form-item :label="$t('specsManage.sizeName')+'：'" prop="tagName">
                            <el-input
                                style="width:93%"
                                v-model="ruleForm.tagName"
                                :placeholder="$t('specsManage.inputSize')"
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
            activeIndex: 0,
            showDialog: false,
            alertButtonLoading: false,
            ruleForm: {
                tagName: ""
            },
            rules: {
                tagName: [
                    {
                        required: true,
                        message: this.$t('specsManage.inputSize'),
                        trigger: "blur",
                    },
                ],
            },
            infiniteData: [],  //填充数据
           
        };
    },

    methods: {
        //删除规格
        delItem(tag) {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                param: tag.id,
                str_param:tag.name,
                dict_del_type:'3',
            };
            this.request.delDic(data,function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("delSucc"));
                    that.tagspeclist();
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //添加规格
        addDishTags() {
             //判断规格是否重复添加
            for (let i in this.infiniteData) {
                if(this.ruleForm.tagName==this.infiniteData[i].name||this.ruleForm.tagName==this.infiniteData[i].name2){
                    this.toast.info(this.$t('specsManage.txtMess'));
                    return false;
                }
            }
            
            let that = this;
            let data = {
                dep_id: this.dep_id,
                dict_value: this.ruleForm.tagName,
                dict_type: "DISH_SPEC",
            }
            that.alertButtonLoading = true;
            that.request.addDic(data,function (res) {
                that.alertButtonLoading = false;
                if (res.code == "1") {
                    that.showDialog = false;
                    that.toast.success(that.$t("addSucc"));
                    that.ruleForm.tagName = "";
                    that.tagspeclist();
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        // 菜品标签和规格列表查询
        tagspeclist() {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                dict_type: "DISH_SPEC",
            };
            this.request.tagspeclist(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;
                        console.log(res_data);
                        that.infiniteData = res_data;
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addDishTags();
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
            this.tagspeclist();
        }
    },
};
</script>
<style>
</style>