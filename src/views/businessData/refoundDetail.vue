<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-30 19:29:46
 * @LastEditors: Please set LastEditors
 * @Description: 退款明细
 * @FilePath: \sjoyOrderingManage\src\views\businessData\refoundDetail.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">
                    {{ $t("sidebar.tuikuan") }}
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
                    <div class="seachStyle right20 left20" style="top:2px">
                        <label for class="font14 fontWeight">{{
                            $t("refoundDetail.tuikuanWhy")+'：'
                        }}</label>
                        <el-select
                            class="left10"
                            v-model="requestData.refund_reason"
                            :placeholder="$t('accountsDetail.returnWhyPH')"
                        >
                            <el-option
                                v-for="(item, index) in backdishOptions"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="seachStyle" style="top:1px">
                        <el-button class="themeBtn" @click="searchClick">{{
                            $t("select")
                        }}</el-button>
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
                        {{$t('refoundDetail.refoundNum')+'：'}}
                        <span>{{ sumNum|count }}</span>
                    </span>
                    <span class="left40">
                        {{$t('refoundDetail.refoundAtm')+'：'}}
                        <span>{{ sumAmount|priceNum }}</span>
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
                            prop="order_id"
                            :label="$t('orderDetail.orderNum')"
                            width="210"
                        ></el-table-column>
                        <el-table-column
                            prop
                            :label="$t('refoundDetail.dishType')"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.take_out == 0
                                        ? $t("dishReport.tangshi")
                                        : $t("dishReport.waidai")
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop
                            :label="$t('refoundDetail.tableInfo')"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.table_name|text
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop
                            :label="$t('refoundDetail.tuikuan')"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.refund_amount|priceNum
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="settle_time"
                            :label="$t('refoundDetail.tuikuanTime')"
                        ></el-table-column>
                        <el-table-column
                            prop="settle_reason"
                            :label="$t('refoundDetail.tuikuanWhy')"
                        ></el-table-column>
                        <el-table-column
                            prop="service_name"
                            :label="$t('refoundDetail.people')"
                        ></el-table-column>
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
    name: "refounddetail",
    computed: {
        curentStore() {
            //console.log('curentStore')
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        language(){
            return this.$store.getters.language;
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
            sumNum: 0, //退款数量
            sumAmount: 0, //退款金额
            requestData: {
                dep_id: "", //门店id
                end_time: 0, //统计结束时间，格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                start_time: 0, //统计开始时间,格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                date: "",
                dish_classify: 0,
                refund_reason: 0, //退款原因id
                pageNum: 0,
                pageSize: 10,
            },
            //分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
            //退款原因，默认全部
            backdishOptions: [],
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
            this.daySelect = -1;
            this.currentPage.page = 1;
            this.refund();
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
            this.refund();
        },
            

        paginationChange(page) {
            this.currentPage.page = page;
            this.refund();
        },
        //退款报表
        refund() {
            this.tableLoading = true;
            let that = this;
            //初始化今日
            if(this.requestData.end_time==0||this.requestData.start_time==0){
                this.joinDateValue[0] = this.moment().format("YYYY-MM-DD");
                this.joinDateValue[1] = this.joinDateValue[0];
            }
            this.requestData.dep_id = this.dep_id;
            this.requestData.pageNum = this.currentPage.page - 1;
            this.requestData.pageSize = this.currentPage.size;
            this.request.pagerefund(this.requestData, function (res) {
                if (res.code == "1") {
                    that.tableLoading = false;
                    if (res.data != null) {
                        that.tableData = [];
                        that.sumNum = 0;
                        that.sumAmount = 0;
                        let res_data = res.data;
                        // console.log(res_data);
                        that.sumNum = res_data.refund_number; //退款数量
                        that.sumAmount = res_data.refund_amounts; //退款金额
                        that.currentPage.total = res_data.list.total;
                        that.tableData = res_data.list.list;
                        // console.log(that.currentPage.total);
                        // console.log(that.tableData);`
                    }
                    
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //退款原因
        getDishSet() {
            let that = this;
            let data = { dept_id: this.dep_id };
            this.request.selectDishSet(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.backdishOptions=[];
                        let res_data = JSON.parse(res.data.deal_item);
                        let backdish = res_data.backdish;
                        for (let i in backdish.list) {
                            that.backdishOptions.push({
                                label: backdish.list[i].content,
                                value: backdish.list[i].id,
                            });
                        }
                        that.backdishOptions = [{label: that.$t("all"), value: 0 },...that.backdishOptions]
                        // that.backdishOptions.splice(0,0,{label: that.$t("all"), value: 0 })
                        console.log(that.backdishOptions);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //搜索
        searchClick() {
            this.currentPage.page = 1;
            this.refund();
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            this.refund();
            this.getDishSet();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    this.dep_id = newVal.dep_ID;
                    this.currentPage.page = 1;
                    this.refund();
                    this.getDishSet();
                }
            },
        },
    },
};
</script>

<style scoped>

</style>