<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-04-06 14:12:33
 * @LastEditors: Please set LastEditors
 * @Description: 门店信息列表
 * @FilePath: \sjoyOrderingManage\src\views\branchStore\branchStoreList.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <div class="main-content branchStoreStyle">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.mengdianXinxi") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 10px 50px">
                <el-col class="right">
                    <el-button
                        @click="addCertifyClick"
                        icon="el-icon-circle-plus"
                        size="small"
                        type="primary"
                        class="themeAddBtn"
                        >{{ $t("addBranchStore.addStore") }}</el-button
                    >
                </el-col>
            </el-row>

            <el-row style="padding: 10px 50px">
                <el-col>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                        v-loading="loading"
                    >
                        <el-table-column
                            type="index"
                            :label="$t('index')"
                            width="100"
                            align="center"
                        ></el-table-column>

                        <el-table-column
                            prop="logo"
                            :label="$t('branchStoreList.storeLogo')"
                            align="center"
                            width="300"
                        >
                            <template slot-scope="scope">
                                <el-image
                                    style="width: 80px; height: 80px;background:#fcfcfc;border-radius:10px;line-height:80px"
                                    :src="scope.row.dep_logo"
                                >
                                    <div slot="error">
                                    </div>
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column 
                            :label="$t('branchStoreList.name')"
                            width="300"
                        >
                            <template slot-scope="scope">
                                {{scope.row.dep_comp_name}}
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('sidebar.mengdianXinxi')">
                            <template slot-scope="scope">
                                <div class="cell-span">
                                    {{$t('branchStoreList.depNo')+'：'}}
                                    {{scope.row.dep_ID}}
                                </div>
                                <div class="cell-span">
                                    {{$t('branchStoreList.address')+'：'}}
                                    {{scope.row.dep_address}}
                                    <span v-if="scope.row.state_area!=null">,{{scope.row.state_area}}</span>
                                    <span v-if="scope.row.city_area!=null">,{{scope.row.city_area}}</span>
                                </div>
                                <div class="cell-span">
                                    {{$t('branchStoreList.dishType')+'：'}}
                                    {{scope.row.food_type}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column 
                            :label="$t('operation')"
                            width="250"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="
                                        scope.row.dep_ID == curentStore.dep_ID
                                    "
                                >
                                    <el-row class="center">
                                        <el-button
                                            @click="sycDish(scope.row)"
                                            type="text"
                                            size="small"
                                            >{{ $t("sycdish") }}</el-button
                                        >
                                    </el-row>
                                    <el-row class="center">
                                        <el-button
                                            type="text"
                                            @click="editClick(scope.row)"
                                            size="small"
                                            >{{ $t("update") }}</el-button
                                        >
                                    </el-row>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <!-- 同步菜品弹窗 -->
            <el-dialog
                :title="$t('sycdishTo')"
                :visible.sync="showDialog"
                width="25%"
            >
                <div slot="title">
                    <span class="dialog-title fontWeight font16">{{
                        $t("sycdishTo")
                    }}</span>
                    <div
                        class="line"
                        style="margin-left: 0px; margin-top: 10px"
                    ></div>
                </div>
                <div class="dialog-content" append-to-body>
                    <div class="top20">
                        <el-form
                            :model="sycDishForm"
                            :rules="rules"
                            ref="sycDishForm"
                            label-width="120px"
                        >
                            <el-form-item
                                :label="$t('addBranchStore.storeName_')"
                                prop="selectSycDept"
                            >
                                <el-select
                                    v-model="selectSycDept"
                                    class="value-input"
                                    style="width:93%"
                                    :placeholder="
                                        $t('addBranchStore.selectStoreName')
                                    "
                                >
                                    <el-option
                                        v-for="item in storeList"
                                        :key="item.dep_ID"
                                        :label="item.dep_comp_name"
                                        :value="item.dep_ID"
                                        :disabled="
                                            item.dep_ID == curentStore.dep_ID
                                        "
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <div class="center top30">
                                <el-button
                                    style="width:100px"
                                    class="themeBtn"
                                    type="primary"
                                    size="small"
                                    @click="submitForm('sycDishForm')"
                                    >{{ $t("ok") }}</el-button
                                >
                                <el-button
                                    style="width:100px"
                                    class="cancelBtn"
                                    type="primary"
                                    size="small"
                                    @click="resetForm('sycDishForm')"
                                    >{{ $t("cancel") }}</el-button
                                >
                            </div>
                        </el-form>
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
            //console.log('curentStore')
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        businessModel:{
            get() {
                return this.$store.getters.businessModel;
            },
            set() {
                //
            },
        },
    },
    data() {
        var validateSycDish = (rule, value, callback) => {
            if (this.selectSycDept == null || this.selectSycDept == "") {
                callback(new Error(this.$t("addBranchStore.selectStoreName")));
            } else {
                callback();
            }
        };
        return {
            loading: true,
            showDialog: false,
            selectSycDept: "",
            tableData: [],
            storeList: [],
            dep_comp_name: "",
           
            dep_id: "",
            sycDishForm: {},
            rules: {
                selectSycDept: [
                    {
                        required: true,
                        validator: validateSycDish,
                        trigger: "change",
                    },
                ],
            },
        };
    },
    methods: {
       
        addCertifyClick() {
            this.$router.push({
                path: "/branchStoreManage",
                query: { id: -1, index: 0 },
            });
        },
        //缓存门店列表
        setStoreList(storeList) {
            this.$store.dispatch("setStoreList", storeList);
            this.storeList = storeList;
        },
        //获取所有门店列表
        getStoreListAll() {
            let that = this;
            this.request.branchStoreListAll({}, function (res) {
                that.loading = false;
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data =  res.data;
                        that.tableData = res_data.list;
                        //当前门店排在门店列表的最上面
                        that.tableData.map((item,index)=>{
                            if(item.dep_ID == that.dep_id){
                                that.tableData.unshift(that.tableData.splice(index , 1)[0]);
                            }
                            return false;
                        })
                        that.setMemory(res);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        setMemory(res) {
            if (res.data.list != null) {
                var storeList = res.data.list;

                if (storeList != null) {
                    this.setStoreList(storeList);
                } else {
                    this.setStoreList(null);
                }
            }
        },
        editClick(md) {
            this.$router.push({
                path: "/branchStoreManage",
                query: { id: md.dep_ID, index: 0 },
            });
        },
        sycDish(md) {
            this.showDialog = true;
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submitSycDish();
                } else {
                    //   console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.showDialog = false;
        },
        submitSycDish() {
            let that = this;
            var loginInfo = this.$store.getters.loginInfo;
            this.request.sycDish(
                {
                    company_id: loginInfo.company_id,
                    old_dep_id: that.curentStore.dep_ID,
                    new_dep_id: that.selectSycDept,
                },
                function (res) {
                    that.showDialog = false;
                    if (res.code == "1") {
                        that.toast.success(that.$t("sycSucc"));
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        //更新缓存
        handlesetBusinessModel(businessModel) {
            this.$store.dispatch("setBusinessModel", businessModel);
        },
        //门店配置 经营设置
        selectDishSet() {
            let that = this;
            let data = {
                dept_id: this.curentStore.dep_ID,
            };
            this.request.selectDishSet(data, function (res) {
                if (res.code == "1") {
                    if (res.data == null) {
                        return false;
                    }
                    let res_data = res.data;
                    // console.log(res_data);
                    that.handlesetBusinessModel(res_data);
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
            this.dep_id = curentStore.dep_ID;
            this.getStoreListAll();
            this.selectDishSet();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    // debugger
                    this.dep_id = newVal.dep_ID;
                    this.getStoreListAll();
                    
                }
            },
        },
        businessModel: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.businessModel = newVal;
                }
            },
        },
    },
};
</script>

<style scoped>
.search-button {
    margin-left: 16px;
    border: none;
    background-color: #2082ed;
}

.search-input {
    width: 200px;
}

.ecss-el-table {
    text-align: center;
    padding-left: 50px;
}

.cell-span {
    font-size: 12px;
    color: #666666;
}

.page-pagination {
    float: right;
    margin-top: 10px;
    margin-right: 50px;
}
</style>