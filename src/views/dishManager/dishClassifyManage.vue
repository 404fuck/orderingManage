<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-01 20:50:09
 * @LastEditors: Please set LastEditors
 * @Description: 分类管理
 * @FilePath: \sjoyOrderingManage\src\views\dishManager\dishClassifyManage.vue
-->

<template>
    <div class="main">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.fenlei") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px">
                <el-col>
                    <div class="content-wrap">
                        <div class="addClassTit" @click="classifyClick(0)">
                            <i class="el-icon-circle-plus font15"></i>
                            <span>{{$t('dishClassifyManage.addClass')}}</span>
                        </div>
                        <ul class="infinite-list" id="dorp_list">
                            <li
                                @click="activeIndex = index"
                                :class="{ active: activeIndex == index }"
                                v-for="(item, index) in infiniteData"
                                :key="index"
                            >
                                <div class="li-title">
                                    {{
                                        `${item.type_name_en}  ${item.type_name}`
                                    }}
                                    <i
                                        v-show="
                                            activeIndex == index && index != 0
                                        "
                                        class="li-icon el-icon-edit font15"
                                        @click="classifyClick(1, item)"
                                    ></i>
                                </div>
                                <i
                                    v-show="index != 0"
                                    class="addClass-sort li-icon el-icon-d-caret font18"
                                ></i>
                                <i
                                    v-show="activeIndex == index && index != 0"
                                    class="addClass-del li-icon el-icon-close font18"
                                    @click="classifyClick(2, item)"
                                ></i>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <!-- 新增分类--修改弹窗 -->
            <el-dialog
                :title="isDialogType == 0 ? $t('dishClassifyManage.addClass') : $t('dishClassifyManage.editClass')"
                :visible.sync="addClassDialog"
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
                        :model="classifyForm"
                        ref="classifyForm"
                        :label-width="language=='zh_CN'?'100px':'140px'"
                    >
                        <el-form-item
                            :label="$t('dishClassifyManage.chinse') + '：'"
                        >
                            <el-input
                                style="width:93%"
                                v-model.trim="classifyForm.name"
                                :placeholder="
                                    $t('dishClassifyManage.inputChinse')
                                "
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="$t('dishClassifyManage.english') + '：'"
                        >
                            <el-input
                                style="width:93%"
                                v-model.trim="classifyForm.enName"
                                :placeholder="
                                    $t('dishClassifyManage.inputEnglish')
                                "
                            ></el-input>
                        </el-form-item>

                        <div class="top30 center">
                            <el-button
                                class="themeBtn"
                                size="small"
                                style="width: 100px"
                                :loading="okLoading"
                                @click="submitForm('classifyForm')"
                                >{{ $t("ok") }}</el-button
                            >
                            <el-button
                                class="cancelBtn"
                                size="small"
                                style="width: 100px"
                                @click="resetForm('classifyForm')"
                                >{{ $t("cancel") }}</el-button
                            >
                        </div>
                    </el-form>
                </div>
            </el-dialog>
            <!-- 删除 -->
            <el-dialog title :visible.sync="delClassDialog" width="20%" center>
                <p class="padding20 center fontWeight">{{$t('dishClassifyManage.txtDialog')}}</p>
                <div class="top30 center">
                    <el-button
                        class="themeBtn"
                        size="small"
                        style="width: 100px"
                        :loading="okLoading"
                        @click="delClick"
                        >{{ $t("ok") }}</el-button
                    >
                    <el-button
                        class="cancelBtn"
                        size="small"
                        style="width: 100px"
                        @click="delClassDialog = false"
                        >{{ $t("cancel") }}</el-button
                    >
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import Sortable from "sortablejs";
export default {
    computed: {
        curentStore() {
            //console.log('curentStore')
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        language(){
            return this.$store.getters.language;
        },
    },
    data() {
        return {
            dep_id: "",
            activeIndex: 0,
            loading: true,
            okLoading: false,
            infiniteData: [],
            secondId: null, //二级分类id
            sonSecondId: null, //获取二级分类自子类id
            addClassDialog: false,
            delClassDialog: false,
            isDialogType: 0, // 0,新增分类，1，修改分类,2,删除
            classifyForm: {
                name: "",
                enName: "",
            },
        };
    },
    methods: {
        classifyClick(val, item) {
            this.isDialogType = val;
            if (val == 1) {
                this.sonSecondId = item.id;
                this.classifyForm.name = item.type_name;
                this.classifyForm.enName = item.type_name_en;
                this.addClassDialog = true;
            } else if (val == 2) {
                this.sonSecondId = item.id;
                this.delClassDialog = true;
            } else {
                this.classifyForm.name = "";
                this.classifyForm.enName = "";
                this.addClassDialog = true;
            }
            // console.log(item);
        },
        delClick() {
            this.typeInfoDel();
            this.delClassDialog = false;
        },
        //获取所有的菜品分类
        getAllType() {
            let that = this;
            this.loading = true;
            that.request.allType({ dept_id: this.dep_id }, function (res) {
                if (res.code == "1") {
                    that.loading = false;
                    if (res.data != null) {
                        that.infiniteData = [];
                        let res_data = res.data;
                        // console.log(res_data);
                        that.secondId = res_data[1].id;
                        res_data.forEach((items, index) => {
                            if(res_data[1].list.length==0){
                                //过滤套餐
                                that.infiniteData =  res_data.filter((items)=>items.type=="1");
                            }else{
                                items.list.forEach((item) => {
                                    that.infiniteData.push(item);
                                });
                            }
                            
                        });
                        console.log(that.infiniteData);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //新增菜品分类
        typeInfoAdd() {
            //判断是否输入了分类名称
            if(this.classifyForm.name==""&&this.classifyForm.enName==""){
                this.toast.info(this.$t('dishClassifyManage.inputMsg'));
                return false;
            }
            //判断是否重复添加
            for (let i in this.infiniteData) {
                if(this.classifyForm.name==this.infiniteData[i].type_name&&this.classifyForm.enName==this.infiniteData[i].type_name_en){
                    this.toast.info(this.$t('dishClassifyManage.txtMess'));
                    return false;
                }
            }
            let that = this;
            let data = {
                dep_id: this.dep_id,
                father_id: this.secondId,
                id: null,
                sorting: 0,
                type_name: this.classifyForm.name,
                type_name_en: this.classifyForm.enName,
            };
            this.okLoading = true;
            this.request.typeInfoAdd(data, function (res) {
                if (res.code == "1") {
                    that.okLoading = false;
                    that.addClassDialog = false;
                    that.toast.success(that.$t("addSucc"));
                    that.getAllType();
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //菜品分类修改
        typeInfoUpdate() {
            let filterData = this.stringutils.simpleCopy(this.infiniteData)
            filterData = filterData.filter((item)=>item.id!=this.sonSecondId);
            //判断是否输入了分类名称
            if(this.classifyForm.name==""&&this.classifyForm.enName==""){
                this.toast.info(this.$t('dishClassifyManage.inputMsg'));
                return false;
            }
            //判断是否重复添加
            for (let i in filterData) {
                if(this.classifyForm.name==filterData[i].type_name&&this.classifyForm.enName==filterData[i].type_name_en){
                    this.toast.info(this.$t('dishClassifyManage.txtMess'));
                    return false;
                }
            }
            let that = this;
            let data = {
                dep_id: this.dep_id,
                father_id: this.secondId,
                id: this.sonSecondId,
                sorting: 0,
                type_name: this.classifyForm.name,
                type_name_en: this.classifyForm.enName,
            };
            this.okLoading = true;
            this.request.typeInfoUpdate(data, function (res) {
                if (res.code == "1") {
                    that.okLoading = false;
                    that.addClassDialog = false;
                    that.toast.success(that.$t("updateSucc"));
                    that.getAllType();
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //菜品分类删除
        typeInfoDel() {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                param: this.sonSecondId,
                param1: 1,
            };
            this.okLoading = true;
            this.request.typeInfoDel(data, function (res) {
                that.okLoading = false;
                if (res.code == "1") {
                    that.toast.success(that.$t("delSucc"));
                    that.getAllType();
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.isDialogType == 0) {
                        this.typeInfoAdd();
                    } else {
                        this.typeInfoUpdate();
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.addClassDialog = false;  
            this.$refs[formName].resetFields();
        },

        //修改菜品分类的顺序
        putSort(list){
            let that = this;
            let data = {
                dep_id : this.dep_id,
                list: list,
            };
            this.request.sort(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("diySucc"));
                } else {
                    that.toast.error(res.msg);
                }

            })
        },
        //拖拽排序
        rowDrop() {
            let _id = document.getElementById('dorp_list');
            let that = this;
            Sortable.create(_id, {
                onEnd({ newIndex, oldIndex }) {
                    let currRow = that.infiniteData.splice(oldIndex, 1)[0];
                    that.infiniteData.splice(newIndex, 0, currRow);
                    setTimeout(() => {
                        let list = [];
                        that.infiniteData.forEach((item,index) => {
                            list.push({ id: item.id, sorting: index });
                            
                        });
                        that.putSort(list);
                        //刷新一下列表
                        that.getAllType();
                    }, 500);
                    
                }
            })

        },
    },
    mounted(){
        this.rowDrop();
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            this.getAllType();
        }
    },

};
</script>
<style scoped>
</style>