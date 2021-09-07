<template>
    <div class="main downManage">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{$t('sidebar.download')}}</div>
            </el-row>
            <hr />
            <el-row
                class="center font13"
                :gutter="20"
                style="margin-top: 90px; margin-left: 30px"
            >
                <!-- 管家APP -->
                <el-col :span="12">
                    <el-row>
                        <el-col :span="12">
                            <img
                                src="../../static/images/MjoyGJ_pic.png"
                                alt=""
                                width="80%"
                            />
                        </el-col>
                        <el-col :span="12" class="codeImg">
                            <img
                                src="../../static/images/MjoyGJ_code.png"
                                alt=""
                                width="40%"
                            />
                            <span class="center font20 spanCss">{{$t('downManage.mjoyManage')}}</span>
                        </el-col>
                        <el-col
                            :span="24"
                            style="padding: 30px 100px; color: #808080"
                        >
                            <p v-if="language=='zh_CN'">
                                【米乐管家】可帮助餐厅管理者实现经营在线化、<br />
                                数据化、移动化，降低运营成本，提升餐厅管理效率和盈利水平。<br />
                                支持多店模式，主要功能有：门店基础管理、员工管理、会员管理、促销管理、库存管理、扫码点餐和外卖管理，并有丰富的数据报表。
                            </p>
                            <p v-else>
                                【MJOY Manager】can help restaurant managers realize online, data-based and mobile operation, reduce operating costs, and improve restaurant management efficiency and profitability.It supports multi stores mode, and its main functions are: store basic management, staff management, membership management, promotion management, stock management, QR order and delivery management, and has rich data reports.
                            </p>
                        </el-col>
                    </el-row>
                </el-col>
                <!-- mjoyfood -->
                <el-col :span="12">
                    <el-row>
                        <el-col :span="12">
                            <img
                                src="../../static/images/MjoyFood_pic.png"
                                alt=""
                                width="80%"
                            />
                        </el-col>
                        <el-col :span="12" class="codeImg">
                            <img
                                src="../../static/images/MjoyFood_code.png"
                                alt=""
                                width="40%"
                            />
                            <span class="center font20 spanCss">{{$t('downManage.mjoyFood')}}</span>
                        </el-col>
                        <el-col
                            :span="24"
                            style="padding: 30px 100px; color: #808080"
                        >
                            <p v-if="language=='zh_CN'">
                                【米乐点评】为用户提供餐厅信息、真实的消费点评<br />以及各种优惠，同时有扫码点餐和外卖功能。<br />
                                餐厅入驻，可以获得更多的线上流量以及经营收入。
                            </p>
                            <p v-else>
                                【MJOYFOOD】can provide users with restaurant information, real consumption reviews and various kinds of discounts, as well as scanning QR code orders and delivery functions. Restaurants can get more online traffic and operating income.
                            </p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="center" :gutter="20" style="margin-top: 90px">
                <!-- 服务员HD -->
                <el-col :span="12">
                    <el-row>
                        <el-col :span="24">
                            <img
                                src="../../static/images/waiterHD_pic.png"
                                alt=""
                                width="60%"
                            />
                        </el-col>
                        <el-col :span="24" class="center top30">
                            <img
                                src="../../static/images/waiterHD_code.png"
                                alt=""
                                width="20%"
                            />
                            <span
                                class="center font20 spanCss"
                                style="width: 100%"
                                >{{$t('downManage.mjoyHd')}}</span
                            >
                        </el-col>
                        <el-col
                            :span="24"
                            style="padding: 30px 100px; color: #808080"
                        >
                            <p v-if="language=='zh_CN'">
                                【米乐服务员】用于餐厅点餐和收银，<br />
                                支持店内点餐以及处理顾客扫码点餐和外卖订单功能，大幅提高服务效率和水平。<br />
                                HD版可在收银机和平板上使用，常规版可在POS机和手机上使用。
                            </p>
                            <p v-else>
                                【MJOY Waiter】 is used for ordering and collection in restaurants, supporting in store ordering and processing customers' scanning QR code orders and delivery orders, which greatly improves the service efficiency and level.The Desktop Pos can be used on cash registers and tablets, while the regular version can be used on POS machines and mobile phones.
                            </p>
                        </el-col>
                    </el-row>
                </el-col>
                <!-- 服务员 -->
                <el-col :span="12">
                    <el-row>
                        <el-col :span="12">
                            <img
                                src="../../static/images/waiter_pic.png"
                                alt=""
                                width="80%"
                            />
                        </el-col>
                        <el-col :span="12" class="codeImg">
                            <img
                                src="../../static/images/waiter_code.png"
                                alt=""
                                width="40%"
                            />
                            <span class="center font20 spanCss"
                                >{{$t('downManage.mjoyMobile')}}</span
                            >
                        </el-col>
                        <el-col
                            :span="24"
                            style="padding: 30px 100px; color: #808080"
                        >
                            <p v-if="language=='zh_CN'">
                                【米乐服务员】用于餐厅点餐和收银，<br />
                                支持店内点餐以及处理顾客扫码点餐和外卖订单功能，大幅提高服务效率和水平。<br />
                                HD版可在收银机和平板上使用，常规版可在POS机和手机上使用。
                            </p>
                            <p v-else>
                                【MJOY Waiter】 is used for ordering and collection in restaurants, supporting in store ordering and processing customers' scanning QR code orders and delivery orders, which greatly improves the service efficiency and level.The Desktop Pos can be used on cash registers and tablets, while the regular version can be used on POS machines and mobile phones.
                            </p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
        token: {
            get() {
                return this.$store.getters.token;
            },
            set(val) {},
        },
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
<style scoped>
.noteCss {
    width: 50%;
    position: relative;
    left: 33%;
    margin-top: 60px;
    color: #808080;
}
.codeImg {
    position: relative;
    top: 75%;
    transform: translateY(75%);
    text-align: left;
}
.spanCss {
    display: block;
    width: 40%;
    font-weight: 400;
}
.codeBg {
    background-image: url("../../static/images/guanjiaBg.png");
    background-repeat: no-repeat;
    background-size: 165px 97%;
}
</style>