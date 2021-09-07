<!--
 * @Author: zzt
 * @Date: 2020-12-14 17:51:18
 * @LastEditTime: 2021-01-29 15:49:31
 * @LastEditors: Please set LastEditors
 * @Description: 外带餐盒
 * @FilePath: \sjoyOrderingManage\src\views\dishManager\takeOutManage.vue
-->
<template>
    <div class="main dishStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.takeout") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px">
                <el-col>
                    <div class="content-wrap">
                        <div style="margin:10px 0 30px;overflow: hidden;">
                            <div class="font12 fontWeight fl">
                                {{$t('takeOutManage.saleAllowed')}}
                                <el-tooltip effect="light" placement="right">
                                    <span slot="content">{{$t('takeOutManage.content')}}</span>
                                    <img
                                        src="../../static/images/tips.png"
                                        
                                    />
                                </el-tooltip>
                            </div>
                            <el-switch
                                v-model="switchValue"
                                class="fr"
                                active-color="#2082ED"
                                inactive-color="#D8D8D8"
                                @change="saleAllowedChange"
                            ></el-switch>

                        </div>
                        <div class="addClassTit" @click="packClick(0)">
                            <i class="el-icon-circle-plus font15"></i>
                            <span>{{$t('takeOutManage.newBox')}}</span>
                        </div>
                        <ul class="infinite-list">
                            <li
                                @click="activeIndex = index"
                                :class="{ active: activeIndex == index }"
                                v-for="(item, index) in infiniteData"
                                :key="index"
                            >
                                <div class="li-title"
                                    >{{ item.box_name }}({{
                                        item.box_price | priceNum
                                    }})
                                    <i
                                        v-show="activeIndex == index"
                                        class="li-icon el-icon-edit font15"
                                        @click="packClick(1,item)"
                                    ></i>
                                </div>
                                <i
                                    v-show="activeIndex == index"
                                    class="addClass-del li-icon el-icon-close font18"
                                    @click="delItem(item)"
                                ></i>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <!-- 新增（修改）餐盒弹窗 -->
            <el-dialog
                :title="isDialogType == 0 ? $t('takeOutManage.newBox') : $t('takeOutManage.editBox')"
                :visible.sync="showDialog"
                width="25%"
            >
                <div
                    style="
                        background-color: #eeeeee;
                        height: 1px;
                        margin-top: 10px;
                    "
                ></div>
                <div class="top20" append-to-body>
                    <el-form
                       :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                    
                    >   
                        <el-form-item :label="$t('takeOutManage.image')" style="margin-bottom:10px">
                            <el-upload
                                style="margin-left:0"
                                class="avatar-uploader"
                                :action="uploadUtils.uploadAction()"
                                :data="uploadUtils.uploadData()"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img
                                    v-if="imageUrl"
                                    :src="imageUrl"
                                    class="avatar"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                            </el-upload>
                            <span
                                style="color: rgb(140, 147, 155); font-size: 12px;line-height:20px"
                                >{{ $t("addDish.imgSetting") }}</span
                            >
                           
                        </el-form-item>
                        <el-form-item :label="$t('takeOutManage.name')" prop="box_name">
                            <el-input
                                v-model="ruleForm.box_name"
                                :placeholder="$t('takeOutManage.inputName')"
                            ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('takeOutManage.price')" prop="box_price">
                            <el-input
                                type="number"
                                v-model="ruleForm.box_price"
                                :placeholder="$t('takeOutManage.inputPrice')"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="top30 center">
                        <el-button
                            class="themeBtn"
                            size="small"
                            style="width: 100px"
                            :loading="alertButtonLoading"
                            @click="submitForm('ruleForm')"
                            >{{ $t("ok") }}</el-button
                        >
                        <el-button
                            class="cancelBtn"
                            size="small"
                            style="width: 100px"
                            @click="resetForm('ruleForm')"
                            >{{ $t("cancel") }}</el-button
                        >
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    inject:['reload'],             
    computed: {
        curentStore() {
            //console.log('curentStore')
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
            activeIndex: 0,
            switchValue: false,
            loading: true,
            okLoading: false,
            infiniteData: [],
            showDialog:false,
            alertButtonLoading: false,
            isDialogType: 0, // 0,新增，1，修改
            getItemId: "",//获取当前编辑的id
            imageUrl:"",
            ruleForm: {
                box_image: "",
                box_name:'',
                box_price:"",
                dep_id:"",
                company_id:"",
            },
            rules: {
                box_name: [
                    {
                        required: true,
                        message: this.$t('takeOutManage.inputName'),
                        trigger: "blur",
                    },
                ],
                box_price: [
                    {
                        required: true,
                        message: this.$t('takeOutManage.inputPrice'),
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        //允许单独售卖
        saleAllowedChange(value) {
            this.updateConfigSwitch();
        },
        // 餐盒图片
        handleAvatarSuccess(res, file) {
            if (Number(res.code) > 0) {
                this.ruleForm.box_image = res.msg;
                this.imageUrl = URL.createObjectURL(file.raw);
            } else {
                this.ruleForm.box_image = "";
                this.imageUrl = "";
                this.toast.error(res.msg);
            }
        },
        beforeAvatarUpload(file) {
            return this.uploadUtils.beforeAvatarUpload(file);
        },
        packClick(val, item){
            this.isDialogType = val;
            if (val == 0) {
                this.ruleForm = {};
                this.imageUrl = "";
                this.showDialog = true;
            } else {
                this.getItemId = item.id;
                this.imageUrl = item.box_image;
                this.ruleForm.box_image = item.box_image;
                this.ruleForm.box_name = item.box_name;
                this.ruleForm.box_price = item.box_price;
                this.showDialog = true;
            }

        },

        //获取打包盒列表
        getPackList(){
            let that = this;
            let data = {
                dep_id : this.dep_id,
            };
            this.request.getPackList(data,function (res) {
                if (res.code == "1") {
                    let res_data = res.data;
                    that.infiniteData = res_data;
                    console.log(res_data);
                } else {
                    that.toast.error(res.msg);
                }
            })
        },
        //删除打包盒
        delItem(item){
            let that = this;
            let data = {
                dep_id : this.dep_id,
                id: item.id,
            };
            this.request.delPack(data,function(res){
                if(res.code == "1"){
                    that.toast.success(that.$t("delSucc"));
                    that.getPackList();
                } else {
                    that.toast.error(res.msg);
                }

            })
        },
        //编辑打包盒
        updatePack(){
            let upInfiniteData = this.infiniteData.filter(item=>(item.id!=this.getItemId));
            //判断是否重复添加
            for (let i in upInfiniteData) {
                if(this.ruleForm.box_name==upInfiniteData[i].box_name){
                    this.toast.info(this.$t('takeOutManage.txtMess'));
                    return false;
                }
            }
            let that = this;
            let data = {
               dep_id : this.dep_id,
               id: this.getItemId,
               box_image: this.ruleForm.box_image,
               box_name: this.ruleForm.box_name,
               box_price : this.ruleForm.box_price,
            };
            that.alertButtonLoading = true;
            this.request.updatePack(data,function(res){
                if(res.code == "1"){
                    that.showDialog = false;
                    that.alertButtonLoading = false;
                    that.toast.success(that.$t("updateSucc"));
                    that.getPackList();
                } else {
                    that.toast.error(res.msg);
                }

            })
            
        },
        //添加打包盒
        addPack(){
            //判断是否重复添加
            for (let i in this.infiniteData) {
                if(this.ruleForm.box_name==this.infiniteData[i].box_name){
                    this.toast.info(this.$t('takeOutManage.txtMess'));
                    return false;
                }
            }
            let that = this;
            this.ruleForm.dep_id = this.dep_id;
            this.ruleForm.company_id = this.curentStore.faher_ID;
            this.alertButtonLoading = true;
            this.request.addPack(this.ruleForm,function(res) {
                if(res.code == "1"){
                    that.showDialog = false;
                    that.alertButtonLoading = false;
                    that.toast.success(that.$t("addSucc"));
                    that.getPackList();
                }else{
                    that.toast.error(res.mag)
                }
               
           })
        },
         //更新门店配置单个的开关
        updateConfigSwitch(){
            let that = this;
            let data = {
                dep_id : this.dep_ID,
                box_switch: this.switchValue==false?'0':'1',
            };
            this.request.updateConfigSwitch(data,function(res){
                if(res.code == "1"){
                    that.toast.success(that.$t("setSucc"));
                    setTimeout(() => {
                        that.reload();//刷新页面
                    }, 600);
                }else{
                    that.toast.error(res.msg)
                }
            })

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.isDialogType == 0) {
                        this.addPack();
                    } else {
                        this.updatePack();
                    }
                } else {
                    return false;
                }
            });
        },
        
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.showDialog = false;
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_ID = curentStore.dep_ID;
            this.getPackList();
            //经营设置
            let businessModel = this.businessModel;
            if (businessModel) {
                this.switchValue = businessModel.box_switch==0?false:true;
            }
        }
    },
    watch: {
        businessModel: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.switchValue = newVal.box_switch==0?false:true;
                }
            },
        },
    },
};
</script>
<style scoped>
.avatar {
    width: 87px;
    height: 87px;
}
</style>