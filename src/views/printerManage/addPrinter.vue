<!--
 * @Author: zzt
 * @Date: 2020-11-17 09:44:20
 * @LastEditTime: 2021-03-31 17:43:02
 * @LastEditors: Please set LastEditors
 * @Description: 添加打印机
 * @FilePath: \sjoyOrderingManage\src\views\printerManage\addPrinter.vue
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
                            @blur="checkPrint"
                        ></el-input>
                    </el-form-item>
                    <!-- 密钥 -->
                    <el-form-item :label="$t('addPrinter.key')" prop="secret">
                        <el-input
                            class="value-input"
                            v-model="ruleForm.secret"
                            :placeholder="$t('addPrinter.inputKey')"
                        ></el-input>
                    </el-form-item>
                    <!-- 小票纸宽度 -->
                    <el-form-item :label="$t('addPrinter.paperW')" v-if="selectTab!=2">
                        <el-radio-group
                            :disabled='printDisabled'
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
                    <div style="margin-left: 120px; margin-top: 60px">
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
        //打印机终端号
        equipMent(){
            return this.ruleForm.equipment;
        }
    },
    data() {
        return {
            selectTab: 0,
            titleList:[
                this.$t('addPrinter.addKit'),
                this.$t('addPrinter.addCas'),
                this.$t('addPrinter.addLab'),
            ],
            dep_id:"",
            dishList: [],
            printTypeOptions: [],
            printMode:"0",
            okLoading:false,
            loading:false,
            printDisabled:false,
            isCheckPrint:true,
            ruleForm: {
                dep_id:'',
                equipment: null, //设备号 ,
                iscut: "1", //是否一菜一切，0为否，1为是,
                iscash: 0, //是否为收银打印机，0为不是，1为是 ,
                list: null, // 打印菜品类别 ,
                print_orders: null, //打印小票类型
                name: null, //设备名 ,
                secret: null, //秘钥 ,
                print_num: 1,
                print_type: "2", //打印机型号，0为中午打印机，1为飞蛾标签打印机，2为飞蛾58mm订单打印机,3为飞蛾80mm打印机 ,
                sound:0,
            },
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
            headTitles: [
                { id: 0, value: this.$t('printerManage.kitchenPrinter')},
                { id: 1, value: this.$t('printerManage.cashierPrinter')},
                { id: 2, value: this.$t('printerManage.labelPrinter')},
            ],
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
        getOrdertype() {
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
                    that.printTypeOptions.forEach((item,index)=>{
                        that.$set(item,'select',false);
                        if(item.print_id>0){  
                            that.$set(item,'enable',true);
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
            }
            
        },
        getQueryList() {
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
                    that.dishList.forEach(data => {
                        that.$set(data,'isChecked',false);
                        data.dishSimpleVOS.forEach(dataSon => {
                            that.$set(dataSon,'isChecked',false);
                        });
                    });
                    // console.log(that.dishList);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        addPrint(back) {
            this.okLoading = true;
            let that = this;
            let handleDishList = [];
            let objList1 = [],objList2 = [];
            if (this.selectTab == 1) {
                //收银打印机
                this.ruleForm.iscash = 1;
                this.ruleForm.list = [];
                this.ruleForm.iscut = "";
                this.printTypeOptions.forEach(data => {
                    if(data.select){
                        data.print_id = 1;
                    }else{
                        if(data.print_id==0){
                            data.print_id = 0;
                        }
                        
                    }
                });
                // this.printTypeOptions = this.printTypeOptions.filter(filt=> delete filt.select && delete filt.enable);
                this.ruleForm.print_orders = JSON.stringify(this.printTypeOptions);
                // console.log(this.printTypeOptions);
            } else{
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
                            if(item.isChecked){
                                let Obj2 = {
                                    isprint:1,
                                    relate_type: 0,
                                    type_id: item.dish_id
                                };
                                objList2.push(Obj2);
                            }
                        } 

                    });
                });
                handleDishList = [...objList2,...objList1];
                this.ruleForm.list = handleDishList;
                //console.log(handleDishList);
                // console.log(this.dishList);
               
            }
            this.ruleForm.dep_id = this.dep_id;
            this.request.addPrint(this.ruleForm, function (res) {
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
                    this.addPrint(false);
                } else {
                    return false;
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addPrint(true);
                } else {
                    return false;
                }
            });
        },
        //重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.ruleForm.print_type = '2';
            this.printDisabled = false;
            this.ruleForm.print_num = 1;
            if (this.selectTab == 1) {
                //收银机
                this.getOrdertype();
            }else{
                this.getQueryList();
            }
        },
        //校验终端号
        checkPrint(){
            if(!this.isCheckPrint){
                this.toast.error('终端号输入错误');
            }
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            this.dep_id = curentStore.dep_ID;
            //console.log('重新加载数据' + curentStore.dep_ID)
            this.selectTab = this.$route.query.index;
            if(this.selectTab==1){
                this.getOrdertype();
            }else{
                this.getQueryList();
            }

        }
    },
    watch:{
        equipMent(newVal, oldVal){
            if (newVal) {
                /**
                 * 判断 编号第四位 【从左向右数】
                 * 1：如果是2就是标签机如果不是就是小票机
                 * 2： 小票机 中再判断  第四位 如果是0或者5  那就是58    如果是8那就是80  ，如果是7就是76针式打印机【76针式一般用不到】
                */
                let key = newVal.substring(3,4);
                if(this.selectTab==2){
                    if(key==2){
                        this.ruleForm.print_type = '1';
                        this.isCheckPrint = true;
                    }else{
                        this.isCheckPrint = false;
                        this.printDisabled = false;
                    }

                }else{
                    if(key == 0 || key == 5){
                        this.ruleForm.print_type = '2';
                        this.printDisabled = true;
                        this.isCheckPrint = true;
                    } else if (key == 8) {
                        this.ruleForm.print_type = '3';
                        this.printDisabled = true;
                        this.isCheckPrint = true;
                    } else {
                        //校验失败
                        this.isCheckPrint = false;
                        this.printDisabled = false;
                    }
                } 
                
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