<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-27 18:40:31
 * @LastEditors: Please set LastEditors
 * @Description: 桌台管理
 * @FilePath: \sjoyOrderingManage\src\views\storeManage\deskModel.vue
-->
<template>
    <div>
        <el-row class="row-header top10 no-gutter" style="padding: 20px 50px">
            <el-col :span="17">
                <span class="select-region">
                    {{ $t("deskModel.quyu_") }}
                    <el-select
                        class="store-select"
                        v-model="selectRegionId"
                        :placeholder="$t('deskModel.quyu')"
                        size="small"
                        @change="selectOne"
                        value-key="id"
                        style="width: 300px"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.position_name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </span>
                <el-button
                    class="btn-color-blue btn themeBtn"
                    type="primary"
                    size="small"
                    @click="search"
                    >{{ $t("search") }}</el-button
                >
                <span class="title-size" style="margin-left: 10px">
                    {{ $t("operatingDiary.sum") }}
                    <span class="title-num">{{ all_count }}</span>
                    {{ $t("deskModel.table") }}
                </span>
            </el-col>
            <el-col :span="7" class="right">
                <el-button
                    class="themeAddBtn"
                    type="warning"
                    size="small"
                    @click="newTable"
                    icon="el-icon-circle-plus"
                    >{{ $t("deskModel.addTable") }}</el-button
                >
            </el-col>
        </el-row>

        <el-row style="padding: 10px 50px">
            <div class="table">
                <el-table
                    border
                    :data="tableData"
                    style="width: 100%"
                    v-loading="loading"
                >
                    <el-table-column
                        fixed
                        prop="tb_name"
                        :label="$t('deskModel.tableName')"
                    ></el-table-column>
                    <el-table-column
                        prop="seat_number"
                        :label="$t('deskModel.tableNum')"
                    ></el-table-column>
                    <el-table-column
                        prop="position_name"
                        :label="$t('deskModel.tableInQuyu')"
                    ></el-table-column>
                    <el-table-column :label="$t('operation')">
                        <template slot-scope="scope">
                            <div v-show="scope.row.tb_name != 'XUNI_table'">
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
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row class="center top20">
                    <el-pagination
                        class="page-pagination"
                        background
                        layout="prev, pager, next"
                        v-if="
                            all_count > pageSize &&
                            tableData.length != 0
                        "
                        :total="all_count"
                        :page-size="pageSize"
                        :current-page="page"
                        @current-change="paginationChange"
                    ></el-pagination>
                </el-row>
            </div>
        </el-row>
        <el-dialog :visible.sync="delDialogVisible" width="25%">
            <p class="center fontWeight padding20 font14">
                {{
                    $t("deskModel.confirmDelete") +
                    selectItem.tb_name +
                    $t("deskModel.tables")
                }}
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
            //console.log('curentStore')
            this.dep_ID = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
    },
    data() {
        return {
            dep_ID: "",
            loading: false,
            all_count: 0,
			page: 1,
            pageSize: 10,
            selectRegionId: -1,
            showDialog: false,
            selectItem: { tb_name: "" },
            dialogLoading: false,
            delDialogVisible: false,
            options: [{position_name: this.$t("deskModel.tableInQuyu"),id: -1,}],
            tableData: [],
        };
    },
    methods: {
        selectOne(item) {
            //change 触发事件
            //直接就拿到当前的这个对象了
            if (item != null) {
                this.selectRegionId = item;
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
                        that.options = [...that.options,...res.data];
                        console.log(that.options);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

        getTableList() {
            let data = {
                dept_id: this.dep_ID,
                position_id: this.selectRegionId,
                pageNo: this.page,
                pageSize: this.pageSize,
            };
            let that = this;
            this.loading = true;
            this.request.tableList(data, function (res) {
                if (res.code == "1") {
                    that.loading = false;
                    if (res.data != null) {
                        that.tableData = res.data.data;
                        that.all_count = res.data.all_count;
                    }
                } else {
                    that.toast.error(res.msg);
                }
               
            });
        },
        paginationChange(page) {
            this.page = page;
            this.getTableList();
        },
        search() {
            this.page = 1;
            this.getTableList();
        },
        newTable() {
            this.$router.push({
                path: "/newDesk",
            });
        },
        deleteRow(val) {
            this.selectItem = val;
            this.delDialogVisible = true;
        },
        delOKUser() {
            this.removeuser();
        },
        removeuser() {
            let _id = this.selectItem.tb_id;
            let data = {
                dept_id: this.dep_ID,
                dep_id: this.dep_ID,
                tb_id: _id,
            };
            let that = this;
            this.dialogLoading = true;
            this.request.tableDel(data, function (res) {
                that.dialogLoading = false;
                if (res.code == "1") {
                    that.delDialogVisible = false;
                    that.toast.success(that.$t("delSucc"));
                    for (let i in that.tableData) {
                        if (that.tableData[i].tb_id == that.selectItem.tb_id) {
                            that.tableData.splice(i, 1);
                        }
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        editRow(index, rows) {
            let resData = {
                page: this.page,
                pageSize: this.pageSize,
                selectRegionId:this.selectRegionId,
            };
            let _id = rows[index].tb_id;
            this.$router.push({ name: "editDesk", params: { obj: resData}, query: { tb_id: _id } });
        },
        submitForm(formName) {
            var result = false;
            this.$refs[formName].validate((valid) => {
                result = valid;
                return result;
            });

            return result;
        },
        submit() {
            this.request.storeCertifyInfo(this.infoModel, function (res) {
                if (res.code == "1") {
                    this.toast.success(this.$t("deskModel.addSucc"));
                    this.$router.back(-1);
                } else {
                    this.toast.error(res.msg);
                }
            });
        },

        handleChangeAddress(value) {
            this.toast.info(value);
        },
    },
    created() {
		let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
           this.getRegionList();
            let getPropOjb = this.$route.params.obj;
            if(getPropOjb!=undefined&&getPropOjb!=null){
                this.page = getPropOjb.page;
                this.pageSize = getPropOjb.pageSize;
                this. selectRegionId = getPropOjb.selectRegionId;
               
               
               
                console.log(getPropOjb);
                
            }
            this.getTableList();
            
          
        }
    },
    mounted() {},
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                var id = oldVal.dep_ID;
                if (id && newVal.dep_ID != oldVal.dep_ID) {
                    // console.log('刷新新数据' + newVal)
                    this.dep_ID = newVal.dep_ID;
                    this.getTableList();
                    this.getRegionList();
                }
            },
        },
    },
};
</script>
<style>
.mainTab {
    position: relative;
    min-height: 700px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    color: #666666;
}
.row-header {
    padding: 15px 20px;
}

.select-region {
    color: #232426;
    font-size: 14px;
    float: left;
    text-align: center;
}

.store-select {
    width: 120px;
    color: #8e8d8d;
}

.btn {
    margin-left: 10px;
}

/* 表头样式 */
.cell {
    text-align: center;
    color: #404c4e;
    font-size: 13px;
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

.dialog-img {
    width: 200px;
    height: 200px;
}

.check {
    margin-top: 15px;
    margin-left: 20px;
}

.form {
    margin-top: 15px;
    margin-right: 20px;
}

.pre {
    margin-left: 150px;
}

.bottom-btn {
    float: right;
}

.bottom-control {
    padding: 15px 20px;
}

.address-select {
    width: 150px;
}

.address-margin {
    margin-right: 14px;
}

.num-text-form {
    font-size: 12px;
    color: #899599;
}

.num-form {
    font-size: 12px;
    color: #f5a38e;
}

.value-input {
    width: 100%;
}

.page-pagination {
    float: none;
    margin-top: 10px;
    margin-right: 50px;
}
</style>