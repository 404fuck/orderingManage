<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-31 17:17:24
 * @LastEditors: Please set LastEditors
 * @Description: 系统设置
 * @FilePath: \sjoyOrderingManage\src\views\system\systemManage.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <div class="main-content systemStyle">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.xitongguanli") }}</div>
                <el-row class="tips-wrap">{{$t('systemManage.setNote')}}</el-row>
            </el-row>
            <hr style="position: relative; top: -5px"  />
            <el-row style="padding: 20px 100px 30px">
                <el-form
                    ref="requestData"
                    :model="requestData"
                    style="width: 610px"
                >
                    <div class="style-div">
                        <!-- 营业模式 -->
                        <el-row class="rowStyle">
                            <label for class="labelBlock">
                                {{ `1.${$t("systemManage.businessModel")}` }}
                            </label>
                            <el-form-item class="top20">
                                <el-radio-group
                                    v-model="requestData.business_model"
                                    class="radio-group"
                                >
                                    <div>
                                        <!-- 桌台点餐 -->
                                        <el-radio
                                            label="1"
                                            style="display: inline-block"
                                            >{{ $t("systemManage.orderMode1") }}
                                        </el-radio>
                                        <el-tooltip
                                            effect="light"
                                            :content="$t('systemManage.content1')"
                                            placement="right"
                                        >
                                            <img
                                                src="../../static/images/tips.png"
                                                class="left5"
                                            />
                                        </el-tooltip>
                                    </div>
                                    <div>
                                        <!-- 叫号取餐/餐牌送餐 -->
                                        <el-radio
                                            label="0"
                                            style="display: inline-block"
                                            class="top20"
                                            >{{ $t("systemManage.orderMode2") }}
                                        </el-radio>
                                        <el-tooltip
                                            effect="light"
                                            content=""
                                            placement="right"
                                        >
                                            <span 
                                                slot="content"
                                                v-if="language=='zh_CN'"
                                                 
                                                >适用于快餐、茶饮店形式，需餐前付款。<br />牌号送餐指给点餐顾客餐牌，服务员按餐牌上菜。</span
                                            >
                                            <span 
                                                slot="content"
                                                v-else
                                                >For fast food,beverage,etc.Support payment before meal.<br />[Food service by number] refers to a store that gives
                                                <br />numbers to customers and waiters serve products according to the numbers.</span
                                            >
                                            <img
                                                src="../../static/images/tips.png"
                                                class="left5"
                                            />
                                        </el-tooltip>
                                    </div>
                                    <!-- 兼容模式 -->
                                    <div>
                                        <el-radio
                                            label="2"
                                            class="top20"
                                            style="display: inline-block"
                                            >{{ $t("systemManage.orderMode3") }}
                                        </el-radio>
                                        <el-tooltip
                                            effect="light"
                                            :content="$t('systemManage.content2')"
                                            placement="right"
                                        >
                                            <img
                                                src="../../static/images/tips.png"
                                                class="left5"
                                            />
                                        </el-tooltip>
                                    </div>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <!-- 初始取餐号  -->
                        <el-row
                            class="rowStyle"
                            v-if="requestData.business_model != 1"
                        >
                            <label for class="labelBlock">{{
                                `2.${$t("systemManage.qucanhao")}`
                            }}</label>
                            <el-form-item class="top20">
                                <el-row class="codeCss">
                                    <el-col>
                                        <span>
                                            <input
                                                type="text"
                                                v-model="order_noShows[0]"
                                                maxlength="1"
                                                oninput="value=value.replace(/[^\d]/g,'')"
                                            />
                                        </span>
                                        <span>
                                            <input
                                                type="text"
                                                v-model="order_noShows[1]"
                                                maxlength="1"
                                                oninput="value=value.replace(/[^\d]/g,'')"
                                            />
                                        </span>
                                        <span>
                                            <input
                                                type="text"
                                                v-model="order_noShows[2]"
                                                maxlength="1"
                                                oninput="value=value.replace(/[^\d]/g,'')"
                                            />
                                        </span>
                                        <span>
                                            <input
                                                type="text"
                                                v-model="order_noShows[3]"
                                                maxlength="1"
                                                oninput="value=value.replace(/[^\d]/g,'')"
                                            />
                                        </span>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-row>
                        <!-- 营业时间 -->
                        <el-row class="rowStyle">
                            <label for class="labelBlock">
                                {{
                                    `${
                                        requestData.business_model != 1
                                            ? "3"
                                            : "2"
                                    }.${$t('systemManage.businessTime')}`
                                }}
                                <el-tooltip effect="light" placement="right">
                                    <span 
                                        slot="content"
                                        v-if="language=='zh_CN'"
                                        >1个营业日内可设置1个或多个营业时间，<br />多个时间段需连续切不可重叠。<br />营业时间会影响扫码点餐功能的使用时间。</span
                                    >
                                    <span 
                                        slot="content"
                                        v-else
                                        >One or more business hours can be set within one business day.<br />Multiple business hours shall be continuous and not overlapped.
                                        <br />The modification shall take effect the next day.<br/>Business hours will affect the usage timee of QR order.</span
                                    >
                                    <img
                                        src="../../static/images/tips.png"
                                        class="left5"
                                    />
                                </el-tooltip>
                            </label>
                            <el-form-item class="top20">
                                <div class="business-div">
                                    <el-table
                                        :data="businessData"
                                        style="width: 100%"
                                    >
                                        <!-- 餐段名称 -->
                                        <el-table-column
                                            prop="test_name"
                                            :label="$t('systemManage.timeName')"
                                            align="center"
                                            width="180"
                                        >
                                            <template slot-scope="scope">
                                                <el-input
                                                    style="width: 130px"
                                                    v-model="
                                                        scope.row.open_name
                                                    "
                                                    size="mini"
                                                    type="text"
                                                    :placeholder="$t('systemManage.timeName')"
                                                ></el-input>
                                            </template>
                                        </el-table-column>
                                        <!-- 营业时间 -->
                                        <el-table-column
                                            prop="test_data"
                                            :label="$t('systemManage.businessTime')"
                                            align="center"
                                        >
                                            <template slot-scope="scope">
                                                <el-time-select
                                                    :placeholder="
                                                        $t('pleaseSelect')
                                                    "
                                                    style="width: 130px"
                                                    v-model="
                                                        scope.row
                                                            .open_time_start
                                                    "
                                                    size="small"
                                                    :picker-options="{
                                                        start: '00:00',
                                                        step: '00:15',
                                                        end: '24:00',
                                                    }"
                                                ></el-time-select>
                                                <span style="padding: 0 6px">{{
                                                    $t("addBranchStore.go")
                                                }}</span>
                                                <el-time-select
                                                    :placeholder="
                                                        $t('pleaseSelect')
                                                    "
                                                    style="width: 130px"
                                                    v-model="
                                                        scope.row.open_time_end
                                                    "
                                                    size="small"
                                                    :picker-options="{
                                                        start: '00:00',
                                                        step: '00:15',
                                                        end: '24:00',
                                                        minTime:
                                                            scope.row
                                                                .open_time_start,
                                                    }"
                                                ></el-time-select>
                                            </template>
                                        </el-table-column>
                                        <!-- 操作 -->
                                        <el-table-column
                                            :label="$t('operation')"
                                            width="100"
                                            align="center"
                                        >
                                            <template slot-scope="scope">
                                                <el-button
                                                    v-if="scope.$index != 0"
                                                    type="text"
                                                    size="small"
                                                    @click.native.prevent="
                                                        delDishTime(
                                                            scope.$index,
                                                            businessData
                                                        )
                                                    "
                                                    >{{
                                                        $t("delete")
                                                    }}</el-button
                                                >
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-button
                                        class="themeImportBtn left25"
                                        size="mini"
                                        @click="addDishTime"
                                    >
                                        {{ $t('systemManage.addTime') }}
                                    </el-button>
                                </div>
                            </el-form-item>
                        </el-row>
                        <!-- 结算时间 -->
                        <el-row class="rowStyle">
                            <label for class="labelBlock">
                                {{
                                    `${
                                        requestData.business_model != 1
                                            ? "4"
                                            : "3"
                                    }.${$t('systemManage.settleTime')}`
                                }}
                                <el-tooltip effect="light" placement="right">
                                    <span 
                                        slot="content"
                                        v-if="language=='zh_CN'"
                                        >该时间为一个营业日结束并自动结算的时间，<br />如设置为02:00，则昨日凌晨02:01到今日凌晨<br />02:00为一个营业日。</span
                                    >
                                    <span 
                                        slot="content"
                                        v-else
                                        >This time is the end of a business day and that is automatically settled.<br />The 24 hours before is a business day.If it is set to 02:00,
                                        <br />a business day is counted from 02:01 am the day before to 02:00 am the next day.</span
                                    >
                                    <img
                                        src="../../static/images/tips.png"
                                        class="left5"
                                    />
                                </el-tooltip>
                            </label>
                            <el-form-item class="top20">
                                <el-time-select
                                    :placeholder="$t('pleaseSelect')"
                                    style="width: 130px"
                                    v-model="requestData.settle_time"
                                    size="small"
                                    :picker-options="{
                                        start: '00:00',
                                        step: '00:15',
                                        end: '24:00',
                                    }"
                                ></el-time-select>
                            </el-form-item>
                        </el-row>
                        <!-- 退款限制 -->
                        <el-row class="rowStyle">
                            <label for class="labelBlock">
                                {{
                                    `${
                                        requestData.business_model != 1
                                            ? "5"
                                            : "4"
                                    }.${$t('systemManage.refundLimit')}`
                                }}
                                <el-tooltip
                                    effect="light"
                                    :content="$t('systemManage.content3')"
                                    placement="right"
                                >
                                    <img
                                        src="../../static/images/tips.png"
                                        class="left5"
                                    />
                                </el-tooltip>
                            </label>
                            
                            <el-form-item class="top20">
                                <el-radio-group
                                    v-model="requestData.refund_limit"
                                >
                                    <el-radio label="1" style="display: block"
                                        >{{ $t('systemManage.refundCont1') }}
                                    </el-radio>
                                    <el-radio
                                        label="2"
                                        style="display: block"
                                        class="top20"
                                        >{{ $t('systemManage.refundCont2') }}
                                    </el-radio>
                                    <el-radio
                                        label="3"
                                        class="top20"
                                        style="display: block"
                                        >{{ $t('systemManage.refundCont3') }}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <!-- 现金抹零 -->
                        <el-row class="rowStyle">
                            <label for class="labelBlock">
                                {{
                                    `${
                                        requestData.business_model != 1
                                            ? "6"
                                            : "5"
                                    }.${$t("systemManage.cashRound")}`
                                }}
                            </label>
                            <el-form-item>
                                <el-radio-group
                                    class="cash-radio-group radio-group"
                                    v-model="requestData.left_deal"
                                >
                                    <div class="radio">
                                        <el-radio label="0">
                                            {{ $t("systemManage.bumolin") }}
                                        </el-radio>
                                    </div>
                                    <div class="radio">
                                        <el-radio label="1">
                                            {{ $t("systemManage.modiaofen") }}
                                        </el-radio>
                                        <el-tooltip
                                            effect="light"
                                            content="0.91 ~ 0.99 = 0.90"
                                            placement="right"
                                        >
                                            <img
                                                src="../../static/images/tips.png"
                                                class="left5"
                                            />
                                        </el-tooltip>
                                    </div>
                                    <div class="radio">
                                        <el-radio label="4">
                                            {{ $t("systemManage.anqujian") }}
                                        </el-radio>
                                        <el-tooltip
                                            effect="light"
                                            placement="right"
                                        >
                                            <span slot="content"
                                                >0.91 ~ 0.92 = 0.90 <br />0.93 ~
                                                0.97 = 0.95<br />0.98 ~ 0.99 =
                                                1.00</span
                                            >
                                            <img
                                                src="../../static/images/tips.png"
                                                class="left5"
                                            />
                                        </el-tooltip>
                                    </div>
                                    <div class="radio">
                                        <el-radio label="2">
                                            {{ $t("systemManage.modiaojiao") }}
                                        </el-radio>
                                        <el-tooltip
                                            effect="light"
                                            content="8.26 = 8.00"
                                            placement="right"
                                        >
                                            <img
                                                src="../../static/images/tips.png"
                                                class="left5"
                                            />
                                        </el-tooltip>
                                    </div>
                                    <div class="radio">
                                        <el-radio label="3">
                                            {{ $t("systemManage.modiaoyuan") }}
                                        </el-radio>
                                        <el-tooltip
                                            effect="light"
                                            content="66.26 = 60.00"
                                            placement="right"
                                        >
                                            <img
                                                src="../../static/images/tips.png"
                                                class="left5"
                                            />
                                        </el-tooltip>
                                    </div>
                                    <div class="radio">
                                        <el-radio label="5">
                                            {{ $t("systemManage.shoudong") }}
                                        </el-radio>
                                    </div>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <!-- 叫号功能 -->
                        <!-- <el-row
                            class="rowStyle"
                            v-if="requestData.business_model != 1"
                        >
                            <label for class="labelBlock">
                                {{ `7.${$t('systemManage.qufuntion')}` }}
                            </label>
                            <el-form-item class="top10">
                                <el-radio-group
                                    disabled
                                >
                                    <el-radio label="0">{{ $t('systemManage.off') }}</el-radio>
                                    <el-radio label="1">{{ $t('systemManage.on')  }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row> -->
                        <!-- 订单协同 -->
                        <el-row
                            class="rowStyle"
                            v-if="requestData.business_model != 0"
                           
                        >
                            <label for class="labelBlock">
                                {{
                                    `${
                                        requestData.business_model != 1
                                            ? "7"
                                            : "6"
                                    }.${$t('systemManage.orderColl')}`
                                }}
                                <el-tooltip
                                    effect="light"
                                    :content="$t('systemManage.content5')"
                                    placement="right"
                                >
                                    <img
                                        src="../../static/images/tips.png"
                                        class="left5"
                                    />
                                </el-tooltip>
                            </label>
                            <el-form-item class="top10">
                                <el-switch
                                    v-model="orderCollValue"
                                    class="select-switch"
                                    active-color="#2082ED"
                                    inactive-color="#D8D8D8"
                                    :active-text="orderCollValue==true?this.$t('systemManage.on'):this.$t('systemManage.off')"
                                ></el-switch>
                            </el-form-item>
                        </el-row>
                        <!-- 拼桌数量 -->
                        <el-row
                            class="rowStyle"
                            v-if="requestData.business_model != 0"
                           
                        >
                            <label for class="labelBlock">
                                {{
                                    `${
                                        requestData.business_model != 1
                                            ? "8"
                                            : "7"
                                    }.${$t('systemManage.pingzNum')}`
                                }}
                                <el-tooltip
                                    effect="light"
                                    :content="$t('systemManage.content4')"
                                    placement="right"
                                >
                                    <img
                                        src="../../static/images/tips.png"
                                        class="left5"
                                    />
                                </el-tooltip>
                            </label>
                            <el-form-item class="top10">
                                <el-switch
                                    v-model="pingzValue"
                                    class="select-switch"
                                    active-color="#2082ED"
                                    inactive-color="#D8D8D8"
                                    :active-text="pingzValue==true?this.$t('systemManage.on'):this.$t('systemManage.off')"
                                ></el-switch>
                                <el-radio-group
                                   class="left50"
                                   v-if="pingzValue"
                                   v-model="tableNumber"
                                >
                                    <el-radio label="0">1</el-radio>
                                    <el-radio label="1">2</el-radio>
                                    <el-radio label="2">3</el-radio>
                                    <el-radio label="3">4</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <!-- 交接班功能 -->
                        <el-row class="rowStyle">
                            <label for class="labelBlock">
                                {{
                                    `${
                                        requestData.business_model == 0? "7":requestData.business_model == 1?"8":"9"
                                    }.${$t('systemManage.shift')}`
                                }}
                            </label>
                            <el-form-item class="top10">
                                <el-switch
                                    v-model="shiftValue"
                                    class="select-switch"
                                    active-color="#2082ED"
                                    inactive-color="#D8D8D8"
                                    :active-text="orderCollValue==true?this.$t('systemManage.on'):this.$t('systemManage.off')"
                                ></el-switch>
                            </el-form-item>
                        </el-row>
                        <!-- 操作备注 -->
                        <el-row class="rowStyle">
                            <label for class="labelBlock">{{
                                `${
                                    requestData.business_model == 0? "8":requestData.business_model == 1?"9":"10"
                                }.${$t("systemManage.operation")}`
                            }}</label>
                            <el-form-item class="top20">
                                <el-tabs
                                    tab-position="left"
                                    style="
                                        border: 1px #e6eaef solid;
                                        width: 100%;
                                    "
                                >
                                    <el-tab-pane
                                        v-for="(item, index) in remarks"
                                        :key="index"
                                        :label="item.name"
                                    >
                                        <el-row style="padding: 20px">
                                            <el-col>
                                                <el-input
                                                    :placeholder="item.hint"
                                                    style="width: 330px"
                                                    size="small"
                                                    v-model.trim="
                                                        addRemarkValue
                                                    "
                                                ></el-input>
                                                <el-button
                                                    type="primary"
                                                    class="themeImportBtn left10"
                                                    size="small"
                                                    @click="
                                                        addRemarkClick(
                                                            remarks,
                                                            index,
                                                            addRemarkValue
                                                        )
                                                    "
                                                    >{{
                                                        $t(
                                                            "systemManage.addDes"
                                                        )
                                                    }}
                                                </el-button>
                                            </el-col>
                                            <el-col class="returnStyle">
                                                <el-tag
                                                    v-for="tag in item.list"
                                                    :key="tag.content"
                                                    closable
                                                    class="right10 top15"
                                                    @close="
                                                        handleClose(
                                                            remarks,
                                                            index,
                                                            tag
                                                        )
                                                    "
                                                    >{{ tag.content }}</el-tag
                                                >
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-form-item>
                        </el-row>
                    </div>
                    <el-row class="top40 center">
                        <el-button
                            type="primary"
                            class="themeBtn"
                            style="width: 100px"
                            :loading="okClickLoading"
                            @click="okClick"
                            >{{ $t("save") }}</el-button
                        >
                    </el-row>
                </el-form>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    inject:['reload'], 
    computed: {
        curentStore() {
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        businessModel() {
            return this.$store.getters.businessModel;
        },
        language(){
            return this.$store.getters.language;
        },
    },
    data() {
        return {
            dep_id: "",
            okClickLoading: false,
            remarks: {},
            addRemarkValue: "",

            requestData: {},
            // 营业时间
            businessData: [
                { open_name: "", open_time_end: "", open_time_start: "" },
            ],
            order_noShows: [0, 0, 0, 1],
            tableNumber:'0',//拼桌数量
            pingzValue:true,
            orderCollValue:false,//订单协同
            shiftValue:false,//交接班功能
        };
    },
    methods: {
        /*
          ---营业时间---
        */

        addDishTime() {
            this.businessData.push({
                open_name: "",
                open_time_end: "",
                open_time_start: "",
            });
        },
        delDishTime(item, index) {
            this.businessData.splice(item, 1);
        },
        /*
          ---操作备注---
        */
        handleClose(remarks, index, tag) {
            remarks[index].list.splice(remarks[index].list.indexOf(tag), 1);
            this.updateData();
        },
        addRemarkClick(remarks, index, value) {
            let addIes = { id: 0, type: "0", content: "" };
            if (value.length > 0) {
                addIes["content"] = value;
                remarks[index].list.push(addIes);
                this.addRemarkValue = "";
                this.updateData();
            }
        },

        // 接口处理 --查询门店配置
        getSelectData() {
            this.requestData = this.businessModel;
            // 初始取餐号
            this.order_noShows[0] =
                Math.floor(this.requestData.order_no / 1000) % 10;
            this.order_noShows[1] =
                Math.floor(this.requestData.order_no / 100) % 10;
            this.order_noShows[2] =
                Math.floor(this.requestData.order_no / 10) % 10;
            this.order_noShows[3] = this.requestData.order_no % 10;
            //呼叫选项
            if (this.requestData.call_item != "") {
                this.requestData.call_item.split("|");
            }
            //操作备注
            if (this.requestData.deal_item!="") {
                this.remarks = JSON.parse(this.requestData.deal_item);
                // if (this.requestData.business_model == 0) {
                //    let compRemarks = JSON.parse(this.requestData.deal_item);
                //    delete compRemarks.ordernote;
                //    this.remarks = compRemarks;
                //    console.log(compRemarks);
                // }else{
                //    let getRemarks = JSON.parse(this.requestData.deal_item);
                //    this.remarks = getRemarks;
                // }
                console.log(this.remarks);
            }
            //经营时间
            if (this.requestData.open_time_json != "") {
                this.businessData = JSON.parse(this.requestData.open_time_json);
            }
            //结算时间
            if(this.requestData.settle_time=="00"||this.requestData.settle_time==null){
                this.requestData.settle_time = "";
            }
            // 拼桌数量
            this.pingzValue=this.requestData.share_table_switch=='1'?true:false;
            this.tableNumber = String(this.requestData.share_table_number-1);
            //订单协同
            this.orderCollValue=this.requestData.order_synergy=='1'?true:false;
            //交接班功能
            this.shiftValue=this.requestData.shift_duty=='1'?true:false;
        },
        //更新配置表
        updateData() {
            this.okClickLoading = true;
            let that = this;
            let joinArray = [];
            this.requestData.dep_id = this.dep_id;
            this.requestData.call_item = joinArray.join("|");
            this.requestData.deal_item = JSON.stringify(this.remarks);
            this.requestData.open_time_json = JSON.stringify(this.businessData);
            this.requestData.order_no =
                this.order_noShows[0] * 1000 +
                this.order_noShows[1] * 100 +
                this.order_noShows[2] * 10 +
                this.order_noShows[3] * 1;
            this.requestData.share_table_number = Number(this.tableNumber)+1;
            this.requestData.share_table_switch = this.pingzValue==true?'1':'0'; 
            this.requestData.order_synergy = this.orderCollValue==true?'1':'0'; 
            this.requestData.shift_duty = this.shiftValue==true?'1':'0'; 
            this.request.updateBranchStoreSet(this.requestData, function (res) {
                that.okClickLoading = false;
                if (res.code == "1") {
                    that.toast.success(that.$t("updateSucc"));
                    setTimeout(()=>{
                        that.reload();
                    },300);
                    
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        okClick() {
            this.updateData();
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_ID = curentStore.dep_ID;
            this.getSelectData();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    this.dep_id = newVal.dep_ID;
                    this.$router.go(0);
                }
            },
        },
        businessModel: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.getSelectData();
                }
            },
        },
    },
};
</script>
<style scoped>
.tips-wrap{
    height: 30px;
    line-height: 30px;
    background: #FEF1EA;
    color: #8C939B;
    font-size: 12px;
    padding-left: 80px;
    margin: 20px 20px 0 20px;
}

.style-div .rowStyle {
    color: #232426;
    font-size: 14px;
    margin-bottom: 35px;
}
.labelBlock {
    display: block;
    color: #232426;
    font-weight: bold;
    font-size: 14px;
}
.business-div {
    width: 100%;
    min-height: 145px;
    border-radius: 4px 4px 0px 0px;
    border: 1px solid #e6eaef;
    overflow: hidden;
}
.codeCss span {
    display: inline-block;
    margin-right: 20px;
    width: 25px;
    height: 25px;
}
.codeCss span input {
    width: 100%;
    height: 100%;
    color: #979797;
    font-size: 18px;
    text-align: center;
}
</style>
