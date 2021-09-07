<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-31 16:43:48
 * @LastEditors: Please set LastEditors
 * @Description: 添加职级
 * @FilePath: \sjoyOrderingManage\src\views\employeeManage\addGrade.vue
-->
<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <router-link tag="a" to='employeeManage' class="crumbsLink">{{ $t("sidebar.yuangong") }}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span style="color: #232426">{{
                    $t("grade.add")
                }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("grade.add") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 20px">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="160px"
                >
                    <!-- 职级名称-->
                    <el-row>
                        <el-form-item :label="$t('grade.name')+'：'" prop="class_name">
                            <el-input
                                v-model="ruleForm.class_name"
                                class="value-input"
                                :placeholder="$t('grade.inputName')"
                            ></el-input>
                        </el-form-item>
                    </el-row>
                    <!-- 门店范围 -->
                    <el-row>
                        <el-form-item :label="$t('grade.storeRange')+'：'">
                            <el-radio-group v-model="ruleForm.cross_store">
                                <el-radio label="0">{{$t('grade.single')}}</el-radio>
                                <el-radio label="1">{{$t('grade.multi')}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- 跨店展示 选择门店 -->
                        <div
                            class="select-storeShow"
                            v-if="ruleForm.cross_store == '1'"
                        >
                            <div class="title">{{$t('grade.selectStore')}}</div>
                                <el-checkbox 
                                    v-for="(item,index) in ruleForm.dep_list" 
                                    :label="item" 
                                    :key="index"
                                    v-model="item.chosen"
                                >{{item.dep_comp_name}}</el-checkbox>
                            <div class="noDataTxt" v-if="ruleForm.dep_list.length==0">{{$t('grade.noStores')}}</div>
                        </div>
                    </el-row>
                    <!-- 职级权限 -->
                    <el-row class="row-grade">
                        <el-form-item :label="$t('grade.zhijiquanxian')+'：'">
                            <div class="grade-centent">
                                <ul class="gradeTab">
                                    <li
                                        v-for="(item, index) in gradeTabTitle"
                                        :key="index"
                                        :class="{ active: isActive === index }"
                                        @click="gradeTabClick(index)"
                                    >
                                        {{ item }}
                                    </li>
                                </ul>
                                <div class="row-tab-pane">
                                    <!-- 管家权限 -->
                                    <el-tabs :tab-position="'left'" v-show="isActive==0">
                                        <el-tab-pane 
                                            :label="items.role_classify"
                                            v-for="(items,index) in ruleForm.manager_role_list"
                                            :key="index"
                                            
                                        >
                                            <div class="check-all">
                                                <el-checkbox v-model="items.isChecked" @change="handleCheckAllChange(items,items.isChecked)">{{ $t("all") }}</el-checkbox>
                                            </div>
                                            <el-checkbox 
                                                v-for="(item,index) in items.role_list" 
                                                :label="item" 
                                                :key="index"
                                                :disabled="item.enable"
                                                v-model="item.role_chose"
                                                @change="handleSonChange(items,item)"
                                            >{{item.role_name}}</el-checkbox>
                                            
                                        </el-tab-pane>
                                    </el-tabs>
                                    <!-- 点餐收银权限 -->
                                    <el-tabs :tab-position="'left'" v-show="isActive==1">
                                        <el-tab-pane
                                            :label="items.role_classify"
                                            v-for="(items,index) in ruleForm.receipt_role_list"
                                            :key="index"
                                        >
                                                <div class="check-all">
                                                    <el-checkbox v-model="items.isChecked" @change="handleCheckAllChange(items,items.isChecked)">{{$t('all')}}</el-checkbox>
                                                </div>
                                                <el-checkbox 
                                                    v-for="(item,index) in items.role_list" 
                                                    :label="item" 
                                                    :key="index"
                                                    :disabled="item.enable"
                                                    v-model="item.role_chose"
                                                    @change="handleSonChange(items,item)"
                                                >{{item.role_name}}</el-checkbox>
                                        </el-tab-pane>
                                    </el-tabs>
                                </div>
                            </div>
                        </el-form-item>
                    </el-row>
                    <!-- 保存提交 取消 -->
                    <el-row class="row-button">
                        <el-button
                            class="themeBtn"
                            type="primary"
                            @click="submitForm('ruleForm')"
                            >{{ $t("save") }}</el-button
                        >
                        <el-button
                            class="themeBtn"
                            type="primary"
                            @click="submitFormReset('ruleForm')"
                            >{{$t('grade.saveAndBegin')}}</el-button
                        >
                        <el-button
                            class="cancelBtn"
                            type="primary"
                            @click="cancelForm"
                            >{{ $t("cancel") }}</el-button
                        >
                    </el-row>
                </el-form>
            </el-row>
        </div>
    </div>
</template>
<script>

export default {
    computed: {
        curentStore() {
            this.dep_ID = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        loginInfo() {
            this.company_id = this.$store.getters.curentStore.company_id;
            return this.$store.getters.loginInfo;
        },
        language(){
            return this.$store.getters.language;
        },
        businessModel() {
            return this.$store.getters.businessModel;
        },
    },
    data() {
        return {
            dep_ID: "",
            company_id:"",
            //tab 切换
            gradeTabTitle: [this.$t('grade.manage'), this.$t('grade.HD')],
            isActive: 0,
            //添加职级
            ruleForm:{},
            rules: {
                class_name: [
                    {
                        required: true,
                        message: this.$t('grade.inputName'),
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods:{
        //职级权限切换
        gradeTabClick(index){
            this.isActive = index;
        },

        //门店范围跨店--checkbox多选框
        //管家权限--checkbox多选框
        handleCheckAllChange(currItems,checked) {
            if(checked){
                currItems.role_list.forEach(dataSon=>{
                    if(dataSon.enable==true){
                        dataSon.role_chose = false;
                    }else{
                        dataSon.role_chose = true;
                    }
                })
            }else{
                currItems.role_list.forEach(dataSon=>{
                    dataSon.role_chose = false;
                })
            }
        },
        handleSonChange(currItems,currItem){
            let isSonChecked = currItems.role_list.every(item=> item.role_chose !=false); //判断每一项子类是否全选了
            console.log(isSonChecked);
            //选择了单个赋值
            if(isSonChecked){
                currItems.isChecked = true;
            }else{
                currItems.isChecked = false;
            }
        },

        //
        //接口职级权限列表
        classDetail(){
            let data = {
                dep_id: this.dep_ID,
                job_level_code:"",
            };
            let that = this;
            this.request.classDetail(data, res=> {
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;
                        that.ruleForm = res_data;
                        that.ruleForm.cross_store = '0';
                        //插入 isChecked字段
                        that.ruleForm.manager_role_list.forEach(items=>{
                            that.$set(items,'isChecked',false);
                            items.role_list.forEach(dataSon=>{
                                that.$set(dataSon,'enable',false);
                                if(dataSon.role_chose=='1'){
                                    dataSon.role_chose = true;
                                }else{
                                    dataSon.role_chose = false;
                                }
                            })
                        })
                        that.ruleForm.receipt_role_list.forEach(items=>{
                            that.$set(items,'isChecked',false);
                            items.role_list.forEach(dataSon=>{
                                that.$set(dataSon,'enable',false);
                                if(dataSon.role_chose=='1'){
                                    dataSon.role_chose = true;
                                }else{
                                    dataSon.role_chose = false;

                                }
                                //判断经营设置的交接班功能是否开启
                                if(dataSon.role_code=='ROLE_WAITER_SHIFT'&&that.businessModel.shift_duty=='0'){
                                    that.$set(dataSon,'enable',true);
                                }
                                //外卖订单暂不开启
                                if(dataSon.role_code=='ROLE_ORDER_ONLINE_STORE_DELIVERY'){
                                    that.$set(dataSon,'enable',true);
                                }
                            })
                        })
                        that.ruleForm.dep_list.forEach(items=>{
                            if(items.chosen=='1'){
                                items.chosen = true;
                            }else{
                                items.chosen = false;
                            }
                        })
                        console.log(that.ruleForm);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });

        },
        // 职级添加
        classAddOrModify(back){
            let that = this;
            this.ruleForm.manager_role_list.forEach(items=>{
                items.role_list.forEach(dataSon=>{
                    if(dataSon.role_chose==true){
                        dataSon.role_chose = '1';
                    }else{
                        dataSon.role_chose = '0';
                    }
                })
            })
            this.ruleForm.receipt_role_list.forEach(items=>{
                items.role_list.forEach(dataSon=>{
                    if(dataSon.role_chose==true){
                        dataSon.role_chose = '1';
                    }else{
                        dataSon.role_chose = '0';
                    }
                })
            })
            
            this.ruleForm.dep_list.forEach(items=>{
                if(items.chosen==true){
                    items.chosen = '1';
                }else{
                    items.chosen = '0';
                }
            })
            this.request.classAddOrModify(this.ruleForm,res=>{
                if(res.code=="1"){
                    that.toast.success(that.$t("addEmployee.saveSucc"));
                    if (back) {
                        that.$router.back(-1);
                    } else {
                        that.resetForm("ruleForm");
                    }
                }else{
                    that.toast.error(res.msg);
                }
            })
        },
        // 保存
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let isDepChecked =  this.ruleForm.dep_list.every(item=>item.chosen ==false);
                    if(isDepChecked&&this.ruleForm.cross_store == 1){
                        this.toast.info(this.$t('grade.selectMsg'));
                        return false;
                    }else{
                        this.classAddOrModify(true);
                    }
                   
                } else {
                    return false;
                }
            });
        },
        //保存并继续添加职级
        submitFormReset(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let isDepChecked =  this.ruleForm.dep_list.every(item=> item.chosen ==false);
                    if(isDepChecked&&this.ruleForm.cross_store == 1){
                        this.toast.info(this.$t('grade.selectMsg'));
                        return false;
                    }else{
                        this.classAddOrModify(false);
                       
                    }
                } else {
                    return false;
                }
            });
        },
        //取消
        cancelForm() {
            this.$router.back(-1);
        },
         //重置
        resetForm(formName) {
            this.ruleForm.manager_role_list.forEach(items=>{
                items.isChecked = false;
            });
            this.ruleForm.receipt_role_list.forEach(items=>{
                items.isChecked = false;
            });
            this.$refs[formName].resetFields();
        },
        

    },
    created() {
        let curentStore = this.curentStore;
        let loginInfo = this.loginInfo;
        if (curentStore&&loginInfo) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_ID = curentStore.dep_ID;
            this.company_id = loginInfo.company_id;
            let businessModel = this.businessModel;
            if (businessModel) {
                this.classDetail();
            }
        }
    },
};
</script>
<style scoped>
.value-input {
    width: 400px;
    height: 40px;
}
.row-button {
    margin-top: 30px;
    padding-bottom: 30px;
    margin-left: 180px;
}
/* 跨店展示 -选择门店 */
.select-storeShow {
    width: 400px;
    height: auto;
    border-radius: 2px;
    border: 1px solid #d3d9e2;
    padding-bottom: 30px;
    margin-left: 160px;
    margin-bottom: 20px;
    overflow: hidden;
}
.select-storeShow .title {
    width: 370px;
    height: 48px;
    background: #f4f7fd;
    font-size: 14px;
    font-weight: 600;
    color: #232426;
    line-height: 47px;
    padding-left: 30px;
}
/* 职级权限 */
.grade-centent {
    margin-left: 30px;
    width: 660px;
    min-height: 660px;
    border-radius: 4px 4px 0px 0px;
    border: 1px solid #e6eaef;
    overflow: hidden;
}
.grade-centent .gradeTab {
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #e6eaef;
    overflow: hidden;
    padding: 0;
    margin: 0;
}

.grade-centent .gradeTab li {
    list-style: none;
    float: left;
    width: 50%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #232426;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
}
.grade-centent .gradeTab li.active {
    background: #f4f7fd;
}

</style>