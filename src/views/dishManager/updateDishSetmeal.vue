<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-23 17:46:23
 * @LastEditors: Please set LastEditors
 * @Description: 套餐修改
 * @FilePath: \sjoyOrderingManage\src\views\dishManager\updateDishSetmeal.vue
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
                    $t("updateDishSetmeal.editSetmeal")
                }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-content addDish-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("updateDishSetmeal.editSetmeal") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="130px"
                    class="demo-ruleForm"
                >
                    <!-- 套餐图片 -->
                    <el-form-item
                        :label="$t('addDishSetmeal.img_')"
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
                        <span
                            style="
                                color: rgb(140, 147, 155);
                                font-size: 12px;
                                padding-left: 10px;
                            "
                            >{{ $t("addDish.imgSetting") }}</span
                        >
                    </el-form-item>
                    <!-- 套餐名称 -->
                    <el-form-item
                        :label="$t('addDishSetmeal.name_')"
                        prop="dish_name"
                    >
                        <el-input
                            v-model="ruleForm.dish_name"
                            class="value-input"
                            :placeholder="$t('addDishSetmeal.inputName')"
                        ></el-input>
                    </el-form-item>
                    <!-- 套餐菜品 -->
                    <el-form-item :label="$t('addDishSetmeal.dishs_')">
                        <el-row>
                            <el-radio
                                class="left10"
                                v-model="ruleForm.weight_spec"
                                label="3"
                                >{{$t('addDishSetmeal.fixedDishs')}}</el-radio
                            >
                            <el-radio
                                class="left15"
                                v-model="ruleForm.weight_spec"
                                label="4"
                                >{{$t('addDishSetmeal.selfDishs')}}</el-radio
                            >
                        </el-row>
                        <el-row class="left10">
                            <div
                                v-if="
                                    ruleForm.weight_spec == 3 &&
                                    selectData.length == 0
                                "
                            >
                                <el-button
                                    type="primary"
                                    @click="addDishClick(1)"
                                    class="themeImportBtn"
                                    size="small"
                                >
                                    {{ $t("addDishSetmeal.addDishs") }}
                                </el-button>
                            </div>
                            <div
                                v-if="
                                    ruleForm.weight_spec == 4
                                "
                            >
                                <el-button
                                    v-if="selectData2.length == 0"
                                    type="primary"
                                    @click="addDishClick(1)"
                                    class="themeImportBtn"
                                    size="small"
                                >
                                    {{$t('addDishSetmeal.addgudingDishs')}}
                                    <el-tooltip
                                        effect="light"
                                        :content="$t('addDishSetmeal.allowNoAdd')"
                                        placement="right"
                                    >
                                        <img
                                            src="../../static/images/tips.png"
                                        />
                                    </el-tooltip>
                                </el-button>
                                <div class="top5">
                                    <el-button
                                        v-if="getselectZxDishData.length == 0"
                                        type="primary"
                                        @click="addDishClick(2)"
                                        class="themeImportBtn"
                                        size="small"
                                    >
                                        {{$t('addDishSetmeal.addzixuanDishs')}}
                                        <el-tooltip
                                            effect="light"
                                            :content="$t('addDishSetmeal.allowAddGroup')"
                                            placement="right"
                                        >
                                            <img
                                                src="../../static/images/tips.png"
                                            />
                                        </el-tooltip>
                                    </el-button>
                                </div>
                            </div>
                        </el-row>
                        <div
                            class="left10"
                        >   
                            <div class="zx-table-title" v-if="selectData2.length > 0 &&ruleForm.weight_spec == 4">{{$t('addDishSetmeal.fixed')}}</div>
                            <!-- 固定套餐（自选）table -->
                            <div 
                                class="size-div"
                                v-if="(selectData.length > 0 &&ruleForm.weight_spec == 3) ||(selectData2.length > 0 &&ruleForm.weight_spec == 4)"
                                >
                                <el-table
                                    :data="
                                        ruleForm.weight_spec == 3
                                            ? selectData
                                            : selectData2
                                    "
                                >
                                    <el-table-column
                                        prop="dish_name"
                                        :label="$t('accountsDetail.dishName')"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        prop
                                        :label="$t('addDishSetmeal.oldPrice')"
                                        align="center"
                                    >
                                        <template slot-scope="scope">
                                            <span style="color: #eb632b">{{
                                                scope.row.dish_price | priceNum
                                            }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop
                                        :label="$t('addDishSetmeal.sizeDish')"
                                        align="center"
                                    >
                                        <template slot-scope="scope">
                                            <span>{{
                                                scope.row.spec_name | text
                                            }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop
                                        :label="$t('addDishSetmeal.count')"
                                        align="center"
                                    >
                                        <template slot-scope="scope">
                                            <el-input-number
                                                v-if="scope.row.weight_spec!=1"
                                                style="width: 100px"
                                                v-model="scope.row.buy_number"
                                                :min="1"
                                                :max="99"
                                                @change="counterPrice"
                                                size="mini"
                                            ></el-input-number>
                                            <div
                                               class="cz-input"
                                               v-if="scope.row.weight_spec==1"
                                            >
                                                <el-input type="number" v-model="scope.row.buy_number"  @change="counterPrice"></el-input>
                                                <span>{{scope.row.unit_type}}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        :label="$t('operation')"
                                        width="100"
                                    >
                                        <template slot-scope="scope">
                                            <el-button
                                                @click.native.prevent="
                                                    deleteRow(scope.$index,scope.row)
                                                "
                                                type="text"
                                                size="small"
                                                >{{ $t("delete") }}</el-button
                                            >
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button
                                    class="add-certify themeImportBtn"
                                    @click="addDishClick(1)"
                                    size="small"
                                > 
                                    {{`${ruleForm.weight_spec == 3?$t("addDishSetmeal.addDishs"):$t('addDishSetmeal.addgudingDishs')}`}}
                                </el-button>
                            </div>
                            <!-- 自选菜品 table -->
                            <div class="zx-table-title" v-if="getselectZxDishData.length > 0&&ruleForm.weight_spec == 4">{{$t('addDishSetmeal.self')}}</div>
                            <div class="size-div" v-if="getselectZxDishData.length > 0&&ruleForm.weight_spec == 4">
                                <el-table
                                    :data="getselectZxDishData"
                                    class="zxType-table"
                                >
                                    <el-table-column
                                        prop="group_name"
                                        :label="$t('addDishSetmeal.groupName')"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        prop
                                        :label="$t('addDishSetmeal.groupType')"
                                        align="center"
                                    >
                                        <template slot-scope="scope">
                                            <span>{{`${scope.row.dishes.length}${$t('addDishSetmeal.choose')}${scope.row.max_count}`}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        :label="$t('addDishSetmeal.groupDishs')"
                                        align="center"
                                    >
                                        <template slot-scope="scope">
                                            <div class="zx-loop-wrap">
                                                <div
                                                    class="zx-loop"
                                                    v-for="(item,index) in scope.row.dishes"
                                                    :key="index"
                                                >
                                                
                                                {{`${item.dish_name}${item.spec_name==""?'':'-'+item.spec_name}`}}
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        :label="$t('addDishSetmeal.groupPrice')"
                                        align="center"
                                    >   
                                        <template slot-scope="scope">
                                            <div class="zx-loop-wrap">
                                                <div
                                                    class="zx-loop"
                                                    style="color: #FD7B4D;"
                                                    v-for="(item,index) in scope.row.dishes"
                                                    :key="index"
                                                >
                                                {{item.dish_price | priceNum}}
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        :label="$t('operation')"
                                        width="160"
                                    >
                                        <template slot-scope="scope">
                                            <el-button
                                                @click.native.prevent="
                                                    zxDeleteRow(scope.$index,scope.row)
                                                "
                                                type="text"
                                                size="small"
                                                >{{ $t("delete") }}</el-button
                                            >
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button
                                    class="add-certify themeImportBtn"
                                    @click="addDishClick(2)"
                                    size="small"
                                >
                                    {{$t('addDishSetmeal.addzixuanDishs')}}
                                </el-button>
                            </div>

                            <!-- 固定套餐选择的总价格 -->
                            <div class="count-price" v-if="originalPrice > 0&&ruleForm.weight_spec == 3">
                                <span>{{$t('addDishSetmeal.oldPrice_')}}</span>
                                <em>{{originalPrice | priceNum}}</em>
                            </div>
                            <!-- 自选套餐菜品组合原价区间 -->
                            <div class="count-price" v-if="originalPriceMin>0&&originalPriceMax>0&&ruleForm.weight_spec == 4">
                                <span>{{$t('addDishSetmeal.between_')}}</span>
                                <em>{{originalPriceMin | priceNum}}</em>
                                <em>~</em>
                                <em>{{originalPriceMax | priceNum}}</em>
                            </div>
                        </div>
                    </el-form-item>
                    <!-- 套餐价格 -->
                    <el-form-item
                        :label="$t('addDishSetmeal.price_')"
                        prop="dish_price"
                    >
                        <el-input
                            class="value-input"
                            v-model.trim="ruleForm.dish_price"
                            :placeholder="$t('addDishSetmeal.inputPrice')"
                            maxlength="13"
                            onkeyup="value=value.replace(/[^\d.]/g,'')"
                            onblur="value.slice(-1) == '.'?value = value.slice(0,value.length - 1):''"
                            onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
                        ></el-input>
                    </el-form-item>
                    <!-- 销售状态 -->
                    <el-form-item
                        :label="$t('addDishSetmeal.salesState_')"
                        prop="dep_shopowner"
                    >
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
                        <!-- 套餐编码 -->
                        <el-form-item :label="$t('addDishSetmeal.num_')" prop>
                            <el-input
                                v-model="ruleForm.dish_code"
                                class="value-input"
                                :placeholder="$t('addDish.max6')"
                                oninput="value=value.replace(/[\W]/g,'')"
                                maxlength="6"
                                show-word-limit
                            ></el-input>
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
                        <!-- 套餐描述 -->
                        <el-form-item
                            :label="$t('addDishSetmeal.des_')"
                            prop="dep_note"
                        >
                            <el-input
                                type="textarea"
                                size="medium"
                                class="note-textarea"
                                :placeholder="$t('addDishSetmeal.inputDes')"
                                v-model="ruleForm.dish_note"
                                maxlength="255"
                                show-word-limit
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
                    </div>
                    <!-- 保存-保存并继续添加菜品-取消 -->
                    <el-form-item>
                        <el-row style="margin-left:120px;margin-top:20px;">
                            <el-button
                                class="themeBtn"
                                type="primary"
                                @click="submitForm('ruleForm')"
                                >{{ $t("save") }}</el-button
                            >
                            <el-button
                                class="themeBtn"
                                type="primary"
                                @click="submitFormDontBack('ruleForm')"
                                >{{ $t("addDish.saveAndBeginMeal") }}</el-button
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
        <!-- 添加(固定)菜品---弹框 -->
        <el-dialog
            :title="
                ruleForm.weight_spec == 3
                    ? $t('addDishSetmeal.addDishs')
                    : $t('addDishSetmeal.addgudingDishs')
            "
            :visible.sync="dialogTableVisible"
            @close="cancelAddDishClick(1)"
            width="60%"
            top="6vh"
        >
            <hr />
            <el-row :gutter="20" style="padding: 20px 30px 10px">
                <el-col :span="18">
                    <el-input
                        v-if="ruleForm.weight_spec == 3"
                        v-model="dishNameValue1"
                        :placeholder="$t('addDishSetmeal.inputDishName')"
                        size="small"
                        style="width: 30%"
                    ></el-input>
                    <el-input
                        v-if="ruleForm.weight_spec == 4"
                        v-model="dishNameValue11"
                        :placeholder="$t('addDishSetmeal.inputDishName')"
                        size="small"
                        style="width: 30%"
                    ></el-input>
                    <el-button
                        type="primary"
                        size="small"
                        class="themeBtn left10"
                        @click="searchDishClick(1)"
                        >{{ $t("search") }}</el-button
                    >
                    <div class="type-wrap">
                        <ul
                            class="type-list fl"
                            v-if="ruleForm.weight_spec == 3"
                        >
                            <li
                                :class="{ active: typeSelect == index }"
                                @click="handleTypeClick(item, index)"
                                v-for="(item, index) in secondDishTypeList"
                                :key="index"
                            >   
                                <div>{{item.type_name_en}}</div>
                                <div>{{item.type_name}}</div>
                            </li>
                        </ul>
                        <ul
                            class="type-list fl"
                            v-if="ruleForm.weight_spec == 4"
                        >
                            <li
                                :class="{ active: typeSelect2 == index }"
                                @click="handleTypeClick(item, index)"
                                v-for="(item, index) in secondDishTypeList2"
                                :key="index"
                            >
                                <div>{{item.type_name_en}}</div>
                                <div>{{item.type_name}}</div>
                            </li>
                        </ul>
                        <div class="type-table fl">
                            <el-table
                                style="width:100%"
                                :data="
                                    ruleForm.weight_spec == 3
                                        ? tableData
                                        : tableData2
                                "
                                tooltip-effect="dark"
                                v-loading="loading"
                               
                            >
                                <el-table-column width="80" align="center">
                                    <template slot-scope="scope">
                                        <el-checkbox
                                            v-model="scope.row.isChecked"
                                            @change="
                                                checkboxChange(
                                                    scope.row,
                                                    scope.row.isChecked
                                                )
                                            "
                                        ></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="dish_name"
                                    :label="$t('accountsDetail.dishName')"
                                    align="center"
                                ></el-table-column>
                                <el-table-column
                                    prop
                                    :label="$t('addDishSetmeal.sizeDish')"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <span>{{
                                            scope.row.spec_name | text
                                        }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('addDishSetmeal.price')"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <span style="color: #eb632b">{{
                                            scope.row.dish_price | priceNum
                                        }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
                <!-- 分组包含已选菜品 -->
                <el-col :span="6" class="dishTabelStyle">
                    <p class="font14 fontWeight" style="color: #232426">
                        {{
                            `${$t("addDishSetmeal.groupInclude")} (${
                                ruleForm.weight_spec == 3
                                    ? selectData.length
                                    : selectData2.length
                            })`
                        }}
                    </p>
                    <div class="infinite-table">
                        <el-table
                            :data="
                                ruleForm.weight_spec == 3
                                    ? selectData
                                    : selectData2
                            "
                            id="fristTable"
                            row-key="id"
                            :show-header="false"
                        >
                            <el-table-column>
                                <template slot-scope="scope">
                                    <div
                                        class="left font14"
                                        style="color: #232426; margin-top: 2px"
                                    >
                                        {{ scope.row.dish_name }}
                                    </div>
                                    <div
                                        class="left font12"
                                        style="color: #8c939b; margin-top: -4px"
                                    >
                                        <span
                                            style="padding-right: 6px"
                                            v-if="scope.row.spec_name != ''"
                                            >{{ scope.row.spec_name }}</span
                                        >
                                        <span>{{
                                            scope.row.dish_price | priceNum
                                        }}</span>
                                    </div>
                                    <img
                                        class="li-del"
                                        src="../../static/images/dish_del_black.png"
                                        @click="
                                            delItem(scope.$index, scope.row)
                                        "
                                    />
                                    <i
                                        class="li-del el-icon-d-caret font16"
                                        style="right: 8%; top: 43%"
                                    ></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <el-col class="center top30">
                    <el-button
                        class="themeBtn"
                        type="primary"
                        size="small"
                        style="width:100px"
                        @click="okAddDishClick(1)"
                        >{{ $t("save") }}</el-button
                    >
                    <el-button
                        class="cancelBtn"
                        type="info"
                        size="small"
                        style="width:100px;margin-left:20px"
                        @click="cancelAddDishClick(1)"
                        >{{ $t("cancel") }}</el-button
                    >
                </el-col>
            </el-row>
        </el-dialog>
        <!-- 添加自选菜品---弹框 -->
        <el-dialog
            :title="$t('addDishSetmeal.addzixuanDishs')"
            :visible.sync="dialogTableVisible2"
            @close="cancelAddDishClick(2)"
            width="60%"
            top="6vh"
        >
            <hr />
            <el-row :gutter="20" style="padding: 20px 30px 10px">
                <el-col>
                    <el-button
                        @click="addDishClick(3)"
                        type="primary"
                        class="themeAddBtn fr"
                        size="small"
                        icon="el-icon-circle-plus"
                    >
                        {{$t('addDishSetmeal.addGroup')}}
                    </el-button>
                </el-col>
                <el-col> 
                    <div class="zx-table" :class="{bBottom:selectZxDishData.length<=0}">
                        <el-table
                            class="zxType-table"
                            :data="selectZxDishData"
                            tooltip-effect="dark"
                            v-loading="loading2"
                        >
                            <el-table-column width="80" align="center">
                                <template slot-scope="scope">
                                    <el-checkbox
                                        v-model="scope.row.isChecked"
                                        @change="
                                            checkboxZxChange(
                                                scope.row,
                                                scope.row.isChecked
                                            )
                                        "
                                    ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="group_name"
                                :label="$t('addDishSetmeal.groupName')"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                prop
                                :label="$t('addDishSetmeal.groupType')"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <span>{{`${scope.row.dishes.length}${$t('addDishSetmeal.choose')}${scope.row.max_count}`}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('addDishSetmeal.groupDishs')"
                                align="center"
                                width="350"
                            >
                                <template slot-scope="scope">
                                    <div class="zx-loop-wrap">
                                        <div
                                            class="zx-loop"
                                            v-for="(item,index) in scope.row.dishes"
                                            :key="index"
                                        >
                                        
                                        {{`${item.dish_name}${item.spec_name==""?'':'-'+item.spec_name}`}}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('addDishSetmeal.groupPrice')"
                                align="center"
                            >   
                                <template slot-scope="scope">
                                    <div class="zx-loop-wrap">
                                        <div
                                            class="zx-loop"
                                            style="color: #FD7B4D;"
                                            v-for="(item,index) in scope.row.dishes"
                                            :key="index"
                                        >
                                        {{item.dish_price | priceNum}}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('operation')"
                                width="150"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        @click.native.prevent="
                                            zxDialogDeleteRow(scope.$index,scope.row)
                                        "
                                        type="text"
                                        size="small"
                                        >{{ $t("delete") }}</el-button
                                    >
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <el-col class="center top30">
                    <el-button
                        class="themeBtn"
                        type="primary"
                        size="small"
                        style="width:100px"
                        @click="okAddDishClick(2)"
                        >{{ $t("save") }}</el-button
                    >
                    <el-button
                        class="cancelBtn"
                        type="info"
                        size="small"
                        style="width:100px;margin-left:20px"
                        @click="cancelAddDishClick(2)"
                        >{{ $t("cancel") }}</el-button
                    >
                </el-col>
            </el-row>
        </el-dialog>
        <!-- 添加分组 -->
        <el-dialog
            :title="$t('addDishSetmeal.addGroup')"
            :visible.sync="dialogTableVisible3"
            @close="cancelAddDishClick(3)"
            width="60%"
            top="6vh"
        >
            <hr />
            <el-row :gutter="20" style="padding: 20px 20px 10px">
                <el-col>
                    <label class="add-group-label">{{$t('addDishSetmeal.groupName')+'：'}}</label>
                    <el-input
                        v-model.trim="addGroupDishName"
                        :placeholder="$t('addDishSetmeal.inputGroupName')"
                        size="medium"
                        class="left25"
                        style="width: 38%"
                    ></el-input>
                </el-col>
                <el-col class="top20">
                    <label class="add-group-label">{{$t('addDishSetmeal.required')+'：'}}</label>
                    <el-input-number
                        class="left25"
                        v-model="addGroupNum"
                        size="small"
                        :min="1"
                        :max="99"
                    ></el-input-number>
                    <span class="font14 left30" v-if="addGroupNum>1">
                        {{$t('addDishSetmeal.allowRebuy')}}
                        <el-switch
                            v-model="addGroupRepeat"
                            class="select-switch left20"
                            active-color="#2082ED"
                            inactive-color="#D8D8D8"
                        ></el-switch>
                    </span>
                </el-col>
                <el-col class="top20">
                    <label class="add-group-label">{{$t('addDishSetmeal.involved')+'：'}}</label>
                    <el-col style="padding:0 15px">
                        <el-row :gutter="20" class="top20">
                            <el-col :span="18">
                                <el-input
                                    v-model="dishNameValue2"
                                    :placeholder="$t('addDishSetmeal.inputDishName')"
                                    size="small"
                                    style="width: 31%"
                                ></el-input>
                                <el-button
                                    type="primary"
                                    size="small"
                                    class="themeBtn left10"
                                    @click="searchDishClick(2)"
                                    >{{ $t("search") }}</el-button
                                >
                                <div class="type-wrap">
                                    <ul
                                        class="type-list fl"
                                    >
                                        <li
                                            :class="{ active: typeSelect3 == index }"
                                            @click="handleTypeClick(item, index)"
                                            v-for="(item, index) in secondDishTypeList3"
                                            :key="index"
                                        >    
                                            <div>{{item.type_name_en}}</div>
                                            <div>{{item.type_name}}</div>
                                        </li>
                                    </ul>
                                    <div class="type-table fl">
                                        <el-table
                                            style="width:100%"
                                            :data="addGroupDishTableData"
                                            tooltip-effect="dark"
                                            v-loading="loading3"
                                        
                                        >
                                            <el-table-column width="80" align="center">
                                                <template slot-scope="scope">
                                                    <el-checkbox
                                                        v-model="scope.row.isChecked"
                                                        @change="
                                                            addGroupcheckboxChange(
                                                                scope.row,
                                                                scope.row.isChecked
                                                            )
                                                        "
                                                    ></el-checkbox>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="dish_name"
                                                :label="$t('accountsDetail.dishName')"
                                                align="center"
                                            ></el-table-column>
                                            <el-table-column
                                                prop
                                                :label="$t('addDishSetmeal.sizeDish')"
                                                align="center"
                                            >
                                                <template slot-scope="scope">
                                                    <span>{{
                                                        scope.row.spec_name | text
                                                    }}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                :label="$t('addDishSetmeal.price')"
                                                align="center"
                                            >
                                                <template slot-scope="scope">
                                                    <span style="color: #eb632b">{{
                                                        scope.row.dish_price | priceNum
                                                    }}</span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </el-col>
                            <!-- 分组包含已选菜品 -->
                            <el-col :span="6" class="dishTabelStyle">
                                <p class="font14 fontWeight" style="color: #232426">
                                    {{
                                        `${$t("addDishSetmeal.groupInclude")} (${addGroupDishSelectData.length})`
                                    }}
                                </p>
                                <div class="infinite-table">
                                    <el-table
                                        :data="addGroupDishSelectData"
                                        row-key="id"
                                        :show-header="false"
                                    >
                                        <el-table-column>
                                            <template slot-scope="scope">
                                                <div
                                                    class="left font14"
                                                    style="color: #232426; margin-top: 2px"
                                                >
                                                    {{ scope.row.dish_name }}
                                                </div>
                                                <div
                                                    class="left font12"
                                                    style="color: #8c939b; margin-top: -4px"
                                                >
                                                    <span
                                                        style="padding-right: 6px"
                                                        v-if="scope.row.spec_name != ''"
                                                        >{{ scope.row.spec_name }}</span
                                                    >
                                                    <span>{{
                                                        scope.row.dish_price | priceNum
                                                    }}</span>
                                                </div>
                                                <img
                                                    class="li-del"
                                                    src="../../static/images/dish_del_black.png"
                                                    @click="
                                                        addGroupDishDelItem(scope.$index, scope.row)
                                                    "
                                                />
                                                <i
                                                    class="li-del el-icon-d-caret font16"
                                                    style="right: 8%; top: 43%"
                                                ></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-col> 
                <el-col class="center top30">
                    <el-button
                        class="themeBtn"
                        type="primary"
                        size="small"
                        style="width:100px"
                        @click="okAddDishClick(3)"
                        >{{ $t("save") }}</el-button
                    >
                    <el-button
                        class="cancelBtn"
                        type="info"
                        size="small"
                        style="width:100px;margin-left:20px"
                        @click="cancelAddDishClick(3)"
                        >{{ $t("cancel") }}</el-button
                    >
                </el-col>
            </el-row>
        </el-dialog>
        <!-- 删除自定义套餐分组 -->
        <el-dialog  
            :visible.sync="dialogDelVisible" 
            width="25%"
        >
            <span slot="title" class="font16 fontWeight">
                注意
                <img src="../../static/images/dialog_orange.png"/>
            </span>
            <div style="background-color: #eeeeee;height: 1px;margin-top: 10px;"></div>
            <div class="top30 font16 center" style="color:#FD7B4D">删除后，包含该菜品的套餐将自动下架，是否删除？</div>
            <div class="center top50">
                <el-button
                    class="themeBtn"
                    type="primary"
                    size="small"
                    style="width:100px"
                    @click="sureZxDialogDeleteRow"
                    >{{ $t("ok") }}</el-button
                >
                <el-button
                    class="cancelBtn"
                    type="info"
                    size="small"
                    style="width:100px;margin-left:20px"
                    @click="dialogDelVisible = false"
                    >{{ $t("cancel") }}</el-button
                >
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
            this.company_id = this.$store.getters.curentStore.faher_ID;
            return this.$store.getters.curentStore;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
        },
    },
    data() {
        return {
            dep_id: "", //门店id
            company_id:"",
            moreShow: false,
            typeSelect: 0,
            typeSelect2: 0,
            typeSelect3:0,
            //套餐图片
            imageUrl: "",
            weekDays: [],
            fullWeeksArr: [
                { id: "1", value: this.$t("monday") },
                { id: "2", value: this.$t("tuesday") },
                { id: "3", value: this.$t("wednesday") },
                { id: "4", value: this.$t("thursday") },
                { id: "5", value: this.$t("friday") },
                { id: "6", value: this.$t("saturday") },
                { id: "0", value: this.$t("sunday") },
            ],
            sellSelcetData:[],
            sellStartTime: "00:00",
            sellEndTime: "24:00",
            sellValue: true,
            //添加固定菜品(自选)
            originalPrice: 0,
            dishNameValue1: "", //搜索
            dishNameValue11: "", //搜索
            dishNameValue2: "", //搜索
            loading: false,
            dialogTableVisible: false,
            tableData: [], //固定套餐--表格数据
            tableData2: [], //自选套餐--表格数据
            selectData: [], //固定套餐--添加菜品
            selectData2: [], //自选套餐--添加固定菜品
            secondDishTypeList: [], //菜品二级分类
            secondDishTypeList2: [],
            secondDishTypeList3: [],

            //添加自选菜品
            originalPriceMin: 0,
            originalPriceMax: 0,
            loading2: false,
            dialogTableVisible2: false,
            selectZxDishData: [],
            getselectZxDishData: [],
            dialogDelVisible:false, //删除自定义套餐分组
            curZxGroupId:"",
            //添加分组
            addGroupDishName:"",//输入分组名称
            addGroupNum:1,//起售数量
            addGroupRepeat:false,//允许重复加购
            loading3: false,
            dialogTableVisible3: false,
            addGroupDishTableData: [],
            addGroupDishSelectData: [],
            addDishTeamsData:{
                company_id:"",
                cur_time:"",
                dep_id:"",
                dishes:[],
                group_id:"",
                group_name:"",
                max_count:"",
                re_select:"",
                sts:""
            },
            
            //无接口实时刷新分页
            selectZxCurrentPage: {
                total: 0,
                page: 1,
                size: 3,
            },
            requestData: {
                dep_id: "",
                param: 0, //默认传0在售
                str_param: "",
            },

            inventory: "",
            ruleForm: {
                additional_ref_type: "1", // 加料配菜设置类型，1：无，2：自定义 ,
                addtional_list: [], // (Array[菜品加料配菜信息], optional): 加料配菜列表 ,
                charactor_set: "", // 口味做法设置 ,
                curr_sts: "0", // 店内售卖状态，0：在售，1：未售 ,
                delivery_flag: null, //0:堂食，1：外卖，2：即是堂食又是外卖
                delivery_price: null, //外卖菜品价格(注意是string类型的) ,
                dep_id: this.dep_id,
                dish_code: "", //菜品编码 ,
                dish_cost: "", //菜品成本 ,
                dish_first_name: "", // 菜品级分类名称 ,
                dish_first_name_en: "",
                dish_first_type: "", // 菜品一级分类ID ,
                dish_second_name: "",
                dish_second_name_en: "",
                dish_second_type: "", // 菜品二级分类ID ,
                dish_id: null, //菜品ID(只在修改、删除、更新时传入) ,
                dish_image: "", // 菜品图片 ,
                dish_inventory: "", //菜品库存 -1 无穷大
                dish_name: "", //菜品名称 ,
                dish_name_en: "",
                dish_note: "", //菜品描述 ,
                dish_num: 1,
                dish_price: "", // 菜品价格 ,
                dish_tag_id: "0", //菜品标签id ,
                least_number: "1", //起售份数 ,
                member_price: "-1", // 菜品会员价 ,
                optional_detail: "", //自定义套餐自选菜品字符串 ,
                original_price: "", //套餐/菜品的原始价 ,
                printer_id: "", //后厨打印机 ,
                recommend: "0", //是否推荐菜，0:否，1：是，2：不展示菜品 ,
                sell_date: "", //售卖日期
                sell_state: "0", // 可售卖时间，0：永久有效，1：自定义时间 ,
                sell_time: "", // 售卖时间 ,
                sell_week: [], // 售卖星期 ,
                spec_detail: "", // 多规格内容JSONString,增加优惠价格字段 ,
                suits_desc: "", //套餐描述 ,
                suits_detail: "", //套餐固定套餐与必选套餐 ,
                suits_original_price: "", //固定套餐内菜品的原价总和 ,
                unit_type: "", // 菜品单位 ,
                use_printer: "0", // 否后厨打印,0：没有，1：是后厨打印 ,
                weight_spec: "3", //0:普通菜，1：称重菜，2：规格菜,3：固定套餐 4:自选套餐
            },

            rules: {
                dish_price: [
                    {
                        required: true,
                        message: this.$t('addDishSetmeal.inputPrice'),
                        pattern: /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/,
                    },
                ],
                dish_name: [
                    {
                        required: true,
                        message: this.$t('addDishSetmeal.inputName'),
                        trigger: "blur",
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
         *****固定套餐菜品模块*****
         */
        
        //菜品分类切换
        handleTypeClick(item, index) {
             if (this.ruleForm.weight_spec == 3) {
                this.typeSelect = index;
            } else {
                if(this.dialogTableVisible3){
                    this.typeSelect3 = index;
                }else{
                    this.typeSelect2 = index;
                }
            }
            // console.log(item);
            this.refreshSelectDish(item.dishSimpleVOS);
        },
        //添加菜品(必选菜品)--选择
        checkboxChange(data, isChecked) {
            if (this.ruleForm.weight_spec == 3) {
                // console.log(data,isChecked);
                let index = this.selectData.indexOf(data);
                if (isChecked) {
                    this.selectData.push(data);
                } else {
                    this.selectData.splice(index, 1);
                }
            } else {
                // console.log(data,isChecked);
                let index2 = this.selectData2.indexOf(data);
                if (isChecked) {
                    this.selectData2.push(data);
                } else {
                    this.selectData2.splice(index2, 1);
                }
            }
        },
        //添加菜品拉list接口
        getQueryList() {
            let that = this;
            this.loading = true;
            this.requestData.dep_id = this.dep_id;
            this.request.queryList(this.requestData, function (res) {
                that.loading = false;
                if (res.code == "1") {
                    let res_data = res.data;
                    let newResData = res_data.filter((item, index, arr) => {
                        return (
                            item.type_name != "套餐" &&
                            item.type_name_en != "Set meal"
                        );
                    });
                    if (newResData.length == 0) {
                        // that.toast.info("请添加菜品分类！");
                        return false;
                    } else {
                        newResData = newResData.filter(filt=>filt.dishSimpleVOS!=null);
                        newResData = newResData.filter(filt=>filt.dishSimpleVOS.length!=0);
                        for (let i in newResData) {
                            for (let j in newResData[i].dishSimpleVOS) {
                                newResData[i].dishSimpleVOS[j].isChecked = false;
                                newResData[i].dishSimpleVOS[j].spec_name = "";
                                // if(newResData[i].dishSimpleVOS[j].weight_spec==1){
                                //     newResData[i].dishSimpleVOS[j].buy_number = "1.0";
                                // }else{
                                    newResData[i].dishSimpleVOS[j].buy_number = 1;
                                // }
                                newResData[i].dishSimpleVOS[j].id = newResData[i].dishSimpleVOS[j].dish_id;
                                let specDetail = newResData[i].dishSimpleVOS[j].spec_detail;
                                if (specDetail != ""&&specDetail != null) {
                                    let objSpecDetail = JSON.parse(specDetail);
                                    if (objSpecDetail.length != 0 ) {
                                        for (let k in objSpecDetail) {
                                            objSpecDetail[k].isChecked = false;
                                            objSpecDetail[k].dish_name = newResData[i].dishSimpleVOS[j].dish_name;
                                            objSpecDetail[k].spec_name =objSpecDetail[k].spec_unit;
                                            objSpecDetail[k].buy_number = 1;
                                            objSpecDetail[k].dish_price = objSpecDetail[k].spec_price;
                                            objSpecDetail[k].spec_detail = "";
                                            newResData[i].dishSimpleVOS.push(objSpecDetail[k]); 
                                        }
                                    }
                                }
                            }
                           
                        }
                    }
                    //过滤掉原始规格菜
                    newResData.forEach(items => {
                        items.dishSimpleVOS =  items.dishSimpleVOS.filter(filt=>filt.weight_spec!=2);
                    });
                    // console.log(newResData)
                    let str = JSON.stringify(newResData);
                    that.secondDishTypeList = JSON.parse(str);
                    that.secondDishTypeList3 = JSON.parse(str);
                    that.secondDishTypeList2 = JSON.parse(str);

                    //加载套餐菜品详情
                    that.dishSetmealDetail();
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        refreshSelectDish(list) {
            if(list.length>0){
                if (this.ruleForm.weight_spec == 3) {
                    this.tableData = list;
                } else {
                    this.tableData2 = list;
                }
                if(this.dialogTableVisible3){
                   this.addGroupDishTableData= list;
                }
                this.counterPrice();
            }else{
                return false;
            }
        },
        //计算固定套餐总原价 ---自选套餐原价区间
        counterPrice() {
            if(this.ruleForm.weight_spec==3){
                this.originalPrice = 0;
                this.selectData.forEach(item => {
                    this.originalPrice +=
                        Number(item.dish_price) * Number(item.buy_number);
                });
            }else{
                this.originalPriceMin=0;
                this.originalPriceMax=0;
                let minPrice = 0;
                let maxPrice = 0;
                let originalPrice = 0;
                this.selectData2.forEach(item => {
                    originalPrice +=
                        Number(item.dish_price) * Number(item.buy_number);
                });
                this.getselectZxDishData.forEach(items => {
                    let maxCount = Number(items.max_count);
                    let dishPriceArr = [];
                    items.dishes.forEach(item=>{
                        dishPriceArr.push(item.dish_price)
                    })
                    dishPriceArr.sort((old,New)=>{
                        return old -New
                    })
                    // console.log(dishPriceArr);
                    for(let i=0;i<maxCount;i++){
                        minPrice+=dishPriceArr[i];
                    }
                    for(let j=dishPriceArr.length-1;j>dishPriceArr.length-maxCount-1;j--){
                        maxPrice+=dishPriceArr[j];
                    }
                    // console.log(minPrice);
                    // console.log(maxPrice);
                });
                this.originalPriceMin = originalPrice+minPrice;
                this.originalPriceMax = originalPrice+maxPrice;

            }
        },
        //×掉
        delItem(index, data) {
            if (this.ruleForm.weight_spec == 3) {
                this.secondDishTypeList.forEach((items) => {
                    items.dishSimpleVOS.forEach((item) => {
                        if (
                            data.dish_id==item.dish_id&&data.dish_name==item.dish_name&&data.spec_name==item.spec_name
                        ) {
                            this.selectData.splice(index, 1);
                            item.isChecked = false;
                        } else {
                            return false;
                        }
                    });
                });
            } else {
                this.secondDishTypeList2.forEach((items) => {
                    items.dishSimpleVOS.forEach((item) => {
                        if (
                            data.dish_id==item.dish_id&&data.dish_name==item.dish_name&&data.spec_name==item.spec_name
                        ) {
                            this.selectData2.splice(index, 1);
                            item.isChecked = false;
                        } else {
                            return false;
                        }
                    });
                });
            }
        },
        // 搜索
        searchDishClick(val) {
            if (val == 1) {
                if(this.ruleForm.weight_spec==3){
                    this.requestData.str_param = this.dishNameValue1;
                }else{
                    this.requestData.str_param = this.dishNameValue11;
                }
            }else{
                this.requestData.str_param = this.dishNameValue2;
                // console.log("自选分组");
            }
            this.getQueryList();
        },
        //删除
        deleteRow(index,row) {
            // console.log(index,row);
            this.delItem(index,row)
            this.counterPrice();
        },
        // 保存
        okAddDishClick(val) {
            if (val == 1) {
                this.dialogTableVisible = false;
            } else if(val == 2) {
                this.dialogTableVisible2 = false;
                // console.log(`自选套餐`);
            }else{
                this.addDishTeams();
                // console.log(`保存自选分组`);
            }
            this.counterPrice();
        },
        // 添加固定菜品（自选-分组） 弹窗
        addDishClick(val) {
            if (val == 1) {
                this.dialogTableVisible = true;
                //初始化
                if (this.ruleForm.weight_spec == 3) {
                    this.refreshSelectDish(this.secondDishTypeList[0].dishSimpleVOS);
                }else{
                    this.refreshSelectDish(this.secondDishTypeList2[0].dishSimpleVOS);
                }
            } else if(val==2) {
                this.dialogTableVisible2 = true;
                // console.log(`自选套餐`);
            }else{
                this.secondDishTypeList3.forEach((items) => {
                    items.dishSimpleVOS.forEach((item) => {
                        item.isChecked = false;
                    });
                });
                this.addGroupDishName ="";
                this.addGroupNum =1;
                this.addGroupRepeat = false;
                this.addGroupDishSelectData =[];
                this.dialogTableVisible3 = true;
                this.refreshSelectDish(this.secondDishTypeList3[0].dishSimpleVOS);
            }
            
        },
        // 取消固定菜品（自选-分组） 弹窗
        cancelAddDishClick(val) {
            if (val == 1) {
                this.dialogTableVisible = false;
                if(this.ruleForm.weight_spec==3){
                    this.dishNameValue1 ="";
                }else{
                    this.dishNameValue11 ="";
                }
            } else if(val==2) {
                this.dialogTableVisible2 = false;
                // console.log(`自选套餐`);
            }else{
                this.addGroupDishName ="";
                this.addGroupNum =1;
                this.addGroupRepeat = false;
                this.addGroupDishSelectData =[];
                this.secondDishTypeList3.forEach((items) => {
                    items.dishSimpleVOS.forEach((item) => {
                        item.isChecked = false;
                    });
                });
                this.dialogTableVisible3 = false;
                // console.log(`取消自选分组`);
            }
        },
        /*
         *****添加自选套餐菜品模块*****
        */
        //删除自定义套餐分组
        delDishTeams(){
            let that = this;
            let data = {
                dep_id: this.dep_id,
                group_id:this.curZxGroupId,
            }
            this.request.delDishTeams(data,function(res){
                if (res.code == "1") {
                    that.toast.success(that.$t("delSucc"));
                    for (let i in that.getselectZxDishData) {
                        if (that.curZxGroupId == that.getselectZxDishData[i].group_id) {
                            that.getselectZxDishData.splice(i,1);
                            break;
                        }
                    }
                    that.getDishTeams();
                }else{
                    that.toast.error(res.msg);
                }
            })

        },
        //获取自定义套餐的分组信息(不分页)
        getDishTeams(){
            let that = this;
            this.loading2 = true;
            this.request.getDishTeams({dep_id:this.dep_id},function(res){
                if (res.code == "1") {
                    that.loading2 = false;
                    let res_data = res.data;
                    if(res_data.length>0){
                        res_data.forEach(items => {
                            if(that.getselectZxDishData.length>0){
                                that.getselectZxDishData.forEach(item => {
                                    if(item.group_id == items.group_id){
                                        item.isChecked = true;
                                    }else{
                                        item.isChecked = false;
                                    }
                                });

                            }else{
                                items.isChecked = false;
                            }
                        });
                    }
                    that.selectZxDishData = [];
                    that.selectZxDishData = that.stringutils.simpleCopy(res_data);
                    // console.log(res_data);
                }else{
                    that.toast.error(res.msg);
                }
            })
        },
        
        //删除已选择自选菜品 
        zxDeleteRow(index,row){
            this.selectZxDishData.forEach(items => {
                if(row.group_id == items.group_id&&row.group_name == items.group_name){
                    items.isChecked = false;
                }
            });
            this.getselectZxDishData.splice(index, 1);
            this.counterPrice();
            
        },
        //删除自定义套餐分组
        zxDialogDeleteRow(index,row){
            this.curZxGroupId = row.group_id;
            this.dialogDelVisible = true;
        },
        //确定-删除自定义套餐分组 弹窗
        sureZxDialogDeleteRow(){
            this.delDishTeams();
            this.dialogDelVisible = false;
        },
        //自选套餐 选择
        checkboxZxChange(data, isChecked) {
            let index = this.getselectZxDishData.indexOf(data);
            if (isChecked) {
                this.getselectZxDishData.push(data);
            } else {
                this.getselectZxDishData.splice(index, 1);
            }
        },
        //添加分组 选择
        addGroupcheckboxChange(data,isChecked){
            let index = this.addGroupDishSelectData.indexOf(data);
            if (isChecked) {
                this.addGroupDishSelectData.push(data);
            } else {
                this.addGroupDishSelectData.splice(index, 1);
            }
        },
        //添加分组 x掉当前选中的菜品
        addGroupDishDelItem(index,data){
            this.secondDishTypeList3.forEach((items) => {
                items.dishSimpleVOS.forEach((item) => {
                    if (
                        item.dish_id == data.dish_id&&item.dish_name==data.dish_name&&data.spec_name==item.spec_name
                    ) {
                        this.addGroupDishSelectData.splice(index, 1);
                        item.isChecked = false;
                    } else {
                        return false;
                    }
                });
            });
        },
        //新建菜品分组--接口
        addDishTeams(){
            let that = this;
            if(this.addGroupDishName==""){
                this.toast.info(this.$t('addDishSetmeal.inputGroupName'));
                return false;
            }
            if(this.addGroupDishSelectData.length==0){
                this.toast.info(this.$t('addDishSetmeal.selectInvolved'));
                return false;
            }
            if(this.addGroupDishSelectData.length<this.addGroupNum&&this.addGroupRepeat==false){
                this.toast.info(this.$t('addDishSetmeal.messAllowRebuy'));
                return false;
            }
            this.addDishTeamsData.company_id = this.company_id;
            this.addDishTeamsData.dep_id = this.dep_id;
            this.addDishTeamsData.group_name = this.addGroupDishName;
            this.addDishTeamsData.max_count = String(this.addGroupNum);
            this.addDishTeamsData.re_select = this.addGroupRepeat==true?'1':'0';
            this.addDishTeamsData.dishes = this.stringutils.simpleCopy(this.addGroupDishSelectData);
            this.request.addDishTeams(this.addDishTeamsData,function(res){
                if (res.code == "1") {
                    that.dialogTableVisible3 = false;
                    that.getDishTeams();
                    that.toast.success(that.$t("addSucc"));
                }else{
                    that.toast.error(res.msg);
                }
            })
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

        handleClose(tag, ix) {
            let index = this.tasteData[ix].dict_child_value.indexOf(tag);
            this.tasteData[ix].dict_child_value.splice(index, 1);
        },

        handleDelete(index, row) {
            this.tasteData.splice(index, 1);
        },
        tasteHandleInputConfirm() {
            let inputValue = this.tasteValue;
            if (inputValue) {
                this.tasteData.push({
                    dict_value: inputValue,
                    dict_child_value: [],
                });
            }
        },
        handleInputConfirm(index, value) {
            if (value) {
                this.tasteData[index].dict_child_value.push(value);
                this.tasteData[index].input = "";
            }
        },
        //获取所有的菜品分类
        getAllType() {
            let that = this;
            that.request.allType({ dept_id: this.dep_id }, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let res_data = res.data;
                        that.ruleForm.dish_first_name = res_data[0].type_name;
                        that.ruleForm.dish_first_name_en = res_data[0].type_name_en;
                        that.ruleForm.dish_first_type = res_data[0].id;
                        res_data[0].list.forEach(item=>{
                            that.ruleForm.dish_second_name = item.type_name;
                            that.ruleForm.dish_second_name_en = item.type_name_en;
                            that.ruleForm.dish_second_type = item.id;
                        })
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //初始化菜品选择状态
        initDishChecked(selectList,originaList){
            if(selectList.length!=0){
                originaList.forEach(itemOrigin => {
                    itemOrigin.dishSimpleVOS.forEach(itemOriginDish=>{
                        selectList.forEach(itemSelect => {
                            // itemSelect.id = itemSelect.dish_id;
                            if(itemSelect.dish_id==itemOriginDish.dish_id&&itemSelect.dish_name==itemOriginDish.dish_name&&itemSelect.spec_name==itemOriginDish.spec_name){
                                itemOriginDish.isChecked = true;
                            }

                        });
                    })
                });

            }
            // console.log(`选中的数组`);
            // console.log(selectList);
            // console.log("原始数组");
            // console.log(originaList);
        },

        //修改套餐菜品详情
        uploadInfo(back) {
            if (this.inventory.length <= 0) {
                this.ruleForm.dish_inventory = "-1";
            } else {
                this.ruleForm.dish_inventory = this.inventory;
            }

            let that = this;

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
            this.ruleForm.original_price = this.ruleForm.dish_price;
            //套餐菜品
            this.ruleForm.suits_detail = "";
            this.ruleForm.suits_desc = "";
            this.ruleForm.optional_detail = "";
            if (this.ruleForm.weight_spec == 3) {
                let tempArr = [];
                let suitsArr = [];
                this.ruleForm.suits_original_price = this.originalPrice;
                if(this.selectData.length!=0){
                    for (let m in this.selectData) {
                        let str =
                            this.selectData[m].dish_name +
                            this.selectData[m].buy_number;
                        tempArr.push(str);
                        let dic = that.stringutils.simpleCopy(this.selectData[m]);
                        dic.dish_name = this.selectData[m].dish_name;
                        dic.original_price = this.selectData[m].dish_price;
                        dic.dish_price = this.selectData[m].dish_price;
                        if(this.selectData[m].weight_spec==1){
                            dic.spec_detail = this.selectData[m].buy_number;
                            dic.buy_number = 1;
                        }else{
                            dic.buy_number = this.selectData[m].buy_number;
                        }
                        suitsArr.push(dic);
                    }

                }
                this.ruleForm.suits_detail = JSON.stringify(suitsArr);
                this.ruleForm.suits_desc = tempArr.join("/");
            } else {
                let tempArr2 = [];
                let suitsArr2 = [];
                let optionalDetail = [];
                if(this.selectData2.length!=0){
                    for (let k in this.selectData2) {
                        let str =
                            this.selectData2[k].dish_name +
                            this.selectData2[k].buy_number;

                        tempArr2.push(str);
                        let dic = that.stringutils.simpleCopy(this.selectData2[k]);
                        dic.dish_name = this.selectData2[k].dish_name;
                        dic.original_price = this.selectData2[k].dish_price;
                        dic.dish_price = this.selectData2[k].dish_price;
                        if(this.selectData2[k].weight_spec==1){
                            dic.spec_detail = this.selectData2[k].buy_number;
                            dic.buy_number = 1;
                        }else{
                            dic.buy_number = this.selectData2[k].buy_number;
                        }
                        suitsArr2.push(dic);
                    }
                }
                if(this.getselectZxDishData.length!=0){
                    optionalDetail = that.stringutils.simpleCopy(this.getselectZxDishData);
                }
                this.ruleForm.optional_detail = JSON.stringify(optionalDetail);
                this.ruleForm.suits_detail = JSON.stringify(suitsArr2);
                this.ruleForm.suits_desc = tempArr2.join("/");
            }
            this.ruleForm.dep_id = this.dep_id;
            this.request.updateDish(this.ruleForm, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("updateSucc"));
                    if (back) {
                        that.$router.push({
                            path: "/dishList",
                        });
                    } else {
                        that.resetForm("ruleForm");
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //获取套餐菜品详情修改菜品
        dishSetmealDetail(){
            // console.log(this.ruleForm);
            //赋值
            this.ruleForm.dish_price = this.stringutils.formatPrice(this.ruleForm.dish_price);
            this.imageUrl = this.ruleForm.dish_image;
            if (this.ruleForm.dish_inventory == -1) {
                this.inventory = "";
            } else {
                this.inventory = this.ruleForm.dish_inventory;
            }
            //自定义售卖时间
            if(this.ruleForm.sell_state==1&&this.ruleForm.sell_date!=null){
                this.sellSelcetData = this.ruleForm.sell_date.split("/");
                this.sellStartTime = this.ruleForm.sell_time_start;
                this.sellEndTime = this.ruleForm.sell_time_end;
                if(this.ruleForm.sell_week!=""&& this.ruleForm.sell_week!= null){
                    this.weekDays = JSON.parse(this.ruleForm.sell_week);
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
                }
            }else{
                let date = new Date();
                let getCurrDate = String(this.stringutils.getCurrentDate(date));
                let getCurrMonLastDate = String(this.stringutils.getCurrentMonthLastDay(date));
                this.sellSelcetData=[getCurrDate,getCurrMonLastDate];
                let getWeeksDate = this.stringutils.getWeeksFromDate(this.sellSelcetData);
                this.weekDays = getWeeksDate;
                this.ruleForm.sell_date = `${getCurrDate}/${getCurrMonLastDate}`;
                // console.log(this.weekDays);
                // console.log(this.sellSelcetData);
            }
            this.sellValue = this.ruleForm.curr_sts==0?true:false;
            this.ruleForm.dish_cost = this.ruleForm.dish_cost<0?"":this.ruleForm.dish_cost;
            if(this.ruleForm.suits_detail!=""){
                let suitDetail = JSON.parse(this.ruleForm.suits_detail);
                if(this.ruleForm.weight_spec==3){
                    this.selectData = suitDetail;
                    this.initDishChecked(this.selectData,this.secondDishTypeList);
                    for (let m in this.selectData) {
                        if(this.selectData[m].weight_spec==1){
                            this.selectData[m].buy_number = this.selectData[m].spec_detail;
                            this.selectData[m].spec_detail = "";
                        }else{
                           this.selectData[m].buy_number = this.selectData[m].buy_number;
                        }
                    }
                }else{
                    this.selectData2 = suitDetail;
                    this.initDishChecked(this.selectData2,this.secondDishTypeList2);
                    for (let k in this.selectData2) {
                        if(this.selectData2[k].weight_spec==1){
                            this.selectData2[k].buy_number = this.selectData2[k].spec_detail;
                            this.selectData2[k].spec_detail = "";
                        }else{
                           this.selectData2[k].buy_number = this.selectData2[k].buy_number;
                        }
                    }
                }
                
                this.counterPrice();
            }
            if(this.ruleForm.optional_detail!=""){
                let optionalDetail = JSON.parse(this.ruleForm.optional_detail);
                this.getselectZxDishData = optionalDetail;
                this.counterPrice();
                this.getselectZxDishData.forEach(getItem => {
                    this.selectZxDishData.forEach(seItem => {
                        if(getItem.group_id==seItem.group_id){
                            seItem.isChecked = true;
                        }
                    });
                    
                });
            }

        },
        //保存
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.uploadInfo(true);
                } else {
                    return false;
                }
            });
        },
        // 取消
        submitFormCancel() {
            this.$router.back(-1);
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
                this.ruleForm = getPropOjb.ruleForm; 
                // console.log(this.getPropOjb);
            }
            this.getAllType();
            this.getQueryList();
            this.getDishTeams();
            
        }
    },
};
</script>

<style scoped>
.infinite-table {
    height: 500px;
    overflow-y: auto;
}
.li-del {
    height: 10px;
    width: 10px;
    position: absolute;
    top: 50%;
    right: 0;
    margin-right: 10px;
    margin-top: -6px;
    cursor: pointer;
}
.more-set {
    width: 540px;
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
    margin-left: 140px;
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
.size-div {
    width: 820px;
    min-height: 146px;
    border-style: solid;
    border-color: #dfe8ec;
    border-width: 1px;
    border-radius: 5px;
}
.add-certify {
    line-height: 10px;
    margin-top: 5px;
    margin-bottom: 8px;
    margin-left: 30px;
    min-width: 95px;
}
.cancel-certify {
    line-height: 8px;
    margin-top: 10px;
    margin-left: 10px;
    min-width: 95px;
}
.note-textarea {
    width: 698px;
    margin-left: 10px;
    height: 100px;
}
.el-tag {
    margin: 5px 10px 5px 0;
}
.line {
    background-color: #eeeeee;
    height: 1px;
    margin-top: 10px;
}
.from-bottom {
    margin-top: 20px;
    text-align: center;
}
.type-wrap {
    margin-top: 10px;
    width: 100%;
    height: 550px;
    border: 1px solid #EBEEF5;
    border-radius: 4px 4px 0px 0px;
    overflow: hidden;
}
.type-list {
    width: 17%;
    height: 92%;
    padding: 0;
    margin-top: 45px;
    list-style: none;
    overflow-x: hidden;
    overflow-y: auto;
}
.type-list li {
    width: 100%;
    padding: 13px 0;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
}
.type-list li.active {
    background: #f4f7fd;
}
.type-table {
    width: 83%;
    height: 100%;
    border-left: 1px solid #e6eaef;
    overflow-x: hidden;
    overflow-y: auto;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    padding-bottom: 20px;
}
.count-price span {
    font-size: 13px;
    color: #232426;
}
.count-price em {
    font-style: normal;
    padding-left: 10px;
    font-size: 12px;
    color: #eb632b;
}
.zx-table-title{
    color: #232426;
    font-size: 12px;
    font-weight: bold;
}
.zx-table{
    margin-top: 10px;
    width: 100%;
    height: 500px;
    border: 1px solid #EBEEF5;
    border-radius: 4px 4px 0px 0px;
    overflow-x: hidden;
    overflow-y: auto;
}
.zx-table.bBottom{
    border-bottom: 1px solid #EBEEF5;
}
.zx-loop-wrap .zx-loop{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 44px;
    line-height: 18px;
    color: #303336;
    font-size: 12px;
    border-bottom: 1px solid #EBEEF5;
}
.zx-loop-wrap .zx-loop:last-child{
    border: none;
}
.add-group-label{
    display: inline-block;
    min-width: 100px;
    text-align: right;
    font-size: 12px;
    font-weight: bold;
}
</style>