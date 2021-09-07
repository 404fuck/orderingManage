<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-04-01 20:29:40
 * @LastEditors: Please set LastEditors
 * @Description: 经营概览
 * @FilePath: \sjoyOrderingManage\src\views\report\reportManage.vue
-->

<template>
    <div class="main reportStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding:0 10px;overflow:hidden;">
                <el-col :span="8">
                    <div class="title-line top10">
                        {{ $t("sidebar.dandian") }}
                        <el-tooltip effect="light" placement="right">
                            <span slot="content">
                                订单金额 = 菜品原价合计 - 菜品促销金额 <br/>
                                应收金额 = （订单金额 - 结账优惠金额 ） × （1 + <br/>
                                服务税率 + 服务费率） <br/>
                                实收金额 = 应收金额 - 现金抹零 <br/>
                                净收金额 = 实收金额 - 退款 <br/>
                                服务税 = （订单金额 - 结账优惠金额 ） × 服务税率 <br/>
                                服务费 = （订单金额 - 结账优惠金额 ） × 服务费率
                            </span>
                            <img src="../../static/images/tips.png"/>
                        </el-tooltip>
                    </div>
                </el-col>
                <el-col
                    :span="16"
                >
                    <el-button-group  class="fr"
                    >
                        <el-button
                            :class="{ active: shows == 0 }"
                            @click="changeClick('0')"
                            style="width: 122px; font-weight: bold"
                            >{{ $t("today") }}</el-button
                        >
                        <el-button
                            :class="{ active: shows == 1 }"
                            @click="changeClick('1')"
                            style="width: 122px; font-weight: bold"
                            >{{ $t("yesterday") }}</el-button
                        >
                        <el-button
                            :class="{ active: shows == 2 }"
                            @click="changeClick('2')"
                            style="width: 122px; font-weight: bold"
                            >{{ $t("week") }}</el-button
                        >
                        <el-button
                            :class="{ active: shows == 3 }"
                            @click="changeClick('3')"
                            style="width: 122px; font-weight: bold"
                            >{{ $t("month") }}</el-button
                        >
                        <el-button
                            :class="{ active: shows == 4 }"
                            @click="changeClick('4')"
                            v-popover:popover5
                            style="width: 122px; font-weight: bold"
                            >{{ $t("diy") }}</el-button
                        >
                        <el-popover ref="popover5" placement="bottom">
                            <label for>{{
                                $t("addBranchStore.startTime")
                            }}</label>
                            <el-date-picker
                                v-model="joinDateValue"
                                type="daterange"
                                :range-separator="$t('addBranchStore.go')"
                                :start-placeholder="$t('startTime')"
                                :end-placeholder="$t('endTime')"
                                format="yyyy-MM-dd"
                                @change="datepickerPick"
                            ></el-date-picker>
                            <el-button
                                class="themeBtn left10"
                                @click="changeClick('5')"
                                >{{ $t("search") }}</el-button
                            >
                        </el-popover>
                    </el-button-group>
                </el-col>
            </el-row>
            <div class="top20">
                <el-row :gutter="20" style="padding:0 10px">
                    <el-col
                        :span="6"
                    >
                        <reportCount
                            :title="$t('reportManage.originalAmt')"
                            :titleText="titleText[shows]"
                            :now="overviewdata.now_dish_original_total_price | priceNum"
                            :befor="overviewdata.before_dish_original_total_price"
                        ></reportCount>
                    </el-col>
                    <el-col
                        :span="6"
                    >
                        <reportCount
                            :title="$t('reportManage.dingPrice')"
                            :titleText="titleText[shows]"
                            :now="overviewdata.should_count_now | priceNum"
                            :befor="overviewdata.shoule_count_proportion"
                        ></reportCount>
                    </el-col>
                    <el-col
                        :span="6"
                        v-if="onAccount==1"
                    >
                        <reportCount
                            :title="$t('reportManage.guazhangAmt')"
                            :titleText="titleText[shows]"
                            :now="overviewdata.now_on_account_total_price | priceNum"
                            :befor="overviewdata.before_on_account_total_price"
                        ></reportCount>
                    </el-col>
                    <el-col
                        :span="6"
                    >
                        <reportCount
                            :title="$t('reportManage.sumPrice')"
                            :titleText="titleText[shows]"
                            :now="overviewdata.real_count_now | priceNum"
                            :befor="overviewdata.real_count_proportion"
                            :tipText="$t('reportManage.reporTips1')"
                        ></reportCount>
                    </el-col>
                    <el-col
                        :span="6"
                    >
                        <reportCount
                            :title="$t('reportManage.jingshou')"
                            :titleText="titleText[shows]"
                            :now="overviewdata.net_count_now | priceNum"
                            :befor="overviewdata.net_count_proportion"
                            :tipText="$t('reportManage.reporTips2')"
                        ></reportCount>
                    </el-col>
                    <el-col
                        :span="6"
                    >
                        <reportCount
                            :title="$t('reportManage.dingCount')"
                            :titleText="titleText[shows]"
                            :now="overviewdata.order_num_now "
                            :befor="overviewdata.order_num_proportion"
                            :tipText="$t('reportManage.reporTips3')"
                        ></reportCount>
                    </el-col>
                    <el-col
                        :span="6"
                    >
                        <reportCount
                            :title="`${$t('reportManage.eatNum')}${$t(
                                'reportManage.tangshi/waidai'
                            )}`"
                            :titleText="titleText[shows]"
                            :now="overviewdata.person_num_now"
                            :befor="overviewdata.person_num_proportion"
                        ></reportCount>
                    </el-col>
                    <el-col
                        :span="6"
                        v-if="business_model != 2"
                    >
                        <reportCount
                            :title="$t('reportManage.avg')"
                            :titleText="titleText[shows]"
                            :now="overviewdata.person_price_now | priceNum"
                            :befor="overviewdata.person_price_proportion"
                        ></reportCount>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="padding: 20px 10px">
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="24" class="salesTop">
                                <el-row>
                                    <el-col :span="12" class="left">
                                        <span
                                            class="fontWeight font16"
                                            style="position: absolute; top: 3px"
                                            >{{
                                                $t("reportManage.fenxi")
                                            }}</span
                                        >
                                    </el-col>
                                    <el-col
                                        :span="12"
                                        class="right"
                                        style="float: right"
                                    >
                                        <el-button-group>
                                            <el-button
                                                :class="{
                                                    active: yinyeShows == 1,
                                                }"
                                                @click="yinyeClick(false)"
                                                >{{
                                                    $t("reportManage.anPrice")
                                                }}</el-button
                                            >
                                            <el-button
                                                :class="{
                                                    active: yinyeShows == 2,
                                                }"
                                                @click="yinyeClick(true)"
                                                >{{
                                                    $t("reportManage.anNum")
                                                }}</el-button
                                            >
                                        </el-button-group>
                                    </el-col>
                                    <el-col :span="24">
                                        <div
                                            ref="analysis_volume"
                                            style="width: 100%; height: 300px"
                                        ></div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col
                                :span="24"
                                class="salesTop top20"
                                style="height: 658px; margin-bottom: 30px"
                            >
                                <p class="font16 fontWeight salesText">
                                    {{ $t("reportManage.tpp10") }}
                                </p>
                                <el-table
                                    :data="dishrank"
                                    border
                                    style="width: 100%"
                                >
                                    <el-table-column
                                        type="index"
                                        width="100"
                                        align="center"
                                        :label="$t('reportManage.ranking')"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="dish_name"
                                        :label="$t('accountsDetail.dishName')"
                                    ></el-table-column>
                                    <el-table-column
                                        prop
                                        :label="$t('reportManage.size')"
                                    >
                                        <template slot-scope="scope">
                                            <span>{{
                                                scope.row.spec_name | text
                                            }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="dish_num"
                                        :label="
                                            $t('reportManage.xiaoshouCount')
                                        "
                                    ></el-table-column>
                                    <el-table-column
                                        prop
                                        :label="$t('reportManage.xiaoshoue')"
                                    >
                                        <template slot-scope="scope">
                                            <span>{{
                                                scope.row.dish_count | priceNum
                                            }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row>
                            <!-- 订单来源 -->
                            <el-col :span="24" class="salesTop">
                                <el-row>
                                    <el-col :span="12" class="left">
                                        <span class="fontWeight font16">{{
                                            $t("orderDetail.orderCome")
                                        }}</span>
                                    </el-col>
                                    <el-col :span="12" class="right">
                                        <el-button-group>
                                            <el-button
                                                :class="{
                                                    active: ordershows == 1,
                                                }"
                                                @click="orderSouceClick(false)"
                                                >{{
                                                    $t("reportManage.anPrice")
                                                }}</el-button
                                            >
                                            <el-button
                                                :class="{
                                                    active: ordershows == 2,
                                                }"
                                                @click="orderSouceClick(true)"
                                                >{{
                                                    $t("reportManage.anNum")
                                                }}</el-button
                                            >
                                        </el-button-group>
                                    </el-col>
                                    <el-col :span="24">
                                        <div
                                            ref="order_singular"
                                            style="width: 100%; height: 260px"
                                        ></div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <!-- 时段分析 -->
                            <el-col :span="24" class="salesTop top20">
                                <el-row>
                                    <el-col :span="12" class="left">
                                        <span class="fontWeight font16">{{
                                            $t("reportManage.shiduan")
                                        }}</span>
                                    </el-col>
                                    <el-col :span="12" class="right">
                                        <el-button-group>
                                            <el-button
                                                :class="{
                                                    active: timeshows == 1,
                                                }"
                                                @click="timeCLick(false)"
                                                >{{
                                                    $t("reportManage.anPrice")
                                                }}</el-button
                                            >
                                            <el-button
                                                :class="{
                                                    active: timeshows == 2,
                                                }"
                                                @click="timeCLick(true)"
                                                >{{
                                                    $t("reportManage.anNum")
                                                }}</el-button
                                            >
                                        </el-button-group>
                                    </el-col>
                                    <el-col :span="24">
                                        <div
                                            ref="time_singular"
                                            style="width: 100%; height: 260px"
                                        ></div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <!-- 支付分析 -->
                            <el-col :span="24" class="salesTop top20">
                                <el-row>
                                    <el-col :span="12" class="left">
                                        <span class="fontWeight font16">{{
                                            $t("reportManage.pay")
                                        }}</span>
                                    </el-col>
                                    <el-col :span="12" class="right">
                                        <el-button-group>
                                            <el-button
                                                :class="{
                                                    active: payshows == 1,
                                                }"
                                                @click="paycountClick(false)"
                                                >{{
                                                    $t("reportManage.anPrice")
                                                }}</el-button
                                            >
                                            <el-button
                                                :class="{
                                                    active: payshows == 2,
                                                }"
                                                @click="paycountClick(true)"
                                                >{{
                                                    $t("reportManage.anNum")
                                                }}</el-button
                                            >
                                        </el-button-group>
                                    </el-col>
                                    <el-col :span="24">
                                        <div
                                            ref="pay_singular"
                                            style="width: 100%; height: 260px;"
                                        ></div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-dialog  
            :visible.sync="dialogVisible" 
            width="26%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"	
        >
            <span slot="title" class="font18 fontWeight">提示</span>
            <div class="top20 font14">
                {{
                    language == "zh_CN"
                        ? "营业时间于" +
                          openUpdate.substr(0, 10) +
                          "被修改过，【时段分析】仅展示此后的数据汇总！"
                        : "The summary data in【Duration analysis】only begins from " +
                          openUpdate.substr(0, 10) +
                          " when business hour changed."
                }}
            </div>
            <div class="center top40">
                <el-button
                    class="themeBtn"
                    style="width: 100px"
                    size="small"
                    type="primary"
                    @click="dialogVisible = false"
                    >{{ $t("ok") }}</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
import echarts from "echarts";
import reportCount from "./reportCount";
export default {
    components: {
        reportCount,
    },
    name: "reportmanage",
    computed: {
        curentStore() {
            //console.log('curentStore')
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            this.company_id = this.$store.getters.curentStore.faher_ID;
            return this.$store.getters.curentStore;
        },
        businessModel() {
            return this.$store.getters.businessModel;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
        },
    },
    data() {
        return {
            dialogVisible: false,
            dep_id: "",
            company_id: "",
            shows: 0,
            ordershows: 1,
            timeshows: 1,
            payshows: 1,
            yinyeShows: 1,
            joinDateValue: null,
            titleText: [
                this.$t("reportManage.aaa"),
                this.$t("reportManage.aaa"),
                this.$t("reportManage.bbb"),
                this.$t("reportManage.ccc"),
                this.$t("reportManage.ddd"),
            ],

            requestData: {
                dep_id: this.dep_id, //门店id
                end_time: "", //统计结束时间，
                start_time: "0", //统计开始时间,
                dish_classify: "",
                delivery_flag: 1, //统计类型，0为全部，1为堂食，2为外卖
            },

            overviewdata: {},
            dishrank: [],
            orderSource: {},
            timecount: {},
            paycount: {},
            business_model: "1", //营业模式 0 叫号/牌号模式 1:桌台模式  2:兼容模式
            onAccount:'O',
            openUpdate: "",
            periodAnalysis: [], //时段分析
            echColorList: [
                "#2082ED",
                "#F7B500",
                "#49C243",
                "#2BCFCF",
                "#F04B8A",
                "#FD7B4D",
                "#ED4627",
                "#A157C8",
            ], //echart 时段分析颜色集
            
        };
    },
    methods: {
        datepickerPick(dates) {
            //获取当前时间
            let m1 = this.moment(dates[0]);
            //获取需要对比的时间
            let m2 = this.moment(dates[1]);
            //计算相差多少天 day可以是second minute
            let day = m2.diff(m1, "day");
            if (day > 31) {
                this.toast.info(this.$t("max31"));
                this.joinDateValue = null;
            } else {
                this.requestData.start_time = this.moment(
                    this.joinDateValue[0]
                ).format("YYYYMMDD");
                this.requestData.end_time = this.moment(
                    this.joinDateValue[1]
                ).format("YYYYMMDD");
            }
        },
        changeClick(val) {
            if (val == "4") {
                this.shows = 4;
                return;
            } else if (val == "1") {
                this.shows = 1;
            } else if (val == "2") {
                this.shows = 2;
            } else if (val == "3") {
                this.shows = 3;
            } else if (val == "0") {
                this.shows = 0;
            }

            if (val == "5") {
                this.requestData.start_time = this.moment(
                    this.joinDateValue[0]
                ).format("YYYYMMDD");
                this.requestData.end_time = this.moment(
                    this.joinDateValue[1]
                ).format("YYYYMMDD");
                this.managedata();
            } else {
                this.requestData.start_time = val;
                this.managedata();
            }
        },
        //支付分析
        paycountClick(isNum) {
            let date = [];
            let that = this;
            if (isNum) {
                that.payshows = 2;
               for (let i in this.paycount.list) {
                date.push({
                    value:isNum == 1? this.paycount.list[i].num: this.stringutils.formatPrice(this.paycount.list[i].count),
                    name: this.paycount.list[i].name,
                })
            }
                that.SetEchartofPay(
                    date,
                    that.$t("reportManage.danshu"),
                    that.$t("reportManage.dan")
                );
            } else {
                this.payshows = 1;
                for (let i in this.paycount.list) {
                date.push({
                    value:isNum == 1? this.paycount.list[i].num: this.stringutils.formatPrice(this.paycount.list[i].count),
                    name: this.paycount.list[i].name,
                })
            }
                that.SetEchartofPay(
                    date,
                    that.$t("accountsDetail.dishPrice"),
                    ""
                );
            }
        },
        //时段分析
        timeCLick(isNum) {
            let that = this;
            if (isNum) {
                that.timeshows = 2;
                let date = [];
                for (let i in that.periodAnalysis) {
                    if (that.periodAnalysis[i].open_time_id != 0) {
                        date.push({
                            value: that.stringutils.formatNum(
                                that.periodAnalysis[i].open_time_num
                            ),
                            name:
                                that.periodAnalysis[i].open_time_name == ""
                                    ? "   "
                                    : that.periodAnalysis[i].open_time_name,
                        });
                    }
                }
                that.SetEchartTime(
                    date,
                    that.$t("reportManage.danshu"),
                    that.$t("reportManage.dan")
                );
            } else {
                that.timeshows = 1;
                let date = [];
                for (let i in that.periodAnalysis) {
                    if (that.periodAnalysis[i].open_time_id != 0) {
                        date.push({
                            value: that.stringutils.formatPrice(
                                that.periodAnalysis[i].open_time_count
                            ),
                            name:
                                that.periodAnalysis[i].open_time_name == ""
                                    ? "   "
                                    : that.periodAnalysis[i].open_time_name,
                        });
                    }
                }
                that.SetEchartTime(
                    date,
                    that.$t("accountsDetail.dishPrice"),
                    ""
                );
            }
        },
        //营业分析
        yinyeClick(isNum) {
            var date = [];
            var data = [];
            let that = this;
            if (isNum) {
                that.yinyeShows = 2;
                for (var i in that.timecount.daily_num) {
                    date.push(i);
                    data.push(
                        that.stringutils.formatNum(that.timecount.daily_num[i])
                    );
                }
            } else {
                that.yinyeShows = 1;
                for (var i in that.timecount.daily_count) {
                    date.push(i);
                    data.push(
                        that.stringutils.formatPrice(
                            that.timecount.daily_count[i]
                        )
                    );
                }
            }
            that.SetEchartYYofPrice(data, date);
        },
        //订单来源
        orderSouceClick(isNum) {
            let that = this;
            if (isNum) {
                that.ordershows = 2;
                var date = [
                    {
                        value: that.stringutils.formatNum(
                            that.orderSource.consumer_num
                        ),
                        name: that.$t("orderDetail.saoma"),
                    },
                    {
                        value: that.stringutils.formatNum(
                            that.orderSource.waiter_num
                        ),
                        name: that.$t("dishReport.waiterEat"),
                    },
                ];
                that.SetEchartofOrderSouce(
                    date,
                    that.$t("reportManage.danshu"),
                    that.$t("reportManage.dan")
                );
            } else {
                that.ordershows = 1;
                var date = [
                    {
                        value: that.stringutils.formatPrice(
                            that.orderSource.consumer_count
                        ),
                        name: that.$t("orderDetail.saoma"),
                    },
                    {
                        value: that.stringutils.formatPrice(
                            that.orderSource.waiter_count
                        ),
                        name: that.$t("dishReport.waiterEat"),
                    },
                ];
                that.SetEchartofOrderSouce(
                    date,
                    that.$t("accountsDetail.dishPrice"),
                    ""
                );
            }
        },

        // 营业分析--按金额
        SetEchartYYofPrice(data, date) {
            this.$nextTick((_) => {
                let analysis_volume = this.$echarts.init(
                    this.$refs.analysis_volume
                );

                let name =
                    this.yinyeShows == 1
                        ? this.$t("reportManage.sumPrice")
                        : this.$t("reportManage.ffff");
                let stack =
                    this.yinyeShows == 1
                        ? this.$t("reportManage.sum")
                        : this.$t("reportManage.sum");
                let formatter =
                    this.yinyeShows == 1 ? "" : this.$t("reportManage.dan");

                // 绘制图表
                var option = {
                    title: {
                        subtext: this.$t("reportManage.eee"),
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b}： {c} " + formatter,
                    },
                    color: ["#30CFB7"],
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },

                    xAxis: [
                        {
                            type: "category",
                            boundaryGap: false,
                            data: date,
                            axisLabel: {
                                interval: 0,
                                rotate: 60,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "value",
                        },
                    ],
                    series: [
                        {
                            name: name,
                            type: "line",
                            symbolSize: 10,
                            smooth: true,
                            stack: stack,
                            lineStyle: {
                                normal: {
                                    color: "#30CFB7",
                                },
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            {
                                                offset: 0,
                                                color: "rgba(48,207,183,0.21)",
                                            },
                                            {
                                                offset: 1,
                                                color: "rgba(48,207,183,0)",
                                            },
                                        ]
                                    ),
                                },
                            },
                            data: data,
                        },
                    ],
                };

                analysis_volume.setOption(option);
            });
        },
        //时段分析
        SetEchartTime(data, unitTile, unit) {
            // 基于准备好的dom，初始化echarts实例
            let time_singular = this.$echarts.init(
                this.$refs.time_singular
            );
            // 绘制图表
            var option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} " + unit + " ({d}%)",
                },
                color: this.echColorList,
                legend: {
                    left: "left",
                    top:'10px',
                    data: data,
                },
                series: [
                    {
                        //显示指示线
                        name: unitTile,
                        type: "pie",
                        radius: "55%", //饼图的半径大小
                        center: ["50%", "55%"], //饼图的位置
                        data: data,
                        itemStyle: {
                            normal: {
                                //指示线上的文本显示
                                label: {
                                    show: true,
                                    position: "",
                                    formatter: "{c} " + unit, //数值
                                    textStyle: {
                                        fontSize: 12,
                                        color: "#303336",
                                        fontWeight: "bolder",
                                    },
                                },
                                labelLine: {
                                    show: true,
                                },
                            },
                        },
                    },
                    {
                        name: unitTile,
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "55%"],
                        data: data,

                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: "{d}%",
                                    position: "inner",
                                    textStyle: {
                                        fontWeight: 300,
                                        fontSize: 12, //文字的字体大小
                                    },
                                },
                                labelLine: { show: true },
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            };
            time_singular.setOption(option);
        },
        //支付分析
        SetEchartofPay(data, unitTile, unit) {
            // 基于准备好的dom，初始化echarts实例
            let pay_singular = this.$echarts.init(
                this.$refs.pay_singular
            );
            // 绘制图表
            var option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} " + unit + " ({d}%)",
                },
                color: [
                    "#2082ED",
                    "#EB3C1C",
                    "#30CFB7",
                    "#FE813C",
                    "#f7b500",
                    "#42cd3c",
                    "#6DD2D2",
                ], 
                legend: {
                    left: "left",
                    top:'10px',
                    data: data,
                },
                series: [
                    {
                        //显示指示线
                        name: unitTile,
                        type: "pie",
                        radius: "55%", //饼图的半径大小
                        center: ["50%", "60%"], //饼图的位置
                        data: data,
                        itemStyle: {
                            normal: {
                                //指示线上的文本显示
                                label: {
                                    show: true,
                                    position: "",
                                    formatter: "{c} " + unit, //数值
                                    textStyle: {
                                        fontSize: 12,
                                        color: "#303336",
                                        fontWeight: "bolder",
                                    },
                                },
                                labelLine: {
                                    show: true,
                                },
                            },
                        },
                    },
                    {
                        name: unitTile,
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: data,

                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: "{d}%",
                                    position: "inner",
                                    textStyle: {
                                        fontWeight: 300,
                                        fontSize: 12, //文字的字体大小
                                    },
                                },
                                labelLine: { show: true },
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            };

            pay_singular.setOption(option);
        },
        //订单来源
        SetEchartofOrderSouce(data, unitTile, unit) {
            // 基于准备好的dom，初始化echarts实例
            let order_singular = this.$echarts.init(
                this.$refs.order_singular
            );
            // 绘制图表
            var option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} " + unit + " ({d}%)",
                },
                color: ["#2082ED", "#FE813C"],
                legend: {
                    left: "left",
                    top:"10px",
                    data: data,
                },
                series: [
                    {
                        //显示指示线
                        name: unitTile,
                        type: "pie",
                        radius: "55%", //饼图的半径大小
                        center: ["50%", "55%"], //饼图的位置
                        data: data,
                        itemStyle: {
                            normal: {
                                //指示线上的文本显示
                                label: {
                                    show: true,
                                    position: "",
                                    formatter: "{c} " + unit, //数值
                                    textStyle: {
                                        fontSize: 12,
                                        color: "#303336",
                                        fontWeight: "bolder",
                                    },
                                },
                                labelLine: {
                                    show: true,
                                },
                            },
                        },
                    },
                    {
                        name: unitTile,
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "55%"],
                        data: data,

                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: "{d}%",
                                    position: "inner",
                                    textStyle: {
                                        fontWeight: 300,
                                        fontSize: 12, //文字的字体大小
                                    },
                                },
                                labelLine: { show: true },
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            };

            order_singular.setOption(option);
        },
        managedata() {
            //paycount
            let that = this;
            this.requestData.dep_id = this.dep_id; //门店id
            this.request.managedata(this.requestData, function (res) {
                if (res.code == "1") {
                    if (res.data == null) {
                        return false;
                    }
                    that.timecount = {};
                    that.paycount = {};
                    that.overviewdata = {};
                    that.dishrank = [];
                    that.periodAnalysis = []; //时段分析
                    for (let i in res.data.dataCountRes) {
                        if(res.data.dataCountRes[i]==null||res.data.dataCountRes[i]==undefined){
                            res.data.dataCountRes[i]= "";
                        }
                        res.data.dataCountRes[i] = String(res.data.dataCountRes[i]);
                    } 
                    that.overviewdata = res.data.dataCountRes; 
                    that.dishrank = res.data.list;
                    that.orderSource = res.data.orderSourceRes;
                    that.timecount = res.data.timeAnalysis;
                    that.paycount = res.data.payTypeRes;
                    that.periodAnalysis = res.data.timeAnalysis.timeCountMap;

                    //时段分析弹出层
                    var CurrentTime = new Date();
                    var year = CurrentTime.getFullYear();
                    var month = CurrentTime.getMonth() + 1;
                    var day = CurrentTime.getDate();
                    var hours = CurrentTime.getHours();
                    var minutes = CurrentTime.getMinutes();
                    var seconds = CurrentTime.getSeconds();
                    CurrentTime =
                        year +
                        "-" +
                        month +
                        "-" +
                        day +
                        "-" +
                        hours +
                        ":" +
                        minutes +
                        ":" +
                        seconds;
                    if(that.openUpdate!=""){
                        if (that.shows != 0) {
                            if (that.openUpdate <= CurrentTime) {
                                that.dialogVisible = true;
                            }
                        }
                    }
                    that.timeCLick(false);
                    that.yinyeClick(false);
                    that.orderSouceClick(false);
                    that.paycountClick(false);
                    
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        getRedisDeptConfigInfo() {
            let that = this;
            let data = {
                company_id: this.company_id,
                dept_id: this.dep_id,
            };
            this.request.getRedisDeptConfigInfo(data, function (res) {
                if (res.code == "1") {
                    if(res.data.open_update_time!=null){
                        that.openUpdate = res.data.open_update_time;
                    }
                }
            });
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            this.getRedisDeptConfigInfo();
            this.managedata();
            let businessModel = this.businessModel;
            if (businessModel) {
                this.business_model = businessModel.business_model;
                this.onAccount = businessModel.on_account;
            }
            
        }
        
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    this.dep_id = newVal.dep_ID;
                    this.getRedisDeptConfigInfo();
                    this.managedata();
                  
                }
            },
        },
        businessModel: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.business_model = newVal.business_model;
                    this.onAccount = newVal.on_account;
                }
            },
        },
    },
};
</script>
<style scoped>
.main-content {
    height: 0;
    box-shadow: none;
}
.active {
    color: #ffffff;
    background: #2082ed;
}
.el-tabs__header {
    margin-top: 10px !important;
}
.el-tabs__active-bar {
    width: 0px !important;
}
.countSpan {
    color: #303336;
}
.countTitle {
    color: #303336;
    font-weight: bold;
}
.countNum {
    padding: 20px 0px 20px 0px;
}
.count {
    color: #232426;
}
.el-table tr {
    background-color: #f4f7fd !important;
}
.el-table th {
    background-color: #f4f7fd !important;
    color: #232426 !important;
}

.salesTop {
    box-shadow: 1px 1px 20px rgb(0, 0, 0, 0.1);
    padding: 20px;
}
.salesText {
    color: #393939;
}
</style>
