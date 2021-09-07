<!--
 * @Author: zzt
 * @Date: 2020-11-17 09:44:20
 * @LastEditTime: 2021-03-15 20:25:53
 * @LastEditors: Please set LastEditors
 * @Description: 打印机管理
 * @FilePath: \sjoyOrderingManage\src\views\printerManage\printerManage.vue
-->
<template>
    <div class="employeeStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <HeadTitle
                :titles="headTitles"
                :selectTab="selectTab"
                @onHeadTitleItemClick="onHeadTitleItemClick"
            ></HeadTitle>
            <el-row style="padding: 10px 50px">
                <el-col :span="12" style="position: relative; top: 20px">
                    <span style="color: #8C939B">
                        {{ $t("operatingDiary.sum") }}
                        <span style="color: #2082ED; padding-left: 5px">{{
                            tableData.length
                        }}</span>
                    </span>
                </el-col>
                <el-col :span="12" class="right">
                    <el-button
                        @click="addPrinter"
                        icon="el-icon-circle-plus"
                        size="small"
                        type="primary"
                        class="themeAddBtn top10"
                        >{{ $t("addPrinter.add") }}</el-button
                    >
                </el-col>
            </el-row>
            <el-row style="padding: 10px 50px 20px 50px">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    border
                    @selection-change="handleSelectionChange"
                    v-loading="loading"
                >
                    <el-table-column
                        prop="name"
                        :label="$t('printerManage.name')"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="equipment"
                        :label="$t('printerManage.num')"
                        align="center"
                    ></el-table-column>
                    <el-table-column prop width="350" :label="$t('operation')">
                        <template slot-scope="scope">
                            <el-row class="center">
                                <el-button
                                    @click="editClick(scope.row)"
                                    type="text"
                                    size="small"
                                    >{{ $t("edit") }}</el-button
                                >
                                <el-button
                                    type="text"
                                    @click="deleteClick(scope.row)"
                                    size="small"
                                    >{{ $t("delete") }}</el-button
                                >
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>

            </el-row>
        </div>
    </div>
</template>
<script>
import HeadTitle from "../components/HeadTitle";
export default {
    components: {
        HeadTitle,
    },
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
            selectTab: 0,
            headTitles: [
                { id: 0, value: this.$t('printerManage.kitchenPrinter')},
                { id: 1, value: this.$t('printerManage.cashierPrinter')},
                { id: 2, value: this.$t('printerManage.labelPrinter')},
            ],
            showsData: [{ arry: [] }, { arry: [] }, { arry: [] }],
            loading: true,
            tableData: [],
            dep_comp_name: "",
            selectData: [],
            requestData:{
                dep_id: '', 
                id: '',
                equipment: null, //设备号 ,
                secret: null, //秘钥 ,
                print_type: "3", //打印机型号，0为中午打印机，1为飞蛾标签打印机，2为飞蛾58mm订单打印机,3为飞蛾80mm打印机 ,
            }
        };
    },
    methods: {
        onHeadTitleItemClick(index) {
            this.selectTab = index;
            this.tableData = this.showsData[index].arry;
           
        },
        handleSelectionChange(val) {
            this.selectData = val;
        },
        addPrinter() {
            this.$router.push({path: "/addPrinter",query: {index:this.selectTab}});
        },
        getData() {
            let that = this;
            this.request.getPrint({ dep_id: this.dep_id }, function (res) {
                that.loading = false;
                if (res.code == "1") {
                    for (let i in res.data) {
                        if (res.data[i].iscash == "1") {
                            that.showsData[1].arry.push(res.data[i]);
                        } else {
                            if (res.data[i].print_type == "1") {
                                that.showsData[2].arry.push(res.data[i]);
                            } else {
                                that.showsData[0].arry.push(res.data[i]);
                            }
                        }
                        
                        
                    }
                    let curRouteIndex = that.$route.params.index;
                    if(curRouteIndex!==undefined&&curRouteIndex!==null){
                        if(curRouteIndex==0){
                            that.tableData = that.showsData[0].arry;
                        }else if(curRouteIndex==1){
                            that.tableData = that.showsData[1].arry;
                        }else{
                            that.tableData = that.showsData[2].arry;
                        }
                    }else{
                        that.tableData = that.showsData[0].arry;
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });    
            
        },
        //编辑传值
        editClick(row) {
            this.$router.push({ path: "/editPrinter", query: {index:this.selectTab,id: row.id} });
        },
        deleteClick(item) {
            this.requestData.equipment = item.equipment
            this.requestData.secret = item.secret
            this.requestData.dep_id = this.dep_id
            this.requestData.id = item.id
            this.requestData.iscash = 0;
            if (this.selectTab == 1) {
                //收银打印机
                this.requestData.iscash = 1;
            } else if (this.selectTab == 0) {
                //后厨
                this.requestData.print_type = 2;
            } else if (this.selectTab == 2) {
                //标签打印机
                this.requestData.print_type = 1;
            }
            let that = this;
            this.request.delPrint(this.requestData, function (res) {
                    if (res.code == "1") {
                        that.toast.success(that.$t("delSucc"));
                        that.stringutils.arrRemove(that.tableData, item);
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            this.dep_id = curentStore.dep_ID;
            if(this.$route.params.index!==undefined&&this.$route.params.index!==null){
                this.selectTab = this.$route.params.index;
            }
            this.getData();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    this.dep_id = newVal.dep_ID;
                    if(this.$route.params.index!==undefined&&this.$route.params.index!==null){
                        this.selectTab = this.$route.params.index;
                    }
                    this.getData();
                }
            },
        },
    },
};
</script>
<style scoped>
</style>