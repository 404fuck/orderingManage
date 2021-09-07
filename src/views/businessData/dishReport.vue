<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-30 19:41:06
 * @LastEditors: Please set LastEditors
 * @Description: 菜品销售报表
 * @FilePath: \sjoyOrderingManage\src\views\businessData\dishReport.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.xiaoshou") }}</div>
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
                    <div class="seachStyle left20 right20">
                        <el-select v-model="requestData.dish_classify" style="top:3px">
                            <el-option
                                v-for="(item, index) in backdishOptions"
                                :key="index"
                                :label="
                                    language == 'zh_CN'
                                        ? item.labelCn
                                        : item.labelEn
                                "
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="seachStyle" style="top:2px">
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
            <el-row :gutter="20" style="padding: 20px 30px 10px">
                <el-col style="width: 16.66%">
                    <reportCount
                        :title="$t('dishReport.salesPrice')"
                        :titleText="titleText[daySelect]"
                        :now="overviewdata.sale_amount | priceNum"
                        :befor="overviewdata.sale_amount_proportion"
                    ></reportCount>
                </el-col>
                <el-col style="width: 16.66%">
                    <reportCount
                        :title="$t('dishReport.sales')"
                        :titleText="titleText[daySelect]"
                        :now="overviewdata.sale_count"
                        :befor="overviewdata.sale_count_proportion"
                    ></reportCount>
                </el-col>
                <el-col style="width: 16.66%">
                    <reportCount
                        :title="$t('dishReport.freePrice')"
                        :titleText="titleText[daySelect]"
                        :now="overviewdata.rush_amount | priceNum"
                        :befor="overviewdata.rush_amount_proportion"
                    ></reportCount>
                </el-col>
                <el-col style="width: 16.66%">
                    <reportCount
                        :title="$t('dishReport.freeNum')"
                        :titleText="titleText[daySelect]"
                        :now="overviewdata.rush_count"
                        :befor="overviewdata.rush_count_proportion"
                    ></reportCount>
                </el-col>
                <el-col style="width: 16.66%">
                    <reportCount
                        :title="$t('dishReport.returnPrice')"
                        :titleText="titleText[daySelect]"
                        :now="overviewdata.return_amount | priceNum"
                        :befor="overviewdata.return_amount_proportion"
                    ></reportCount>
                </el-col>
                <el-col style="width: 16.66%">
                    <reportCount
                        :title="$t('dishReport.returnNum')"
                        :titleText="titleText[daySelect]"
                        :now="overviewdata.return_count"
                        :befor="overviewdata.return_count_proportion"
                    ></reportCount>
                </el-col>
            </el-row>
            <el-row style="padding: 20px 30px">
                <el-col>
                    <el-table
                        :data="tableData"
                        v-loading="tableLoading"
                        border
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="dish_name"
                            :label="$t('accountsDetail.dishName')"
                        ></el-table-column>
                        <el-table-column
                            prop="dish_second_name"
                            :label="$t('dishReport.dishCap')"
                        ></el-table-column>
                        <el-table-column
                            prop
                            :label="$t('dishReport.dishSize')"
                        >
                            <template slot-scope="scope">
                                <span>{{ scope.row.spec_name | text }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop
                            :label="$t('dishReport.dishPrice')"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.dish_price | priceNum
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop :label="$t('dishReport.sales')">
                            <template slot-scope="scope">
                                <span>{{ scope.row.dish_num | count }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop
                            :label="$t('dishReport.salesPrice')"
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
import reportCount from "../report/reportCount";
export default {
    components: {
        reportCount,
    },
    name: "dishReport",
    computed: {
        curentStore() {
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
            tableData: [], //填充表格
            sumData: [], //无接口实时刷新分页
            dep_id: "",
            requestData: {
                dep_id: "", //门店id
                dish_classify: 0, //菜品二级分类,可以不传，默认为全部 ,
                end_time: 0, //统计结束时间，格式yyyyMMdd 今日为4 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式 ,
                start_time: 0, //统计开始时间,格式yyyyMMdd 今日为4 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式 ,
                date: "",
            },
            //无接口实时刷新分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
            //菜品分类，默认全部
            backdishOptions: [],
            overviewdata: {},
            titleText: [
                this.$t("reportManage.aaa"),
                this.$t("reportManage.aaa"),
                this.$t("reportManage.bbb"),
                this.$t("reportManage.ccc"),
                this.$t("reportManage.ddd"),
            ],
        };
    },
    methods: {
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
            this.saleDish();
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
            this.saleDish();
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
        //菜品销售报表
        saleDish() {
            this.tableLoading = true;
            let that = this;
            //初始化今日
            if(this.requestData.end_time==0||this.requestData.start_time==0){
                this.joinDateValue[0] = this.moment().format("YYYY-MM-DD");
                this.joinDateValue[1] = this.joinDateValue[0];
            }
            this.requestData.dep_id = this.dep_id;
            this.request.saleDish(this.requestData, function (res) {
                if (res.code == "1") {
                    that.tableLoading = false;
                    if (res.data != null) {
                        that.tableData = [];
                        that.sumData = [];
                        that.overviewdata = {};
                        let res_data = res.data;
                        console.log(res_data);
                        for (let i in res_data.dishSaleManage) {
                            if(res_data.dishSaleManage[i]==null||res_data.dishSaleManage[i]==undefined){
                                res_data.dishSaleManage[i]= "";
                            }
                            res_data.dishSaleManage[i] = String(res_data.dishSaleManage[i]);
                        } 
                        that.overviewdata = res_data.dishSaleManage;
                        that.sumData = res_data.count_list;
                        that.tableData = res_data.count_list;
                        that.currentPage.total = that.tableData.length;
                        that.getTableDataWithPage();

                        console.log(that.tableData);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //获取菜品全部分类
        getdish() {
            let that = this;
            let data = {
                dep_id: this.dep_id,
            };
            this.request.getdish(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.backdishOptions = [];
                        let res_data = res.data;
                        // console.log(res_data);
                        for (let i in res_data) {
                            for (let j in res_data[i].childen) {
                                that.backdishOptions.push({
                                    //如果英文版为空 则用中文版的 反之
                                    labelCn:
                                        res_data[i].childen[j].type_name == ""
                                            ? res_data[i].childen[j]
                                                  .type_name_en
                                            : res_data[i].childen[j].type_name,
                                    labelEn:
                                        res_data[i].childen[j].type_name_en ==
                                        ""
                                            ? res_data[i].childen[j].type_name
                                            : res_data[i].childen[j]
                                                  .type_name_en,
                                    value: res_data[i].childen[j].id,
                                });
                            }
                        }
                        that.backdishOptions = [{ labelEn: "All",labelCn: "全部",value: 0,},...that.backdishOptions]
                        // console.log(that.backdishOptions);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //搜索
        searchClick() {
            this.currentPage.page = 1;
            this.saleDish();
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            this.saleDish();
            this.getdish();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    this.dep_id = newVal.dep_ID;
                    this.currentPage.page = 1;
                    this.saleDish();
                    this.getdish();
                }
            },
        },
    },
};
</script>

<style scoped>
</style>