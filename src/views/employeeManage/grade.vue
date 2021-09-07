<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-29 21:13:55
 * @LastEditors: Please set LastEditors
 * @Description: 职级权限
 * @FilePath: \sjoyOrderingManage\src\views\employeeManage\grade.vue
-->
<template>
    <div class="main">
        <el-row style="margin: 30px 50px 0 50px">
            <el-col class="right">
                <el-button
                    class="themeAddBtn"
                    type="warning"
                    size="small"
                    @click="addGrade"
                    icon="el-icon-circle-plus"
                    >{{ $t("grade.add") }}</el-button
                >
            </el-col>
        </el-row>
        <el-row style="margin: 20px 50px 0 50px">
            <el-col>
                <el-table
                    :data="tableData"
                    border
                    v-loading="tableLoading"
                    :max-height="598"
                >
                    <el-table-column
                        prop
                        :label="$t('employee.grade')"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.main_receipt  == 0">{{`${scope.row.class_name} ${scope.row.sys_add_auth == 1? '('+$t("default")+')':''}`}}</div>
                            <div v-if="scope.row.main_receipt == 1&&scope.row.sys_add_auth == 1">
                                <span style="color:#FD7B4D"><img src="../../static/images/star.png" /> {{scope.row.class_name}}</span>
                                ({{$t("default")}})
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop :label="$t('grade.storeRange')">
                        <template slot-scope="scope">
                            {{scope.row.cross_store == 0 ? $t('employeeManage.single'): scope.row.cross_store == "1" ? $t('employeeManage.multi') : ""}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('operation')">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="
                                    editRow(scope.$index, tableData)
                                "
                                type="text"
                                size="small"
                                >{{ $t("edit") }}</el-button
                            >
                            <el-button
                                v-if="scope.row.sys_add_auth != 1"
                                @click.native.prevent="
                                    deleteRow(scope.row)
                                "
                                type="text"
                                size="small"
                                >{{ $t("delete") }}</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <el-row class="center" style="margin: 30px auto">
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
                </el-row>
            </el-col>
        </el-row>
        <!-- 删除 -->
        <el-dialog title :visible.sync="delDialogVisible" width="20%" center>
            <p class="padding20 center fontWeight">
                {{$t('grade.confirmDelete')}}
            </p>
            <div class="top30 center">
                <el-button
                    class="themeBtn"
                    size="small"
                    style="width: 100px"
                    v-loading="dialogLoading"
                    @click="delOKUser()"
                    >{{ $t("ok") }}</el-button
                >
                <el-button
                    class="cancelBtn"
                    size="small"
                    style="width: 100px"
                    @click="delDialogVisible = false"
                    >{{ $t("cancel") }}</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    computed: {
        curentStore() {
            this.dep_ID = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        curentTab() {
            return this.$store.getters.curentTab;
        },
    },
    data() {
        return {
            dep_ID: "",
            //删除弹出框
            selectItem: { employ_name: "" },
            dialogLoading: false,
            delDialogVisible: false,
            rowCrossStore: "", //获取当前删除操作的参数值
            rowJobLevelCode: "",
            rowClassName: "",
            //表格
            tableData: [], //填充表格
            tableLoading: false,
            sumData: [], //无接口实时刷新分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
        };
    },
    methods: {
        //获取职级信息
        classGet() {
            this.tableLoading = true;
            let that = this;
            let data = {
                dep_id: this.dep_ID,
            };
            this.request.classGet(data, function (res) {
                if (res.code == "1") {
                    that.tableLoading = false;
                    that.tableData = [];
                    that.sumData = [];
                    let res_data = res.data;
                    let crossStoreList = res_data.cross_store; //跨店
                    let singleStoreList = res_data.single_store; //单店
                    //两个数组拼接，扩展运算符
                    crossStoreList.push(...singleStoreList);

                    that.sumData = crossStoreList;
                    that.tableData = crossStoreList;
                    that.currentPage.total = that.tableData.length;
                    that.getTableDataWithPage();
                    
                    // console.log(that.tableData);
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
        //添加职级
        addGrade() {
            this.$store.dispatch("setCurentTab",1);
            this.$router.push('/addGrade');
        },
        //删除
        deleteRow(row) {
            this.rowCrossStore = row.cross_store;
            this.rowJobLevelCode = row.job_level_code;
            this.rowClassName = row.class_name;
            this.delDialogVisible = true;
            // console.log(this.rowClassName,this.rowCrossStore,this.rowJobLevelCode);
        },
        //确定删除
        delOKUser() {
            this.removeuser();
        },
        //回调删除接口
        removeuser() {
            let data = {
                dep_id: this.dep_ID,
                cross_store:this.rowCrossStore,
                job_level_code: this.rowJobLevelCode,

            };
            let that = this;
            this.dialogLoading = true;
            this.request.classDel(data, function (res) {
                that.dialogLoading = false;
                if (res.code == "1") {
                    that.delDialogVisible = false;
                    that.toast.success(that.$t("delSucc"));
                    that.classGet();
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //编辑
        editRow(index, rows) {
            this.$store.dispatch("setCurentTab",1);
            let code = rows[index].job_level_code;
            // console.log(code);
            let pushPropObj = {page:this.currentPage.page};
            this.$router.push({ name: "editGrade",params:{obj2:pushPropObj},query: { job_level_code: code } });
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_ID = curentStore.dep_ID;
            let getPropOjb = this.$route.params.obj2;
            if(getPropOjb!=undefined&&getPropOjb!=null){
                this.currentPage.page = getPropOjb.page;
                // console.log(getPropOjb);
            }
            this.classGet();
        }
    },
    mounted() {},
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                let id = oldVal.dep_ID;
                if (id && newVal.dep_ID != oldVal.dep_ID) {
                    // console.log('刷新新数据' + newVal)
                    this.currentPage.page = 1;
                    this.dep_ID = newVal.dep_ID;
                    this.classGet();
                }
            },
        },
    },
};
</script>
<style scoped>
</style>
