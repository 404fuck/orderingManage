<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-27 18:40:52
 * @LastEditors: Please set LastEditors
 * @Description: 区域管理
 * @FilePath: \sjoyOrderingManage\src\views\storeManage\regionModel.vue
-->
<!--  -->
<template>
    <div>
        <el-row class="row-header top10" style="padding: 20px 50px 5px 50px">
            <el-col :span="12">
                <span class="title-size">
                    {{ $t("operatingDiary.sum") }}
                    <span class="title-num">{{ currentPage.total }}</span>
                    {{ $t("regionModel.tiao") }}
                </span>
            </el-col>
            <el-col :span="12" class="right">
                <el-button
                    class="themeAddBtn"
                    type
                    size="small"
                    @click="addRegion"
                    icon="el-icon-circle-plus"
                    >{{ $t("dishList.addQuyu") }}</el-button
                >
            </el-col>
        </el-row>

        <el-row style="padding: 10px 50px">
            <el-col>
                <el-table
                    border
                    :data="tableData"
                    style="width: 100%"
                    v-loading="loading"
                >
                    <el-table-column
                        prop="position_name"
                        :label="$t('deskModel.quyuName')"
                    ></el-table-column>

                    <el-table-column :label="$t('operation')">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="
                                    editRow(scope.$index, tableData)
                                "
                                type="text"
                                size="small"
                                >{{ $t("update") }}</el-button
                            >
                            <el-button
                                @click.native.prevent="
                                    deleteRow(scope.row, tableData)
                                "
                                type="text"
                                size="small"
                                >{{ $t("delete") }}</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col class="center" style="margin: 20px auto">
                <el-pagination
                    class="page-pagination"
                    background
                    layout="prev, pager, next"
                    v-if="
                        currentPage.total > currentPage.size &&
                        tableData.length != 0
                    "
                    :total="currentPage.total"
                    :page-count="currentPage.size"
                    @current-change="paginationChange"
                ></el-pagination>
            </el-col>
        </el-row>
        <!-- 新建区域 修改弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="showDialog" width="25%">
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
                    label-width="120px"
                >
                    <el-form-item
                        :label="$t('deskModel.quyuName')+'：'"
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
        <el-dialog :visible.sync="delDialogVisible" width="25%">
            <p class="center fontWeight padding20 font14">
                {{$t('regionModel.delMsg')}}
            </p>
            <el-row class="center top30">
                <el-button
                    type="primary"
                    size="small"
                    class="themeBtn"
                    style="width: 100px;"
                    v-loading="dialogLoading"
                    @click="delOKUser"
                    >{{ $t("ok") }}</el-button
                >
                <el-button
                    type="primary"
                    size="small"
                    class="cancelBtn"
                    style="width: 100px"
                    @click="delDialogVisible = false"
                    >{{ $t("cancel") }}</el-button
                >
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
export default {
    components: {},
    computed: {
        curentStore() {
            this.dep_ID = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
    },
    data() {
        return {
            dep_ID: "",
            loading: false,
            showDialog: false,
            dialogTitle: "",
            editData: {},
            isEdit: false,
            page: 1,
            pageSize: 10,
            selectItem: { position_name: "" },
            dialogLoading: false,
            delDialogVisible: false,
            regionForm: {
                newregionName: "",
            },
            tableData: [],
            sumData: [], //无接口实时刷新分页
            //无接口实时刷新分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
            rules: {
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
            },
        };
    },
    methods: {
        getTableList() {
            let data = {
                dept_id: this.dep_ID,
                position_name: "",
            };
            let that = this;
            this.loading = true;
            this.request.tablePosList(data, function (res) {
                if (res.code == "1") {
                    that.loading = false;
                    if (res.data != null) {
                        that.tableData = [];
                        that.sumData= [];
                        that.sumData = res.data;
                        that.tableData = res.data;
                        that.currentPage.total = that.tableData.length;
                        that.getTableDataWithPage();
                       
                    }
                } else {
                    that.toast.error(res.msg);
                }
               
            });
        },
        //处理分页
        getTableDataWithPage() {
            let start = (this.currentPage.page - 1) * this.currentPage.size;
            let end = start + this.currentPage.size;
            this.tableData = this.sumData.slice(start, end);
        },
        paginationChange(page) {
            this.currentPage.page = page;
            this.getTableDataWithPage();
        },
        deleteRow(val) {
            this.selectItem = val;
            this.delDialogVisible = true;
        },
        delOKUser() {
            this.removeuser();
            
        },
        removeuser() {
            let _id = this.selectItem.id;
            let name = this.selectItem.position_name;
            let data = {
                id: _id,
                position_name: name,
            };
            let that = this;
            this.dialogLoading = true;
            this.request.tablePosDel(data, function (res) {
                that.dialogLoading = false;
                if (res.code == "1") {
                    that.delDialogVisible = false;
                    that.toast.success(that.$t("delSucc"));
                    for (let i in that.tableData) {
                        if (that.tableData[i].id == that.selectItem.id) {
                            that.tableData.splice(i, 1);
                        }
                    }
                    that.getTableList();
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        editRow(index, rows) {
            this.dialogTitle = this.$t("regionModel.add");
            this.editData = rows[index];
            this.regionForm.newregionName = rows[index].position_name;
            this.isEdit = true;
            this.showDialog = true;
        },
        addRegion() {
            this.dialogTitle = this.$t("dishList.addQuyu");
            this.editData = {};
            this.regionForm.newregionName = "";
            this.isEdit = false;
            this.showDialog = true;
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submitRegion();
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
        reloadData() {
            this.showDialog = false;
            this.getTableList();
        },

        submitRegion() {
            if (this.isEdit) {
                let _id = this.editData.id;
                let name = this.regionForm.newregionName;
                let data = {
                    id: _id,
                    position_name: name,
                };
                let that = this;
                this.request.tablePosUpdate(data, function (res) {
                    if (res.code == "1") {
                        that.toast.success(that.$t("updateSucc"));
                        that.reloadData();
                    } else {
                        that.toast.error(res.msg);
                        that.showDialog = false;
                    }
                });
            } else {
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
            }
        },
    },
    created() {
		let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            this.getTableList();
          
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                var id = oldVal.dep_ID;
                if (id && newVal.dep_ID != oldVal.dep_ID) {
                    // console.log('刷新新数据' + newVal)
                    this.currentPage.page = 1;
                    this.dep_ID = newVal.dep_ID;
                    this.getTableList();
                }
            },
        },
    },
};
</script>
<style scoped>
.mainTab {
    position: relative;
    min-height: 700px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    color: #666666;
}
.row-data-header {
    padding: 0px 20px;
}

.row-header {
    padding: 15px 20px;
}
.title-size {
    font-size: 12px;
    color: #666666;
    margin-top: 20px;
}

.title-num {
    font-size: 12px;
    color: #e9440f;
    margin-left: 3px;
    margin-right: 3px;
}

</style>