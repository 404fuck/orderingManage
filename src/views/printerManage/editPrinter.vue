<!--
 * @Author: zzt
 * @Date: 2020-11-17 09:44:20
 * @LastEditTime: 2021-03-31 17:44:05
 * @LastEditors: Please set LastEditors
 * @Description: 编辑打印机
 * @FilePath: \sjoyOrderingManage\src\views\printerManage\editPrinter.vue
-->

<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <router-link tag="a" :to="{name: 'printerManage', params: {index:selectTab}}" class="crumbsLink">{{ $t("sidebar.dayinji") }}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span style="color: #232426">
                   {{titleList[selectTab]}}
                </span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-content">
            <el-row style="padding-top:20px">
                <div class="title-line">{{titleList[selectTab]}}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="185px"
                >   
                    <!-- 打印机型号 -->
                    <el-form-item :label="$t('addPrinter.printModel')" prop>
                        <el-radio label="0"
                            v-model="printMode"
                            >{{$t('addPrinter.feie')}}</el-radio
                        >
                    </el-form-item>
                    <!-- 打印机名称 -->
                    <el-form-item :label="$t('addPrinter.name_')" prop="name">
                        <el-input
                            class="value-input"
                            v-model="ruleForm.name"
                            :placeholder="$t('addPrinter.inputName')"
                        ></el-input>
                    </el-form-item>
                    <!-- 打印机终端号 -->
                    <el-form-item
                        :label="$t('addPrinter.num')"
                        prop="equipment"
                    >
                        <el-input
                            class="value-input"
                            v-model="ruleForm.equipment"
                            :placeholder="$t('addPrinter.inputNum')"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <!-- 密钥 -->
                    <el-form-item :label="$t('addPrinter.key')" prop="secret">
                        <el-input
                            class="value-input"
                            v-model="ruleForm.secret"
                            :placeholder="$t('addPrinter.inputKey')"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <!-- 小票纸宽度 -->
                    <el-form-item :label="$t('addPrinter.paperW')" v-if="selectTab!=2">
                        <el-radio-group
                            disabled
                            v-model="ruleForm.print_type"
                            class="labelContent"
                        >
                            <el-radio label="2">58mm</el-radio>
                            <el-radio label="3">80mm</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 打印份数 -->
                    <el-form-item
                        :label="$t('addPrinter.count')"
                    >
                        <el-input-number
                            style="width: 110px"
                            v-model="ruleForm.print_num"
                            :min="1"
                            :max="5"
                            size="small"
                        ></el-input-number>
                    </el-form-item>
                    <!-- 一菜一切 -->
                    <el-form-item
                        v-if="selectTab == '0'"
                    >   
                        <span slot="label">
                            <span>{{ $t('addPrinter.isOne') }}</span>
                            <el-tooltip
                                effect="light"
                                content=""
                                placement="right"
                            >
                                <span 
                                    slot="content"
                                    >{{$t('addPrinter.content')}}</span
                                >
                                <img
                                    src="../../static/images/tips.png"
                                    class="left5"
                                />
                            </el-tooltip>
                            <span>：</span>
                        </span>
                        
                        <el-radio-group
                            v-model="ruleForm.iscut"
                            class="labelContent"
                        >
                            <el-radio label="1">{{$t('yes')}}</el-radio>
                            <el-radio label="0">{{$t('no')}}</el-radio>
                        </el-radio-group>
                        
                    </el-form-item>
                    <!-- 打印菜品 -->
                    <el-form-item :label="$t('addPrinter.dish')" class="row-printerTab row-grade" v-show="selectTab != '1'">
                        <div class="grade-centent">
                            <div class="row-tab-pane" :class="language=='zh_CN'?'left50':''" style="border: 1px solid #e6eaef;">
                                <el-tabs
                                    :tab-position="'left'"
                                >
                                    <el-tab-pane
                                        v-for="(items, index) in dishList"
                                        :key="index"
                                    >
                                        <div slot="label">
                                            <div style="line-height:42px">{{ items.type_name|text }}</div>
                                            <div style="line-height:0">{{ items.type_name_en|text }}</div>
                                        </div>
                                        <div class="check-all">
                                            <el-checkbox v-model="items.isChecked" @change="handleCheckAllChange(items,items.isChecked)">{{ $t("all") }}</el-checkbox>
                                        </div>
                                        <el-checkbox 
                                            v-for="(item,index) in items.dishSimpleVOS" 
                                            :label="item" 
                                            :key="index"
                                            v-model="item.isChecked"
                                            @change="handleSonChange(items)"
                                        >{{item.dish_name}}</el-checkbox>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                    </el-form-item>
                    <!-- 打印小票 -->
                    <div :style="{'margin-left':(language=='zh_CN'?'80px':'60px')}" class="row-ticket"  v-show="selectTab == '1'" >
                        <span slot="label">
                            <span class="font14 fontWeight left5">{{$t('addPrinter.copyTypes')}}</span>
                            <el-tooltip
                                effect="light"
                                content=""
                                placement="right"
                            >
                                <span 
                                    slot="content"
                                    >{{$t('addPrinter.content2')}}</span
                                >
                                <img
                                    src="../../static/images/tips.png"
                                    class="left5"
                                />
                            </el-tooltip>
                            <span class="font14 fontWeight">：</span>
                        </span>
                        <el-row
                            class="ticket-box"
                        >
                            <el-col
                                :span="5"
                                style="
                                    border-right: 1px #ccc solid;
                                    margin: 15px 0;
                                "
                                class="center"
                            >
                                <el-checkbox
                                    :disabled="enableAll"
                                    v-model="isCheckAll"
                                    class="check-all"
                                    @change="handleCheckPriterAllChange(isCheckAll)"
                                    >{{$t('all')}}</el-checkbox
                                >
                            </el-col>
                            <el-col :span="15" style="margin-left: 60px">
                                <el-row>
                                    <el-col
                                        :span="12"
                                        v-for="(item,index) in printTypeOptions"
                                        :key="index"
                                        class="top15"
                                    >
                                        <el-checkbox
                                            v-model="item.select"
                                            @change="handleCheckedPriterChange(printTypeOptions)"
                                            :disabled="item.enable"
                                            >
                                                {{pmtValue[item.order_id-1] }}
                                                <el-tooltip effect="light" placement="right" v-if="index==7">
                                                    <span 
                                                        slot="content"
                                                        >{{$t('payManage.onCreditTips')}}</span
                                                    >
                                                    <img
                                                        src="../../static/images/tips.png"
                                                        class="left5"
                                                    />
                                                </el-tooltip>
                                            </el-checkbox
                                        >
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                    <div style="margin-left: 120px; margin-top: 50px">
                        <el-button
                            class="themeBtn"
                            type="primary"
                            :loading="okLoading"
                            @click="submitForm('ruleForm')"
                            >{{ $t("save") }}</el-button
                        >
                        <el-button
                            class="themeBtn"
                            style="margin-left: 20px"
                            type="primary"
                            @click="submitFormReset('ruleForm')"
                            >{{ $t("addPrinter.saveAndBegin") }}</el-button
                        >
                        <el-button
                            class="cancelBtn"
                            style="margin-left: 20px"
                            type="primary"
                            @click="cancelClick"
                            >{{ $t("cancel") }}</el-button
                        >
                    </div>
                </el-form>
            </el-row>
        </div>
        <el-dialog 
            :visible.sync="printerBound"
            width="20%" 
        >    
            <div class="center font14" style="padding:20px">
                <span>{{$t('addPrinter.msg1')}}</span>
                <span> {{ `"${boundMsg}",`}}</span>   
                <span>{{$t('addPrinter.msg2')}}</span>
            </div>
            <div class="top10 center">
                <el-button
                    class="themeBtn"
                    size="small"
                    style="width: 90px"
                    @click="printerBound = false"
                    >{{ $t("ok") }}</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    computed: {
        curentStore() {
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        language(){
            return this.$store.getters.language;
        },
    },
    data() {
        return {
            selectTab: 0,
            titleList:[
                this.$t('addPrinter.editKit'),
                this.$t('addPrinter.editCas'),
                this.$t('addPrinter.editLab'),
            ],
            dep_id:"",
            dishList: [],
            getDataList:[],
            printTypeOptions: [],
            printMode:"0",
            okLoading:false,
            loading:false,
            ruleForm: {},
            rules: {
                name: [
                    {
                        required: true,
                        message: this.$t("addPrinter.inputName"),
                        trigger: "blur",
                    },
                ],
                secret: [
                    {
                        required: true,
                        message: this.$t("addPrinter.inputKey"),
                        trigger: "blur",
                    },
                ],
                equipment: [
                    {
                        required: true,
                        message: this.$t("addPrinter.inputNum"),
                        trigger: "blur",
                    },
                ],
            },
            isCheckAll:false,
            enableAll:false,
            pmtValue: [
                this.$t('addPrinter.customerCopy'),
                this.$t('addPrinter.cashierShift'),
                this.$t('addPrinter.invoice'),
                this.$t('addPrinter.salesShift'),
                this.$t('addPrinter.refundRe'),
                this.$t('addPrinter.memberCard'),
                this.$t('addPrinter.preBilling'),
                this.$t('addPrinter.onAccount'),
            ],
            printerBound: false,
            boundMsg: "",
            
        };
    },
    methods: {
        // 打印小票 
        handleCheckPriterAllChange(isCheckAll) {
            this.printTypeOptions.forEach(item=>{
                if(isCheckAll){
                    if(item.enable){
                        item.select = false;
                    }else{
                        item.select = true;
                    }
                }else{
                    item.select = false;
                }
            })
        },
        handleCheckedPriterChange(listData) {
            let filterEnable = this.stringutils.simpleCopy(listData);
            filterEnable = filterEnable.filter(filt=>filt.enable!==true);
            let isSonChecked = filterEnable.every(ever=> ever.select !=false); //判断每一项子类是否全选了
            // console.log(isSonChecked);
            //选择了单个赋值
            if(isSonChecked){
                this.isCheckAll = true;
            }else{
                this.isCheckAll = false;
            }
        },
        getOrdertype(isRest) {
            let data = {
                dep_id: this.dep_id,
            };
            let that = this;
            this.loading = true;
            this.request.ordertype(data, function (res) {
                that.loading = false;
                if (res.code == "1") {
                    let res_data = res.data;
                    that.printTypeOptions = res_data;
                    if(isRest){
                        that.printTypeOptions.forEach((item,index)=>{
                            that.$set(item,'select',false);
                            if(item.print_id>0){
                                if(that.$route.query.id==item.print_id){
                                    that.$set(item,'enable',false);
                                }else{
                                    that.$set(item,'enable',true);
                                }
                            }else{
                                that.$set(item,'enable',false);
                            }
                            if(index==7){
                                that.$set(item,'enable',true); //挂账功能目前先未开放 
                            }
                        });
                        let isEnableAll = that.printTypeOptions.every(item=> item.enable !=false); 
                        let isSelectAll = that.printTypeOptions.every(item=> item.select !=false); 
                        if(isSelectAll){
                            that.enableAll = false;
                            that.isCheckAll = true;
                            
                        }else{
                            if(isEnableAll){
                                that.enableAll = true;
                            }else{
                                that.enableAll = false;
                            }
                            that.isCheckAll = false;
                            
                        }
                    }else{
                        that.printTypeOptions.forEach((item,index)=>{
                            if(item.print_id>0){
                                if(that.$route.query.id==item.print_id){
                                    that.$set(item,'select',true);
                                    that.$set(item,'enable',false);
                                }else{
                                    that.$set(item,'select',false);
                                    that.$set(item,'enable',true);
                                }
                            }else{
                                that.$set(item,'select',false);
                                that.$set(item,'enable',false);
                            }
                            if(index==7){
                                that.$set(item,'enable',true); //挂账功能目前先未开放 
                            }
                        });
                        let isEnableAll2 = that.printTypeOptions.every(item=> item.enable !=false); 
                        let isSelectAll2 = that.printTypeOptions.every(item=> item.select !=false); 
                        if(isSelectAll2){
                            that.enableAll = false;
                            that.isCheckAll = true;
                        }else{
                            if(isEnableAll2){
                                that.enableAll = true;
                            }else{
                                that.enableAll = false;
                            }
                            that.isChecked = false;
                            
                        }
                    }
                    console.log(that.printTypeOptions);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        
        //打印添加菜品 选择
        handleCheckAllChange(currItems,checked) {
            currItems.dishSimpleVOS.forEach(dataSon=>{
                if(checked){
                    dataSon.isChecked = true;
                }else{
                    dataSon.isChecked = false;
                }
                
            })
            // console.log(currItems,checked);
        },
        handleSonChange(currItems){
            let isSonChecked = currItems.dishSimpleVOS.every(item=> item.isChecked !=false); //判断每一项子类是否全选了
            // console.log(isSonChecked);
            //选择了单个赋值
            if(isSonChecked){
                currItems.isChecked = true;
               
            }else{
                currItems.isChecked = false;
                currItems.isEdit = false;
            }
        },
        getQueryList(isRest) {
            let data = {
                dep_id: this.dep_id,
                param: 5, //5仅为打印设备中加载菜品列表使用
                str_param: "",
            };
            let that = this;
            this.loading = true;
            this.request.queryList(data, function (res) {
                that.loading = false;
                if (res.code == "1") {
                    that.dishList = res.data;
                    that.dishList = that.dishList.filter(item=>item.dishSimpleVOS.length>0);
                    if(isRest){
                        that.dishList.forEach(data => {
                            that.$set(data,'isChecked',false);
                            data.dishSimpleVOS.forEach(dataSon => {
                                that.$set(dataSon,'isChecked',false);
                            });
                        });

                    }else{
                        that.dishList.forEach(data => {
                            that.$set(data,'isChecked',false);
                            data.dishSimpleVOS.forEach(dataSon => {
                                that.$set(dataSon,'isChecked',false);
                                if(dataSon.print_info!=null&&dataSon.print_info.length>0){
                                    dataSon.print_info.forEach(print=>{
                                        if(print.id==that.$route.query.id){
                                            dataSon.isChecked = true;
                                            if(dataSon.box_id==null||dataSon.box_id==""||dataSon.box_id==undefined){
                                                dataSon.comTypeID = dataSon.dish_id;
                                            }else{
                                                dataSon.comTypeID = dataSon.box_id;
                                            }
                                            //得到当前选择的数组
                                            that.getDataList.push(dataSon);
                                        }
                                    })                                                 
                                }    
                            });
                            let isSonChecked = data.dishSimpleVOS.every(item=> item.isChecked !=false); //判断每一项子类是否全选了
                            if(isSonChecked){
                                data.isChecked = true;
                            }
                        });
                    }
                    // console.log(that.dishList);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //获取单个打印机信息
        printDetail() {
            let data = {
               id: this.$route.query.id,
               dep_id:this.dep_id
            };
            let that = this;
            this.request.printDetail(data, function (res) {
                if (res.code == "1") {
                    let res_data = res.data;
                    that.ruleForm = res_data;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        editPrint(back) {
            this.okLoading = true;
            let that = this;
            let handleDishList = [];
            let objList0 = [],objList1 = [],objList2 = [],objList3 = [];
            if (this.selectTab == 1) {
                //收银打印机
                this.ruleForm.iscash = 1;
                this.ruleForm.list = [];
                this.printTypeOptions.forEach(data => {
                    if(data.select){
                        data.print_id = this.$route.query.id;
                    }else{
                        if(data.print_id==this.$route.query.id){
                            data.print_id = 0;
                        }
                    }
                });
                // this.printTypeOptions = this.printTypeOptions.filter(filt=> delete filt.select&& delete filt.enable);
                this.ruleForm.print_orders = JSON.stringify(this.printTypeOptions);
                // console.log(this.printTypeOptions);
            }else{
                //后厨和标签打印机
                if (this.selectTab == 2) {
                    //标签打印机
                    this.ruleForm.print_type = '1';
                }
                this.ruleForm.iscash = 0;
                this.ruleForm.print_orders = null;
                this.dishList.forEach(items => {
                    items.dishSimpleVOS.forEach(item => {
                        if(items.type_id==-2){
                            // 餐盒关联打印机
                            this.getDataList.forEach(data=>{
                                if(data.box_id==item.box_id){
                                    if(!item.isChecked){
                                        let Obj0 = {
                                            isprint:0,
                                            relate_type: 1,
                                            type_id: item.box_id
                                        };
                                        objList0.push(Obj0);
                                    }
                                }
                            });
                            if(item.isChecked){
                                let Obj1 = {
                                    isprint:1,
                                    relate_type: 1,
                                    type_id: item.box_id
                                };
                                objList1.push(Obj1);
                            }
                        }else{
                            //菜品关联打印机
                            this.getDataList.forEach(data=>{
                                if(item.dish_id==data.dish_id){
                                    if(!item.isChecked){
                                        let Obj2 = {
                                            isprint:0,
                                            relate_type: 0,
                                            type_id: item.dish_id
                                        };
                                        objList2.push(Obj2);
                                    }
                                }
                            });
                            if(item.isChecked){
                                let Obj3 = {
                                    isprint:1,
                                    relate_type: 0,
                                    type_id: item.dish_id
                                };
                                objList3.push(Obj3);
                            }
                        }
                    });
                });
                handleDishList = [...objList3,...objList2,...objList1,...objList0];
                // 去重
                for (let i in handleDishList) {
                    for (let j in this.getDataList) {
                        if(handleDishList[i].type_id==this.getDataList[j].comTypeID&&handleDishList[i].isprint==1){
                            handleDishList.splice(i,1);
                        }
                    }
                }
                this.ruleForm.list = handleDishList;
                // console.log(handleDishList);
                // console.log(this.getDataList);
            }
            this.ruleForm.dep_id = this.dep_id;
            this.request.editPrint(this.ruleForm, function (res) {
                that.okLoading = false;
                if (res.code == "1") {
                    that.toast.success(that.$t("addSucc"));
                    if (back) {
                        that.$router.push({name: "printerManage",params: {index:that.selectTab}});
                    } else {
                        that.resetForm("ruleForm");
                    }
                } else if (res.code == -9) {
                    that.boundMsg = res.msg;
                    that.printerBound = true;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        cancelClick() {
            this.$router.push({name: "printerManage",params: {index:this.selectTab}});
        },
        submitFormReset(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editPrint(false);
                } else {
                    return false;
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editPrint(true);
                } else {
                    return false;
                }
            });
        },
        //重置 ---用来保存并继续添加
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.ruleForm.print_type = '2';
            this.printDisabled = false;
            this.ruleForm.print_num = 1;
            if (this.selectTab == 1) {
                //收银机
                this.getOrdertype(true);
            }else{
                this.getQueryList(true);
            }
        },
        
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            this.dep_id = curentStore.dep_ID;
            //console.log('重新加载数据' + curentStore.dep_ID)
            this.printDetail();
            this.selectTab = this.$route.query.index;
            if(this.selectTab==1){
                this.getOrdertype(false);
            }else{
                this.getQueryList(false);
            }
        }
    },
};
</script>
<style scoped>
.value-input {
    width: 350px;
    height: 35px;
}
ul {
    padding: 0px;
}
ul li {
    list-style: none;
}
.labelBlock {
    display: block;
    color: #232426;
    font-weight: bold;
    font-size: 14px;
}
.inputText {
    width: 400px;
    border-radius: 0.074074rem;
    border: 0.018519rem solid #dcdfe6;
}
.inputText span {
    float: right;
    position: relative;
    right: 10px;
}
.ticket-box{
    margin-top: 20px;
    border: 1px #d3d9e2 solid;
    width: 550px;
    padding-bottom: 20px;
    margin-left: 5px;
}
</style>