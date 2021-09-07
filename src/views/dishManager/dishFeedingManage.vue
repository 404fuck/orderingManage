<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-01 20:59:27
 * @LastEditors: Please set LastEditors
 * @Description: 加料管理
 * @FilePath: \sjoyOrderingManage\src\views\dishManager\dishFeedingManage.vue
-->

<template>
    <div class="dishStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.jialiao") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px" :gutter="30">
                <el-col :span="6">
                    <!-- 左侧区域加料列表信息-->
                    <div class="content-wrap" style="width:91%">
                        <div style="margin:10px 0 30px;overflow: hidden;">
                            
                            <div class="font12 fontWeight fl">
                                {{$t('dishFeedingManage.feedAllowed')}}
                                <el-tooltip effect="light" placement="right">
                                    <span slot="content">{{$t('dishFeedingManage.content')}}</span>
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
                                @change="feedAllowedChange"
                            ></el-switch>

                        </div>
                        <div class="addClassTit" @click="addFeeding">
                            <i class="el-icon-circle-plus font15"></i>
                            <span>{{ $t("addDish.addjialiao") }}</span>
                        </div>
                        <div class="feed-examples">
                            <span class="fl">{{ $t("dishFeedingManage.curry")}}(2.00)</span>
                            <span class="fr">{{ $t("dishFeedingManage.example") }}</span>
                        </div>
                        
                        <ul class="infinite-list">
                            <li
                                v-for="(item, index) in feedingList"
                                :key="index"
                                :class="{ active: selectIndex == index }"
                                @click="clickItem(index)"
                            >
                                <div class="li-title"
                                    >{{ item.add_name }}({{
                                        item.price | priceNum
                                    }})
                                    <i
                                        v-show="selectIndex == index "
                                        class="li-icon el-icon-edit font15"
                                        @click="editItem(index)"
                                    ></i>
                                </div>
                                <i
                                    v-show="selectIndex == index"
                                    class="addClass-del li-icon el-icon-close font18"
                                    @click="delItem(index)"
                                ></i>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="18" v-if="selectItem">
                    <!-- 右侧区域关联菜品 -->
                    <el-row>
                        <el-col>
                            <div class="right font14">
                                <span
                                    style="
                                        float: left;
                                        color: #232426;
                                        font-weight: bold;
                                    "
                                    >{{
                                        $t("dishFeedingManage.ruleDish")
                                    }}</span
                                >
                            </div>
                        </el-col>
                        <el-col class="top15">
                            <div
                                v-show="selectItem != null"
                            >
                                <el-table
                                    :data="feedingRefList.list"
                                    border
                                    class="diy-table"
                                    style="width: 100%"
                                    v-loading="loading"
                                >
                                    <el-table-column
                                        prop
                                        :label="$t('addDish.dishNum')"
                                    >
                                        <template slot-scope="scope">
                                            <span>{{scope.row.dish_code| text}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop
                                        :label="
                                            $t('accountsDetail.dishName')
                                        "
                                    >
                                        <template slot-scope="scope">
                                            <div class="zx-loop-wrap" v-if="scope.row.weight_spec==2&&(scope.row.spec_detail!=''||scope.row.spec_detail!=null)">
                                                <div
                                                    class="zx-loop"
                                                    v-for="(item,index) in scope.row.spec_detail"
                                                    :key="index"
                                                >
                                                    {{`${scope.row.dish_name}-${item.spec_unit}`}}
                                                </div>
                                            </div>
                                            <span v-if="scope.row.weight_spec!=2">{{
                                                scope.row.dish_name
                                            }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop
                                        :label="
                                            $t('dishFeedingManage.dishPrice')
                                        "
                                    >
                                        <template slot-scope="scope">
                                            <div class="zx-loop-wrap" v-if="scope.row.weight_spec==2&&(scope.row.spec_detail!=''||scope.row.spec_detail!=null)">
                                                <div
                                                    style="color: #eb632b"
                                                    class="zx-loop"
                                                    v-for="(item,index) in scope.row.spec_detail"
                                                    :key="index"
                                                >
                                                    {{item.spec_price | priceNum}}
                                                </div>
                                            </div>
                                            <span style="color: #eb632b" v-if="scope.row.weight_spec!=2">{{
                                                scope.row.dish_price | priceNum
                                            }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        :label="
                                            $t(
                                                'dishFeedingManage.creatTime'
                                            )
                                        "
                                    >
                                        <template slot-scope="scope">
                                            <span
                                                >{{
                                                    scope.row.create_time
                                                        | moment
                                                }}</span
                                            >
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                    class="page-pagination center"
                                    background
                                    @current-change="paginationChange"
                                    layout="prev, pager, next"
                                    :total="all_pages"
                                    v-if="
                                        all_pages > pageSize &&
                                        feedingRefList.list.length != 0
                                    "
                                ></el-pagination>
                               
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <!-- 新增分类 修改弹窗 -->
            <el-dialog
                :title="dialogTitle"
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
                <div class="top30" append-to-body>
                    <el-form
                        :model="feedingForm"
                        :rules="rules"
                        ref="feedingForm"
                        :label-width="language=='zh_CN'?'100px':'90px'"
                    >
                        <el-form-item
                            :label="$t('dishFeedingManage.addJialiaoName')"
                            prop="name"
                        >
                            <el-input
                                style="width:93%"
                                v-model="feedingForm.name"
                                :placeholder="
                                    $t('dishFeedingManage.inputName')
                                "
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            :label="$t('dishFeedingManage.jialiaoPrice')"
                            prop="price"
                        >
                            <el-input
                                style="width:93%"
                                type="number"
                                v-model="feedingForm.price"
                                :placeholder="$t('dishFeedingManage.inputPrice')"
                            ></el-input>
                        </el-form-item>
                        <el-row class="center top30">
                            <el-button
                                class="themeBtn"
                                :loading="okLoading"
                                size="small"
                                type="primary"
                                @click="submitForm('feedingForm')"
                                style="width: 100px"
                                >{{ $t("ok") }}</el-button
                            >
                            <el-button
                                class="cancelBtn"
                                size="small"
                                type="primary"
                                @click="resetForm('feedingForm')"
                                style="width: 100px"
                                >{{ $t("cancel") }}</el-button
                            >
                        </el-row>
                    </el-form>
                    
                </div>
            </el-dialog>
            <el-dialog  
                :visible.sync="switchDialog" 
                width="25%"
                :close-on-click-modal="false"
                :close-on-press-escape="false"	
            >
                
                <p class="top30 font14 center">{{$t('dishFeedingManage.txtDialog')}}</p>
                <div class="center top40">
                    <el-button
                        class="themeBtn"
                        size="small"
                        type="primary"
                        style="width:100px"
                        @click="switchOkClick"
                        >{{ $t("ok") }}</el-button
                    >
                    <el-button
                        class="cancelBtn"
                        size="small"
                        type="primary"
                        style="width:100px"
                        @click="switchDialog = false"
                        >{{ $t("cancel") }}</el-button
                    >
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
            this.dep_ID = this.$store.getters.curentStore.dep_ID;
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
            okLoading: false,
            switchValue: false,
            switchDialog: false,
            all_pages: 0,
            page: 1,
            pageSize: 10,
            dep_ID: "",
            loading: false,
            selectIndex: 0,
            selectItem: {
                add_name: "",
                add_id: 0,
            },
            showDialog: false,
            dialogTitle: this.$t("addDish.addjialiao"),
            editData: {},
            feedingList: {},
            feedingRefList: {},
            isEdit: false,
           
            feedingForm: {
                name: "",
                price: "",
                enabled: true,
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: this.$t("dishFeedingManage.inputName"),
                        trigger: "blur",
                    },
                ],
                price: [
                    {
                        required: true,
                        message: this.$t('dishFeedingManage.inputPrice'),
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        //允许加购多份
        feedAllowedChange(value) {
            if(value){
                this.updateConfigSwitch();
            }else{
                this.switchValue = true;
                this.switchDialog = true;
            }
            
        },
        switchOkClick(){
            this.switchValue = false;
            this.updateConfigSwitch();
        },
        //更新门店配置单个的开关
        updateConfigSwitch(){
            let that = this;
            let data = {
                dep_id : this.dep_ID,
                additional_switch: this.switchValue==false?'0':'1',
            };
            this.request.updateConfigSwitch(data,function(res){
                if(res.code == "1"){
                    that.switchDialog = false;
                    that.toast.success(that.$t("setSucc"));
                    setTimeout(() => {
                        that.reload();//刷新页面
                    }, 600);
                }else{
                    that.toast.error(res.msg)
                }
            })

        },
        delCDish(index, id) {
            let data = {
                dep_id: this.dep_ID,
                param: this.selectItem.id,
                list: [id],
            };
            let that = this;
            this.request.feedingDelRef(data, function (res) {
                if (res.code == "1") {
                    that.feedingRefList.splice(index, 1);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        getFeddingList() {
            let data = {
                dep_id: this.dep_ID,
            };
            let that = this;
            this.request.feedingList(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.feedingList = res.data;
                        if (res.data.length > 0) {
                            that.selectItem =
                                that.feedingList[that.selectIndex];
                            that.getFeddingRefList();
                        }
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

        getFeddingRefList() {
            let data = {
                dep_id: this.dep_ID,
                param: this.selectItem.id,
                page_num: this.page,
                page_size: this.pageSize,
            };
            let that = this;
            that.loading = true;
            this.request.feedingRefList(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;
                        that.feedingRefList = res_data;
                        that.all_pages = res_data.pages;
                        if(that.feedingRefList.list.length!=0){
                            that.feedingRefList.list.forEach(item => {
                                if(item.spec_detail!=""&&item.weight_spec==2){
                                    item.spec_detail=JSON.parse(item.spec_detail);
                                }
                            });

                        }
                    }
                } else {
                    that.toast.error(res.msg);
                }
                that.loading = false;
            });
        },
        paginationChange(page) {
            let that = this;
            that.page = page;
            that.getFeddingRefList();
        },

        clickItem(index) {
            this.selectIndex = index;
            this.selectItem = this.feedingList[index];
            this.getFeddingRefList();
        },
        editItem(index) {
            //this.toast.success('编辑' + index)

            let that = this;
            that.dialogTitle = that.$t("dishFeedingManage.updateJialiao");
            that.editData = that.selectItem;
            that.feedingForm.name = that.selectItem.add_name;
            that.feedingForm.price =this.stringutils.formatPrice(that.selectItem.price);

            that.isEdit = true;
            that.showDialog = true;
        },
        delItem(index) {
            // this.toast.success('删除' + index)

            let _id = this.selectItem.id;
            let data = {
                param: _id,
            };
            let that = this;
            this.request.feedingDel(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("delSucc"));
                    that.reloadData();
                } else {
                    that.toast.error(res.msg);
                    that.showDialog = false;
                }
            });
        },
        addFeeding() {
            let that = this;
            that.dialogTitle = that.$t("addDish.addjialiao");
            that.editData = {};
            that.feedingForm.name = "";
            that.feedingForm.price = "";
      
            that.feedingForm.enabled = false;
            that.isEdit = false;
            that.showDialog = true;
        },
        submitForm(formName) {
			 this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submitFeeding();
                } else {
                    return false;
                }
            });
            
        },
        resetForm(formName) {
            this.showDialog = false;
        },
        reloadData() {
            this.selectIndex = 0;
            this.selectItem = null;
            this.showDialog = false;
            this.getFeddingList();
        },
        submitFeeding() {
            //判断单位是否重复添加
            for (let i in this.feedingList) {
                if(this.feedingForm.name==this.feedingList[i].add_name){
                    this.toast.info(`'${this.feedingForm.name}'${this.$t('dishFeedingManage.inputRepeat')}`);
                    return false;
                }
            }
            if (this.isEdit) {
                let name = this.feedingForm.name;
                let price = this.feedingForm.price;
             
                let use = this.feedingForm.enabled ? 0 : 1;
                let data = {
                    dep_id: this.dep_ID,
                    id: this.selectItem.id,
                    add_name: name,
                    price: price,
                    is_use: 0,
                };

                let that = this;
                this.okLoading = true;
                this.request.feedingUpdate(data, function (res) {
                    that.okLoading = false;
                    if (res.code == "1") {
                        that.toast.success(that.$t("updateSucc"));
                        that.reloadData();
                    } else {
                        that.toast.error(res.msg);
                        that.showDialog = false;
                    }
                });
            } else {
                let name = this.feedingForm.name;
                let price = this.feedingForm.price;
               
                let use = this.feedingForm.enabled ? 0 : 1;
                let data = {
                    dep_id: this.dep_ID,
                    add_name: name,
                    price: price,
                    is_use: 0,
                };
                let that = this;

                this.okLoading = true;
                this.request.feedingAdd(data, function (res) {
                    that.okLoading = false;
                    if (res.code == "1") {
                        that.toast.success(that.$t("addSucc"));
                        that.reloadData();
                    } else {
                        that.toast.error(res.msg);
                        that.showDialog = false;
                    }
                });
            }
        },
    },
	created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_ID = curentStore.dep_ID;
            this.reloadData();
             //经营设置
            let businessModel = this.businessModel;
            if (businessModel) {
                this.switchValue = businessModel.additional_switch==0?false:true;
            }
        }
        
    },
    watch: {
        businessModel: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.switchValue = newVal.additional_switch==0?false:true;
                }
            },
        },
    },
};
</script>
<style>
/* 表头样式 */
.cell {
    text-align: center;
    color: #404c4e;
    font-size: 13px;
}

.page-pagination {
    float: right;
    margin-top: 10px;
    margin-right: 50px;
}
.feed-examples{
    margin-top: 30px;
    padding: 0 14px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    border: 1px solid #D7D7D7;
    color: #888;
    font-size: 12px;
    overflow: hidden;
}
/* 多规格菜表格循环 */
.zx-loop-wrap .zx-loop{
    width: 100%;
    height: 35px;
    line-height: 35px;
    color: #303336;
    font-size: 12px;
    border-bottom: 1px solid #EBEEF5;
}
.zx-loop-wrap .zx-loop:last-child{
    border: none;
}
</style>