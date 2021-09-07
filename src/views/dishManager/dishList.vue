<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-29 15:43:25
 * @LastEditors: Please set LastEditors
 * @Description: 菜品列表
 * @FilePath: \sjoyOrderingManage\src\views\dishManager\dishList.vue
-->

<template>
    <div class="main dishListStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.caipingliebiao") }}</div>
            </el-row>
            <hr />
            <el-row class="under100-sider flex ali-c flexc">
                <el-col :span="5">
                    <span class="font14 fontWeight"
                        >{{ $t("dishList.low") }}{{ lowCountValue
                        }}{{ $t("dishList.lowlow") }}</span
                    >
                    <el-tooltip effect="light" placement="right">
                        <span slot="content"
                            >{{$t('dishList.lowNote')}}</span
                        >
                        <img
                            src="../../static/images/tips.png"
                            class="left5"
                        />
                    </el-tooltip>
                </el-col>
                <el-col :span="15">
                    <div :class="underCount>0?'top15':'top5'">
                        <Slider
                            :count="dishSum"
                            :lowCount="underCount"
                            :contentWidth="700 * (underCount / dishSum) + 'px'"
                        ></Slider>
                    </div>
                </el-col>
                <el-col :span="4">
                    <el-button
                        class="themeBtn fr"
                        @click="dialogFormVisible = true"
                        >{{ $t("dishList.setToast") }}</el-button
                    >
                </el-col>
            </el-row>

            <el-row class="changeTab">
                <el-tabs
                    v-model="activeName"
                    @tab-click="tabsHandleClick"
                >
                    <el-tab-pane
                        :label="$t('addDish.inSales')"
                        name="0"
                        
                    ></el-tab-pane>
                    <el-tab-pane
                        :label="$t('dishList.guqin')"
                        name="1"
                    ></el-tab-pane>
                    <el-tab-pane
                        :label="$t('dishList.downDish')"
                        name="2"
                    ></el-tab-pane>
                    <el-tab-pane
                        :label="$t('dishList.photoRecord')"
                        name="3"
                    ></el-tab-pane>
                    
                </el-tabs>
                <div class="setmealBtn">
                    <el-button
                        class="themeAddBtn"
                        @click="addPakeageClick"
                        type="primary"
                        size="small"
                        icon="el-icon-circle-plus"
                        >{{ $t("dishList.addSetmeal") }}</el-button
                    >
                    <el-button
                        class="themeAddBtn"
                        @click="addDishClick"
                        type="primary"
                        size="small"
                        icon="el-icon-circle-plus"
                        >{{$t('dishList.addProduct')}}</el-button
                        
                    >
                </div>
                
            </el-row>
            <el-row style="padding: 0 50px">
                <el-col>
                    <div class="seachStyle top20 right20">
                        <el-input
                            v-model="inputDishName"
                            class="search-input"
                            :placeholder="$t('dishList.inputDishName')"
                            size="small"
                        ></el-input>
                    </div>
                    <div class="seachStyle right20 top20" v-if="activeName!=3">
                        <span
                            class="font14 fontWeight"
                            >{{ $t("dishList.type") +'：'}}</span
                        >
                        <el-select
                            v-model="dishId"
                            class="value-input left5"
                            size="small"
                            value-key="id"
                        >
                            <el-option
                                v-for="item in dishTypeList"
                                :key="item.typeId"
                                :label="`${item.typeNameEn} ${item.typeName}`"
                                :value="item.typeId"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="seachStyle right20 top20" v-if="activeName!=3">
                        <span
                            class="font14 fontWeight"
                            >{{$t('dishList.dishType')+'：'}}</span
                        >
                        <el-select
                            v-model="weightSpec"
                            class="value-input left5"
                            size="small"
                            value-key="id"
                        >
                            <el-option
                                v-for="item in weightSpecList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="seachStyle right20 top20" v-if="activeName!=3">
                        <span
                            class="font14 fontWeight"
                           >{{$t('dishList.salesLab')+'：'}}</span
                        >
                        <el-select
                            v-model="dishTagId"
                            class="value-input left5"
                            size="small"
                            value-key="id"
                          
                        >
                            <el-option
                                v-for="item in dishTagList"
                                :key="item.id"
                                :label="language=='zh_CN'?item.name:item.name2==''?item.name:item.name2"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="seachStyle right20 top20" v-if="activeName!=3">
                        <span
                            class="font14 fontWeight"
                            >{{$t('dishList.salesTime')+'：'}}</span
                        >
                        <el-select
                            v-model="sellData"
                            class="value-input left5"
                            size="small"
                            value-key="id"
                        >
                            <el-option
                                v-for="item in sellDataList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="seachStyle right20 top20" v-if="activeName!=3">
                        <span
                            class="font14 fontWeight"
                            >{{$t('dishList.dishPrice')+'：'}}</span
                        >
                        <el-input
                            v-model="inputLowPrice"
                            type="number"
                            style="width:120px;margin-left:5px;"
                            size="small"
                            placeholder="0.00"
                        ></el-input>
                        <span style="padding:0 5px;font-size:14px">~</span>
                        <el-input
                            v-model="inputHighPrice"
                            type="number"
                            style="width:120px;"
                            size="small"
                            placeholder="0.00"
                        ></el-input>
                    </div>
                    <div class="seachStyle right10 top20">
                        <el-button
                            @click="searchClick"
                            class="themeBtn"
                            type="primary"
                            size="small"
                            >{{ $t("search") }}</el-button
                        >
                        <el-button
                            @click="refreshClick"
                            class="themeBtn"
                            type="primary"
                            size="small"
                            >{{ $t("orderDetail.reset") }}</el-button
                        >
                    </div>
                    <div class="seachStyle font12 right20 top20">
                        <div v-if="language=='zh_CN'">
                            共<span style="padding: 0 3px; color: #2082ed">{{
                                currentPage.total
                            }}</span
                            >个<span>{{activeNameTits[Number(activeName)]}}</span>菜品
                        </div>
                        <div v-else>
                            <span style="padding: 0 3px; color: #2082ed">
                               {{currentPage.total}}
                            </span>
                            <span>{{activeNameTits[Number(activeName)]}}</span>
                            <span style="padding-left:5px;">products</span>
                        </div>
                    </div>
                    
                    <div class="seachStyle top20" v-if="activeName!=3">
                        <el-upload
                            style="display: inline-block"
                            class="avatar-uploader"
                            :action="uploadUtils.uploadActionXls()"
                            :data="uploadUtils.uploadDataXls()"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <el-button
                                class="font14 themeImportBtn"
                                type="primary"
                                plain
                                size="small"
                                >{{ $t("dishList.inputDish") }}</el-button
                            >
                        </el-upload>
                       
                        <el-button
                            class="font14 themeImportBtn left10"
                            type="primary"
                            plain
                            size="small"
                            @click="export2Excel"
                            >
                            {{ $t("dishList.outDishInPage") }}
                            
                            </el-button
                        >
                        
                    </div>
                </el-col>
            </el-row>
            <el-row style="padding: 10px 50px 20px 50px">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    border
                    @selection-change="handleSelectionChange"
                    class="diy-table"
                    v-loading="loading"
                >
                    <el-table-column
                        type="selection"
                        width="60"
                        align="center"
                        :selectable='tableCheckbox'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="dish_name"
                        :label="$t('dishList.dishName')"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop
                        :label="$t('dishList.type')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.dish_second_name_en|text}}</span>
                            <span class="left5">{{scope.row.dish_second_name|text}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        :label="$t('dishList.dishNum')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{
                                scope.row.dish_code | text
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        :label="$t('dishList.unit')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{
                                scope.row.unit_type | text
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        :label="$t('dishList.size')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <div class="zx-loop-wrap" v-if="scope.row.weight_spec==2&&(scope.row.spec_detail!=''||scope.row.spec_detail!=null)">
                                <div
                                    class="zx-loop"
                                    v-for="(item,index) in scope.row.spec_detail"
                                    :key="index"
                                >
                                {{item.spec_unit | text}}
                                </div>
                            </div>
                            <span v-if="scope.row.weight_spec!=2">{{
                                scope.row.spec_unit | text
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        :label="$t('dishList.price')"
                        align="center"
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
                                scope.row.original_price | priceNum
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        :label="$t('addDish.VIPPrice')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <div class="zx-loop-wrap" v-if="scope.row.weight_spec==2&&(scope.row.spec_detail!=''||scope.row.spec_detail!=null)">
                                <div
                                    style="color: #eb632b"
                                    class="zx-loop"
                                    v-for="(item,index) in scope.row.spec_detail"
                                    :key="index"
                                >
                                {{item.member_price | price}}
                                </div>
                            </div>
                            <span style="color: #eb632b" v-if="scope.row.weight_spec!=2">{{
                                scope.row.member_price | price
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        :label="$t('dishList.count')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.dish_inventory==-1?$t("dishList.max"):scope.row.dish_inventory }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        :label="$t('dishList.joinFoxTime')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.input_time | moment }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        :label="$t('dishList.printKitchen')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.print_info==null">-</div>
                            <div v-else class="printInfo">
                                <div
                                   v-for="(item,index) in scope.row.print_info"
                                   :key="index"
                                >
                                   <span>{{item.name|text}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        :label="$t('operation')"
                        align="center"
                        width="100"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                @click="editClick(scope.row.dish_id, scope.row)"
                                size="small"
                                v-if="scope.row.weight_spec!=-1"
                                >{{ $t("edit") }}</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row style="padding: 0px 30px 20px 30px; position: relative">
                <el-col :span="6">
                    <!-- 上下架-删除 -->
                    <div class="bottom-div">
                        <el-button
                            v-show="activeName != '3'"
                            class="themeBtn"
                            size="small"
                            @click="outDishClick"
                            >{{ activeName == "2"?this.$t("dishList.upDish"): this.$t("dishList.outDish")}}</el-button
                        >
                        <el-button
                            class="themeImportBtn font14"
                            size="small"
                            @click="delButton"
                            >{{ $t("dishList.delDish") }}</el-button
                        >
                    </div>
                </el-col>
                <el-col
                    style="position: absolute; left: 25px; top: 10px;height:50px"
                >
                    <el-pagination
                        class="page-pagination"
                        background
                        layout="prev, pager, next"
                        v-if="
                            currentPage.total > currentPage.size &&
                            tableData.length != 0
                        "
                        :total="currentPage.total"
                        :page-count="currentPage.size"
                        @current-change="paginationChange"
                    ></el-pagination>
                </el-col>
            </el-row>
            <!-- 新建设置预警弹窗 -->
            <el-dialog
                :title="$t('dishList.lowCount')"
                :visible.sync="dialogFormVisible"
                width="35%"
            >
                <div class="line" style="margin-left: 0px"></div>
                <el-form :model="form" class="top15">
                    <el-form-item
                        :label="$t('dishList.isOpen')"
                        :label-width="formLabelWidth"
                    >
                        <el-switch
                            v-model="lowPromptValue"
                            active-color="#2082ED"
                            inactive-color="#D8D8D8"
                        ></el-switch>
                    </el-form-item>
                    <el-form-item
                        :label="$t('dishList.lowCount_')"
                        :label-width="formLabelWidth"
                        class="guqing"
                    >
                        <span>{{ $t("dishList.dishLow") }} &nbsp;</span>
                        <el-input
                            type="number"
                            v-model="lowCountValue"
                            style="width: 30%"
                        ></el-input>
                        <span>&nbsp; {{ $t("dishList.dishLowLow") }}</span>
                    </el-form-item>
                    <el-form-item
                        :label="$t('dishList.guqinWarr')"
                        :label-width="formLabelWidth"
                        class="guqing"
                    >
                        <span>{{ $t("dishList.dishLow") }} &nbsp;</span>
                        <el-input
                            type="number"
                            v-model="guqinValue"
                            style="width: 30%"
                        ></el-input>
                        <span>&nbsp; {{ $t("dishList.guqinWaW") }}</span>
                    </el-form-item>
                    <el-form-item
                        :label="$t('dishList.warn')"
                        :label-width="formLabelWidth"
                        class="guqing"
                    >
                        <el-checkbox v-model="inNetChecked">{{
                            $t("dishList.push")
                        }}</el-checkbox>
                        <el-checkbox v-model="inMoblieChecked">{{
                            $t("dishList.appPush")
                        }}</el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="center">
                    <el-button
                        type="primary"
                        class="themeBtn"
                        :loading="lowPromptLoding"
                        @click="lowPromptClick"
                        style="width: 100px"
                        >{{ $t("save") }}</el-button
                    >
                    <el-button
                        @click="dialogFormVisible = false"
                        class="cancelBtn left20"
                        style="width: 100px"
                        >{{ $t("cancel") }}</el-button
                    >
                </div>
            </el-dialog>
            <!-- 删除菜品弹窗 -->
            <el-dialog
                :title="$t('dishList.delDish')"
                :visible.sync="dialogTableVisible"
                width="25%"
            >
                <span>
                    <img
                        src="../../static/images/dialog_orange.png"
                        alt
                        class="dialogIcon"
                        width="16"
                    />
                </span>
                <hr style="margin-top: 10px" />
                <el-row class="center">
                    <el-col class="top20">
                        <span
                            class="font16 fontWeight"
                            style="color: #fd7b4d"
                            >{{ $t("dishList.aaa") }}</span
                        >
                    </el-col>
                    <el-col class="top20">
                        <span class="font12" style="color: #303336">{{
                            $t("dishList.bbb")
                        }}</span>
                    </el-col>
                    <el-col class="top20">
                        <el-button
                            class="themeBtn"
                            @click="delDishClick"
                            style="width: 100px"
                            >{{ $t("ok") }}</el-button
                        >
                        <el-button
                            class="cancelBtn"
                            @click="dialogTableVisible = false"
                            style="width: 100px"
                            >{{ $t("cancel") }}</el-button
                        >
                    </el-col>
                </el-row>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Slider from "../components/Slider";
export default {
    inject:['reload'], 
    components: {
        Slider,
    },
    computed: {
        curentStore() {
            //console.log('curentStore')
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        businessModel:{
            get() {
                return this.$store.getters.businessModel;
            },
            set() {
                //
            },
            
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
        },
    },
    data() {
        return {
            dep_id: "",
            //库存预警
            lowPromptValue: true,
            inNetChecked: false,
            inMoblieChecked: false,
            guqinValue: "",
            lowCountValue: "100",
            lowPromptLoding: false,

            activeName: "0",
            activeNameTits: [this.$t("addDish.inSales"),this.$t("dishList.guqin"),this.$t("dishList.downDish"),this.$t("dishList.photoRecord")],
            res_sts: 0, //0为在售，1为估清，2为下架,3为拍照录菜,4为未分类菜品信息,5仅为打印设备

            loading: true,
            tableData: [],
            selectData: [],
            sumData: [], //无接口实时刷新分页
            //无接口实时刷新分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
            

            dishSum: 0, //菜的总数，不会变更的
            underCount: 0,
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
            },
            formLabelWidth: "161px",
            inputDishName: "",
            //菜品类型 筛选
            weightSpec:"",
            weightSpecList:[{id:"",value:this.$t('all')},{id:"0",value:this.$t('addDish.commonDish')},{id:"1",value: this.$t('addDish.weightDish')},{id:"2",value: this.$t('addDish.sizeDish')},{id:"-1",value: this.$t('addDish.seasonal')}],
            //菜品分类 筛选
            dishTypeList: [],
            dishId: null,
            //销售菜品标签 筛选
            dishTagId: "",
            dishTagList: [],
            //售卖时间 筛选
            sellData:"",
            sellDataList:[{id:"",value:this.$t('all')},{id:"0",value:this.$t('dishList.sellData0')},{id:"1",value: this.$t('dishList.sellData1')}],
            //菜品价格 筛选
            inputLowPrice:"",
            inputHighPrice:"",
            //菜品导入、导出
            exportDownOrigin:"",
            excelUrl:"",
        };
    },
    methods: {
        //导入菜品xsl
        handleAvatarSuccess(res, file) {
            if (res.code== "1") {
                this.queryList();
                this.toast.success(this.$t('dishList.inputSucc'));
                this.reload();//刷新页面
            }
        },
        beforeAvatarUpload(file) {
            return this.uploadUtils.beforeAvatarUploadXls(file);
        },

        //导出菜品
        export2Excel() {
            this.exportDownOrigin = "1";
            this.queryList();
        },
       
        //切换
        tabsHandleClick(tab, event) {
            this.res_sts = tab.name;
            this.refresh();
            this.queryList();
        },
        //新建套餐
        addPakeageClick() {
            this.$router.push("/addDishSetmeal");
        },
        //新建菜品
        addDishClick() {
            this.$router.push("/addDish");
        },
        //编辑菜品
        editClick(md, data) {
            let resData = {
                param: this.res_sts,//0为在售，1为估清，2为下架,3为拍照录菜,4为未分类菜品信息,5仅为打印设备
                param1: this.dishTagId,//搜索的菜品标签
                str_param: this.inputDishName,//搜索的菜品名称
                weight_spec:this.weightSpec,//菜品类型
                sell_state:this.sellData,//售卖时间
                low_price:this.inputLowPrice,//菜品最低价格
                high_price:this.inputHighPrice,//菜品最高价格
                dishId:this.dishId, //分类

            };
            let pushPropObj = {resData:resData,ruleForm:data};
            if (data.weight_spec == 3||data.weight_spec == 4) {
                this.$router.push({ name: "updateDishSetmeal", params: { obj: pushPropObj} });
            } else {
                this.$router.push({ name: "updateDish", params: { obj: pushPropObj}, query: { id: md } });
            }
        },
        //重置筛选条件
        refresh(){
            this.currentPage.page = 1;
            this.exportDownOrigin="";
            this.dishId = null;
            this.dishTagId="";
            this.inputDishNam="";
            this.weightSpec="";
            this.sellData="";
            this.inputLowPrice = "";
            this.inputHighPrice ="";
        },
        //搜索
        searchClick() {
            this.currentPage.page = 1;
            this.exportDownOrigin="";
            this.queryList();
        },
        //重置
        refreshClick() {
            this.refresh();
            this.queryList();
        },
        //接口列表
        queryList() {
            let that = this;
            this.loading = true;
            let data = {
                dep_id: this.dep_id,
                param: this.res_sts,//0为在售，1为估清，2为下架,3为拍照录菜,4为未分类菜品信息,5仅为打印设备
                param1: this.dishTagId,//搜索的菜品标签
                str_param: this.inputDishName,//搜索的菜品名称
                downOrigin: this.exportDownOrigin, //菜品导出
                weight_spec:this.weightSpec,//菜品类型
                sell_state:this.sellData,//售卖时间
                low_price:this.inputLowPrice,//菜品最低价格
                high_price:this.inputHighPrice,//菜品最高价格


            };
            this.request.queryList(data, function (res) {
                if (res.code == "1") {
                    that.loading = false;
                    if (res.data != null) {
                        //导出菜品
                        if(that.exportDownOrigin=="1"){
                            window.location.href = res.data;
                        }else{
                            that.tableData = [];
                            that.sumData= [];
                            let res_data = res.data;
                            // console.log(res_data);
                            //分类 下拉
                            if(that.dishTypeList.length==0){
                                that.dishTypeList = [{typeId: null,typeName: that.$t('all'),typeNameEn:''}]
                                res_data.forEach(item=> {
                                    // if(item.dishSimpleVOS!=null){
                                    //     if(item.dishSimpleVOS.length>0){
                                            that.dishTypeList.push({
                                                typeId:item.type_id, 
                                                typeName:that.stringutils.formatTxtNull(item.type_name),
                                                typeNameEn:that.stringutils.formatTxtNull(item.type_name_en),

                                            })
                                    //     }
                                    // }
                                    
                                });
                            }
                            res_data.forEach(items => {
                                if(items.dishSimpleVOS!=null){
                                    if(items.dishSimpleVOS.length>0){
                                        //规格
                                        items.dishSimpleVOS.forEach(item =>{
                                            if(item.spec_detail!=""&&item.weight_spec==2){
                                                item.spec_detail=JSON.parse(item.spec_detail);
                                            }
                                            that.tableData.push(item);
                                        })

                                    }

                                }
                            });
                            // console.log(that.tableData);
                            //分类过滤
                            let cloneTableData = that.stringutils.simpleCopy(that.tableData);
                            let filterData = cloneTableData.filter(item=>item.dish_second_type === that.dishId);
                            if(that.dishId==null){
                                that.tableData = cloneTableData;
                            }else{
                                that.tableData = filterData;
                            }
                            that.currentPage.total = that.tableData.length;
                            that.sumData = that.stringutils.simpleCopy(that.tableData);
                            that.getTableDataWithPage();

                            
                        }
                        
                      
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //处理分页
        getTableDataWithPage() {
            let start = (this.currentPage.page - 1) * this.currentPage.size;
            let end = start + this.currentPage.size;
            this.tableData = this.sumData.slice(start, end);
        },
        paginationChange(page) {
            this.currentPage.page = page;
            this.getTableDataWithPage();
            // console.log(this.tableData);
        },
        //下架 接口
        soldouts(data, dataList) {
            let that = this;
            this.request.soldouts({ dep_id: this.dep_id, list: data },function (res) {
                if (res.code == "1") {
                    that.currentPage.page = 1;
                    that.exportDownOrigin="";
                    that.queryList();
                    that.toast.success(that.$t("dishList.outSucc"));
                } else {
                    that.toast.error(res.msg);
                }
            });
            
        },
        //上架 接口
        resold(data, dataList) {
            let that = this;
            this.request.resold({ dep_id: this.dep_id, list: data }, function (res) {
                if (res.code == "1") {
                    that.currentPage.page = 1;
                    that.exportDownOrigin="";
                    that.queryList();
                    that.toast.success(that.$t("dishList.upSucc"));
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //上下架
        outDishClick() {
            //根据tab状态判断当前是否是上架还是下架
            if (this.selectData.length <= 0) {
                this.toast.info(this.$t("dishList.selecDish"));
                return false;
            }
            let arr = [];
            for (let i in this.selectData) {
                arr.push(this.selectData[i].dish_id);
            }
            if(this.res_sts==0||this.res_sts==1){
                this.soldouts(arr, this.selectData)
            }
            if(this.res_sts==2){
                this.resold(arr, this.selectData);
            }
        },
        delDishs(data) {
            let that = this;
            this.request.delDishs(
                { dep_id: this.dep_id, list: data },
                function (res) {
                    if (res.code == "1") {
                        that.currentPage.page = 1;
                        that.exportDownOrigin="";
                        that.queryList();
                        that.toast.success(that.$t("delSucc"));
                        that.dialogTableVisible = false;
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        delButton() {
            if (this.selectData.length <= 0) {
                this.toast.info(this.$t("dishList.selecDish"));
                return false;
            }
            this.dialogTableVisible = true;
        },
        delDishClick() {
            let arr = [];
            for (let i in this.selectData) {
                arr.push(this.selectData[i].dish_id);
            }
            this.delDishs(arr);
        },
        
        handleSelectionChange(val) {
            console.log(val);
            this.selectData = val;
        },
        tableCheckbox(row){
            //餐盒不可勾选
            return row.weight_spec != -1;
        },

        //获取菜品标签类型字典
        getDishTags() {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                dict_type: "DISH_TAG",
            };
            that.request.tagspeclist(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;
                        that.dishTagList = [{name:'全部',name2:'All',id:""},...res_data]
                        // console.log(that.dishTagList);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },


        getDishUnder100() {
            let that = this;
            this.request.under100({ dep_id: this.dep_id }, function (res) {
                if (res.code == "1") {
                    that.underCount = res.data.inventoryCount;
                    that.dishSum = res.data.dishTotalCount;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        
        lowPromptClick() {
            let that = this;
            let bl = 0;
            if (this.inNetChecked && this.inMoblieChecked) {
                bl = 3;
            } else if (this.inNetChecked) {
                bl = 1;
            } else if (this.inMoblieChecked) {
                bl = 2;
            }

            if (this.guqinValue <= 0 || this.lowCountValue <= 0) {
                this.toast.info("不能输入0");
                return;
            }

            this.lowPromptLoding = true;
            let data = {
                dep_id: this.dep_id,
                open_invt_warning: this.lowPromptValue ? "1" : "0",
                invt_estimate_clear: this.guqinValue,
                invt_warning: this.lowCountValue,
                invt_remind_way: bl,
            };
            this.request.updatewain(data, function (res) {
                that.lowPromptLoding = false;
                if (res.code == "1") {
                    that.getDishSet();
                    that.dialogFormVisible = false;
                    that.reload();//刷新页面
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        getDishSet() {
            this.lowPromptValue =
                this.businessModel.open_invt_warning == "1" ? true : false;
            this.guqinValue = this.businessModel.invt_estimate_clear;
            this.lowCountValue = this.businessModel.invt_warning;

            if (this.businessModel.invt_remind_way == "0") {
                this.inNetChecked = false;
                this.inMoblieChecked = false;
            } else if (this.businessModel.invt_remind_way == "1") {
                this.inNetChecked = true;
                this.inMoblieChecked = false;
            } else if (this.businessModel.invt_remind_way == "2") {
                this.inNetChecked = false;
                this.inMoblieChecked = true;
            } else if (this.businessModel.invt_remind_way == "3") {
                this.inNetChecked = true;
                this.inMoblieChecked = true;
            }
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            let getPropOjb = this.$route.params.obj;
            if(getPropOjb!=undefined&&getPropOjb!=null){
                this.activeName = String(getPropOjb.resData.param);
                this.res_sts = getPropOjb.resData.param;
                this.dishTagId = getPropOjb.resData.param1;
                this.inputDishName = getPropOjb.resData.str_param;
                this.weightSpec = getPropOjb.resData.weight_spec;
                this.sellData = getPropOjb.resData.sell_state;
                this.inputLowPrice = getPropOjb.resData.low_price;
                this.inputHighPrice = getPropOjb.resData.high_price;
                this.dishId = getPropOjb.resData.dishId;
            }
            this.queryList();
            this.getDishUnder100();
            this.getDishTags();
            let businessModel = this.businessModel;
            if (businessModel) {
                this.getDishSet();
            }
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    this.dep_id = newVal.dep_ID;
                    this.currentPage.page = 1;
                    this.exportDownOrigin="";
                    this.queryList();
                    this.getDishUnder100();
                    this.getDishTags();
                }
            },
        },
        businessModel: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.businessModel = newVal;
                    this.getDishSet();
                }
            },
        },
    
    },
};
</script>

<style scoped>
.changeTab{
    position: relative;
    padding: 0 50px;
    height: 50px; 
    overflow: hidden;
}
.setmealBtn{
    position: absolute;
    right: 50px;
    top: 0;
    z-index: 99;
}
.under100-sider {
    height: 140px;
    background: #fff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin: 30px 50px;
    padding: 0 40px;
}
.dialogIcon {
    position: absolute;
    top: 25px;
    left: 20%;
}
.search-input {
    margin-left: 20px;
    width: 200px;
}

.search-input:first-of-type {
    margin-left: 0px;
}
.page-pagination {
    text-align: center;
    margin-top: 10px;
    margin-right: 50px;
}
.bottom-div {
    position: relative;
    z-index: 99;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
}
/* 多规格菜表格循环 */
.zx-loop-wrap .zx-loop{
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: #303336;
    font-size: 12px;
    border-bottom: 1px solid #EBEEF5;
}
.zx-loop-wrap .zx-loop:last-child{
    border: none;
}
/* 打印机 */
.printInfo span{
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #b9b9b9;
    padding: 0 6px;
    font-size: 10px;
    color: #888;
    margin-bottom: 5px;
}
</style>