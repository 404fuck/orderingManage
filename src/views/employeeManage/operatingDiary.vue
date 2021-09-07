<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-27 18:49:47
 * @LastEditors: Please set LastEditors
 * @Description: 操作日志
 * @FilePath: \sjoyOrderingManage\src\views\employeeManage\operatingDiary.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">操作日志</div>
            </el-row>
            <el-row class="row-header top10" style="padding: 20px 50px 10px 50px">
                <el-col>
                    <el-input
                        class="store-select-ope"
                        v-model="inputSearch"
                        :placeholder="$t('operatingDiary.show')"
                        size="small"
                        style="width: 260px"
                    ></el-input>
                    <el-button
                        class="themeBtn left20"
                        type="primary"
                        size="small"
                        @click="search"
                        >{{ $t("select") }}</el-button
                    >
                    <span class="title-size" style="margin-left: 10px"
                        >{{ $t("operatingDiary.sum")
                        }}<span class="title-num">{{ num }}</span
                        >{{ $t("operatingDiary.tag") }}</span
                    >
                </el-col>
            </el-row>

            <el-row style="padding: 10px 50px">
                <el-col>
                    <div class="table">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column
                                prop="name"
                                :label="$t('operatingDiary.name')"
                            ></el-table-column>
                            <el-table-column
                                prop="module"
                                :label="$t('operatingDiary.mokuai')"
                            ></el-table-column>
                            <el-table-column
                                prop="note"
                                :label="$t('operatingDiary.shuoming')"
                            ></el-table-column>
                            <el-table-column
                                :label="$t('returnGiveManage.editTime')"
                            >
                                <template slot-scope="scope">
                                    <span>{{ scope.row.time | moment_ss }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-row class="center" style="margin: 30px auto">
                        <el-pagination
                            class="page-pagination"
                            background
                            @current-change="paginationChange"
                            layout="prev, pager, next"
                            :total="all_pages"
                        ></el-pagination>
                    </el-row>
                </el-col>
            </el-row>
        </div>
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
            tableHeight: 580,
            all_pages: 0,
            loading: false,
            dep_ID: "",
            page: 0,
            pageSize: 10,
            tableData: [],
            inputSearch: "",
            num: 0,
        };
    },
    methods: {
        search() {
            let that = this;
            that.page = 1;
            that.getOperationList();
        },
        // 获取操作说明列表
        getOperationList() {
            let data = {
                dep_id: this.dep_ID,
                comp_id: this.comp_id,
                operation_id: this.operation_id,
                info: this.inputSearch,
                page: this.page,
                size: this.pageSize,
            };
            let that = this;
            that.loading = true;
            this.request.operationlist(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.num = res.data.total;
                        that.tableData = res.data.list;
                        that.all_pages = res.data.total;
                    }
                } else {
                    that.toast.error(res.msg);
                }
                that.loading = false;
            });
        },
        paginationChange(page) {
            let that = this;
            that.page = page;
            that.getOperationList();
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            this.getOperationList();
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
                    this.getOperationList();
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

.line {
    background-color: #eeeeee;
    height: 1px;
}

/* 表头样式 */
.cell {
    text-align: center;
    color: #404c4e;
    font-size: 13px;
}
.title-size {
    font-size: 12px;
    color: #8c939b;
    margin-top: 20px;
}

.title-num {
    font-size: 12px;
    color: #2082ed;
    margin-left: 3px;
    margin-right: 3px;
}

.page-pagination {
    float: none !important;
    margin-top: 10px;
    margin-right: 50px;
}
</style>