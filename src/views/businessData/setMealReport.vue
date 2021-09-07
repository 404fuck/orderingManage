<!--
 * @Author: zzt
 * @Date: 2020-12-14 15:41:40
 * @LastEditTime: 2021-03-30 19:41:58
 * @LastEditors: Please set LastEditors
 * @Description: 套餐销售报表
 * @FilePath: \sjoyOrderingManage\src\views\businessData\setMealReport.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">
                    {{ $t("sidebar.taocan") }}
                </div>
            </el-row>
            <hr />
            <el-row style="padding: 10px 0px 10px 30px">
                <el-col>
                    <div class="seachStyle top10">
                        <label for class="font14 fontWeight">{{
                            $t("accountsDetail.tuikuanshijian")+'：'
                        }}</label>
                        <el-date-picker
                            v-model="joinDateValue"
                            class="left10"
                            type="daterange"
                            :range-separator="$t('addBranchStore.go')"
                            :start-placeholder="$t('startTime')"
                            :end-placeholder="$t('endTime')"
                            format="yyyy-MM-dd"
                            @change="datepickerPick"
                            style="width: 320px;position:relative;top:2px"
                        ></el-date-picker>
                        <el-button-group class="left10 timeSelect">
                            <el-button
                                v-for="(item, index) in timeTitles"
                                :key="index"
                                @click="daySelectClick(index)"
                                :class="{ active: daySelect == index }"
                            >
                                {{ item }}
                            </el-button>
                        </el-button-group>
                    </div>
                    <div class="seachStyle left20" style="top:2px">
                        <el-button
                            class="themeImportBtn report-download"
                            >{{ $t("dishReport.download") }}</el-button
                        >
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="padding: 20px 30px" class="font14 fontWeight">
                    <span>{{ $t("total") }}</span>
                    <span class="left40">
                        {{ $t("setMealReport.saleNum") }}：
                        <span>{{ sumNum | count }}</span>
                    </span>
                    <span class="left40">
                        {{ $t("setMealReport.salePrice") }}：
                        <span>{{ sumAmount | priceNum }}</span>
                    </span>
                </el-col>
                <el-col style="padding: 10px 30px 20px 30px">
                    <el-table
                        :data="tableData"
                        border
                        v-loading="tableLoading"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="dish_name"
                            :label="$t('setMealReport.dishName')"
                        ></el-table-column>
                        <el-table-column
                            prop
                            :label="$t('setMealReport.dishPrice')"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.dish_price | priceNum
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="dish_num"
                            :label="$t('setMealReport.dishNum')"
                        ></el-table-column>
                        <el-table-column
                            prop
                            :label="$t('setMealReport.dishCount')"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.dish_count | priceNum
                                }}</span>
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
                        :page-size="currentPage.size"
                        :current-page="currentPage.page"
                        @current-change="paginationChange"
                    ></el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "setMealReport",
    computed: {
        curentStore() {
            //console.log('curentStore')
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
        },
    },
    data() {
        return {
            //时间筛选
            timeTitles: [
                this.$t("today"),
                this.$t("yesterday"),
                this.$t("week"),
                this.$t("month"),
            ],
            daySelect: 0,
            joinDateValue: [],
            //表格
            tableLoading: false,
            dep_id: "",
            tableData: [], //填充表格
            sumData: [], //无接口实时刷新分页
            sumNum: 0, //退款数量
            sumAmount: 0, //退款金额
            requestData: {
                date: "",
                dep_id: "",
                dish_classify: 0,
                end_time: 0,
                start_time: 0,
            },
            //无接口实时刷新分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
        };
    },

    methods: {
        // 自定义
        datepickerPick() {
            //获取当前时间
            let m1 = this.moment(this.joinDateValue[0]);
            //获取需要对比的时间
            let m2 = this.moment(this.joinDateValue[1]);
            //计算相差多少天 day可以是second minute
            let day = m2.diff(m1, "day");
            if (day > 31) {
                this.toast.info(this.$t("max31"));
                this.joinDateValue = [];
            } else {
                this.requestData.start_time = m1.format("YYYYMMDD");
                this.requestData.end_time = m2.format("YYYYMMDD");
            }
            this.currentPage.page = 1;
            this.setmeal();
        },
        daySelectClick(val) {
            this.joinDateValue = [];
            this.daySelect = val;
            if (val == 0) {
                this.joinDateValue[0] = this.moment().format("YYYY-MM-DD");
                this.joinDateValue[1] = this.joinDateValue[0];
            } else if (val == 1) {
                this.joinDateValue[0] = this.moment(this.moment().add(-1, "days").startOf("day").valueOf()).format("YYYY-MM-DD");
                this.joinDateValue[1] = this.joinDateValue[0];
            } else if (val == 2) {
                this.joinDateValue[0] = this.moment(
                    this.moment()
                        .week(this.moment().week())
                        .startOf("week")
                        .add(1, "days")
                        .valueOf()
                ).format("YYYY-MM-DD");
                this.joinDateValue[1] = this.moment(
                    this.moment()
                        .week(this.moment().week())
                        .endOf("week")
                        .add(1, "days")
                        .valueOf()
                ).format("YYYY-MM-DD");
            } else if (val == 3) {
                this.joinDateValue[0] = this.moment(
                    this.moment()
                        .month(this.moment().month())
                        .startOf("month")
                        .valueOf()
                ).format("YYYY-MM-DD");
                this.joinDateValue[1] = this.moment(
                    this.moment()
                        .month(this.moment().month())
                        .endOf("month")
                        .valueOf()
                ).format("YYYY-MM-DD");
            }
            this.requestData.start_time = val;
            this.requestData.end_time = val;
            this.currentPage.page = 1;
            this.setmeal();
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
        //套餐销售报表
        setmeal() {
            this.tableLoading = true;
            let that = this;
            //初始化今日
            if(this.requestData.end_time==0||this.requestData.start_time==0){
                this.joinDateValue[0] = this.moment().format("YYYY-MM-DD");
                this.joinDateValue[1] = this.joinDateValue[0];
            }
            this.requestData.dep_id = this.dep_id;
            this.request.setmeal(this.requestData, function (res) {
                if (res.code == "1") {
                    that.tableLoading = false;
                    if (res.data != null) {
                        that.tableData = [];
                        that.sumData = [];
                        that.sumNum = 0;
                        that.sumAmount = 0;
                        let res_data = res.data;
                        // console.log(res_data);
                        res_data.list.forEach((item) => {
                            that.sumNum += item.dish_num;
                            that.sumAmount += item.dish_count;
                        });

                        that.currentPage.total = res_data.list.length;
                        that.tableData = res_data.list;
                        that.sumData = res_data.list;
                        that.getTableDataWithPage();
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
            this.dep_id = curentStore.dep_ID;
            this.setmeal();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    this.dep_id = newVal.dep_ID;
                    this.currentPage.page = 1;
                    this.setmeal();
                }
            },
        },
    },
};
</script>

<style scoped>
</style>