<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-07-27 12:19:43
 * @LastEditors: Please set LastEditors
 * @Description: 订单明细
 * @FilePath: \sjoyOrderingManage\src\views\businessData\orderDetail.vue
-->
<template>
    <div class="main orderStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.dingdan") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 0px 20px 30px">
                <el-col>
                    <label for class="font14 fontWeight">{{
                        $t("accountsDetail.payTime")
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
                </el-col>
                <div class="seachStyle top20 right20">
                    <label for class="font14 fontWeight">{{
                        $t("accountsDetail.orderState")
                    }}</label>
                    <el-select
                        class="left10"
                        v-model="requestData.order_state"
                        :placeholder="$t('orderDetail.select')"
                    >
                        <el-option
                            v-for="item in order_stateOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <div class="seachStyle top20 right20">
                    <label class="font14 fontWeight">{{
                        $t("orderDetail.order_Num")
                    }}</label>
                    <el-input
                        class="left10"
                        :placeholder="$t('orderDetail.inputOrderNum')"
                        style="width: 200px"
                        v-model="requestData.order_id"
                    ></el-input>
                </div>
                <div class="seachStyle top20 right20">
                    <label for class="font14 fontWeight">{{
                        $t("orderDetail.eatType_")
                    }}</label>
                    <el-select
                        class="left10"
                        v-model="requestData.eat_type"
                        :placeholder="$t('orderDetail.select')"
                    >
                        <el-option
                            v-for="item in eat_typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <div class="seachStyle top20 right20">
                    <label for class="font14 fontWeight">{{
                        $t("orderDetail.payType_")
                    }}</label>
                    <el-cascader
                        class="left10"
                        v-model="getPayTypeValue"
                        :options="pay_typeOptions"
                        :props="{ expandTrigger: 'hover' }"
                    >
                    </el-cascader>
                </div>
                <div class="seachStyle top20 right20">
                    <label for class="font14 fontWeight">{{
                        $t("orderDetail.orderCome_")
                    }}</label>
                    <el-select
                        class="left10"
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
                </div>
                <div
                    class="seachStyle top20 right20"
                >
                    <label for class="font14 fontWeight">{{
                        $t("orderDetail.sales_")
                    }}</label>
                    <el-select
                        class="left10"
                        :placeholder="$t('orderDetail.selectOrderCome')"
                        v-model="requestData.preferential_type"
                    >
                        <el-option
                            v-for="item in preferential_typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <div class="seachStyle top20 right20">
                    <label for class="font14 fontWeight">{{
                        $t("orderDetail.waiter_")
                    }}</label>
                    <el-input
                        class="left10"
                        :placeholder="$t('orderDetail.inputName')"
                        style="width: 200px"
                        v-model="requestData.name"
                    ></el-input>
                </div>
                <div class="seachStyle top20 right20">
                    <el-button
                        class="themeBtn"
                        @click="searchClick"
                        >{{ $t("select") }}</el-button
                    >
                    <el-button
                        class="themeBtn"
                        @click="refreshClick"
                        >{{ $t("orderDetail.reset") }}</el-button
                    >
                    <el-button
                        style="margin-left:20px"
                        class="themeImportBtn report-download"
                        >{{ $t("dishReport.download") }}</el-button
                    >
                </div>
               
            </el-row>
            <el-row>
                <el-col style="padding: 20px 30px" class="font14 fontWeight">
                    <span>{{ $t("total") }}</span>
                    <span style="margin-left: 40px">
                        {{ $t("orderDetail.orderCount_") }}
                        <span>{{ currentPage.total|count }}</span>
                    </span>
                    <span style="margin-left: 40px">
                        {{ $t("accountsDetail.shishoujine") }}
                        <span>{{ totalPrice|priceNum }}</span>
                    </span>
                </el-col>
                <el-col class="dataTable">
                    <el-table
                        :data="tableData"
                        border
                        v-loading="tableLoading"
                    >
                        <!-- 订单号 -->
                        <el-table-column
                            prop
                            :label="$t('orderDetail.orderNum')"
                            width="190"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.order_id_show|text
                                }}</span>
                            </template>
                        </el-table-column>
                        <!-- 订单状态 -->
                        <el-table-column
                            prop
                            :label="$t('orderDetail.orderState')"
                            width="100"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.order_status_name|text
                                }}</span>
                            </template>
                        </el-table-column>
                        <!-- 订单来源 -->
                        <el-table-column
                            prop
                            :label="$t('orderDetail.orderCome')"
                            width="130"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.waiter_service==0? $t("orderDetail.saoma"):scope.row.waiter_service== 1?$t("orderDetail.shouyin"):"-"
                                }}</span>
                            </template>
                        </el-table-column>
                        <!-- 下单时间 -->
                        <el-table-column
                            prop
                            :label="$t('orderDetail.creatTime')"
                            width="180"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.create_time|text
                                }}</span>
                            </template>
                        </el-table-column>
                        <!-- 结账时间 -->
                        <el-table-column
                            :label="$t('orderDetail.payTime')"
                            width="180"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.pay_time|text
                                }}</span>
                            </template>
                        </el-table-column>
                        <!-- 桌台 -->
                        <el-table-column
                            prop
                            :label="$t('orderDetail.table')"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.table_name|text
                                }}</span>
                            </template>
                        </el-table-column>
                        <!-- 支付方式 -->
                        <el-table-column
                            prop
                            :label="$t('orderDetail.payType')"
                            width="160"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    (pay_typeText[scope.row.pay_type]) |text
                                }}</span>
                            </template>
                        </el-table-column>
                        <!-- 收银员 -->
                        <el-table-column :label="$t('orderDetail.waiter')">
                            <template slot-scope="scope">
                                <span
                                    >{{scope.row.pay_operator_type == '1'? scope.row.pay_operator_name:"-" }}</span
                                >
                            </template>
                        </el-table-column>
                        <!-- 订单金额 -->
                        <el-table-column
                            prop
                            :label="$t('orderDetail.orderPrice')"
                            width="150"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.should_pay | priceNum
                                }}</span>
                            </template>
                        </el-table-column>
                        <!-- 实收金额 -->
                        <el-table-column
                            prop
                            :label="$t('orderDetail.shijiPrice')"
                            width="160"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.total_price |priceNum
                                }}</span>
                            </template>
                        </el-table-column>
                        <!-- 操作 -->
                        <el-table-column
                            fixed="right"
                            prop="operation"
                            :label="$t('operation')"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    @click="lookClick(scope.row)"
                                    type="text"
                                    size="small"
                                    >{{ $t("look") }}</el-button
                                >
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
                            tableData != null
                        "
                        :total="currentPage.total"
                        :page-size="currentPage.size"
                        :current-page="currentPage.page"
                        @current-change="handleCurrentChange"
                    ></el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "orderDetail",
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
            requestData: {
                eat_type: -1, // 就餐类型,0为堂食,1外带,2服务员点餐 ,
                name: "", //收银员姓名 ,
                order_id: "", //订单号 ,
                order_source: -1, // 订单来源 服务员点餐，0：否，1：是 ,
                order_state: -1, // 订单状态，0未付款，1已付款,2已撤单,3已退款，默认为0 ,
                pay_type: -1, // 支付方式,
                preferential_type: -1, // 优惠方式 ,
                start_time: "", //结账开始时间 格式 2019-07-24 15:18:17 ,
                end_time: "", //结账结束时间 格式 2019-07-24 15:18:17 ,
                delivery_flag: 0, //统计类型，0为堂食，1为外卖，-1为全部 ,
                pageNum: 0,
                pageSize: 10,
            },
            //分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
            totalPrice: 0,
            tableData: [],
            //订单状态
            order_stateOptions: [
                {
                    value: -1,
                    label: this.$t("all"),
                },
                {
                    value: 0,
                    label: this.$t("orderDetail.weifukuan"),
                },
                {
                    value: 1,
                    label: this.$t("orderDetail.yifukuan"),
                },
                {
                    value: 2,
                    label: this.$t("orderDetail.yichedan"),
                },
                {
                    value: 3,
                    label: this.$t("orderDetail.youtuikuan"),
                },
                {
                    value: 4,
                    label:  this.$t("orderDetail.yijudan"),
                },
                
            ],
            eat_typeOptions: [
                {
                    value: -1,
                    label: this.$t("all"),
                },
                {
                    value: 0,
                    label: this.$t("dishReport.tangshi"),
                },
                {
                    value: 1,
                    label: this.$t("dishReport.waimai"),
                },
            ],
            //订单来源
            order_sourceOptions: [
                {
                    value: -1,
                    label: this.$t("all"),
                },
                {
                    value: 0,
                    label: this.$t("orderDetail.saoma"),
                },
                {
                    value: 1,
                    label: this.$t("orderDetail.shouyin"),
                },
            ],
            //支付方式
            getPayTypeValue:['-1'],
            pay_typeOptions: [],  //堂食支付方式 list
            pay_typeOptions2: [],  //外卖支付方式 list
            pay_typeText: null,//表格 pay_type获取字段
            preferential_typeOptions: [
                {
                    value: -1,
                    label: this.$t("all"),
                },
                {
                    value: 1,
                    label: this.$t("orderDetail.dazhe"),
                },
                {
                    value: 2,
                    label: this.$t("orderDetail.lijian"),
                },
                {
                    value: 3,
                    label: this.$t("orderDetail.youuhijuan"),
                },
                {
                    value: 0,
                    label: this.$t("orderDetail.wuyouhui"),
                },
                
            ],
        };
    },
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
                this.joinDateValue = [];
            } else {
                this.requestData.start_time = m1.format("YYYYMMDD");
		        this.requestData.end_time = m2.format("YYYYMMDD");
            }
            this.daySelect = -1;
            this.currentPage.page = 1;
            this.orderDetail();

        },
        daySelectClick(val) {
            this.joinDateValue = [];
            this.daySelect = val;
            if (val == 0) {
                this.joinDateValue[0] = this.moment().format("YYYYMMDD");
                this.joinDateValue[1] = this.joinDateValue[0];
                
            } else if (val == 1) {
                this.joinDateValue[0] = this.moment(this.moment().add(-1, "days").startOf("day").valueOf()).format("YYYYMMDD");
                this.joinDateValue[1] = this.joinDateValue[0];
            } else if (val == 2) {
                this.joinDateValue[0] = this.moment(
                    this.moment()
                        .week(this.moment().week())
                        .startOf("week")
                        .add(1, "days")
                        .valueOf()
                ).format("YYYYMMDD");
                this.joinDateValue[1] = this.moment(
                    this.moment()
                        .week(this.moment().week())
                        .endOf("week")
                        .add(1, "days")
                        .valueOf()
                ).format("YYYYMMDD");
            } else if (val == 3) {
                this.joinDateValue[0] = this.moment(
                    this.moment()
                        .month(this.moment().month())
                        .startOf("month")
                        .valueOf()
                ).format("YYYYMMDD");
                this.joinDateValue[1] = this.moment(
                    this.moment()
                        .month(this.moment().month())
                        .endOf("month")
                        .valueOf()
                ).format("YYYYMMDD");
            }
            this.requestData.start_time = this.moment(this.joinDateValue[0]).format("YYYYMMDD");
            this.requestData.end_time = this.moment(this.joinDateValue[1]).format("YYYYMMDD");
            this.currentPage.page = 1;
            this.orderDetail();
        },
        //分页
        handleCurrentChange(page) {
            this.currentPage.page = page;
            this.orderDetail();
        },
        //查看
        lookClick(row) {
            let pushPropObj = {resData:this.requestData,dayIndex:this.daySelect,dateValue:this.joinDateValue};
            this.$router.push({name:'orderDetailInfo',params:{propOjb:pushPropObj},query: { id: row.order_id_show }})
        },
        //请求接口
        orderDetail() {
            this.tableLoading = true;
            let that = this;
            //初始化今日
            if(this.requestData.end_time==""||this.requestData.start_time==""){
                this.joinDateValue[0] = this.moment().format("YYYYMMDD");
                this.joinDateValue[1] = this.joinDateValue[0];
                this.requestData.start_time = this.moment().format("YYYYMMDD");
                this.requestData.end_time = this.moment().format("YYYYMMDD");
            }
            this.requestData.dep_id = this.dep_id;
            this.requestData.pageNum = this.currentPage.page-1; // 当前页 ,
            this.requestData.pageSize = this.currentPage.size; // 一页的数量 ,
            this.requestData.pay_type = this.getPayTypeValue[this.getPayTypeValue.length - 1];
            this.request.orderDetail(this.requestData, function (res) {
                if (res.code == "1") {
                    that.tableLoading = false;
                    if (res.data != null) {
                        that.tableData = [];
                        that.totalPrice = 0;
                        let res_data = res.data;
                        // console.log(res_data);
                        that.currentPage.total = res_data.total_num;
                        that.totalPrice = res_data.total_count;
                        that.tableData = res_data.waiter;
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        
        getpaytype() {
            let that = this;
            this.request.getpaytype(null, function (res) {
                if (res.code == "1") {
                    that.pay_typeOptions = [];
                    let res_data = res.data[that.language];
                    let newResData=[];
                    let newChildren = { '-1': "-"};  //默认-1 表格 pay_type获取字段
                    // console.log(res_data);
                    res_data.map((value,index,res_data)=>{
                        newResData.push({
                            value: value.id,
                            label: value.dict,
                            children: value.e_wallet,
                        });
                        return false;
                    })
                    for(let i in newResData){
                        let curChild = newResData[i].children;
                        newChildren[newResData[i].id] = newResData[i].dict;
                        for(let j in curChild){
                            newChildren[curChild[j].id] = curChild[j].dict;
                            curChild.push({
                                value: curChild[j].id,
                                label: curChild[j].dict,
                            })
                            
                            
                        }
                        let len = curChild.length;
                        curChild.splice(0,len/2); //删除原始数据
                    }
                    that.pay_typeOptions =[{ value: '-1', label: that.$t("all")},...newResData];
                    that.pay_typeText = newChildren;
                    // console.log(that.pay_typeOptions); 
                    //console.log(newChildren);
                   
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        
        //搜索
        searchClick() {
            this.currentPage.page = 1;
            this.orderDetail();
        },
        //重置
        refreshClick() {
            this.daySelect = 0;
            this.currentPage.page = 1;
            this.requestData.eat_type = -1, 
            this.requestData.name = "", 
            this.requestData.order_id = "",
            this.requestData.order_source = -1, 
            this.requestData.order_state = -1,
            this.requestData.pay_type = -1, 
            this.requestData.preferential_type = -1, 
            this.requestData.start_time = "", 
            this.requestData.end_time = "", 
            this.joinDateValue = [];
            this.getPayTypeValue = ['-1'];
            this.orderDetail();
        },
        
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            let getPropOjb = this.$route.params.propOjb;
            if(getPropOjb!=undefined&&getPropOjb!=null){
                this.requestData = getPropOjb.resData;
                this.daySelect = getPropOjb.dayIndex;
                this.joinDateValue = getPropOjb.dateValue;
                this.currentPage.page = getPropOjb.resData.pageNum+1;
                // console.log(getPropOjb);
            }
            this.orderDetail();
            this.getpaytype();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    this.dep_id = newVal.dep_ID;
                    this.currentPage.page = 1;
                    this.orderDetail();
                    this.getpaytype();
                }
            },
        },
    },
};
</script>

<style scoped>

</style>