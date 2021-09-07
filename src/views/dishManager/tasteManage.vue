<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-01-28 21:02:19
 * @LastEditors: Please set LastEditors
 * @Description: 口味做法
 * @FilePath: \sjoyOrderingManage\src\views\dishManager\tasteManage.vue
-->

<template>
    <div class="main gradeList">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.kouwei") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px">
                <el-col class="right">
                    <el-button
                        class="themeAddBtn"
                        type="warning"
                        size="small"
                        @click="addTaste"
                        icon="el-icon-circle-plus"
                        >{{ $t("addDish.addKouwei") }}</el-button
                    >
                </el-col>
                <el-col class="top20">
                    <el-table
                        :data="tableData"
                        border
                        v-loading="tableLoading"
                        style="width: 100%"
                    >
                        <el-table-column
                            :label="$t('tasteManage.kouweiName')"
                            width="250"
							align="center"
                            prop
                        >
                            <template slot-scope="scope">
                                <span class="fontWeight">{{ language=="zh_CN"?scope.row.taste_name_zh==""?scope.row.taste_name:scope.row.taste_name_zh:scope.row.taste_name_en==""?scope.row.taste_name:scope.row.taste_name_en }}</span>
                                <span class="tips-label">{{scope.row.single_multiple=='0'?$t('tasteManage.single'):$t('tasteManage.multiple')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tasteManage.kouweiTag')" align="center">
                            <template slot-scope="scope">
                                <el-row class="selectGrade">
                                    <el-col
                                        :span="3"
                                        v-for="(item,index) in scope.row.taste_list"
                                        :key="index"
                                        style="color: #606266; width: 15%;font-size: 13px;"
                                    >
										{{  language=="zh_CN"?item.name_zh==""?item.name:item.name_zh:item.name_en==""?item.name:item.name_en}}
                                    </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('operation')" width="280" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    @click="
                                        editRow(scope.$index,scope.row)
                                    "
                                    type="text"
                                    size="small"
                                    >{{ $t("edit") }}</el-button
                                >
                                <el-button
                                    @click="
                                        delRow(scope.$index,scope.row)
                                    "
                                    type="text"
                                    size="small"
                                    >{{ $t("delete") }}</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <!-- 新增口味 -->
            <el-dialog
                :title="$t('tasteManage.addKouwei')"
                :visible.sync="showDialog"
                :before-close="handleClose"
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
                        :model="ruleForm"
                        ref="ruleForm"
                    >
                        <el-form-item 
                            :label="$t('tasteManage.kouweiName')+'：'"
                            :label-width="language=='zh_CN'?'100px':'110px'"
                        >
                            <el-input
                                v-model="ruleForm.kouweiName"
                                :placeholder="$t('tasteManage.inputKouweiName')"
                                style="width: 93%"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="$t('tasteManage.kouweiTag')+'：'"
                            :label-width="language=='zh_CN'?'100px':'110px'"
                            class="top20"
							
                        >
                            <el-input
                                v-model="ruleForm.tagValue"
                                :placeholder="$t('tasteManage.inputKouweiTag')"
                                style="width: 67%"
                            ></el-input>
                            <el-button
                                type="primary"
                                class="themeImportBtn"
                                style="margin-left: 4%;width:22%"
                                @click="serveClick(ruleForm.tagValue)"
                            >
                                {{ $t("tasteManage.add") }}
                            </el-button>
                            <el-tag
                                v-for="(tag, index) in tagNames"
                                :key="index"
                                closable
                                :type="tag.name"
                                style="margin-right: 10px; margin-top: 10px"
                                @close="serverHandleClose(index)"
                                >{{ tag.name }}</el-tag
                            >
                        </el-form-item>
                        <el-form-item 
                            :label="$t('tasteManage.allowMultiple')+'：'"
                            :label-width="language=='zh_CN'?'170px':'220px'"
                        >
                            <el-switch
                                v-model="isAllow"
                                active-color="#2082ED"
                                inactive-color="#D8D8D8"
                            ></el-switch>
                        </el-form-item>
                    </el-form>
                    <div class="top30 center">
                        <el-button
                            type="primary"
                            class="themeBtn"
                            size="small"
                            style="width: 100px"
							@click="saveorupdatekouwei(1)"
                            >{{ $t("save") }}</el-button
                        >
                        <el-button
                            type="primary"
                            class="cancelBtn"
                            size="small"
                            style="width: 100px"
                            @click="cancelSaveBtn"
                            >{{ $t("cancel") }}</el-button
                        >
                    </div>
                </div>
            </el-dialog>

            <!--编辑口味 -->
            <el-dialog
                :title="$t('tasteManage.editKouwei')"
                :visible.sync="showEditDialog"
                :before-close="handleEditClose"
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
                        :model="ruleForm"
                        ref="ruleForm"
                    >
                        <el-form-item 
                            :label="$t('tasteManage.kouweiName')+'：'"
                            :label-width="language=='zh_CN'?'100px':'110px'"
                        >
                            <el-input
                                v-model="ruleForm.kouweiName"
                                :placeholder="$t('tasteManage.inputKouweiName')"
                                style="width: 93%"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="$t('tasteManage.kouweiTag')+'：'"
                            :label-width="language=='zh_CN'?'100px':'110px'"
                            class="top20"
                        >
                            <el-input
                                v-model="ruleForm.tagValue"
                                :placeholder="$t('tasteManage.inputKouweiTag')"
                                style="width: 67%"
                            ></el-input>
                            <el-button
                                type="primary"
                                class="themeImportBtn"
                                style="margin-left: 4%;width:22%"
                                @click="serveClick(ruleForm.tagValue)"
                            >
                                {{ $t("tasteManage.add") }}
                            </el-button>
                            <el-tag
                                v-for="(tag, index) in tagNames"
                                :key="index"
                                closable
                                :type="tag.name"
                                style="margin-right: 10px; margin-top: 10px"
                                @close="editServerHandleClose(index)"
                                >{{ language=="zh_CN"?tag.name_zh==""?tag.name:tag.name_zh:tag.name_en==""?tag.name:tag.name_en}}</el-tag
                            >
                        </el-form-item>
                        <el-form-item 
                            :label="$t('tasteManage.allowMultiple')+'：'" 
                            :label-width="language=='zh_CN'?'170px':'220px'"
                        >
                            <el-switch
                                v-model="isAllow"
                                active-color="#2082ED"
                                inactive-color="#D8D8D8"
                            ></el-switch>
                        </el-form-item>
                    </el-form>
                    <div class="top30 center">
                        <el-button
                            type="primary"
                            class="themeBtn"
                            size="small"
                            style="width: 100px"
                            @click="saveorupdatekouwei(0)"
                            >{{ $t("save") }}</el-button
                        >
                        <el-button
                            type="primary"
                            class="cancelBtn"
                            size="small"
                            style="width: 100px"
                            @click="cancelEditBtn"
                            >{{ $t("cancel") }}</el-button
                        >
                    </div>
                </div>
            </el-dialog>
            <!-- 删除口味 -->
            <el-dialog
                title
                :visible.sync="delDialogVisible"
                width="20%"
                center
            >
                <p class="center fontWeight" style="color: #232426">
                    {{ $t("tasteManage.confirmDelete") }}
                </p>
                <div class="center top30">
                    <el-button
                        type="primary"
                        class="themeBtn"
                        size="small"
                        style="width:100px"
                        @click="delOKUser"
                        >{{ $t("ok") }}</el-button
                    >
					<el-button
                        type="primary"
                        class="cancelBtn"
                        size="small"
                        style="width:100px"
                        @click="delDialogVisible = false"
                        >{{ $t("cancel") }}</el-button
                    >
                </div>
            </el-dialog>
        </div>
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
            dep_id: "",
            tableData: [],
            showDialog: false,
            showEditDialog: false,
            delDialogVisible: false,
            tagNames: [],
            rowTagObj:{},
            tableLoading: "",
            edit_idx: 0,
            del_idx: 0,
            dictId:"",
            isAllow:false,
			ruleForm: {
                kouweiName: "",
                tagValue: "",
            },
            
        };
    },
    methods: {
        handleClose(done) {
            this.ruleForm.kouweiName = "";
            this.tagNames = [];
            done();
        },
      
        handleEditClose(done) {
            this.ruleForm.kouweiName = "";
            this.tagNames = [];
            done();
        },
        
        addTaste() {
			this.ruleForm.kouweiName = "";
            this.ruleForm.tagValue = "";
            this.tagNames = [];
            this.isAllow = false;
            this.showDialog = true;
        },
        editRow(index, row) {
            this.showEditDialog = true;
            if(this.language=='zh_CN'){
                if(row.taste_name_zh==""){
                    this.ruleForm.kouweiName = row.taste_name;
                }else{
                    this.ruleForm.kouweiName = row.taste_name_zh;
                }
            }else{
                if(row.taste_name_en==""){
                    this.ruleForm.kouweiName = row.taste_name;
                }else{
                    this.ruleForm.kouweiName = row.taste_name_en;
                }
            }
            this.tagNames = this.stringutils.simpleCopy(row.taste_list);
            this.edit_idx = index;
            this.isAllow = this.tableData[this.edit_idx].single_multiple==1?true:false;
            this.rowTagObj = this.stringutils.simpleCopy(row);
        },
        delRow(index,row) {
            let that = this;
            row.dep_id = this.dep_id;
            row.rec_sts = 2;
            // console.log(getRowTagObj);
            //菜品口味删除前确认
			this.request.canDeleteTaste(row, function (res) {
				if (res.code == "1") {
					that.del_idx = index;
                    that.delDialogVisible = true;
				} else {
					that.toast.error(res.msg);
				}
			});
        },
        serverHandleClose(index) {
            let newArr = [];
            for (let idx = 0,lens = this.tagNames.length; idx < lens; idx++) {
                if (idx != index) {
                    newArr.push(this.tagNames[idx]);
                }
            }
            this.tagNames = newArr;
        },
        editServerHandleClose(index) {
            let that = this;
            let getRowTagObj={};
            for (let i in this.rowTagObj.taste_list) {
                if(index==i){
                    this.rowTagObj.taste_list[i].rec_sts=2;
                }else{
                    this.rowTagObj.taste_list[i].rec_sts=0;
                }
            }
            getRowTagObj = this.rowTagObj;
            getRowTagObj.dep_id = this.dep_id;
            getRowTagObj.rec_sts = 0;
            // console.log(getRowTagObj);
            //菜品口味删除前确认
			this.request.canDeleteTaste(getRowTagObj, function (res) {
				if (res.code == "1") {
					that.serverHandleClose(index);
				} else {
					that.toast.error(res.msg);
				}
			});
            
        },
        serveClick(value) {
            let addIes = {name: "" ,name_en:"",name_my:"",name_zh:"",need_i18n:0};
            if (value.length >0) { 
                addIes["name"] = value;          
                this.tagNames.push(addIes);
                this.ruleForm.tagValue = "";
            }else{
                this.toast.info(this.$t('tasteManage.txtMess3'));
            }
            
        },
		delOKUser() {
            let dictValuesArry = [];
            this.tableData.forEach((item,index) => {
                if (index != this.del_idx) {
                    dictValuesArry.push(item);
                }
            });
            this.tableData = dictValuesArry;
            this.updatekouwei();
            this.delDialogVisible = false;
		},
		cancelSaveBtn() {
            this.ruleForm.kouweiName = "";
            this.tagNames = [];
            this.showDialog = false;
		},
		cancelEditBtn() {
            this.ruleForm.kouweiName = "";
            this.ruleForm.tagValue = "";
            this.tagNames = [];
            this.showEditDialog = false;
        },
        saveorupdatekouwei(type) {
            if(this.ruleForm.kouweiName.length>15){
                this.toast.info(this.$t('tasteManage.inputKouweiName'));
                return false;
            }
            if(this.ruleForm.kouweiName == ""||this.ruleForm.kouweiName==null){
				this.toast.info(this.$t('tasteManage.txtMess'));
            }else if(this.tagNames.length <=0){
                this.toast.info(this.$t('tasteManage.txtMess2'));
            }else{
                if(type == 0){
                    //编辑口味
                    this.tableData[this.edit_idx].taste_list = this.tagNames;
                    this.tableData[this.edit_idx].taste_name = this.ruleForm.kouweiName;
                    this.tableData[this.edit_idx].single_multiple = this.isAllow==true?'1':'0';
                    this.showEditDialog = false;
                }else if(type == 1){
                    //新增口味
                    let addDict = {
                        is_sys:0,
                        need_i18n:0,
                        single_multiple:"0",
                        taste_list:[],
                        taste_name:"",
                        taste_name_en:"",
                        taste_name_my:"",
                        taste_name_zh:"",
                    };
                    addDict.single_multiple = this.isAllow==true?'1':'0';
                    addDict.taste_list = this.tagNames;
                    addDict.taste_name = this.ruleForm.kouweiName;
                    this.tableData.push(addDict);
					this.showDialog = false;
                }else{
                    return false;
                }
                this.updatekouwei();
            }
               
		},
	    //口味接口
	    updatekouwei(){
			let that = this;
			let data = {
				company_id: this.$store.getters.loginInfo.company_id,
                dep_id: this.dep_id,
				dict_type: "DISH_TASTE_DICT",
				dict_list: this.tableData,
				id: this.dictId,
            };
			this.request.saveorupdatekouwei(data, function (res) {
				if (res.code == "1") {
					that.toast.success(that.$t('diySucc'));
					that.ruleForm.kouweiName = "";
					that.tagNames = [];
				} else {
					that.toast.error(res.msg);
				}
			});

	    },
        getKouweilist() {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                company_id: this.$store.getters.loginInfo.company_id,
            };
            this.tableLoading = true;
            this.request.kouweiList(data, function (res) {
                if (res.code == "1") {
                    that.tableLoading = false;
                    if(res.data.dict_list!=null){
                        let res_data = res.data;
                        that.tableData = res_data.dict_list;
                        that.dictId = res_data.id;
                        console.log(that.tableData);
                    }
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
            this.getKouweilist();
        }
    },
};
</script>
<style scoped>
.selectGrade {
    line-height: 80px;
}
.el-checkbox__inner {
    display: none;
}
.demo-ruleForm {
    min-height: 684px;
}
.tips-label {
    padding: 1px 7px;
    border: 1px solid #2082ED;
    color: #2082ED;
    font-size: 12px;
    border-radius: 4px;
    margin-left: 6px;
}
</style>
