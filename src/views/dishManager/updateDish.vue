<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-30 18:07:55
 * @LastEditors: Please set LastEditors
 * @Description: 菜品修改
 * @FilePath: \sjoyOrderingManage\src\views\dishManager\updateDish.vue
-->
<template>
    <div class="main dishStyle">
        <hr style="position: relative; top: -10px" />
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <router-link tag="a" :to="{name: 'dishList', params: {obj:getPropOjb}}" class="crumbsLink">{{ $t("sidebar.caipingliebiao") }}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span style="color: #232426">{{
                    $t("updateDish.editDish")
                }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-content addDish-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("updateDish.editDish") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="160px"
                >
                    <!-- 菜品类型 -->
                    <el-form-item :label="$t('addDish.Type_')">
                        <el-radio
                            class="left10"
                            v-model="ruleForm.weight_spec"
                            label="0"
                            >{{ $t("addDish.commonDish") }}</el-radio
                        >
                        <el-radio
                            class="left15"
                            v-model="ruleForm.weight_spec"
                            label="2"
                            >{{ $t("addDish.sizeDish") }}</el-radio
                        >
                        <el-radio
                            class="left15"
                            v-model="ruleForm.weight_spec"
                            label="1"
                            >{{ $t("addDish.weightDish") }}</el-radio
                        >
                    </el-form-item>
                    <!-- 菜品图片 -->
                    <el-form-item
                        :label="$t('addDish.dishImg_')"
                        prop="dep_logo"
                    >
                        <el-upload
                            class="avatar-uploader left10"
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
                        <div class="top5 el-col el-col-24">
                            <span
                                style="
                                    color: rgb(140, 147, 155);
                                    font-size: 12px;
                                    padding-left: 10px;
                                "
                                >{{ $t("addDish.imgSetting") }}</span
                            >
                        </div>
                    </el-form-item>
                    <!-- 菜品名称 -->
                    <el-form-item
                        :label="$t('addDish.dishName')"
                        prop="dish_name"
                    >
                        <el-input
                            v-model="ruleForm.dish_name"
                            class="value-input"
                            :placeholder="$t('addDish.nameRemark')"
                        ></el-input>
                    </el-form-item>
                    <!-- 菜品分类 -->
                    <el-form-item
                        :label="$t('addDish.dishType_')"
                        :prop="ruleForm.img_rec_sts==1?'':'dish_second_name'"
                    >
                        <el-select
                            v-model="dishTypeSelectValue"
                            style="width: 295px; margin-left: 10px"
                            :placeholder="$t('addDish.inputDishType')"
                            @change="dishTypeChange"
                            value-key="id"
                        >
                            <el-option
                                v-for="item in dishTypeList"
                                :key="item.id"
                                :label="`${item.type_name_en} ${item.type_name}`"
                                :value="item"
                            ></el-option>
                        </el-select>
                        <el-button
                            type="primary"
                            style="margin-left: 10px; width: 95px"
                            @click="addDishTypeClick"
                            class="themeImportBtn"
                        >
                            <span
                                style="
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                "
                                >{{ $t("addDish.addClass") }}</span
                            >
                        </el-button>
                    </el-form-item>
                    <!-- 规格 -->
                    <el-form-item
                        v-if="ruleForm.weight_spec == 2"
                        :label="$t('addDish.morSize_')"
                    >
                        <div class="size-div">
                            <el-table :data="sizeData">
                                <!-- 规格 -->
                                <el-table-column
                                    prop
                                    :label="$t('addDish.size')"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-select
                                            v-model="scope.row.spec_unit"
                                            style="width:120px;"
                                            size="mini"
                                            :placeholder="$t('addDish.inputSIze')"
                                            @change="sizeChange"
                                        >   
                                            <div class="add-sizeBtn" @click.stop="sizeShowDialog = true">
                                                {{ $t("addDish.addSize") }}
                                                <i
                                                    class="el-icon-plus font12 fr"
                                                    style="margin-top:12px"
                                                ></i>
                                                
                                            </div> 
                                            <el-option
                                                v-for="(item,index) in sizeDataList"
                                                :key="index"
                                                :label="language=='zh_CN'?item.name:item.name2==''?item.name:item.name2"
                                                :value="language=='zh_CN'?item.name:item.name2==''?item.name:item.name2"
                                            >   
                                                <span class="font12">
                                                    {{ language=="zh_CN"?item.name:item.name2==""?item.name:item.name2}}
                                                </span>
                                                <i
                                                    v-if="item.flag!=0"
                                                    class="el-icon-close"
                                                    style="
                                                        float: right;
                                                        font-size:12px;
                                                        margin-top: 12px;
                                                    "
                                                    @click.stop="delSizeServe(item)"
                                                ></i>
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <!-- 售卖价 -->
                                <el-table-column
                                    prop
                                    :label="$t('dishReport.dishPrice')"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                            style="width: 120px"
                                            v-model="scope.row.spec_price"
                                            size="mini"
                                            type="number"
                                            :placeholder="
                                                $t('addDish.inputSalesPrice')
                                            "
                                        ></el-input>
                                    </template>
                                </el-table-column>
                                <!-- 菜品成本 -->
                                <el-table-column
                                    prop
                                    :label="$t('addDish.sizeCost')"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                            style="width: 120px"
                                            v-model="scope.row.spec_cost"
                                            size="mini"
                                            type="number"
                                            :placeholder="$t('addDish.sizeInputCost')"
                                            maxlength="13"
                                            onkeyup="value=value.replace(/[^\d.]/g,'')"
                                            onblur="value.slice(-1) == '.'?value = value.slice(0,value.length - 1):''"
                                            onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
                                        ></el-input>
                                    </template>
                                </el-table-column>
                                <!-- 会员价 -->
                                <el-table-column
                                    prop
                                    :label="$t('addDish.VIPPrice')"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                            style="width: 120px"
                                            v-model="scope.row.member_price"
                                            size="mini"
                                            type="number"
                                            :placeholder="
                                                $t('addDish.sizeInputVIPPrice')
                                            "
                                            maxlength="13"
                                            onkeyup="value=value.replace(/[^\d.]/g,'')"
                                            onblur="value.slice(-1) == '.'?value = value.slice(0,value.length - 1):''"
                                            onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
                                        ></el-input>
                                    </template>
                                </el-table-column>
                                <!-- 起售数量 -->
                                <el-table-column
                                    prop
                                    :label="$t('addDish.count')"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-input-number
                                            style="width: 100px"
                                            v-model="scope.row.least_number"
                                            :min="1"
                                            :max="99"
                                            size="mini"
                                        ></el-input-number>
                                    </template>
                                </el-table-column>
                                <!-- 操作 -->
                                <el-table-column
                                    :label="$t('operation')"
                                    width="100"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-button
                                            v-if="scope.$index!=0"
                                            @click.native.prevent="
                                                deleteSizeRow(
                                                    scope.$index,
                                                    sizeData
                                                )
                                            "
                                            type="text"
                                            size="small"
                                            >{{ $t("remove") }}</el-button
                                        >
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button
                                class="themeImportBtn left15"
                                @click="addSizeClick"
                                size="mini"
                            >
                                {{ $t("addDish.addSize") }}
                            </el-button>
                        </div>
                    </el-form-item>
                    <!-- 菜品价格 -->
                    <el-form-item
                        :label="$t('addDish.dishPrice_')"
                        prop="dish_price"
                        v-if="ruleForm.weight_spec != 2"
                    >
                        <el-input
						    type="number"
                            class="value-input"
                            v-model.trim="ruleForm.dish_price"
                            :placeholder="$t('addDish.inputDishPrices')"
                        ></el-input>
                    </el-form-item>
                    <!-- 菜品单位 -->
                    <el-form-item
                        :label="$t('addDish.dishUnit')"
                        prop="unit_type"
                    >
                        <el-select
                            v-model="ruleForm.unit_type"
                            style="width: 295px; margin-left: 10px"
                            :placeholder="$t('addDish.selectDishUnit')"
                        >
                            <el-option
                                v-for="item in dishUnitData"
                                :key="item.dict_value"
                                :label="item.dict_value"
                                :value="item.dict_value"
                            >
                                <span style="font-size: 13px">{{
                                    item.dict_value
                                }}</span>
                                <el-button
                                    v-if="item.id==0?false:true"
                                    style="
                                        float: right;
                                        border: none;
                                        margin-top: 4px;
                                    "
                                    icon="el-icon-close"
                                    circle
                                    size="mini"
                                    @click.stop="deletUnitClick(item)"
                                ></el-button>
                            </el-option>
                        </el-select>
                        <el-button
                            type="primary"
                            style="margin-left: 10px; width: 95px"
                            @click="addUnitClick"
                            class="themeImportBtn"
                        >
                            <span
                                style="
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                "
                                >{{ $t("addDish.addUnit") }}</span
                            >
                        </el-button>
                    </el-form-item>
                    <!-- 销售状态 -->
                    <el-form-item :label="$t('addDish.salesState')">
                        <el-switch
                            v-model="sellValue"
                            class="select-switch"
                            active-color="#2082ED"
                            inactive-color="#D8D8D8"
                            :active-text="$t('addDish.inSales')"
                            :inactive-text="$t('addDish.noSales')"
                            @change="sellChange"
                        ></el-switch>
                    </el-form-item>
                    <!-- 加料配菜 -->
                    <el-form-item :label="$t('addDish.jialiaopeicai')">
                        <el-switch
                            v-model="ruleForm.additional_ref_type"
                            class="select-switch"
                            active-color="#2082ED"
                            inactive-color="#D8D8D8"
                            :active-text="$t('addDish.diy')"
                            :inactive-text="$t('nomrl')"
                            active-value="2"
                            inactive-value="1"
                        ></el-switch>
                    </el-form-item>
                    <el-form-item
                        label
                        v-if="ruleForm.additional_ref_type == '2'"
                    >
                        <div class="taste-div">
                            <el-table 
                                :data="selectFeedingList" 
                                style="width: 100%"
                                tooltip-effect="dark"
                                highlight-current-row
                                row-key="id"
                            >
                                <el-table-column
                                    prop="add_name"
                                    :label="$t('dishFeedingManage.name')"
                                >
                                </el-table-column>
                                <el-table-column
                                    :label="$t('dishFeedingManage.price')"
                                >
                                    <template slot-scope="scope">
                                        <span
                                            >{{ scope.row.price | priceNum }}</span
                                        >
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('addDish.canQTY')"
                                    width="200"
                                >
                                    <template slot-scope="scope">
                                        <el-input-number
                                            style="width:100px"
                                            v-model="scope.row.max_num"
                                            :min="1"
                                            :max="99"
                                            size="mini"
                                            :disabled="businessModel.additional_switch==0?true:false"
                                        ></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('operation')"
                                    width="150"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-button
                                            @click.native.prevent="delAdditionalClick(scope.$index)"
                                            type="text"
                                            size="small"
                                            >{{ $t("remove") }}</el-button
                                        >
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="oh" style="margin:3px 35px">
                                <div class="fl">
                                    <el-autocomplete
                                        suffix-icon="el-icon-arrow-down"
                                        style="width: 120px;"
                                        v-model="additionalValue"
                                        size="mini"
                                        :fetch-suggestions="AdditionaSearch"
                                        :placeholder="
                                            $t('addDish.inputjialiaoName')
                                        "
                                        @select="AdditionaSelect"
                                    >
                                        <template slot-scope="{ item }">
                                            <span class="font12">
                                                {{ item.add_name }}({{
                                                    item.price | priceNum
                                                }})
                                            </span>
                                        </template>
                                    </el-autocomplete>
                                    
                                </div>
                                <div class="fl left50">
                                    <el-input
                                        v-model="additionaPriceValue"
                                        :placeholder="$t('addDish.inputprice')"
                                        size="mini"
                                        type="number"
                                        style="width: 120px;"
                                    ></el-input>
                                </div>
                                <div class="fr">
                                    <el-button
                                        style="margin: 0"
                                        class="button-new-tag themeImportBtn"
                                        size="mini"
                                        @click="AdditionaClick"
                                    >
                                        {{ $t("addDish.addjialiao") }}
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <!-- 口味做法 -->
                    <el-form-item :label="$t('addDish.kouwei')">
                        <el-switch
                            v-model="tasteSwitch"
                            class="select-switch"
                            active-color="#2082ED"
                            inactive-color="#D8D8D8"
                            :active-text="$t('addDish.diy')"
                            :inactive-text="$t('nomrl')"
                        ></el-switch>
                    </el-form-item>
                    <el-form-item v-if="tasteSwitch">
                        <div class="taste-div">
                            <el-table :data="tasteSaveData" style="width: 100%">
                                <el-table-column
                                    :label="$t('addDish.kouweiName')"
                                    width="160"
                                    prop
                                >
                                    <template slot-scope="scope">
                                        <span>{{ language=="zh_CN"?scope.row.taste_name_zh==""?scope.row.taste_name:scope.row.taste_name_zh:scope.row.taste_name_en==""?scope.row.taste_name:scope.row.taste_name_en }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('addDish.kouweiTag')"
                                >
                                    <template slot-scope="scope">
                                        <el-tag
                                            :key="index"
                                            v-for="(item,index) in scope.row.taste_list"
                                            :disable-transitions="false"
                                            >{{  language=="zh_CN"?item.name_zh==""?item.name:item.name_zh:item.name_en==""?item.name:item.name_en}}</el-tag
                                        >
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-button
                                class="button-new-tag themeImportBtn"
                                size="mini"
                                @click="tasteHandleInputConfirm"
                            >
                                {{$t('addDish.addTaste')}}
                            </el-button>
                        </div>
                    </el-form-item>
                    <!-- 外带餐盒 -->
                    <el-form-item :label="$t('addDish.takeOut_')">
                        <el-switch
                            v-model="takeBoxSwitch"
                            class="select-switch"
                            active-color="#2082ED"
                            inactive-color="#D8D8D8"
                            :active-text="$t('have')"
                            :inactive-text="$t('noHave')"
                        ></el-switch>
                    </el-form-item>
                    <el-form-item v-if="takeBoxSwitch">
                        <div class="taste-div">
                            <el-table 
                                :data="takeBoxSaveData" 
                                style="width: 100%"
                                tooltip-effect="dark"
                                highlight-current-row
                                row-key="id"
                                @row-click="takeBoxCheckChange"
                            >
                                <el-table-column
                                    width="70"
                                >
                                    <template slot-scope="scope">
                                        <el-checkbox v-model="scope.row.checked"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('takeOutManage.name')"
                                >
                                    <template slot-scope="scope">
                                        <span
                                            >{{ scope.row.box_name }}</span
                                        >
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('takeOutManage.price')"
                                >
                                    <template slot-scope="scope">
                                        <span
                                            >{{ scope.row.box_price | priceNum }}</span
                                        >
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('takeOutManage.qty')"
                                    width="250"
                                >
                                    <template slot-scope="scope">
                                        <el-input-number
                                            style="width:100px"
                                            v-model="scope.row.box_num"
                                            :min="1"
                                            :max="99"
                                            size="mini"
                                        ></el-input-number>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-button
                                class="button-new-tag themeImportBtn"
                                size="mini"
                                @click="packClick"
                               
                            >
                                {{$t('addDish.addTakeOut')}}
                            </el-button>
                        </div>
                    </el-form-item>
                    <!-- 打印后厨小票 -->
                    <el-form-item :label="$t('addDish.printCopy_')">
                        <el-switch
                            v-model="printInfoSwitch"
                            class="select-switch"
                            active-color="#2082ED"
                            inactive-color="#D8D8D8"
                            :active-text="$t('yes')"
                            :inactive-text="$t('no')"
                            @change="printSwithChange"
                        ></el-switch>
                    </el-form-item>
                    <el-form-item v-if="printInfoSwitch">
                        <div class="printInfo-div">
                            <el-table 
                                :data="printInfoSaveData" 
                                style="width: 100%"
                                tooltip-effect="dark"
                            >
                                <el-table-column
                                    width="50"
                                >
                                    <template slot-scope="scope">
                                        <el-checkbox
                                            v-model="scope.row.checked"
                                            @change="printInfoCheckChange(scope.row,scope.row.checked)"
                                        ></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                   prop="name"
                                   :label="$t('addDish.selectPrinter')"
                                >
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>
                    <!-- 更多设置 -->
                    <div class="more-set">
                        <div class="more-setDiv" @click="openClick">
                            <span>{{ $t("moreSet") }}</span>
                            <img
                                src="../../static/images/down.png"
                                v-show="!moreShow"
                            />
                            <img
                                src="../../static/images/up.png"
                                v-show="moreShow"
                            />
                        </div>
                    </div>
                    <div class="show-content" v-if="moreShow">
                        <!-- 菜品编码 -->
                        <el-form-item
                            :label="$t('addDish.dishNums')"
                            prop="dish_code"
                        >
                            <el-input
                                v-model.trim="ruleForm.dish_code"
                                class="value-input"
                                :placeholder="$t('addDish.max6')"
                                oninput="value=value.replace(/[\W]/g,'')"
                                maxlength="6"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                        <!-- 菜品成本 -->
                        <el-form-item
                            :label="$t('addDish.cost_')"
                            prop
                            v-if="ruleForm.weight_spec != 2"
                        >
                            <el-input
                                class="value-input"
                                v-model.trim="ruleForm.dish_cost"
                                :placeholder="$t('addDish.inputCost')"
                                maxlength="13"
                                onkeyup="value=value.replace(/[^\d.]/g,'')"
                                onblur="value.slice(-1) == '.'?value = value.slice(0,value.length - 1):''"
                                onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
                            ></el-input>
                        </el-form-item>
                        <!-- 允许改价 -->
                        <el-form-item  v-if="ruleForm.weight_spec == 0">
                            <span slot="label">
                                <span>{{$t('addDish.priceChange')}}</span>
                                <el-tooltip effect="light" placement="right">
                                    <span slot="content">{{$t('addDish.priceChangeCont')}}</span>
                                    <img
                                        src="../../static/images/tips.png"
                                        class="left5"
                                    />
                                </el-tooltip>
                                <span>：</span>
                            </span>
                            <el-switch
                                v-model="changePriceSwith"
                                class="select-switch"
                                active-color="#2082ED"
                                inactive-color="#D8D8D8"
                                :active-text="$t('yes')"
                                :inactive-text="$t('no')"
                            ></el-switch>
                        </el-form-item>
                        <!-- 会员价格 -->
                        <el-form-item
                            :label="$t('addDish.VIPPrice_')"
                            prop
                            v-if="ruleForm.weight_spec != 2"
                        >
                            <el-input
                                class="value-input"
                                v-model.trim="ruleForm.member_price"
                                :placeholder="$t('addDish.inputVIPPrice')"
                                maxlength="13"
                                onkeyup="value=value.replace(/[^\d.]/g,'')"
                                onblur="value.slice(-1)=='.' ? value=value.slice(0,value.length-1):''"
                                onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
                            ></el-input>
                        </el-form-item>
                        <!-- 起售数量 -->
                        <el-form-item
                            :label="$t('addDish.lowCount_')"
                            v-if="ruleForm.weight_spec == 0"
                        >
                            <el-input-number
                                style="margin-left: 10px; width: 110px"
                                v-model="ruleForm.least_number"
                                :min="1"
                                :max="99"
                                size="small"
                            ></el-input-number>
                        </el-form-item>
                        <!-- 库存数量 -->
                        <el-form-item
                            :label="$t('addDish.sumCount')"
                            prop="inventory"
                        >
                            <el-input
                                type="number"
                                v-model.trim="inventory"
                                class="value-input"
                                :placeholder="$t('addDish.sumRemark')"
                            ></el-input>
                        </el-form-item>
                        <!-- 售卖时间 -->
                        <el-form-item :label="$t('addDish.salesTime')">
                            <el-radio
                                v-model="ruleForm.sell_state"
                                style="margin-left: 10px"
                                label="0"
                                >{{ $t("addDish.forever") }}</el-radio
                            >
                            <el-radio v-model="ruleForm.sell_state" label="1">{{
                                $t("addDish.divTime")
                            }}</el-radio>
                        </el-form-item>
                        <el-row
                            v-if="ruleForm.sell_state == '1'"
                            class="selectTime"
                        >
                            <el-col>
                                <label class="font12">{{
                                    $t("addDish.data_")
                                }}</label>
                                <el-date-picker
                                    class="left10"
                                    v-model="sellSelcetData"
                                    type="daterange"
                                    :range-separator="$t('addBranchStore.go')"
                                    :start-placeholder="$t('startTime')"
                                    :end-placeholder="$t('endTime')"
                                    @change="dataPickerChange"
                                    size="small"
                                ></el-date-picker>
                            </el-col>
                            <el-col class="top20">
                                <label class="font12">{{
                                    $t("addDish.week_")
                                }}</label>
                                <el-checkbox-group
                                    v-model="weekDays"
                                    style="
                                        display: inline-block;
                                        padding-left: 10px;
                                    "
                                >
                                    <el-checkbox
                                        class="weekTxt"
                                        v-for="item in fullWeeksArr"
                                        :disabled="item.isDisabled"
                                        :label="item.id"
                                        :key="item.id"
                                        size="small"
										
                                        >{{ item.value }}</el-checkbox
                                    >
                                </el-checkbox-group>
                            </el-col>
                            <el-col class="top20">
                                <label class="font12">{{
                                    $t("addDish.time_")
                                }}</label>
                                <el-time-select
                                    :placeholder="$t('addDish.startTime')"
                                    class="address-select"
                                    v-model="sellStartTime"
                                    size="small"
                                    :picker-options="{
                                        start: '00:00',
                                        step: '00:15',
                                        end: '24:00',
                                    }"
                                ></el-time-select>
                                <span style="position: relative; left: 5px">{{
                                    $t("addBranchStore.go")
                                }}</span>
                                <el-time-select
                                    :placeholder="$t('endTime')"
                                    class="address-select"
                                    v-model="sellEndTime"
                                    size="small"
                                    :picker-options="{
                                        start: '00:00',
                                        step: '00:15',
                                        end: '24:00',
                                        minTime: sellStartTime,
                                    }"
                                ></el-time-select>
                            </el-col>
                        </el-row>
                        <!-- 销售标签 -->
                        <el-form-item :label="$t('addDish.salesLab_')" prop>
                            <div class="dishTag-wrap">
                                <span
                                    class="dish-tag"
                                    :class="{ active: tagSelect == index }"
                                    @click="dishTagClick(item, index)"
                                    v-for="(item, index) in dishTagList"
                                    :key="index"
                                >
                                    {{ language=="zh_CN"?item.name:item.name2==""?item.name:item.name2}}
                                </span>
                                <el-button
                                    type="primary"
                                    style="width: 95px"
                                    @click="addTagClick"
                                    class="themeImportBtn"
                                >
                                    <span
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                        "
                                        >{{ $t("addDish.addTag") }}</span
                                    >
                                </el-button>
                            </div>
                        </el-form-item>
                        <!-- 菜品描述 -->
                        <el-form-item
                            :label="$t('addDish.dishDes_')"
                            prop="dep_note"
                        >
                            <el-input
                                type="textarea"
                                size="medium"
                                class="note-textarea"
                                :placeholder="$t('addDish.inputDishDes')"
                                v-model.trim="ruleForm.dish_note"
                                maxlength="255"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                    </div>
                    <!-- 保存-保存并继续添加菜品-取消 -->
                    <el-form-item>
                        <el-row style="margin-left: 120px;margin-top:20px;">
                            <el-button
                                class="themeBtn"
                                type="primary"
                                :loading="okLoading"
                                @click="submitForm('ruleForm')"
                                >{{ $t("save") }}</el-button
                            >
                            <el-button
                                class="cancelBtn"
                                type="primary"
                                @click="submitFormCancel"
                                >{{ $t("cancel") }}</el-button
                            >
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
        <!-- 添加单位 -->
        <el-dialog
            :title="$t('addDish.addUnit')"
            :visible.sync="showDialog"
            width="25%"
        >
            <div class="line top10" style="margin-left: 0px"></div>
            <div class="top30" append-to-body>
                <el-form  
                    :label-width="language=='zh_CN'?'100px':'120px'"
                >
                    <el-form-item :label="$t('unitManage.unitName')+'：'">
                        <el-input
                            style="width:93%"
                            v-model="alertValue"
                            :placeholder="$t('unitManage.inputUnit')"
                        ></el-input>
                    </el-form-item>
                </el-form>

                <div class="center top30">
                    <el-button
                        type="primary"
                        class="themeBtn"
                        size="small"
                        style="width: 100px"
                        @click="alertAddClick"
                        >{{ $t("ok") }}</el-button
                    >
                    <el-button
                        type="primary"
                        class="cancelBtn"
                        size="small"
                        @click="alertCancelClick"
                        style="width: 100px"
                        >{{ $t("cancel") }}</el-button
                    >
                </div>
            </div>
        </el-dialog>
        <!-- 添加规格 -->
        <el-dialog
            :title="$t('addDish.addSize')"
            :visible.sync="sizeShowDialog"
            width="25%"
        >
            <div class="line top10" style="margin-left: 0px"></div>
            <div class="top30" append-to-body>
                <el-form 
                    :label-width="language=='zh_CN'?'100px':'110px'"
                >
                    <el-form-item :label="$t('specsManage.sizeName')+'：'" >
                        <el-input
                            style="width:93%"
                            v-model="sizeAlertValue"
                            :placeholder="$t('specsManage.inputSize')"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div class="top30 center">
                    <el-button
                        class="themeBtn"
                        size="small"
                        style="width: 100px"
                        @click="sizeAlertAddClick"
                        >{{ $t("ok") }}</el-button
                    >
                    <el-button
                        class="cancelBtn"
                        size="small"
                        style="width: 100px"
                        @click="sizeAlertCancelClick"
                        >{{ $t("cancel") }}</el-button
                    >
                </div>
            </div>
        </el-dialog>
        <!-- 口味做法表格弹窗 -->
        <el-dialog
            :title="$t('addDish.popKouwei')"
            :visible.sync="dialogTableVisible"
            width="60%"
        >
            <hr />
            <el-row style="padding: 0 30px">
                <el-col class="right">
                    <el-button
                        class="themeAddBtn top20"
                        type="warning"
                        size="small"
                        @click="addTaste"
                        icon="el-icon-circle-plus"
                        >{{ $t("addDish.addKouwei") }}</el-button
                    >
                </el-col>
            </el-row>
            <el-form>
                <el-row style="padding: 0 30px">
                    <el-col class="top20" style="max-height:400px;overflow-y:auto">
                        <el-table class="left-table" :data="dictTableData" border style="width: 100%">
                            <el-table-column
                                :label="$t('tasteManage.kouweiName')"
                            >
                                <template slot-scope="scope">
                                    <el-checkbox
                                        v-model="scope.row.checked"
                                        :indeterminate="scope.row.isIndeterminate"
                                        @change="handleCheckAllChange(scope.row,scope.row.checked)"
                                        ></el-checkbox
                                    >
                                    <span class="fontWeight left10">{{ language=="zh_CN"?scope.row.taste_name_zh==""?scope.row.taste_name:scope.row.taste_name_zh:scope.row.taste_name_en==""?scope.row.taste_name:scope.row.taste_name_en }}</span>
                                    <span class="tips-label">{{scope.row.single_multiple=='0'?$t('tasteManage.single'):$t('tasteManage.multiple')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('tasteManage.kouweiTag')"
                                width="600"
                            >
                                <template slot-scope="scope">
                                    <div class="checkbox-group">
                                        <el-checkbox
                                            @change="handleCheckedDictChange(scope.row,item)"
                                            v-for="(item, index) in scope.row.taste_list"
                                            v-model="item.checked"
                                            :label="item.name"
                                            :key="index"
                                            >{{ language=="zh_CN"?item.name_zh==""?item.name:item.name_zh:item.name_en==""?item.name:item.name_en}}</el-checkbox
                                        >
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('operation')"
                                align="center"
                                width="150"
                                
                            >
                                <template slot-scope="scope">
                                    <div class="left10">
                                        <el-button
                                            type="text"
                                            size="small"
                                            @click="
                                                editRow(scope.$index,scope.row)
                                            "
                                            >{{ $t("edit") }}</el-button
                                            
                                        >
                                        <!-- <el-button
                                            @click="
                                                delRow(scope.$index,scope.row)
                                            "
                                            type="text"
                                            size="small"
                                            >{{ $t("delete") }}</el-button
                                        > -->
                                    </div>    
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col class="center top50">
                        <el-button
                            type="primary"
                            size="small"
                            @click="saveAddKouwei"
                            style="width:100px"
                            class="themeBtn"
                            >{{ $t("save") }}</el-button
                        >
                        <el-button
                            type="primary"
                            size="small"
                            class="cancelBtn"
                            @click="dialogTableVisible = false"
                            style="width:100px"
                            >{{ $t("cancel") }}</el-button
                        >
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
        <!-- 新增口味 -->
        <el-dialog
            :title="$t('addDish.addKouwei')"
            :visible.sync="showAddDialog"
            :before-close="handleClose"
            width="25%"
        >
            <div class="line top10" style="margin-left: 0px"></div>
            <div class="top30" append-to-body>
                <el-form
                    :model="tasteRuleForm"
                    ref="tasteRuleForm"
                >
                    <el-form-item 
                        :label="$t('tasteManage.kouweiName')+'：'"
                        :label-width="language=='zh_CN'?'100px':'110px'"
                    >
                        <el-input
                            v-model="tasteRuleForm.kouweiName"
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
                            v-model="tasteRuleForm.tagValue"
                            :placeholder="$t('tasteManage.inputKouweiTag')"
                            style="width: 67%"
                        ></el-input>
                        <el-button
                            type="primary"
                            class="themeImportBtn"
                            style="margin-left: 4%;width:22%"
                            @click="serveClick(tasteRuleForm.tagValue)"
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
                <el-row class="top30 center">
                    <el-col>
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
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
        <!-- 编辑口味 -->
        <el-dialog
            :title="$t('tasteManage.editKouwei')"
            :visible.sync="showEditDialog"
            :before-close="handleEditClose"
            width="25%"
        >
            <div class="line top10" style="margin-left: 0px"></div>
            <div class="top30" append-to-body>
                <el-form
                    :model="tasteRuleForm"
                    ref="tasteRuleForm"
                >
                    <el-form-item 
                        :label="$t('tasteManage.kouweiName')+'：'"
                        :label-width="language=='zh_CN'?'100px':'110px'"
                    >
                        <el-input
                            v-model="tasteRuleForm.kouweiName"
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
                            v-model="tasteRuleForm.tagValue"
                            :placeholder="$t('tasteManage.inputKouweiTag')"
                            style="width: 67%"
                        ></el-input>
                        <el-button
                            type="primary"
                            class="themeImportBtn"
                            style="margin-left: 4%;width:22%"
                            @click="serveClick(tasteRuleForm.tagValue)"
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
                <el-row class="top30 center">
                    <el-col>
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
                    </el-col>
                </el-row>
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
        <!-- 新增餐盒弹窗 -->
        <el-dialog
            :title="$t('takeOutManage.newBox')"
            :visible.sync="takeBoxshowDialog"
            width="25%"
        >
            <div class="line top10" style="margin-left: 0px"></div>
            <div class="top20" append-to-body>
                <el-form
                    :model="takeBoxForm"
                    :rules="takeBoxRules"
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
                            :on-success="takeBoxHandleAvatarSuccess"
                            :before-upload="takeBoxBeforeAvatarUpload"
                        >
                            <img
                                v-if="takeBoxImageUrl"
                                :src="takeBoxImageUrl"
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
                            v-model="takeBoxForm.box_name"
                            :placeholder="$t('takeOutManage.inputName')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('takeOutManage.price')" prop="box_price">
                        <el-input
                            type="number"
                            v-model="takeBoxForm.box_price"
                            :placeholder="$t('takeOutManage.inputPrice')"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div class="top30 center">
                    <el-button
                        class="themeBtn"
                        size="small"
                        style="width: 100px"
                        @click="takeBoxSubmitForm('ruleForm')"
                        >{{ $t("ok") }}</el-button
                    >
                    <el-button
                        class="cancelBtn"
                        size="small"
                        style="width: 100px"
                        @click="takeBoxResetForm('ruleForm')"
                        >{{ $t("cancel") }}</el-button
                    >
                </div>
            </div>
        </el-dialog>
    
    </div>
</template>

<script>
export default {
    computed: {
        curentStore() {
            //console.log('curentStore')
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
        },
        businessModel() {
            return this.$store.getters.businessModel;
        },
    },
    data() {
        return {
            dep_id: "", //门店id
            moreShow: false,
			weekDays:[],
            fullWeeksArr: [
				{id:"1",value:this.$t("monday")},
				{id:"2",value:this.$t("tuesday")},
				{id:"3",value:this.$t("wednesday")},
				{id:"4",value:this.$t("thursday")},
				{id:"5",value:this.$t("friday")},
				{id:"6",value:this.$t("saturday")},
				{id:"0",value:this.$t("sunday")},
            ],
            sellSelcetData:[],
            sellStartTime: "00:00",
            sellEndTime: "24:00",
            
            imageUrl: "",

            //菜品单位
            showDialog: false,
            alertValue: "",
            dishUnitData: [],
            //加料配菜
            feedingList: null,
            selectFeedingList: [],
            oldSelectFeedingList: [],
            additionalValue: "",
            additionaPriceValue: null,
            // 销售状态
            sellValue: true,
            //口味做法
            tasteSaveData: [],
            tasteSwitch: false,
            dictTableData: [],  //口味做法弹窗
            showEditDialog: false,
            showAddDialog: false,
            dialogTableVisible: false,
            delDialogVisible:false,
            okLoading: false,
            edit_idx: 0,
            del_idx: 0,
            dictId:"",
            isAllow:false,
            tagNames: [],
            rowTagObj:{},
            tasteRuleForm: {
                kouweiName: "",
                tagValue: "",
            },
            //外带餐盒
            takeBoxSaveData: [],
            takeBoxSwitch: false,
            takeBoxCheckData:null,
            takeBoxshowDialog:false,
            takeBoxImageUrl:"",
            takeCurId: null,
            takeBoxForm: {
                box_image: "",
                box_name:'',
                box_price:"",
                dep_id:"",
                company_id:"",
            },
            takeBoxRules: {
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
            //打印后厨小票
            printInfoSaveData: [],
            printInfoSwitch: false,
            printInfoCheckData:[],
            //允许改价
            changePriceSwith:false,
            //规格
            sizeShowDialog: false,
            sizeAlertValue:"",
            sizeDataList: [],
            sizeData: [
                {
                    spec_unit: "", //规格单位
                    spec_price: "", //价格
                    spec_cost: "", //规格成本
                    member_price: "", //会员价格
                    least_number: "1", //起售个数
                },
                {
                    spec_unit: "",
                    spec_price: "",
                    spec_cost: "",
                    member_price: "",
                    least_number: "1",
                },
            ],
            //菜品分类
            dishTypeList: [],
            dishTypeSelectValue: null,
            inventory: "",
            //销售标签
            dishTagList: [],
            tagSelect: -1,
            ruleForm: {}, //获取修改菜品对象赋值
            rules: {
                dish_name: [
                    {
                        required: true,
                        message: this.$t('addDish.nameRemark'),
                        trigger: "blur",
                    },
                ],
                dish_price: [
                    {
                        required: true,
                         message:  this.$t('addDish.inputDishPrices'),
                        trigger: "blur",
                    },
                ],
                unit_type: [
                    {
                        required: true,
                        message: this.$t("addDish.selectDishUnit"),
                        trigger: "blur",
                    },
                ],
                dish_second_name: [
                    {
                        required: true,
                        message:  this.$t('addDish.inputDishType'),
                        trigger: "change",
                    },
                ],
            },
            getPropOjb:null,
			
			
        };
    },
    methods: {
        //更多设置 展开收起
        openClick() {
            this.moreShow = !this.moreShow;
        },
        /*
         *****加料配菜模块*****
         */
        //加料配菜---加料名称下拉选择
        AdditionaSelect(item) {
            //加料配菜没有会员价默认null
            //不能重复添加
            if(this.selectFeedingList.length>0&&this.selectFeedingList!=null){
                for (let i in this.selectFeedingList) {
                    if (item.add_name == this.selectFeedingList[i].add_name) {
                        this.toast.info(this.$t("addDish.dontDuplicate"));
                        return false;
                    }
                }

            }
            item.rec_sts = 0;
            item.member_price = "";
            this.selectFeedingList.push(item);
            console.log(item);
           
        },
        // 删除加料
        delAdditionalClick(index) {
            this.selectFeedingList.splice(index, 1);
            // console.log(this.selectFeedingList);
        },
        //获取菜品加料列表
        getFeddingList() {
            let data = {
                dep_id: this.dep_id,
            };
            let that = this;
            this.request.feedingList(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
						that.feedingList = res.data;
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //新增加料
        AdditionaClick() {
            if (
                this.additionalValue == "" ||
                Number(this.additionaPriceValue) <= 0 ||
                this.additionaPriceValue == null
            ) {
                return false;
            }
            for (let i in this.feedingList) {
                if (this.feedingList[i].add_name == this.additionalValue) {
                    this.toast.info(this.$t("addDish.nameDuplicate"));
                    return false;
                }
            }
            let data = {
                dep_id: this.dep_id,
                add_name: this.additionalValue,
                price: this.additionaPriceValue,
                member_price: "",
                is_use: 0,
            };
            let that = this;
            this.request.feedingAdd(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("addDish.addSucc"));
                    that.additionalValue = "";
                    that.additionaPriceValue = null;
                    that.getFeddingList();
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        AdditionaSearch(queryString, cb) {
            cb(this.feedingList);
        },
        /*
         *****口味做法模块*****
         */
        // 添加口味
        tasteHandleInputConfirm() {
            this.dialogTableVisible = true;
        },
        //全选
        handleCheckAllChange(items,checked) {
            items.isIndeterminate = false;
            //口味表格table值tasteSaveData
            items.taste_list.forEach(list=>{
                if(checked){
                    list.checked = true;
                }else{
                    list.checked = false;
                }
            })
           
        },
        //单选
        handleCheckedDictChange(items,item) {
            let isAllChecked = items.taste_list.every(item=> item.checked !=false); //判断每一项子类是否全选了
            let isChecked = items.taste_list.some(item=> item.checked ==true); //判断有一个子类选了
            if(isChecked){
                if(isAllChecked){
                    items.checked = true;
                    items.isIndeterminate = false;
                }else{
                    items.isIndeterminate = true;
                    items.checked = false;
                }
            }else{
                items.checked = false;
                items.isIndeterminate = false;
            }
        },
        
        // 保存已选中的口味
        saveAddKouwei() {
            let cloneData = this.stringutils.simpleCopy(this.dictTableData);
            cloneData.forEach((items,i)=>{
                items.taste_list = items.taste_list.filter(item=>item.checked);
            });
            // 子类不选的时候
            cloneData = cloneData.filter(item=>item.taste_list.length!=0);
            // console.log(cloneData);
            this.tasteSaveData = cloneData;
            this.dialogTableVisible = false;
        },
        handleClose(done) {
            this.tasteRuleForm.kouweiName = "";
            this.tagNames = [];
            done();
        },
        handleEditClose(done) {
            this.tasteRuleForm.kouweiName = "";
            this.tagNames = [];
            done();
        },
        addTaste() {
			this.tasteRuleForm.kouweiName = "";
            this.tasteRuleForm.tagValue = "";
            this.tagNames = [];
            this.isAllow = false;
            this.showAddDialog = true;
        },
        editRow(index, row) {
            this.showEditDialog = true;
            if(this.language=='zh_CN'){
                if(row.taste_name_zh==""){
                    this.tasteRuleForm.kouweiName = row.taste_name;
                }else{
                    this.tasteRuleForm.kouweiName = row.taste_name_zh;
                }
            }else{
                if(row.taste_name_en==""){
                    this.tasteRuleForm.kouweiName = row.taste_name;
                }else{
                    this.tasteRuleForm.kouweiName = row.taste_name_en;
                }
            }
            this.tagNames = this.stringutils.simpleCopy(row.taste_list);
            this.edit_idx = index;
            this.isAllow = this.dictTableData[this.edit_idx].single_multiple==1?true:false;
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
            for (let idx = 0, lens = this.tagNames.length; idx < lens; idx++) {
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
                this.tasteRuleForm.tagValue = "";
            }else{
                this.toast.info(this.$t('tasteManage.txtMess3'));
            }
        },
        delOKUser() {
            let dictValuesArry = [];
            this.dictTableData.forEach((item,index) => {
                if (index != this.del_idx) {
                    dictValuesArry.push(item);
                }
            });
            this.dictTableData = dictValuesArry;
            this.updatekouwei();
            this.delDialogVisible = false;
		},
        cancelSaveBtn() {
            this.tasteRuleForm.kouweiName = "";
            this.tagNames = [];
            this.showAddDialog = false;
        },
        cancelEditBtn() {
            this.tasteRuleForm.kouweiName = "";
            this.tasteRuleForm.tagValue = "";
            this.tagNames = [];
            this.showEditDialog = false;
        },
        
        //弹窗 保存新增口味
        saveorupdatekouwei(type) {
            //1：add 0:edit 2:del
            if(this.tasteRuleForm.kouweiName.length>15){
                 this.toast.info(this.$t('tasteManage.inputKouweiName'));
                return false;
            }
            if(this.tasteRuleForm.kouweiName == ""||this.tasteRuleForm.kouweiName==null){
				this.toast.info(this.$t('tasteManage.txtMess'));
            }else if(this.tagNames.length <=0){
                this.toast.info(this.$t('tasteManage.txtMess2'));
            }else{
                if(type == 0){
                    //编辑口味
                    this.dictTableData[this.edit_idx].taste_list = this.tagNames;
                    this.dictTableData[this.edit_idx].taste_name = this.tasteRuleForm.kouweiName;
                    this.dictTableData[this.edit_idx].single_multiple = this.isAllow==true?'1':'0';
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
                    addDict.taste_name = this.tasteRuleForm.kouweiName;
                    this.dictTableData.push(addDict);
                    this.showAddDialog = false;
                   
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
				dict_list: this.dictTableData,
				id: this.dictId,
            };
			this.request.saveorupdatekouwei(data, function (res) {
				if (res.code == "1") {
                    that.toast.success(that.$t('diySucc'));
					that.tasteRuleForm.kouweiName = "";
					that.tagNames = [];
				} else {
					that.toast.error(res.msg);
				}
			});

	    },
        // 获取口味列表
        getKouweilist() {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                company_id: this.$store.getters.loginInfo.company_id,
            };
            this.request.kouweiList(data, function (res) {
                if (res.code == "1") {
                    if(res.data.dict_list!=null){
                        let res_data = res.data;
                        that.dictTableData = that.stringutils.simpleCopy(res_data.dict_list);
                        that.dictId = res_data.id;
                        that.dictTableData.forEach(items => {
                            that.$set(items, "checked", false);
                            that.$set(items, "isIndeterminate", false);
                            items.taste_list.forEach(item=>{
                                that.$set(item, "checked", false);
                            })
                        });
                        // console.log(that.dictTableData);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
                
           
        },
        /*
         *****外代餐盒模块*****
        */
        //获取打包盒列表
        getPackList(){
            let that = this;
            let data = {
                dep_id : this.dep_id,
            };
            this.request.getPackList(data,function (res) {
                if (res.code == "1") {
                    let res_data = res.data;
                    that.takeBoxSaveData = res_data;
                    that.takeBoxSaveData.forEach(item=>{
                        if(item.id != that.takeCurId){
                            item.checked = false;
                        }else{
                            item.checked = true;
                        }
                    });
                    // console.log(that.takeBoxSaveData);
                } else {
                    that.toast.error(res.msg);
                }
            })
        },
        takeBoxCheckChange(row){
            this.takeBoxSaveData.forEach(item=>{
                if (item.id != row.id) {
                    item.checked = false;
                }else{
                    this.takeCurId = item.id;
                    item.checked = true;
                }
            })
            // console.log(row);
            //ES6删除和过滤对象中部分属性
            let {page_size,page_num,print_info,token,checked,...newRow} = row;
            // console.log(newRow);
            this.takeBoxCheckData = newRow;
        },
        //餐盒图片
        takeBoxHandleAvatarSuccess(res, file) {
            if (Number(res.code) > 0) {
                this.takeBoxForm.box_image = res.msg;
                this.takeBoxImageUrl = URL.createObjectURL(file.raw);
            } else {
                this.takeBoxForm.box_image = "";
                this.takeBoxImageUrl = "";
                this.toast.error(res.msg);
            }
        },
        takeBoxBeforeAvatarUpload(file) {
            return this.uploadUtils.beforeAvatarUpload(file);
        },
        packClick(){
            this.takeBoxForm = {};
            this.takeBoxImageUrl = "";
            this.takeBoxshowDialog = true;
        },
        //添加打包盒
        addPack(){
            //判断是否重复添加
            for (let i in this.takeBoxSaveData) {
                if(this.takeBoxForm.box_name==this.takeBoxSaveData[i].box_name){
                    this.toast.info(this.$t('takeOutManage.txtMess'));
                    return false;
                }
            }
            
            let that = this;
            this.takeBoxForm.dep_id = this.dep_id;
            this.takeBoxForm.company_id = this.curentStore.faher_ID;
            this.request.addPack(this.takeBoxForm,function(res) {
                if(res.code == "1"){
                    that.takeBoxshowDialog = false;
                    that.toast.success(that.$t("addSucc"));
                    that.getPackList();
                }else{
                    that.toast.error(res.mag)
                }
               
           })
        },
        takeBoxSubmitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addPack();
                } else {
                    return false;
                }
            });
        },
        
        takeBoxResetForm(formName) {
            this.$refs[formName].resetFields();
            this.takeBoxshowDialog = false;
        },
        /*
         *****打印后厨小票模块*****
        */
        //获取打印机列表
        getPrint(){
            let that = this;
            let data = {
                dep_id : this.dep_id,
                query_type: 1,
            };
            this.request.getPrint(data,function (res) {
                if (res.code == "1") {
                    let res_data = res.data;
                    if(res_data.length!=0||res_data!=null){
                        
                        res_data.forEach(item=>{
                            let itemData = {
                                id : item.id,
                                name:item.name,
                                type:2,
                            }
                            that.$set(item, "checked", false);
                            that.printInfoSaveData.push(itemData);
                        })
                    }
                    // console.log(that.printInfoSaveData);
                } else {
                    that.toast.error(res.msg);
                }
            })
        },
        printSwithChange(){
            if(this.printInfoSwitch && this.printInfoSaveData.length==0){
                this.toast.info(this.$t('addDish.noPrint'));
                this.printInfoSwitch = false;
            }
        },
        printInfoCheckChange(row,checked){
            let index = this.printInfoCheckData.indexOf(row);
            if(checked){
                this.printInfoCheckData.push(row);
            }else{
                this.printInfoCheckData.splice(index, 1);
            }
            console.log(row);
            // console.log(this.printInfoCheckData);

        },
        /*
         *****菜品标签模块*****
         */
        //选中的菜品菜品标签id
        dishTagClick(item, index) {
            this.tagSelect = index;
            this.ruleForm.dish_tag_id = item.id;
            // console.log(item);
        },
        //添加标签
        addTagClick(){
            this.$router.push("/saleTagsManage");
        },
        // 菜品标签和规则列表查询
        tagList() {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                dict_type: "DISH_TAG",
            };
            this.request.tagspeclist(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;
                        that.dishTagList = res_data;
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },


        /*
         *****菜品分类模块*****
         */
        //选择当前菜品分类obj
        dishTypeChange(item) {
            this.ruleForm.dish_second_name = item.type_name;
            this.ruleForm.dish_second_name_en = item.type_name_en;
            this.ruleForm.dish_second_type = item.id;
            // console.log(item);
        },
        //获取所有的菜品分类
        getAllType() {
            let that = this;
            that.request.allType({ dept_id: this.dep_id }, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;
                        that.ruleForm.dish_first_name = res_data[1].type_name;
                        that.ruleForm.dish_first_name_en =
                            res_data[1].type_name_en;
                        that.ruleForm.dish_first_type = res_data[1].id;
                        for (let i in res_data[1].list) {
                            that.dishTypeList.push(res_data[1].list[i]);
                        }
                        // console.log(res_data);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

        /*
         *****规格模块*****
         */
        //添加规格行
        addSizeClick() {
            this.sizeData.push({
                spec_unit: "",
                spec_price: "",
                spec_cost: "",
                member_price: "",
                least_number: "1",
            });
        },
        //删除当前规格
        deleteSizeRow(index, item) {
            this.sizeData.splice(index, 1);
            // console.log(this.sizeData);
        },
        delSizeServe(item){
            let that = this;
            let data = {
                dep_id: this.dep_id,
                param: item.id,
                str_param:item.name,
                dict_del_type:'3',
            };
            this.request.delDic(data,function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("delSucc"));
                    that.specList();
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        sizeChange(){
            for (let i = 0; i < this.sizeData.length - 1; i++) {
                for (let j = i + 1; j < this.sizeData.length; j++) {
                    if (this.sizeData[i].spec_unit === this.sizeData[j].spec_unit) {
                        this.toast.info(`'${this.sizeData[i].spec_unit}'${this.$t('addDish.sizeRepeatMsg')}`);
                    }
                }
            }

        },
        
        //规格列表查询
        specList() {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                dict_type: "DISH_SPEC",
            };
            this.request.tagspeclist(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;
                        that.sizeDataList = res_data;
                        that.sizeDataList.forEach(item=>{
                            item.disabled = false;
                        })
                        // console.log(that.sizeDataList);
                        
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //添加规格
        addSpecs() {
            if(this.sizeAlertValue==""||this.sizeAlertValue==null){
                this.toast.info(this.$t('specsManage.inputSize'));
                return false;
            }else{
                //判断规格是否重复添加
                for (let i in this.sizeDataList) {
                    if(this.sizeAlertValue==this.sizeDataList[i].name||this.sizeAlertValue==this.sizeDataList[i].name2){
                        this.toast.info(this.$t('specsManage.txtMess'));
                        return false;
                    }
                }
            }
            let that = this;
            let data = {
                dep_id: this.dep_id,
                dict_value: this.sizeAlertValue,
                dict_type: "DISH_SPEC",
            }
            that.request.addDic(data,function (res) {
                if (res.code == "1") {
                    that.sizeShowDialog = false;
                    that.toast.success(that.$t("addSucc"));
                    that.sizeAlertValue = "";
                    that.specList();
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        sizeAlertAddClick(){
            this.addSpecs();
        },
        sizeAlertCancelClick(){
            this.sizeAlertValue = "";
            this.sizeShowDialog = false;

        },
        takeOutNullSpecDetail() {
            let delNull = this.sizeData.filter((data) => {
                if (
                    data.spec_unit.length<=0 ||
                    data.spec_price.length<=0
                   
                ) {
                    return false;
                }
                return true;
            });
            // debugger
            if (delNull.length <= 0) {
                return null;
            }
            return delNull;
        },
        
        /*
         *****菜品图片模块*****
         */
        handleAvatarSuccess(res, file) {
            if (Number(res.code) > 0) {
                this.ruleForm.dish_image = res.msg;
                this.imageUrl = URL.createObjectURL(file.raw);
            } else {
                this.ruleForm.dish_image = "";
                this.imageUrl = "";
                this.toast.error(res.msg);
            }
        },
        beforeAvatarUpload(file) {
            return this.uploadUtils.beforeAvatarUpload(file);
        },

        /*
         *****售卖时间模块*****
         */
        dataPickerChange() {
            //获取当前时间
            let data1 = this.moment(this.sellSelcetData[0]);
            //获取需要对比的时间
            let data2 = this.moment(this.sellSelcetData[1]);
            let start = data1.format("YYYY-MM-DD");
            let end = data2.format("YYYY-MM-DD");
            this.ruleForm.sell_date = `${start}/${end}`;
            
            let selectData = [start,end];
            let getWeeksDate = this.stringutils.getWeeksFromDate(selectData);
            this.weekDays = getWeeksDate;
            if(this.weekDays.length>0){
                this.fullWeeksArr.forEach(items=>{
                    items.isDisabled = true;
                    this.weekDays.forEach(item=>{
                        if(items.id===item){
                            items.isDisabled = false;
                        }
                    });
                });
            }
            // console.log(this.weekDays);
            // console.log(this.fullWeeksArr);
        },

        /*
         *****销售状态模块*****
         */
        sellChange(value) {
            if (value) {
                this.ruleForm.curr_sts = "0"; //在售
            } else {
                this.ruleForm.curr_sts = "1"; //未售
            }
        },

        addDishTypeClick() {
            this.$router.push("/dishClassifyManage");
        },

        /*
         *****菜品单位模块*****
        */
        alertAddClick() {
            this.addDishUnit();
        },
        alertCancelClick() {
            this.alertValue = "";
            this.showDialog = false;
        },

        addUnitClick() {
            this.alertValue = "";
            this.showDialog = true;
        },
        getDishUnitData() {
            let that = this;
            that.request.getDicList(
                { dep_id: this.dep_id, str_param: "DISH_UNIT_DICT" },
                function (res) {
                    if (res.code == "1") {
                        that.dishUnitData = res.data;
                        // console.log(that.dishUnitData);
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        deletUnitClick(item) {
            let that = this;
            that.request.delDic({
                    dep_id: this.dep_id,
                    param: item.id,
                    str_param: "DISH_UNIT_DICT",
                },
                function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("delSucc"));
                    that.getDishUnitData();
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        addDishUnit() {
            if(this.alertValue==""||this.alertValue==null){
                this.toast.info(this.$t('unitManage.inputUnit'));
                return false;
            }else{
                //判断单位是否重复添加
                for (let i in this.dishUnitData) {
                    if(this.alertValue==this.dishUnitData[i].dict_value||this.alertValue==this.dishUnitData[i].dict_value_en||this.alertValue==this.dishUnitData[i].dict_value_zh){
                        this.toast.info(this.$t('unitManage.txtMess'));
                        return false;
                    }
                }
            }
            let that = this;
            that.request.addDic(
                {
                    dep_id: this.dep_id,
                    dict_value: this.alertValue,
                    dict_type: "DISH_UNIT_DICT",
                },
                function (res) {
                    that.showDialog = false;
                    if (res.code == "1") {
                        that.toast.success(that.$t("addSucc"));
                        that.getDishUnitData();
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        //修改菜品详情
        updateDish(back) {
            let that = this;
            let specDetail = this.takeOutNullSpecDetail();
            if (this.ruleForm.weight_spec == 2) {
                // 多规格的菜的价格从规格内获取，故需要设置菜品价格为空
                this.ruleForm.dish_price = "";
                this.ruleForm.member_price = "";
                this.ruleForm.dish_cost = "";
                if (specDetail == null) {
                    this.ruleForm.spec_detail = "";
                    this.toast.info(this.$t("addDish.inputSizeInfo"));
                    return false;
                } else {
                    for (let i = 0; i < specDetail.length - 1; i++) {
                        for (let j = i + 1; j < specDetail.length; j++) {
                            if (specDetail[i].spec_unit === specDetail[j].spec_unit) {
                                this.toast.info(`'${this.sizeData[i].spec_unit}'${this.$t('addDish.sizeRepeatMsg')}`);
                                return false;
                            }
                        }
                    }
                    specDetail.forEach(item=>{
                        if(item.spec_cost=="0.00"){
                            item.spec_cost = "0"
                        }
                        if(item.member_price==""){
                            item.member_price = "-1"
                        }

                    })
                    this.ruleForm.spec_detail = JSON.stringify(specDetail);
                }

            }
            //console.log(specDetail);
			if(this.ruleForm.additional_ref_type=="2" &&this.selectFeedingList.length > 0){
                let  upDataSelect =  this.stringutils.simpleCopy(this.selectFeedingList);
                let  oldSelect = this.oldSelectFeedingList;
                upDataSelect.forEach(up => {
                    oldSelect.forEach(old => {
                        if(up.id==old.id){
                            if(up.max_num!=old.max_num){
                                up.rec_sts = 3;
                            }else{
                                up.rec_sts = 2;
                            }
                        }else{
                            old.rec_sts = 1;
                        }
                    });
                    
                });
                let newUpDataSelect = [...upDataSelect,...oldSelect];
                newUpDataSelect = newUpDataSelect.filter(filt=>filt.rec_sts!=null);
                //数组合并并去重，且rec_sts为null
                for(let i=0; i<newUpDataSelect.length; i++){
                    for(let j=i+1; j<newUpDataSelect.length; j++){
                        if(newUpDataSelect[j].id==newUpDataSelect[i].id){       
                            newUpDataSelect.splice(j,1);
                            j--;
                        }
                    }
                }
                // console.log(newUpDataSelect);
                this.ruleForm.addtional_list = newUpDataSelect;
            }else{
                this.ruleForm.addtional_list = null;
            }
            if (this.tasteSaveData.length > 0 && this.tasteSwitch) {
                this.ruleForm.taste_set = this.tasteSaveData;
            } else {
                this.ruleForm.taste_set = null;
            }
            if(this.takeBoxCheckData !=null&&this.takeBoxSwitch){
                this.ruleForm.box = this.takeBoxCheckData; 
            }else{
                this.ruleForm.box = null;
            }
            if(this.printInfoCheckData.length > 0&&this.printInfoSwitch){
                let newCheckData = [];
                //去掉数组的一个属性
                this.printInfoCheckData.forEach(item=>{
                    let {checked,...newData} = item;
                    newCheckData.push(newData)
                })
                this.ruleForm.print_info = newCheckData; 
                // console.log(newCheckData);
            }else{
                this.ruleForm.print_info = null;
            }
            if (this.inventory.length <= 0) {
                this.ruleForm.dish_inventory = "-1";
            } else {
                this.ruleForm.dish_inventory = this.inventory;
            }

            if (this.ruleForm.sell_state == "1") {
                if (
                    this.sellSelcetData.length <= 0 ||
                    this.weekDays.length <= 0
                ) {
                    this.toast.info(this.$t("addDish.selectSalesTime"));
                    return;
                }
                this.ruleForm.sell_week = JSON.stringify(this.weekDays);
                this.ruleForm.sell_time =
                    this.sellStartTime + "-" + this.sellEndTime;
            } else {
                this.ruleForm.sell_week = "";
                this.ruleForm.sell_date = "";
                this.ruleForm.sell_time = "";
            }
            //普通菜改价
            this.ruleForm.change_set = this.changePriceSwith?'1':'0';
            this.ruleForm.original_price = this.ruleForm.dish_price;
            this.ruleForm.dep_id = this.dep_id;
            this.okLoading = true;
            that.request.updateDish(that.ruleForm, function (res) {
                that.okLoading = false;
                if (res.code == "1") {
                    that.toast.success(that.$t("updateSucc"));
                    if (back) {
                        that.$router.back(-1);
                    } else {
                        that.resetForm("ruleForm");
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

        //获取菜品详情 通过dish_id
        getDishInfo() {
            this.getPackList();
            this.specList();
            this.tagList();
            this.getKouweilist();
            this.getPrint();
            let that = this;
            let data = {
                param: this.$route.query.id,
                dep_id: this.dep_id,
            }
            that.request.dishInfo(data, function (res) {
                if (res.code == "1") {
					let res_data = res.data;
                    that.ruleForm = res_data;
                    delete that.ruleForm.spec_list; 
					//console.log(that.ruleForm);
                    //赋值
                    that.ruleForm.dish_price = that.stringutils.formatPrice(that.ruleForm.dish_price);
                    that.ruleForm.dish_cost = that.stringutils.formatPrice(that.ruleForm.dish_cost);
                    if(that.ruleForm.member_price==null){
                        that.ruleForm.member_price = '-1';
                    }
                    that.ruleForm.member_price = that.stringutils.formatPrice(that.ruleForm.member_price);
                    that.sellValue = that.ruleForm.curr_sts==0?true:false;
					that.imageUrl = that.ruleForm.dish_image;
					that.dishTypeSelectValue = `${that.ruleForm.dish_second_name_en} ${that.ruleForm.dish_second_name}`;
                    // 口味做法
                    if (that.ruleForm.taste_set != null && that.ruleForm.taste_set.length>0){
                        let tasteSetArray = that.ruleForm.taste_set;
						that.tasteSwitch = true;
                        that.tasteSaveData = tasteSetArray;
                        // console.log(that.tasteSaveData);
                        // console.log(that.dictTableData);
                        //循环比对是否勾选
                        for (let i in that.tasteSaveData) {
                            for (let j in that.dictTableData) {
                                if(that.tasteSaveData[i].taste_name==that.dictTableData[j].taste_name&&that.tasteSaveData[i].taste_name_zh==that.dictTableData[j].taste_name_zh){
                                    for (let k in that.tasteSaveData[i].taste_list) {
                                        for (let m in that.dictTableData[j].taste_list) {
                                            
                                            if (that.tasteSaveData[i].taste_list[k].name == that.dictTableData[j].taste_list[m].name&&that.tasteSaveData[i].taste_list[k].name_zh == that.dictTableData[j].taste_list[m].name_zh) {
                                                that.dictTableData[j].taste_list[m].checked = true;
                                            }
                                            let isAllChecked = that.dictTableData[j].taste_list.every(item=> item.checked !=false);//判断每一项子类是否全选了
                                            let isChecked = that.dictTableData[j].taste_list.some(item=> item.checked ==true); //判断有一个子类选了
                                            if(isChecked){
                                                if(isAllChecked){
                                                    that.dictTableData[j].checked = true;
                                                    that.dictTableData[j].isIndeterminate = false;
                                                }else{
                                                    that.dictTableData[j].isIndeterminate = true;
                                                    that.dictTableData[j].checked = false;
                                                }
                                            }else{
                                                that.dictTableData[j].checked = false;
                                                that.dictTableData[j].isIndeterminate = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }  
                        
					}
					if (that.ruleForm.dish_inventory == -1) {
						that.inventory = "";
					} else {
						that.inventory = that.ruleForm.dish_inventory;
                    }
					
                    //加料配菜
                    that.selectFeedingList = [];
					if(that.ruleForm.additional_ref_type=="2" && that.ruleForm.addtional_list != null){
                        that.selectFeedingList= that.stringutils.simpleCopy(that.ruleForm.addtional_list); 
                        that.oldSelectFeedingList = that.stringutils.simpleCopy(that.ruleForm.addtional_list); 
					}
                    
                    //自定义售卖时间
					if(that.ruleForm.sell_state==1&&that.ruleForm.sell_date!=null){
                        that.sellSelcetData = that.ruleForm.sell_date.split("/");
                        that.sellStartTime = that.ruleForm.sell_time_start;
                        that.sellEndTime = that.ruleForm.sell_time_end;
                        if(that.ruleForm.sell_week!=""&& that.ruleForm.sell_week!= null){
                            that.weekDays = JSON.parse(that.ruleForm.sell_week);
                            if(that.weekDays.length>0){
                                that.fullWeeksArr.forEach(items=>{
                                    items.isDisabled = true;
                                    that.weekDays.forEach(item=>{
                                        if(items.id===item){
                                            items.isDisabled = false;
                                        }
                                    });
                                });
                            }
                        }
                        
                    }else{
                        let date = new Date();
                        let getCurrDate = String(that.stringutils.getCurrentDate(date));
                        let getCurrMonLastDate = String(that.stringutils.getCurrentMonthLastDay(date));
                        that.sellSelcetData=[getCurrDate,getCurrMonLastDate];
                        let getWeeksDate = that.stringutils.getWeeksFromDate(that.sellSelcetData);
                        that.weekDays = getWeeksDate;
                        that.ruleForm.sell_date = `${getCurrDate}/${getCurrMonLastDate}`;
                        // console.log(that.weekDays);
                        // console.log(that.sellSelcetData);
                    }
                    //多规格菜
                    if(that.ruleForm.weight_spec == 2){
                        if(that.ruleForm.spec_detail!=""&& that.ruleForm.spec_detail!= null){
                            let specArray =  JSON.parse(that.ruleForm.spec_detail);
                            specArray.forEach(item=>{
                                item.spec_price = that.stringutils.formatPrice(item.spec_price);
                                item.spec_cost = that.stringutils.formatPrice(item.spec_cost);
                                item.member_price = that.stringutils.formatPrice(item.member_price);

                            });

                            that.sizeData = specArray;
                        }
                    }
                    //外带餐盒
                    if (that.ruleForm.box != "" && that.ruleForm.box!= null){
                        that.takeBoxSwitch = true;
                        that.takeBoxCheckData = that.ruleForm.box;
                        that.takeCurId = that.takeBoxCheckData.id;
                        if(that.takeBoxSaveData.length!=0){
                            that.takeBoxSaveData.forEach(box => {
                                if(that.takeBoxCheckData.id == box.id){
                                    box.checked = true;
                                    box.box_num = that.takeBoxCheckData.box_num;

                                }
                            });
                        }
                    }
                    //打印后厨小票
                    if (that.ruleForm.print_info!= null){
                        that.printInfoSwitch = true;
                        that.printInfoCheckData = that.ruleForm.print_info;
                        if(that.printInfoSaveData.length!=0){
                            that.printInfoSaveData.forEach(save => {
                                that.printInfoCheckData.forEach(check => {
                                    if(check.id == save.id){
                                        that.$set(save, "checked", true);
                                    }
                                })
                            });
                        }
                    }
                    //普通菜改价
                    that.changePriceSwith = that.ruleForm.change_set=='1'?true:false;
                    //销售标签
                    if(that.dishTagList.length!=0){
                        for(let tag in that.dishTagList){
                            if(that.ruleForm.dish_tag_id == that.dishTagList[tag].id){
                                // console.log(tag);
                                that.tagSelect = tag;
                            }
                        }
                    }
                    
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
       
		//保存
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.updateDish(true);
                } else {
                    return false;
                }
            });
        },
        // 取消
        submitFormCancel() {
            this.$router.push({ name: "dishList", params: { obj:this.getPropOjb} });
        },
        //重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            let getPropOjb = this.$route.params.obj;
            if(getPropOjb!=undefined&&getPropOjb!=null){
                this.getPropOjb = getPropOjb;
                // console.log(this.getPropOjb);
            }
            this.getDishInfo()
			this.getDishUnitData();
            this.getFeddingList();
            this.getAllType();
           
        }
    },
    
};
</script>

<style scoped>
.dishTag-wrap{
    width: 700px;
    overflow: hidden;
    margin-left: 10px;
}
.dish-tag{
    display: inline-block;
    height: 26px;
    line-height: 25px;
    padding: 0 10px;
    margin-right: 10px;
    margin-top: 7px;
    margin-bottom: 10px;
    color: #8c939b;
    font-size: 14px;
    cursor: pointer;
    border-radius: 13px;
    border: 1px solid #dbe0e7;
}
.dish-tag.active {
    color: #2082ed;
    border-color: #0082f4;
}

.more-set {
    width: 570px;
    overflow: hidden;
    margin-bottom: 30px;
}
.more-set .more-setDiv {
    float: right;
    cursor: pointer;
    width: 80px;
    overflow: hidden;
}
.more-set span {
    float: left;
    color: #2082ed;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
}
.more-set img {
    float: left;
    margin-left: 5px;
    width: 18px;
    height: 18px;
}
.selectTime {
    margin-bottom: 20px;
    margin-left: 170px;
    padding: 24px 15px;
    width: 698px;
    height: 170px;
    border: 1px solid #d3d9e2;
    border-radius: 2px;
}
.avatar {
    width: 87px;
    height: 87px;
}
.address-select {
    margin-left: 10px;
    width: 150px;
}

.select-switch {
    margin-left: 13px;
}

.radio-div {
    margin-left: 80px;
}

.size-div {
    margin-left: 10px;
    width: 846px;
    border: 1px solid #e6eaef;
    border-radius: 4px 4px 0px 0px;
    overflow: hidden;
}
.add-sizeBtn{
    color:#666;
    font-size:12px;
    height:35px;
    line-height:35px;
    padding:0 20px;
    cursor: pointer;
}
.add-sizeBtn:hover{
    color: #2082ed;
}
.taste-div {
    margin-left: 10px;
    width: 698px;
    height: auto;
    border: 1px solid #d3d9e2;
    border-radius: 2px;
    overflow: hidden;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}
.el-tag {
    margin: 5px 10px 5px 0;
}
.button-new-tag {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.input-new-tag {
    width: 120px;
    margin-left: 30px;
}
.note-textarea {
    width: 698px;
    margin-left: 10px;
    height: 100px;
}

.tips-label{
    padding: 1px 7px;
    border: 1px solid #2082ED;
    color: #2082ED;
    font-size: 12px;
    border-radius: 4px;
    margin-left: 6px;
}
.printInfo-div{
    margin-left: 10px;
    width: 210px;
    height: auto;
    border: 1px solid #d3d9e2;
    border-radius: 2px;
    overflow: hidden;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}
</style>