<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-19 19:42:49
 * @LastEditors: Please set LastEditors
 * @Description: 收款方式
 * @FilePath: \sjoyOrderingManage\src\views\employeeManage\payManage.vue
-->
<template>
    <div class="main payManageStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("payManage.shoukuan") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px">
                <el-col class="pay-content">
                    <el-tabs
                        style="width:100%"
                        tab-position="left"
                    >
                        <el-tab-pane
                            v-for="(items, index) in payListData"
                            :key="index"
                            :label="items.dict"
                        >   
                            <div class="pay-checkbox">
                                <div class="tips" v-show="index!=2&&index!=5">
                                    <img src="../../static/images/gt_tips.png" />
                                    <span>{{$t('payManage.tips')}}</span>
                                </div>
                                <div class="tips" v-show="index==5">
                                    <img src="../../static/images/gt_tips.png" />
                                    <span>{{$t('payManage.onCreditTips')}}</span>
                                </div>
                                <el-checkbox
                                    v-if="items.e_wallet.length!=1"
                                    v-model="items.checked"
                                    :disabled='items.disabled'
                                    @change="handleCheckAllChange(items,items.checked)"
                                    >{{$t('all')}}</el-checkbox
                                >
                                <div class="checkbox-group">
                                    <el-checkbox
                                        @change="handleCheckedPayChange(items,item)"
                                        v-for="(item, index) in items.e_wallet"
                                        v-model="item.checked"
                                        :disabled='item.disabled'
                                        :label="item"
                                        :key="index"
                                        >{{ item.dict }}</el-checkbox
                                    >
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col style="margin-left:40%;margin-top:60px">
                    <el-button
                        :loading="saveLoading"
                        class="el-button button themeBtn"
                        style="width: 95px"
                        @click="saveClick"
                        >{{ $t("save") }}</el-button
                    >
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        curentStore() {
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            this.company_id = this.$store.getters.curentStore.faher_ID;
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
            dep_id:"",
            company_id:"",
            saveLoading:false,
            //checkbox
            payListData: [],
            
            getSelectPayType:[],

            //判断是否有银行账户  存入缓存中
            isHasBankInfo: false,
            //判断app中收款设置是否按了扫码收款开关
            isCollecitonSts: false,
            
        };
    },
    methods: {
        //全选
        handleCheckAllChange(items,checked) {
            for (let i in this.payListData) {
                for(let j in this.getSelectPayType){
                    for (let k in this.payListData[i].e_wallet) {
                        if(items.id==this.getSelectPayType[j].id&&items.id==this.payListData[i].id){
                            if(checked){
                                this.payListData[i].e_wallet[k].checked = true;
                                this.getSelectPayType[j].e_wallet = this.stringutils.simpleCopy(this.payListData[i].e_wallet);
                            }else{
                                if(items.id==this.payListData[i].id||this.getSelectPayType[j].e_wallet.length!=0){
                                    this.payListData[i].e_wallet[k].checked = false;
                                    this.getSelectPayType[j].e_wallet.length = 0;
                                }
                            }
                        }
                    }
                }
            }
           
        },
        //单选
        handleCheckedPayChange(items,item) {
            let isChecked = items.e_wallet.every(item=> item.checked !=false); //判断每一项子类是否全选了
            for(let i in this.getSelectPayType){
                if(items.id==this.getSelectPayType[i].id){
                    if(isChecked){
                        items.checked = true;
                    }else{
                        items.checked = false;
                    }
                    this.getSelectPayType[i].e_wallet = items.e_wallet;
                }
                this.getSelectPayType[i].e_wallet = this.getSelectPayType[i].e_wallet.filter(filterData=>filterData.checked == true);
            }
        },
        //保存
        saveClick(){
            console.log(this.getSelectPayType);
            this.upDatePay();
        },
        //支付类型--接口
        getPayType() {
            //判断扫码收款是否可选
            this.getDepBankInfo();
            let that = this;
            this.request.getpaytype({}, function (res) {
                if (res.code == "1") {
                    let res_data = res.data[that.language];
                    that.payListData = that.stringutils.simpleCopy(res_data);
                    that.payListData.forEach((itemData, index) => {
                        that.$set(itemData, 'checked', false);
                        that.$set(itemData, 'disabled', false);
                        itemData.e_wallet.forEach((item) => {
                            that.$set(item, 'checked', false);
                            that.$set(item, 'disabled', false);
                            //挂账消费在web中仅展示不可编辑,需在管家APP中操作使用。
                            if(index==5&&itemData.id=='111'){  
                                that.$set(item, 'disabled', true);
                            }
                        });
                    });
                    let scanPayObj = that.payListData.filter(item=>item.id==45);
                    // console.log(scanPayObj);
                    if(that.isHasBankInfo&&that.isCollecitonSts){
                        scanPayObj[0].disabled = false,
                        scanPayObj[0].e_wallet.forEach(data=>{
                            data.disabled = false;
                        })
                    }else{
                        scanPayObj[0].disabled = true,
                        scanPayObj[0].e_wallet.forEach(data=>{
                            data.disabled = true;
                        })
                    }
                    console.log(that.payListData);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //查询门店配置
        selectDishSet(){
            this.getPayType();
            let that = this;
            this.request.selectDishSet({dept_id: this.dep_id}, function (res){
                if(res.code=="1"){
                    let res_data = res.data;
                    that.getSelectPayType = JSON.parse(res_data.pay_type); 
                    //循环比对是否勾选
                    for (let i in that.getSelectPayType) {
                        for (let j in that.payListData) {
                            if (that.getSelectPayType[i].e_wallet.length==0) {
                                that.payListData[j].checked = false;
                                break;
                            }else{
                                for (let k in that.getSelectPayType[i].e_wallet) {
                                    for (let m in that.payListData[j].e_wallet) {
                                        if (that.getSelectPayType[i].e_wallet[k].id == that.payListData[j].e_wallet[m].id) {
                                            that.payListData[j].e_wallet[m].checked = true;
                                        }
                                        let isChecked =  that.payListData[j].e_wallet.every(item=> item.checked !=false); //判断每一项子类是否全选了
                                        if(isChecked){
                                            that.payListData[j].checked = true;
                                        }else{
                                            that.payListData[j].checked = false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    that.toast.error(res.msg);
                }
                
            })
        },
        //更新支付设置
        upDatePay() {
            let that = this;
            this.saveLoading = true;
            let data = {
                dep_id: this.dep_id,
                pay_type: JSON.stringify(this.getSelectPayType) 
            }
            this.request.updatepay(data, function (res) {
                if (res.code == "1") {
                    that.saveLoading = false;
                    that.toast.success(that.$t("diySucc"));
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //获取收款银行账户
        getDepBankInfo() {
            let that = this;
            this.request.getDepBankInfo({dep_id:this.dep_id}, function (res) {
                if (res.code == "1") {
                    //判断是否有银行账户
                    let res_data = res.data;
                    let isHasBankInfo = false;
                    if(res_data!=null){
                        isHasBankInfo = true;
                        that.getCollecitonInfo()
                    }else{
                        isHasBankInfo = false;
                    }
                    sessionStorage.setItem('isHasBankInfo',JSON.stringify(isHasBankInfo))
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
       
        //获取企业支付信息
        getCollecitonInfo(){
            let that = this;
            let data = {
                company_id:this.company_id,
                dep_id:this.dep_id,
            };
            this.request.getCollecitonInfo(data, function (res) {
                if (res.code == "1") {
                    //判断app中收款设置是否按了扫码收款开关
                    let res_data = res.data;
                    let isCollecitonSts = false;
                    //扫码收款
                    if(res_data[0].sts==0){
                        isCollecitonSts = false;
                    }else{
                        isCollecitonSts = true;
                    }
                    sessionStorage.setItem('isCollecitonSts',JSON.stringify(isCollecitonSts))
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
            this.company_id = curentStore.faher_ID;
            let isHas =JSON.parse(sessionStorage.getItem('isHasBankInfo'));
            let isCol =JSON.parse(sessionStorage.getItem('isCollecitonSts'));
            if(isHas!=null||isCol!=null){
               this.isHasBankInfo = isHas;
               this.isCollecitonSts = isCol;
            }
            // console.log(this.isHasBankInfo);
            // console.log(this.isCollecitonSts);
            this.selectDishSet();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID&&newVal.faher_ID) {
                    this.dep_id = newVal.dep_ID;
                    this.company_id = newVal.faher_ID;
                    this.selectDishSet();
                }
            },
        },
        
    },
};
</script>

<style scoped>
.pay-content {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 300px;
    border: 1px solid #e6eaef;
    box-sizing: border-box;
}
.pay-checkbox {
    margin-left: 40px;
    width: 880px;
}
.pay-content .tips{
    margin-top: 20px;
    color: #bbb;
    font-size: 10px;
    opacity: .75;
}
.pay-content .tips span{
    padding-left: 8px;
}
</style>