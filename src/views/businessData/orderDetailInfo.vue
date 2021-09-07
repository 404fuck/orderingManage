<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-25 14:37:08
 * @LastEditors: Please set LastEditors
 * @Description: 订单详情
 * @FilePath: \sjoyOrderingManage\src\views\businessData\accountsDetail.vue
-->
<template>
    <div class="main" v-if="getOrderData != null">
        <hr style="position: relative; top: -10px" />
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <router-link tag="a" :to="{name: 'orderDetail', params: {propOjb:getPropOjb}}" class="crumbsLink">{{ $t("sidebar.dingdan") }}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span style="color: #232426">{{
                    `${order_stateOptions[getOrderData.order_status]}`
                }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">
                    {{
                        `${order_stateOptions[getOrderData.order_status]}`
                    }}
                </div>
            </el-row>
            <hr />
            <div class="gird-box">
                <!-- 已退款信息 -->
                <div class="col-gird" style="width:23%" v-if="getOrderData.order_status == 3">
                    <div class="detail-title">
                        <img src="../../static/images/spot_green.png" alt="" />
                        <span>{{$t('accountsDetail.refundInfo')}}</span>
                    </div>
                    <div class="detail-lists">
                        <div class="detail-title-line"></div>
                        <div class="detail-tk-box" :style="{'width':language=='zh_CN'?'80%':'98%'}">
                            <div class="tk-item" :style="{'margin-left':language=='zh_CN'?'22px':'10px'}">
                                <div class="tk-num">{{getOrderData.total_price - getOrderData.refund_price | priceNum}}</div>
                                <div class="tk-txt">{{$t('accountsDetail.reNet')}}</div>
                            </div>
                            <div class="tk-item">
                                <div class="tk-num">=</div>
                            </div>
                            <div class="tk-item">
                                <div class="tk-num">{{getOrderData.total_price|priceNum}}</div>
                                <div class="tk-txt">{{$t('accountsDetail.reRecieved')}}</div>
                            </div>
                            <div class="tk-item">
                                <div class="tk-num">-</div>
                            </div>
                            <div class="tk-item">
                                <div class="tk-num">{{getOrderData.refund_price | priceNum}}</div>
                                <div class="tk-txt">{{$t('accountsDetail.reReund')}}</div>
                            </div>
                        </div>
                        <ul class="detail-items">
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.reDate')}}：</span>
                                    <span>{{
                                        getOrderData.refund_time 
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.reMethod')}}：</span>
                                    <span>{{
                                        pay_typeText[getOrderData.refund_type] 
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.reReason')}}：</span>
                                    <span>{{
                                        getOrderData.refund_reason
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.reOperator')}}：</span>
                                    <span>{{
                                        getOrderData.refund_people_name 
                                    }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 撤单信息 -->
                <div class="col-gird" v-if="getOrderData.order_status == 2">
                    <div class="detail-title">
                        <img src="../../static/images/spot_green.png" alt="" />
                        <span>{{$t('accountsDetail.cancellationInfo')}}</span>
                    </div>
                    <div class="detail-lists">
                        <div class="detail-title-line"></div>
                        <ul class="detail-items">
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.caTime')}}：</span>
                                    <span>{{
                                        getOrderData.withdraw_time
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.caOrder')}}：</span>
                                    <span>{{
                                        getOrderData.withdraw_reason
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.caOperator')}}：</span>
                                    <span>{{
                                        getOrderData.withdraw_operator_name
                                    }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 拒单信息 -->
                <div class="col-gird" v-if="getOrderData.order_status == 4||getOrderData.order_status == 5">
                    <div class="detail-title">
                        <img src="../../static/images/spot_green.png" alt="" />
                        <span>{{$t('accountsDetail.refusedInfo')}}</span>
                    </div>
                    <div class="detail-lists">
                        <div class="detail-title-line"></div>
                        <ul class="detail-items">
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.refusedTime')}}：</span>
                                    <span>{{
                                        getOrderData.reject_time
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.refusedReason')}}：</span>
                                    <span>{{
                                        getOrderData.reject_reason
                                    }}</span>
                                </div>
                            </li>
                            <li v-if="getOrderData.order_status == 5">
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.reReund')}}：</span>
                                    <span>{{
                                        getOrderData.refund_price
                                    }}</span>
                                </div>
                            </li>
                            <li v-if="getOrderData.order_status == 5">
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.reMethod')}}：</span>
                                    <span>{{
                                        pay_typeText[getOrderData.pay_type]
                                        
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.operator')}}：</span>
                                    <span>{{
                                        getOrderData.waiter_name
                                    }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 收款信息 -->
                <div class="col-gird" v-if="getOrderData.order_status != 2&&getOrderData.order_status != 4">
                    <div class="detail-title">
                        <img src="../../static/images/spot_green.png" alt="" />
                        <span>{{ $t("accountsDetail.collectionInfo") }}</span>
                    </div>
                    <div class="detail-lists">
                        
                        <div class="detail-title-line"></div>
                        <ul class="detail-items">
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.totalPrice')}}：</span>
                                    <span style="float: right">{{
                                        getOrderData.dish_original_total_price
                                            | priceNum
                                    }}</span>
                                </div>
                            </li>
                            <li v-if="dishPmtTypeArr.length!=0">
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.productProimot')}}：</span>
                                    <span style="float: right">
                                        {{`-${getOrderData.total_dish_pmt_price}`| priceNum}}
                                    </span>
                                </div>
                                <div class="children" v-if="getOrderData.promotions.length!=0&&getOrderData.promotions.length!=null">
                                    <div class="children-item" v-for="(item,index) in dishPmtTypeArr" :key="index">
                                        <span class="spot"></span>
                                        <span>{{`${pmtValue[item.pmt_name]}`}}
                                            <em class="em-text" v-if="item.note!=null">
                                                ({{item.note}})
                                            </em>
                                        </span>
                                        <span style="float: right">{{`-${item.pmt_price}`|priceNum}}</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.orderATM')}}：</span>
                                    <span style="float: right">{{
                                        getOrderData.should_pay | priceNum
                                    }}</span>
                                </div>
                                
                            </li>
                            <li v-if="orderPmtTypeArr.length!=0">
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.preferential')}}：</span>
                                    <span style="float: right">
                                        {{`-${getOrderData.total_off}`| priceNum}}
                                    </span>
                                </div>
                                <div class="children" v-if="getOrderData.promotions.length!=0&&getOrderData.promotions.length!=null">
                                    <div class="children-item" v-for="(item,index) in orderPmtTypeArr" :key="index">
                                        <span class="spot"></span>
                                        <span>{{`${pmtValue[item.pmt_name]}`}}
                                            <em class="em-text" v-if="item.note!=null">
                                                ({{item.note}})
                                            </em>
                                        </span>
                                        <span style="float: right">{{`-${item.pmt_price}`|priceNum}}</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div >
                                    <div >
                                        <span class="title">{{
                                            `${$t('accountsDetail.sst')}@${getOrderData.taxes_rate}%：`
                                        }}</span>
                                        <span style="float: right">{{
                                            getOrderData.sst_price | priceNum
                                        }}</span>
                                    </div>
                                    <div class="children-item">
                                        <span class="title">{{
                                            `${$t('accountsDetail.sc')}@${getOrderData.cost_rate}%：`
                                        }}</span>
                                        <span style="float: right">{{
                                            getOrderData.server_price | priceNum
                                        }}</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.recevvable')}}：</span>
                                    <span style="float: right">{{
                                        getOrderData.is_pay
                                    }}</span>
                                </div>
                            </li>

                            <li
                                v-if="
                                    getOrderData.order_status == 1 ||
                                    getOrderData.order_status == 3||
                                    getOrderData.order_status == 5
                                "
                            >   
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.payMethod')}}：</span>
                                    <span style="float: right" >
                                        {{getOrderData.pay_type_name}}
                                        <em class="em-text" v-if="getOrderData.pay_type==28">
                                            ({{`${getOrderData.actually_pay}`|priceNum}})
                                        </em>
                                        <em class="em-text" v-if="getOrderData.pay_type==36">
                                            ({{`${getOrderData.pay_type_amount}`|priceNum}})
                                        </em>
                                    </span>
                                    <div style="clear:both"></div>
                                    <span style="float: right"  v-if="getOrderData.pay_type2!=-1&&getOrderData.pay_type2_amount!=0">
                                        {{getOrderData.pay_type2_name}}
                                        <em class="em-text" v-if="getOrderData.pay_type2==28">
                                            ({{`${getOrderData.actually_pay}`|priceNum}})
                                        </em>
                                        <em class="em-text" v-else>
                                            ({{`${getOrderData.pay_type2_amount}`|priceNum}})
                                        </em>
                                    </span>
                                    
                                </div>
                                <div class="children" v-if="getOrderData.pay_type==28||getOrderData.pay_type2==28">
                                    <div class="children-item">
                                        <span class="title">
                                            {{$t('accountsDetail.cashZhaoling')}}：
                                        </span>
                                        <span style="float: right">{{
                                            getOrderData.change_return | priceNum
                                        }}</span>
                                    </div>
                                    <div class="children-item">
                                        <span class="title">
                                           {{$t('accountsDetail.cashMoling')}}：
                                        </span>
                                        <span style="float: right">{{
                                            getOrderData.left_deal | turnOverPrice
                                        }}</span>
                                    </div>
                                </div>
                            </li>
                            <li
                                v-if="
                                    getOrderData.order_status == 1 ||
                                    getOrderData.order_status == 3||
                                    getOrderData.order_status == 5
                                "
                            >
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.receivedATM')}}：</span>
                                    <span style="float: right">{{
                                        getOrderData.total_price | priceNum
                                    }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 基本信息 -->
                <div class="col-gird">
                    <div class="detail-title">
                        <img src="../../static/images/spot_green.png" alt="" />
                        <span>{{ $t("accountsDetail.basicInfo") }}</span>
                    </div>
                    <div class="detail-lists">
                        <div class="detail-title-line"></div>
                        <ul class="detail-items">
                            <li v-if="getOrderData.code_mode == '0'&&getOrderData.take_food_code[0] == '#'">
                                <span class="parent fontWeight">{{ $t("accountsDetail.canpaiCode") }}：</span>
                                <span>{{sliceTake}} <span v-if="getOrderData.take_out == 1">#{{$t("accountsDetail.waidai")}}</span></span>
                            </li>
                            <li v-else-if="getOrderData.code_mode == '0' || getOrderData.code_mode == '2'">
                                <span class="parent fontWeight">{{ $t("accountsDetail.qucanCode") }}：</span>
                                <span>{{takeCodeFood}} <span v-if="getOrderData.take_out == 1">#{{$t("accountsDetail.waidai")}}</span></span>
                            </li>
                            <li v-else>
                                <div class="parent">
                                    <span class="title">{{$t("accountsDetail.table")}}：</span>
                                    <span>{{getOrderData.table_name}} <span v-if="getOrderData.take_out == 1">#{{$t("accountsDetail.waidai")}}</span></span>
                                </div>
                            </li>
                            <li v-show="getOrderData.code_mode == '1'">
                                <div class="parent">
                                    <span class="title">{{$t("accountsDetail.pax")}}：</span>
                                    <span v-if="getOrderData.diner_num >0">{{getOrderData.diner_num}}</span>
                                    <span v-else>--</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t("accountsDetail.orderNo")}}：</span>
                                    <span>{{
                                        getOrderData.order_id_show
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t("accountsDetail.orderSta")}}：</span>
                                    <span style="color: #fd7b4d">{{
                                        getOrderData.order_status_name
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t("accountsDetail.biller")}}：</span>
                                    <span>{{ getOrderData.nick_name }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t("accountsDetail.orderDate")}}：</span>
                                    <span>{{ getOrderData.create_time }}</span>
                                </div>
                            </li>
                            <li v-if="getOrderData.pay_operator_name != ''">
                                <div class="parent">
                                    <span class="title">{{$t("accountsDetail.cashier")}}：</span>
                                    <span>{{
                                        getOrderData.pay_operator_name
                                    }}</span>
                                </div>
                            </li>
                            <li v-if="getOrderData.pay_time != null">
                                <div class="parent">
                                    <span class="title">{{$t("accountsDetail.collectionDate")}}：</span>
                                    <span>{{ getOrderData.pay_time }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 会员信息 -->
                <div class="col-gird" v-if="getOrderData.member_phone!=''&&getOrderData.member_phone!=null">
                    <div class="detail-title">
                        <img src="../../static/images/spot_green.png" alt="" />
                        <span>{{ $t("accountsDetail.memberInfo") }}</span>
                    </div>
                    <div class="detail-lists">
                        <div class="detail-title-line"></div>
                        <ul class="detail-items">
                            <li>
                                <div class="parent">
                                    <span class="title">{{ $t("accountsDetail.memberName") }}：</span>
                                    <span>{{
                                        getOrderData.member_name
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{ $t("accountsDetail.memberPhone") }}：</span>
                                    <span>{{
                                        getOrderData.member_phone
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{ $t("accountsDetail.memberLevel") }}：</span>
                                    <span>{{
                                        getOrderData.member_grade_name
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{ $t("accountsDetail.memberBen") }}：</span>
                                    <span v-if="getOrderData.discount_set == '0'">{{$t('accountsDetail.memberDiscount')}}</span>
                                    <span v-if="getOrderData.discount_set == '1' || getOrderData.discount_set == '3'">{{$t('accountsDetail.memberPrice')}}</span>
                                    <span v-if="getOrderData.discount_set == '2' || getOrderData.discount_set == '4'">
                                        <span>{{$t("accountsDetail.memberBenText")}}</span>
                                        
                                        <span v-if="language=='zh_CN'">{{getOrderData.full_dis_rate*100}}%</span>
                                        <span v-else>&nbsp;{{getOrderData.full_dis_rate*100}}% off</span>
                                       
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                 <!-- 挂账公司信息 -->
                <div class="col-gird" v-if="getOrderData.pay_type==112&&getOrderData.credit_type==1">
                    <div class="detail-title">
                        <img src="../../static/images/spot_green.png" alt="" />
                        <span>{{$t('accountsDetail.compInfo')}}</span>
                    </div>
                    <div class="detail-lists">
                        <div class="detail-title-line"></div>
                        <ul class="detail-items">
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.compName')}}：</span>
                                    <span>{{
                                        getOrderData.credit_company_name
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.compContacts')}}：</span>
                                    <span>{{
                                        getOrderData.credit_contact
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.compMobile')}}：</span>
                                    <span>{{
                                        getOrderData.credit_mobile
                                    }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 挂账个人信息 -->
                <div class="col-gird" v-if="getOrderData.pay_type==112&&getOrderData.credit_type==0">
                    <div class="detail-title">
                        <img src="../../static/images/spot_green.png" alt="" />
                        <span>{{$t('accountsDetail.personInfo')}}</span>
                    </div>
                    <div class="detail-lists">
                        <div class="detail-title-line"></div>
                        <ul class="detail-items">
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.personName')}}：</span>
                                    <span>{{
                                        getOrderData.credit_name
                                    }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="parent">
                                    <span class="title">{{$t('accountsDetail.personMobile')}}：</span>
                                    <span>{{
                                        getOrderData.credit_mobile
                                    }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 菜品信息 -->
                <div class="col-gird" style="width:40%">
                    <div class="detail-title">
                        <img src="../../static/images/spot_green.png" alt="" />
                        <span>{{ $t("accountsDetail.productInfo") }}</span>
                    </div>
                    <div class="detail-lists">
                        <div class="detail-title-line"></div>
                        <el-table :data="tableData" border class="top25">
                            <el-table-column
                                prop="dish_name"
                                :label="$t('accountsDetail.productName')"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.weight_spec==3||scope.row.weight_spec==4">({{$t('accountsDetail.set')}})</span>
                                    <span>
                                        {{scope.row.dish_name}}
                                        <span v-if="scope.row.is_take_out == 1" style="padding-left:3px;"><img src="../../static/images/takeAway.png" alt="" width="11" height="12"></span>
                                        <span v-if="scope.row.dish_status == 3" class="labelCss">{{$t('accountsDetail.comp')}}</span>
                                        <span v-if="scope.row.dish_status == 5" class="labelCss">{{$t('accountsDetail.giftWith')}}</span>
                                        <span v-if="scope.row.salepmt_type == 2 " class="labelCss">{{$t('accountsDetail.sale')}}</span>
                                        <span v-if="scope.row.salepmt_type == 3 && scope.row.promotion_range=='1'&& scope.row.dish_status != 6&& scope.row.dish_status != 3" class="labelCss">{{$t('accountsDetail.and2')}}</span>
                                        <span v-if="scope.row.dish_status == 6 " class="labelCss">{{$t('accountsDetail.zhekou')}}</span>
                                    </span>
                                    <div style="color:#999" v-if="scope.row.box!=null&&scope.row.is_take_out==1">
                                        - {{scope.row.box.box_name}}
                                    </div>
                                    <div v-if="(scope.row.weight_spec==3||scope.row.weight_spec==4)&&scope.row.suits_list!=null">
                                        <div 
                                            v-for="(item,index) in scope.row.suits_list"
                                            :key="index"

                                        >
                                            <div>- {{item.dish_name}}</div>
                                            <div v-if="item.box!=null&&scope.row.is_take_out==1" style="color:#999">{{item.box.box_name}}</div>
                                        </div>
                                    </div>
                                    
                                    
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('accountsDetail.qtywei')"
                                width="150"
                            >
                                <template slot-scope="scope">
                                    <div v-if="scope.row.weight_spec == 1">{{
                                        scope.row.spec_detail+scope.row.unit_type
                                    }}</div>
                                    <div v-else-if="(scope.row.weight_spec == 3||scope.row.weight_spec == 4)&&scope.row.suits_list!=null">
                                        <div>{{ scope.row.dish_num |priceNum0 }}</div>
                                        <div 
                                            v-for="(item,index) in scope.row.suits_list"
                                            :key="index"

                                        >   
                                            <div v-if="item.box!=null">
                                                <div v-if="item.weight_spec == 1">{{item.spec_detail+item.unit_type}}</div>
                                                <div v-else>{{item.buy_number}}</div>
                                                <div style="color:#999" v-if="scope.row.is_take_out==1">{{item.box.box_num}}</div>
                                            </div>
                                            <div v-else>{{item.buy_number}}</div>
                                        </div>
                                    </div>
                                    <div v-else>{{ scope.row.dish_num }}</div>
                                    <div style="color:#999" v-if="scope.row.box!=null&&scope.row.is_take_out==1">
                                        {{scope.row.box.box_num}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop
                                :label="$t('accountsDetail.amount')"
                                width="150"
                            >
                                <template slot-scope="scope">
                                    <div>{{
                                        scope.row.dish_total_price | priceNum
                                    }}</div>
                                    <div v-if="scope.row.is_take_out==1">
                                        <div v-if="(scope.row.weight_spec == 3||scope.row.weight_spec == 4)&&scope.row.suits_list!=null">
                                            <div 
                                                v-for="(item,index) in scope.row.suits_list"
                                                :key="index"
                                            >   
                                                <div v-if="item.box!=null" style="color:#999">{{item.box.box_price | priceNum}}</div>
                                            </div>
                                        </div>
                                        <div style="color:#999" v-if="scope.row.box!=null">{{scope.row.box.box_price| priceNum}}</div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row class="detail-remark">
                            <span>{{ $t("remark") }}</span>
                            <span>{{ getOrderData.notes | text }}</span>
                        </el-row>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "orderDetailInfo",
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
            set(val) {},
        },
    },
    data() {
        return {
            dep_id: "",
            getOrderData: null, //当前订单信息
            tableData: [],
            //订单状态
            order_stateOptions: [
                this.$t("orderDetail.weifukuan"),
                this.$t("orderDetail.yifukuan"),
                this.$t("orderDetail.yichedan"),
                this.$t("orderDetail.youtuikuan"),
                this.$t("orderDetail.yijudan"),
                this.$t("orderDetail.yijudan"),
            ],
            //dish和order判断是菜品促销还是结账优惠
            dishPmtTypeArr:[],
            orderPmtTypeArr:[],
            pay_typeText: null,//表格 pay_type获取字段
            sliceTake:'',
            takeCode:[],
            takeCodeFood:'',
            pmtValue:{"on_sale":this.$t("reportManage.dishTejia"),"member_price":this.$t("reportManage.dishVIP"),"xoff2nd":this.$t("reportManage.dishTwo"),"buy_give":this.$t("reportManage.dishBuy"),"discount":this.$t("reportManage.zhengdanOff"),"reduce":this.$t("reportManage.zidingyi"),"manual_give":this.$t("reportManage.shoudongzengcai"),"point_user":this.$t("reportManage.vipjifen"),"coupon":this.$t("reportManage.copon"),"manual_discount":this.$t("reportManage.shoudongOff")},
            getPropOjb:null,
        };
    },
    methods: {
        //请求接口
        getDetails() {
            let that = this;
            let data = {
                order_id: this.$route.query.id, //当前订单id ,
            };
            this.request.details(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;
                        that.getOrderData = res_data;
                        that.sliceTake = that.getOrderData.take_food_code.slice(1)
                        that.takeCode[0] = Math.floor(that.getOrderData.take_food_code / 1000) % 10;
                        that.takeCode[1] = Math.floor(that.getOrderData.take_food_code / 100) % 10;
                        that.takeCode[2] = Math.floor(that.getOrderData.take_food_code / 10) % 10;
                        that.takeCode[3] = that.getOrderData.take_food_code % 10;
                        that.takeCodeFood =
                            that.takeCode[0]+'' +
                            that.takeCode[1]+'' +
                            that.takeCode[2]+'' +
                            that.takeCode[3];
                        // console.log(that.getOrderData);
                        //菜品信息 table
                        for (let i in that.getOrderData.dish_data) {
                            if (that.getOrderData.dish_data[i].dish_status == 2 || that.getOrderData.dish_data[i].dish_status == 4) {
                            that.getOrderData.dish_data[i].dish_name ='(退)' + that.getOrderData.dish_data[i].dish_name;
                            }else if(that.getOrderData.dish_data[i].discount_set == '1'){
                            that.getOrderData.dish_data[i].dish_name ='(会)' + that.getOrderData.dish_data[i].dish_name;
                            }
                            that.tableData.push(that.getOrderData.dish_data[i]);
                        }
                        // console.log(that.tableData);
                        //dish和order判断是菜品促销还是结账优惠
                        for (let i in that.getOrderData.promotions) {
                            if(that.getOrderData.promotions[i].pmt_type=='dish'){
                                that.dishPmtTypeArr.push(that.getOrderData.promotions[i]);
                            }else if(that.getOrderData.promotions[i].pmt_type=='order'){
                                that.orderPmtTypeArr.push(that.getOrderData.promotions[i]);
                            }else{
                                return false;
                            }
                        }
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
                    newResData.splice(0, 0, { value: -1, label: that.$t("all")});
                    that.pay_typeText = newChildren;
                    // console.log(newResData); 
                    //console.log(newChildren);
                   
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
            let getPropOjb = this.$route.params.propOjb;
            if(getPropOjb!=undefined&&getPropOjb!=null){
                this.getPropOjb = getPropOjb;
                // console.log(this.getPropOjb);
            }
            this.getDetails();
            this.getpaytype();
            
        }
    },
    
};
</script>

<style>
.gird-box{
    padding: 0 80px 40px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.gird-box .col-gird{
    width: 21%;
    margin-top: 40px;
}
.detail-title span {
    font-size: 14px;
    font-weight: bold;
    color: #232426;
    padding-left: 5px;
}
.detail-title-line {
    width: 200px;
    height: 1px;
    margin-top: 6px;
    background-color: #eee;
}
.detail-lists {
    height: auto;
    overflow: hidden;
}
.detail-items {
    padding: 0;
    margin: 0;
}
.detail-items li {
    list-style: none;
    width: 100%;
    margin-top: 25px;
    overflow: hidden;
}
.detail-items li .parent {
    width: 100%;
    font-size: 12px;
    color: #232426;
    overflow: hidden;
}
.em-text{
    font-style: normal;
    list-style: none;
    font-size: 12px;
}
.detail-items li .parent span {
    float: left;
}
.detail-items li .parent .title {
    font-weight: bold;
    min-width: 100px;
    text-align: left;
}
.children-item {
    overflow: hidden;
    margin-top: 10px;
    font-size: 11px;
}
.children-item .spot {
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 5px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: #303336;
}
.children-item span {
    float: left;
}
.detail-remark {
    border: 1px #ebeef5 solid;
    border-top: 0px;
    height: 60px;
    padding: 15px 30px;
    color: #303336;
}

.detail-tk-box{
    margin-left: 3px;
    margin-top: 25px;
    height: 64px;
    background: #FFFFFF;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    overflow: hidden;
}
.detail-tk-box .tk-item{
    float: left;
    margin-left: 10px;
    margin-top: 13px;
}
.detail-tk-box .tk-item .tk-num{
    font-weight: bold;
    color: #232426;
    font-size: 15px;
    text-align: center;
}
.detail-tk-box .tk-item .tk-txt{
    color: #8C939B;
    font-size: 11px;
    margin-top: 5px;
    text-align: center;
}
.labelCss{
  color: #FE813C;
  border: 1px #FE813C solid;
  border-radius: 2px;
  padding: 1px 3px;
  font-size: 10px;
  margin-left: 4px;
}
</style>