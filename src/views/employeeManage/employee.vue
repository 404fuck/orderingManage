<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-29 21:15:55
 * @LastEditors: Please set LastEditors
 * @Description: 员工管理
 * @FilePath: \sjoyOrderingManage\src\views\employeeManage\employee.vue
-->
<template>
    <div class="main">
        <el-row
            class="row-header top10"
            style="padding: 10px 50px 0 50px"
        >
            <el-col :span="18">
                <span class="dis-block">
                    {{ $t("employee.name") }}
                    <el-input
                        class="store-select"
                        v-model="inputSearch"
                        :placeholder="$t('employee.inputName')"
                        size="small"
                        style="width: 200px"
                    ></el-input>
                </span>
                <span class="dis-block">
                    {{ $t("employee.grade_") }}
                    <el-select
                        class="store-select"
                        v-model="rankModel"
                        size="small"
                        style="width: 200px"
                    >
                        <el-option
                            v-for="(item,index) in rankList"
                            :key="index"
                            :label="`${item.class_name} ${item.cross_store==0?'('+$t('employeeManage.single')+')':item.cross_store==1?'('+$t('employeeManage.multi')+')':''}`"
                            :value="item.job_level_code"
                        ></el-option>
                    </el-select>
                </span>
                <span class="dis-block">
                    {{$t('grade.storeRange')+"："}}
                    <el-select
                        class="store-select"
                        v-model="storeScopeModel"
                        size="small"
                        style="width: 200px"
                    >
                        <el-option
                            v-for="(item, index) in storeScopeList"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </span>
                <el-button
                    class="themeBtn"
                    type="primary"
                    size="small"
                    @click="search"
                    >{{ $t("employee.screen") }}</el-button
                >
            </el-col>
            <el-col :span="6" class="right">
                <el-button
                    class="themeAddBtn"
                    type="warning"
                    size="small"
                    @click="addEmployee"
                    icon="el-icon-circle-plus"
                    >{{ $t("addEmployee.add") }}</el-button
                >
            </el-col>
        </el-row>
        <el-row style="padding: 20px 50px">
            <el-col>
                <el-table
                    :data="tableData"
                    border
                    :max-height="598"
                    v-loading="tableLoading"
                >
                    <el-table-column
                        prop="employ_name"
                        :label="$t('employee.yuangongName')"
                    ></el-table-column>
                    <el-table-column
                        prop
                        :label="$t('employee.grade')"
                    >
                        <template slot-scope="scope"> 
                            {{`${scope.row.class_name} ${scope.row.cross_store==0?'('+$t('employeeManage.single')+')':scope.row.cross_store=="1"?'('+$t('employeeManage.multi')+')':''}`}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="mobile_inf"
                        :label="$t('employee.phone')"
                    ></el-table-column>
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
                {{$t("employee.confirmDelete")}}
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
    components: {},
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
            inputSearch: "",
            //删除弹出框
            selectItem: { employ_name: "" },
            dialogLoading: false,
            delDialogVisible: false,
            //职级选择
            rankModel: "",
            rankList: [{class_name: this.$t("employee.allGrade"),job_level_code: '',cross_store:null}],
            //门店范围选择
            storeScopeModel: null,
            storeScopeList: [
                { label: this.$t('all'), value: null },
                { label: this.$t('employee.selectSingle'), value: 0 },
                { label: this.$t('employee.selectMulti'), value: 1 },
            ],
            //表格
            requestData: {
                dept_id: "",
                employ_name: "",
                class_id:"",
                cross_store:null,
            },
            tableLoading: false,
            tableData: [], //填充表格
            sumData: [], //无接口实时刷新分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
        };
    },
    methods: {
        //筛选
        search() {
            this.currentPage.page = 1;
            this.getAppworkInfo();
        },
        //添加员工
        addEmployee() {
            this.$store.dispatch("setCurentTab",0);
            this.$router.push('/addEmployee');
        },

        //获取职级列表
        getGradeList() {
            let data = {
                dep_id: this.dep_ID,
            };
            let that = this;
            this.request.classList(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;
                        // console.log(res_data);
                        for (let i in res_data) {
                            that.rankList.push(res_data[i]);
                        }
                        // console.log(that.rankList);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

        //获取员工列表table
        getAppworkInfo() {
            this.tableLoading = true;
            let that = this;
            this.requestData.dept_id = this.dep_ID;
            this.requestData.employ_name = this.inputSearch;
            this.requestData.class_id = this.rankModel;
            this.requestData.cross_store = this.storeScopeModel;
            this.request.appworkInfo(this.requestData, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.tableLoading = false;
                        let res_data = res.data;
                        let newList = [];
                        that.tableData = [];
                        that.sumData = [];
                        let crossStoreList = res_data.cross_store; //跨店
                        let singleStoreList = res_data.single_store; //单店
                        for (let i in crossStoreList) {
                            for (let j in crossStoreList[i].employee) {
                                newList.push(crossStoreList[i].employee[j]);
                            }
                        }
                        for (let i in singleStoreList) {
                            for (let j in singleStoreList[i].employee) {
                                newList.push(singleStoreList[i].employee[j]);
                            }
                        }
                        that.tableData = newList;
                        that.currentPage.total = that.tableData.length;
                        // console.log(that.currentPage.total);
                        that.sumData = that.stringutils.simpleCopy(that.tableData);
                        that.getTableDataWithPage();
                    }
                } else {
                    that.toast.error(res.msg);
                }
                that.loading = false;
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
        //删除
        deleteRow(val) {
            this.selectItem = val;
            this.delDialogVisible = true;
        },
        //确定删除
        delOKUser() {
            this.removeuser();
        },
        //编辑
        editRow(index, rows) {
            this.$store.dispatch("setCurentTab",0);
            //动态路由传递一个对象
            // console.log(rows[index]);
            let pushPropObj = {page:this.currentPage.page,resData:this.requestData,ruleForm:rows[index]};
            this.$router.push({name:'editEmployee',params:{obj1:pushPropObj}});
        },
        //回调删除接口
        removeuser() {
            let data = {
                id: this.selectItem.id,
                dep_id: this.dep_ID,
            };
            let that = this;
            this.dialogLoading = true;
            this.request.workerDel(data, function (res) {
                that.dialogLoading = false;
                if (res.code == "1") {
                    that.delDialogVisible = false;
                    that.toast.success(that.$t("delSucc"));
                    for (let i in that.tableData) {
                        if (that.tableData[i].id == that.selectItem.id) {
                            that.tableData.splice(i, 1);
                            that.sumData.splice(i, 1);
                        }
                    }
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
            this.dep_ID = curentStore.dep_ID;
            let getPropOjb = this.$route.params.obj1;
            if(getPropOjb!=undefined&&getPropOjb!=null){
                this.inputSearch = getPropOjb.resData.employ_name;
                this.rankModel = getPropOjb.resData.class_id;
                this.storeScopeModel = getPropOjb.resData.cross_store;
                this.currentPage.page = getPropOjb.page;
            }
            this.getGradeList();
            this.getAppworkInfo();
            
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
                    this.getGradeList();
                    this.getAppworkInfo();
                }
            },
        },
    },
};
</script>
<style>
.dis-block{
    display: inline-block;
    margin-top: 10px;
    font-size: 14px;
}
.store-select{
    margin-right: 20px;
}
</style>