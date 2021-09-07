<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-17 20:49:58
 * @LastEditors: Please set LastEditors
 * @Description: 退菜赠菜报表
 * @FilePath: \sjoyOrderingManage\src\views\businessData\returnGiveManage.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <div class="main-content tabStyle">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.tuicai") }}</div>
            </el-row>
            <hr />
            <HeadTitle
                :titles="headTitles"
                @onHeadTitleItemClick="onHeadTitleItemClick"
            ></HeadTitle>
            <el-row style="padding: 20px 0px 10px 30px">
                <el-col>
                    <div class="seachStyle top10">
                        <label for class="font14 fontWeight">{{
                            $t("accountsDetail.tuikuanshijian")
                        }}</label>
                        <!-- 时间选择 -->
                        <ul class="timeSelect">
                            <li
                               v-for="(item,index) in timeTitles"
                               :key="index"
                               @click="daySelectClick(index)"
                               :class="{active:daySelect==index}"
                            >{{item}}</li>
                        </ul>
                    </div>
                    <div
                        class="seachStyle top10"
                        v-show="daySelect==4"
                    >
                        <el-date-picker
                            class="left10"
                            v-model="joinDateValue"
                            type="daterange"
                            :range-separator="$t('addBranchStore.go')"
                            :start-placeholder="$t('startTime')"
                            :end-placeholder="$t('endTime')"
                            format="yyyy-MM-dd"
                            @change="datepickerPick"
                        ></el-date-picker>
                    </div>
                    <div class="seachStyle left20 right20">
                        <el-select v-model="requestData.weight_spec">
                            <el-option
                                v-for="item in weight_specOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="seachStyle right20 top10">
                        <el-select v-model="requestData.reason">
                            <el-option
                                v-for="item in whyOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="seachStyle top10">
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
                    <span style="margin-left: 40px">
                        {{
                            selectTab == 0
                                ? $t("returnGiveManage.returnDishCount_")
                                : $t("returnGiveManage.giveDishCount_")
                        }}
                        <span>{{ sumNum | count }}</span>
                    </span>
                    <span style="margin-left: 40px">
                        {{
                            selectTab == 0
                                ? $t("returnGiveManage.returnDish_")
                                : $t("returnGiveManage.giveDish_")
                        }}
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
                            prop="dish_name"
                            :label="$t('accountsDetail.dishName')"
                        ></el-table-column>
                        <el-table-column
                            prop="first_name"
                            :label="$t('dishReport.dishCap')"
                        ></el-table-column>
                        <el-table-column
                            prop="dish_size"
                            :label="$t('dishReport.dishSize')"
                        ></el-table-column>
                        <el-table-column
                            prop="dish_num"
                            :label="
                                selectTab == 0
                                    ? $t('returnGiveManage.returnCount')
                                    : $t('returnGiveManage.giveDishCount')
                            "
                        ></el-table-column>
                        <el-table-column
                            prop
                            :label="
                                selectTab == 0
                                    ? $t('returnGiveManage.returnPrice')
                                    : $t('returnGiveManage.givePrice')
                            "
                        >
                            <template slot-scope="scope">
                                <span v-format="'##0.00'">{{
                                    scope.row.dish_count
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="reason"
                            :label="
                                selectTab == 0
                                    ? $t('returnGiveManage.returnWhy')
                                    : $t('returnGiveManage.giveWhy')
                            "
                        ></el-table-column>
                        <el-table-column
                            prop="service_name"
                            :label="$t('refoundDetail.people')"
                        ></el-table-column>
                        <el-table-column
                            prop="cur_time"
                            :label="$t('returnGiveManage.editTime')"
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
import HeadTitle from "../components/HeadTitle";

export default {
    components: {
        HeadTitle,
    },
    data() {
        return {
            
            selectTab: 0,
            headTitles: [
                { id: 0, value: this.$t("returnGiveManage.returnDes") },
                { id: 1, value: this.$t("returnGiveManage.giveDes") },
            ],
            //时间筛选
            timeTitles:[this.$t('today'),this.$t('yesterday'),this.$t('week'),this.$t('month'),this.$t('diy')],
            daySelect: 0,
            //表格
            tableData: [],
            dep_id: "",
            sumNum: 0, //数量
            sumAmount: 0, //金额
            tableLoading: false,
            joinDateValue: "",

            requestData: {
                company_id: "",
                dep_id: "", // 门店id ,
                pageNum: 0, // 当前分页 ,
                pageSize: 10, // 分页数量 ,
                reason: "", // 退、退菜或者赠菜的原因,
                refund_reason: "", // 退款原因 ,
                return_give: 2, // 是退菜还是赠菜 2是退菜，3是赠菜,
                start_time: "", // 统计开始时间, 格式yyyyMMdd 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式,
                end_time: "", // 统计结束时间，格式yyyyMMdd 昨日为0，本周为0，本月为0，自定义就是yyyyMMdd格式,
                weight_spec: -1, // 菜品是称重菜还是规格菜, 0: 普通菜，1：称重菜，2：规格菜, 3：套餐
            },
            //分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
            // 菜品规格
            weight_specOptions: [
                {
                    value: -1,
                    label: this.$t("all"),
                },
                {
                    value: 0,
                    label: this.$t("returnGiveManage.commonDish"),
                },
                {
                    value: 1,
                    label: this.$t("returnGiveManage.weightDish"),
                },
                {
                    value: 2,
                    label: this.$t("returnGiveManage.sizeDish"),
                },
                {
                    value: 3,
                    label: this.$t("returnGiveManage.setMeal"),
                },
            ],
            //退菜赠菜原因
            whyOptions: [],
            returndishOptions: [
                { label: this.$t("returnGiveManage.allWhy"), value: "" },
            ], //退菜 默认全部
            givedishOptions: [
                { label: this.$t("returnGiveManage.allWhy"), value: "" },
            ], //赠菜  默认全部
        };
    },
    computed: {
        curentStore() {
            //console.log('curentStore')
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
    },
    methods: {
        // 今日
        getToday() {
            this.requestData.start_time = this.moment(
                this.moment().startOf("day").valueOf()
            ).format("YYYY-MM-DD");
            this.requestData.end_time = this.moment(
                this.moment().valueOf()
            ).format("YYYY-MM-DD");
        },
        // 获取昨日的开始结束时间
        getYesterday() {
            this.requestData.start_time = this.moment(
                this.moment().add(-1, "days").startOf("day").valueOf()
            ).format("YYYY-MM-DD");
            this.requestData.end_time = this.moment(
                this.moment().add(-1, "days").endOf("day").valueOf()
            ).format("YYYY-MM-DD");
        },
        // 获取当前周的开始结束时间
        getCurrWeekDays() {
            this.requestData.start_time = this.moment(
                this.moment()
                    .week(this.moment().week())
                    .startOf("week")
                    .add(1, "days")
                    .valueOf()
            ).format("YYYY-MM-DD");
            this.requestData.end_time = this.moment(
                this.moment()
                    .week(this.moment().week())
                    .endOf("week")
                    .add(1, "days")
                    .valueOf()
            ).format("YYYY-MM-DD");
        },
        // 获取当前月的开始结束时间
        getCurrMonthDays() {
            this.requestData.start_time = this.moment(
                this.moment()
                    .month(this.moment().month())
                    .startOf("month")
                    .valueOf()
            ).format("YYYY-MM-DD");
            this.requestData.end_time = this.moment(
                this.moment()
                    .month(this.moment().month())
                    .endOf("month")
                    .valueOf()
            ).format("YYYY-MM-DD");
        },
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
                this.joinDateValue = "";
            } else {
                this.requestData.start_time = m1.format("YYYY-MM-DD");
                this.requestData.end_time = m2.format("YYYY-MM-DD");
            }
            this.currentPage.page = 1;
            this.regive();
        },
        daySelectClick(val) {
            this.daySelect = val;
            if (val == 4) {
                return false;
            }
            switch (this.daySelect) {
                case 0:
                    this.getToday();
                    break;
                case 1:
                    this.getYesterday();
                    break;
                case 2:
                    this.getCurrWeekDays();
                    break;
                case 3:
                    this.getCurrMonthDays();
                    break;
                default:
                    this.getToday();
                    break;
            }
            this.currentPage.page = 1;
            this.regive();
        },
        onHeadTitleItemClick(index) {
            this.selectTab = index;
            if (this.selectTab == 0) {
                this.whyOptions = this.returndishOptions; //退菜
                this.requestData.return_give = 2;
            } else {
                this.whyOptions = this.givedishOptions; //赠菜
                this.requestData.return_give = 3;
            }
            this.requestData.reason = "";
            this.currentPage.page = 1;
            this.regive();
        },
        paginationChange(page) {
            this.currentPage.page = page;
            this.regive();
        },
        //退赠菜报表
        regive() {
            this.tableLoading = true;
            let that = this;
            //初始化今日
            if(this.requestData.end_time==""||this.requestData.start_time==""){
                this.getToday();
            }
            this.requestData.dep_id = this.dep_id;
            this.requestData.pageNum = this.currentPage.page - 1;
            this.requestData.pageSize = this.currentPage.size;

            this.request.regive(this.requestData, function (res) {
                that.tableLoading = false;
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;

                        that.sumNum = res_data.sumNum;
                        that.sumAmount = res_data.sumAmount;
                        that.currentPage.total = res_data.pages.total;
                        that.tableData = res_data.pages.list;
                        // console.log(that.currentPage.total);
                        // console.log(that.tableData);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //退赠菜
        getDishSet() {
            let that = this;
            let data = { dept_id: this.dep_id };
            this.request.selectDishSet(data, function (res) {
                if (res.code == "1") {
                    if (res.data == null) {
                        return false;
                    }
                    let res_data = JSON.parse(res.data.deal_item);
                    // console.log(res_data);
                    //退菜原因
                    let returndishList = res_data.returndish.list;
                    for (let i in returndishList) {
                        that.returndishOptions.push({
                            value: returndishList[i].content,
                            label: returndishList[i].content,
                        });
                    }

                    //赠菜原因
                    let givedishList = res_data.givedish.list;
                    for (let i in givedishList) {
                        that.givedishOptions.push({
                            value: givedishList[i].content,
                            label: givedishList[i].content,
                        });
                    }
                    // console.log(that.returndishOptions);
                    // console.log(that.givedishOptions);
                    that.whyOptions = that.returndishOptions; //初始化 退菜原因
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //搜索
        searchClick() {
            this.currentPage.page = 1;
            this.regive();
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            this.regive();
            this.getDishSet();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    this.dep_id = newVal.dep_ID;
                    this.currentPage.page = 1;
                    this.regive();
                    this.getDishSet();
                }
            },
        },
    },
};
</script>
<style scoped>
</style>