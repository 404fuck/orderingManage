<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-18 14:43:42
 * @LastEditors: Please set LastEditors
 * @Description: 财务管理
 * @FilePath: \sjoyOrderingManage\src\views\merchantManage\financeManage.vue
-->
<template>
    <div class="main financeStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <HeadTitle
                :titles="headTitles"
                :selectTab="selectTab"
                @onHeadTitleItemClick="onHeadTitleItemClick"
            ></HeadTitle>
            <el-row style="padding: 10px 50px">
                <!-- 首页 -->
                <el-row v-if="selectTab == 0">
                    <el-col style="padding: 30px 0">
                        <div class="balanceBox">
                            <div class="fl">
                                <span>余额</span>
                                <h3>986,888.00</h3>
                                <div>待到账资金：345,456.00</div>
                            </div>
                            <div class="fr right">
                                <img src="../../static/images/balance.png" alt="">
                            </div>
                        </div>
                    </el-col>
                    <el-col>
                        <h3 class="titleTxt">收款账户</h3>
                        <ul class="accountMsg">
                            <li>
                                <b>开户人：</b>
                                <span>Alice</span>
                            </li>
                            <li>
                                <b>开户银行：</b>
                                <span>大马银行</span>
                            </li>
                            <li>
                                <b>分行名称：</b>
                                <span>吉隆坡分行</span>
                            </li>
                            <li>
                                <b>银行账号：</b>
                                <span>1143255644577</span>
                            </li>
                            <li>
                                <b>关联手机号：</b>
                                <span>35255556</span>
                            </li>
                        </ul>
                        <div class="accountMsg-tips">
                            <span>
                                <img src="../../static/images/tips.png">
                                提示：
                            </span>
                            <p class="top10">1. 打款周期为T+n，如遇节假日则顺延，实际到账时间视银行处理速度；<br>
                            2. 如对打款金额有疑义，可前往对账或发送邮件至mjoypay@mjoy.co询问。</p>
                        </div>
                    </el-col>
                </el-row>
                <!-- 对账中心 -->
                <el-row v-if="selectTab == 1">
                    <el-col class="top20">
                        <label for class="labelText">{{
                            $t("dishReport.transTime")
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
                            style="width: 320px"
                        ></el-date-picker>
                        <el-button-group class="font14 left10">
                            <el-button
                                :class="{active: timeshows == 1}"
                                @click="countTime('1')"
                                >{{ $t("today") }}</el-button
                            >
                            <el-button
                                :class="{active: timeshows == 2}"
                                @click="countTime('2')"
                                >{{ $t("yesterday") }}</el-button
                            >
                            <el-button
                                :class="{active: timeshows == 3}"
                                @click="countTime('3')"
                                >{{ $t("week") }}</el-button
                            >
                            <el-button
                                :class="{active: timeshows == 4}"
                                @click="countTime('4')"
                                >{{ $t("month") }}</el-button
                            >
                        </el-button-group>
                    </el-col>
                    <el-col class="top20">
                        <label for class="labelText">{{
                            $t("orderDetail.orderCome_")
                        }}</label>
                        <el-select
                            class="left10"
                            style="width:160px"
                            :placeholder="$t('orderDetail.selectOrderCome')"
                            v-model="requestData.order_source"
                        >
                            <el-option
                                v-for="item in order_sourceOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <label for class="labelText left20">{{
                            $t("orderDetail.payType_")
                        }}</label>
                        <el-select
                            class="left10"
                            style="width:160px"
                            :placeholder="$t('orderDetail.selectOrderCome')"
                            v-model="requestData.pay_type"
                        >
                            <el-option
                                v-for="item in pay_typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <label for class="labelText left20">{{
                            $t("financeManage.duifang")
                        }}</label>
                        <el-input
                            :placeholder="$t('financeManage.inputDuifang')"
                            style="width: 160px"
                            class="left10"
                            v-model="requestData.account"
                        ></el-input>
                        <label class="labelText left20">{{
                            $t("financeManage.jiaoyiType")
                        }}</label>
                        <el-button-group class="font14 left10">
                            <el-button
                                :class="{
                                    active: typeshows == 1,
                                }"
                                @click="financeType('1')"
                                style="width: 68px"
                                >{{ $t("all") }}</el-button
                            >
                            <el-button
                                :class="{
                                    active: typeshows == 2,
                                }"
                                @click="financeType('2')"
                                >{{
                                    $t("accountsDetail.returnPrice")
                                }}</el-button
                            >
                        </el-button-group>
                        <el-button
                            class="themeBtn left20"
                            @click="searchClick"
                            >{{ $t("select") }}</el-button
                        >
                        <el-button
                            class="themeImportBtn report-download"
                            >{{ $t("financeManage.download") }}</el-button
                        >
                    </el-col>
                    <el-col class="top20">
                        <span class="labelText">
                            {{ $t("financeManage.sumPrice") }}
                            <span class="labelText">{{ dingdan_count }}</span>
                            <span
                                class="left10"
                                style="color: #8c939b; font-weight: 100"
                            >
                                (
                                <span>{{ num }}</span>
                                {{ $t("financeManage.bi") }})
                            </span>
                        </span>
                        <span class="labelText left40">
                            {{ $t("financeManage.shopShiji") }}
                            <span style="color: #2082ed; font-weight: 100">{{
                                shishou_count
                            }}</span>
                        </span>
                        <span class="labelText left50">
                            {{ $t("financeManage.returnPrice") }}
                            <span>{{ tuikuan_count }}</span>
                            <span
                                class="left10"
                                style="color: #8c939b; font-weight: 100"
                            >
                                (
                                <span>{{ total_tuikuan_num }}</span>
                                {{ $t("financeManage.bi") }})
                            </span>
                        </span>
                    </el-col>
                    <el-col class="top20">
                        <el-table 
                            :data="tableDatas"
                            v-loading="loading"
                            border
                            style="width: 100%"
                        >
                            <el-table-column
                                :label="$t('financeManage.jiaoyiTime')"
                            >
                                <template slot-scope="scope">
                                    <span>{{
                                        scope.row.cur_time | moment_ss
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="order_id"
                                :label="$t('financeManage.orderNum')"
                            ></el-table-column>
                            <el-table-column
                                prop="order_source"
                                :label="$t('financeManage.orderSource')"
                            ></el-table-column>
                            <el-table-column
                                prop="pay_type"
                                :label="$t('financeManage.payType')"
                            ></el-table-column>
                            <el-table-column
                                prop="amount"
                                :label="$t('financeManage.paidAmount')"
                            ></el-table-column>
                            <el-table-column
                                prop="refund_amount"
                                :label="$t('financeManage.refundAmount')"
                            ></el-table-column>
                            <el-table-column
                                prop="brokerage"
                                :label="$t('financeManage.incomeAmount')"
                            ></el-table-column>
                        </el-table>
                    </el-col>
                    <el-col class="center top10">
                        <el-pagination
                            class="page-pagination"
                            background
                            @current-change="paginationChange"
                            layout="prev, pager, next"
                            :total="all_pages"
                        ></el-pagination>
                    </el-col>
                </el-row>
                <!-- 结算记录 -->
                <el-row v-if="selectTab == 2">
                    <el-col class="top20">
                        <label for class="labelText">{{
                            $t("dishReport.transTime")
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
                            style="width: 320px"
                        ></el-date-picker>
                        <el-button-group class="font14 left10">
                            <el-button
                                :class="{active: timeshows == 1}"
                                @click="countTime('1')"
                                >{{ $t("today") }}</el-button
                            >
                            <el-button
                                :class="{active: timeshows == 2}"
                                @click="countTime('2')"
                                >{{ $t("yesterday") }}</el-button
                            >
                            <el-button
                                :class="{active: timeshows == 3}"
                                @click="countTime('3')"
                                >{{ $t("week") }}</el-button
                            >
                            <el-button
                                :class="{active: timeshows == 4}"
                                @click="countTime('4')"
                                >{{ $t("month") }}</el-button
                            >
                        </el-button-group>
                        <el-button
                            class="themeBtn left20"
                            @click="searchClick"
                            >{{ $t("select") }}</el-button
                        >
                        <el-button
                            class="themeImportBtn report-download"
                            >{{ $t("financeManage.download") }}</el-button
                        >
                    </el-col>
                    <el-col class="top20">
                        <el-table 
                            :data="tableData"
                            border
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="id"
                                label="结算时间"
                            ></el-table-column>
                            <el-table-column
                                prop="account_name"
                                label="交易日期范围"
                            ></el-table-column>
                            <el-table-column
                                prop="bank_name"
                                label="净收总额"
                            ></el-table-column>
                            <el-table-column
                                prop="account_no"
                                label="手续费"
                            ></el-table-column>
                            <el-table-column
                                prop="account_no"
                                label="打款金额"
                            ></el-table-column>
                            <el-table-column :label="$t('operation')">
                                <template slot-scope="scope">
                                    <span
                                        class="font12"
                                        style="color:#FD7B4D"
                                        @click="settleClick(scope.row)"
                                    >
                                    对账
                                    </span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-row>
            <!-- 1111 -->
        </div>
    </div>
</template>
<script>
import HeadTitle from "../components/HeadTitle";
export default {
    components: {
        HeadTitle,
    },
    computed: {
        curentStore() {
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        curentTab() {
            this.selectTab = this.$store.getters.curentTab;
            return this.$store.getters.curentTab;
        },
    },
    data() {
        return {
            selectTab: 0,
            headTitles: [
                { id: 0, value: "首页" },
                { id: 1, value: "对账中心" },
                { id: 2, value: "结算记录" },
            ],

            walletInfo: {
                balance_count: "",
                mobile: "",
                nick_name: "",
                _id: "",
                create_time: "",
            },
            order_sourceOptions:[
                {
                    value: "",
                    label: this.$t("all"),
                },
                {
                    value: "0",
                    label: this.$t("orderDetail.saoma"),
                },
                {
                    value: "1",
                    label: this.$t("orderDetail.shouyin"),
                }, 
            ],
            pay_typeOptions:[],
            requestData: {
                page_num: 0,
                page_size: 10,
                dep_id: this.dep_id,
                begin_date: "",
                end_date: "",
                order_id: "",
                ex_type: "",//交易类型,0:付款，1：退款
                pay_type: "", //支付类型
                pay_account: "", //付款账户
                order_source:"",//订单来源

            },
            joinDateValue: null,
            tableDatas: null,
            typeshows: true,
            timeshows: 1,
            tableData: null,
            dingdan_count: 0, //订单总额
            shishou_count: 0, //实收
            tuikuan_count: 0, //退款总额
            num: 0,
            all_pages: 0,
            total_tuikuan_num: 0,
            loading: false,
        };
    },
    methods: {
        onHeadTitleItemClick(index) {
            this.selectTab = index;
        },
        searchClick() {
            let that = this;
            that.requestData.pageNum = 0;
            that.getRecPages();
        },
        paginationChange(page) {
            let that = this;
            that.requestData.pageNum = page - 1;
            that.getRecPages();
        },
        // 获取对账中心列表
        getRecPages() {
            let that = this;
            that.loading = true;
            this.request.getRecPages(this.requestData, function (res) {
                if (res.code == "1") {
                    that.loading = false;
                    if (res.data != null) {
                        that.tableDatas = [];
                        let res_data = res.data;
                        console.log(res_data);
                        that.tableDatas = res_data.list; 
                    }
                    
                } else {
                    that.toast.error(res.msg);
                }
                
            });
        },
        cashOutClick() {
            this.$router.push("/cashOut");
        },
        cashOutDetailClick() {
            this.$router.push("/cashOutDetail");
        },
        //添加账户
        // addPayAccountClick() {
        //     this.$router.push("/addPayAccount");
        // },
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
                this.requestData.begin_date = this.moment(
                    this.joinDateValue[0]
                ).format("YYYY-MM-DD");
                this.requestData.end_date = this.moment(
                    this.joinDateValue[1]
                ).format("YYYY-MM-DD");
                this.requestData.time = -1;
            }
            this.timeshows = 0;
        },
        financeType(val) {
            if (val == "1") {
                this.typeshows = 1;
                this.requestData.type = 0;
            } else if (val == "2") {
                this.typeshows = 2;
                this.requestData.type = 1;
            }
        },
        countTime(val) {
            this.joinDateValue = [];
            if (val == "1") {
                this.timeshows = 1;
                this.requestData.time = 0;
                this.joinDateValue[0] = this.moment().format("YYYY-MM-DD");
                this.joinDateValue[1] = this.joinDateValue[0];
            } else if (val == "2") {
                this.timeshows = 2;
                this.requestData.time = 1;
                this.joinDateValue[0] = this.moment(
                    this.moment().add(-1, "days")
                ).format("YYYY-MM-DD");
                this.joinDateValue[1] = this.joinDateValue[0];
            } else if (val == "3") {
                this.timeshows = 3;
                this.requestData.time = 2;
                this.joinDateValue[0] = this.moment(
                    this.moment().add(-7, "days")
                ).format("YYYY-MM-DD");
                this.joinDateValue[1] = this.moment().format("YYYY-MM-DD");
            } else if (val == "4") {
                this.timeshows = 4;
                this.requestData.time = 3;
                this.joinDateValue[0] = this.moment(
                    this.moment().add(-30, "days")
                ).format("YYYY-MM-DD");
                this.joinDateValue[1] = this.moment().format("YYYY-MM-DD");
            }
            this.requestData.begin_date = "";
            this.requestData.end_date = "";
        },
        getWalletInfo() {
            let that = this;
            this.request.getWalletInfo({ dep_id: this.dep_id }, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.walletInfo = res.data;
                        that.walletInfo.nick_name =
                            that.walletInfo.nick_name == null
                                ? ""
                                : that.walletInfo.nick_name;
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        getbanklist() {
            let that = this;
            this.request.getbanklist({ dep_id: this.dep_id }, function (res) {
                if (res.code == "1") {
                    if (res.data == null) {
                        return;
                    }
                    that.tableData = res.data;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            this.dep_id = curentStore.dep_ID;
            this.selectTab = this.$store.getters.curentTab;
            // this.getWalletInfo();
            // this.getbanklist();
            this.getRecPages();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    this.dep_id = newVal.dep_ID;
                    // this.getWalletInfo();
                    // this.getbanklist();
                    this.getRecPages();
                }
            },
        },
    },
};
</script>
<style scoped>
.active {
    color: #ffffff;
    background: #2082ed;
}
.labelText {
    font-size: 14px;
    color: #232426;
    font-weight: bold;
}
.titleTxt {
    color: #232426;
    font-size: 14px;
}
.titleText {
    color: #303336;
    font-size: 12px;
}
.accountMsg{
    margin: 0;
    padding: 0;
}
.accountMsg li {
    list-style: none;
    margin-top: 40px;
    font-size: 12px;
    overflow: hidden;
}
.accountMsg li b{
    float: left;
    min-width: 78px;
}
.accountMsg li span{
    float: left;
}
.balanceBox {
    width: 430px;
    min-height: 180px;
    background: #ffffff;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    padding: 30px 40px;
    overflow: hidden;
}
.balanceBox .fl {
    width: 270px;
    overflow: hidden;
}
.balanceBox .fr {
    cursor: pointer;
    width: 80px;
    height: 80px;
    margin-top: 20px;
}
.balanceBox .fl span {
    color: #303336;
    font-size: 14px;
}
.balanceBox .fl h3 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 40px;
    color: #232426;
    margin: 16px auto;
    padding: 0;
}
.balanceBox .fl div {
    font-size: 12px;
    color: #8c939b;
}
.accountMsg-tips{
    margin-top: 50px;
    color: #8C939B;
    font-size: 12px;
}
</style>
