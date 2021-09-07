<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2020-12-16 17:31:06
 * @LastEditors: Please set LastEditors
 * @Description: 系统通知--菜品列表
 * @FilePath: \sjoyOrderingManage\src\views\notice\lowDishList.vue
-->
<template>
    <div class="main dishListStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">{{ $t("sidebar.caipingliebiao") }}</div>
            </el-row>
            <hr />
            <el-row style="padding: 20px 50px">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    border
                    v-loading="loading"
                    :empty-text="$t('nomrl')"
                    :span-method="objectSpanMethod"
                >
                    <el-table-column
                        type="index"
                        :label="$t('index')"
                        width="50"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="dish_name"
                        :label="$t('accountsDetail.dishName')"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="dish_auxiliary"
                        :label="$t('addDish.zcm')"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="dish_first_name"
                        :label="$t('dishList.oneType')"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="dish_code"
                        :label="$t('dishList.dishNum')"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="unit_type"
                        :label="$t('addDishSetmeal.unit')"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="sizeName"
                        :label="$t('addDish.size')"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :label="$t('dishList.price')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span style="color: #eb632b" v-format="'##0.00'">{{
                                scope.row.dish_price
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('addDish.VIPPrice')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span style="color: #eb632b" v-format="'##0.00'">{{
                                scope.row.member_price
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('dishList.count')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.dish_inventory == -1">{{
                                $t("dishList.max")
                            }}</span>
                            <span v-else>{{ scope.row.dish_inventory }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('dishList.joinFoxTime')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.input_time | moment }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        :label="$t('operation')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                @click="editClick(scope.row.dish_id, scope.row)"
                                size="small"
                                >{{ $t("edit") }}</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <el-col :span="16" class="center">
                    <el-pagination
                        class="page-pagination"
                        background
                        layout="prev, pager, next"
                        v-if="total > page_size"
                        :total="total"
                        :page-count="page_size"
                        @current-change="paginationChange"
                    ></el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "lowDishList",
    computed: {
        curentStore() {
            //console.log('curentStore')
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
    },
    data() {
        return {
            dep_id: "",
            tableData: [],
            loading: false,
            page: 1,
            total: 0,
            page_size: 10,
        };
    },

    methods: {
        getData() {
            this.loading = true;

            let data = {
                dep_id: this.dep_id,
                pageNum: this.page,
                pageSize: this.page_size,
                type: this.$route.query.id,
            };
            let that = this;
            this.request.warndish(data, function (res) {
                that.loading = false;
                if (res.code == "1") {
                    that.total = res.data.total;
                    if (res.data == null) {
                        that.tableData = [];
                        return;
                    }
                    // debugger
                    var allData = [];
                    for (var i = 0; i < res.data.list.length; i++) {
                        var map = {};
                        var list = [];
                        res.data.list[i].rowspan = 1;
                        res.data.list[i].sizeName = that.$t("nomrl");

                        //weight_spec 多规格
                        if (
                            res.data.list[i].spec_detail === null ||
                            res.data.list[i].weight_spec === "1" ||
                            res.data.list[i].weight_spec === "0"
                        ) {
                            continue;
                        }
                        let lenght = that.stringutils.getJsonLength(
                            res.data.list[i].spec_detail
                        );

                        if (lenght > 0) {
                            let sizeList = JSON.parse(
                                res.data.list[i].spec_detail
                            );

                            for (var j = 0; j < sizeList.length; j++) {
                                var sizeModel = that.stringutils.simpleCopy(
                                    res.data.list[i]
                                );

                                sizeModel.sizeName = sizeList[j].spec_unit;
                                sizeModel.dish_price = sizeList[j].spec_price;
                                sizeModel.member_price =
                                    sizeList[j].member_price;
                                if (j == 0) {
                                    sizeModel.rowspan = sizeList.length;
                                } else {
                                    sizeModel.rowspan = 0;
                                }
                                list.push(sizeModel);
                            }
                            map.index = i;
                            map.list = list;
                            allData.push(map);
                        }
                    }
                    // debugger
                    for (var i = allData.length - 1; i >= 0; i--) {
                        var index = allData[i]["index"];
                        var list = allData[i]["list"];
                        res.data.list.splice(index, 1);
                        that.stringutils.insert(res.data.list, list, index);
                    }

                    that.tableData = res.data.list;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        paginationChange(page) {
            let that = this;
            that.page = page;
            that.getData();
        },
        editClick(md, data) {
            if (data.weight_spec == "3") {
                this.$router.push({
                    path: "/updateDishSetmeal",
                    query: { id: md },
                });
            } else {
                this.$router.push({ path: "/updateDish", query: { id: md } });
            }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            // 要合并的列的索引
            let arr = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12];
            // 设置要合并的列
            if (arr.indexOf(columnIndex) !== -1) {
                // 用于设置合并开始的行号，rowspan 不为 0，不是第一行时, 则该行需要向下合并
                if (column.rowspan !== 0) {
                    return {
                        rowspan: row.rowspan, // 要合并的行数
                        colspan: 1,
                    };
                } else {
                    return {
                        rowspan: 0, // column.rowspan === 0 隐藏该单元格
                        colspan: 0,
                    };
                }
            }
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            this.dep_id = curentStore.dep_ID;
            this.getData();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                if (newVal.dep_ID) {
                    //this.toast.success(JSON.stringify(newVal))
                    this.dep_id = newVal.dep_ID;
                    this.page = 1;
                    this.getData();
                }
            },
        },
    },
};
</script>

<style scoped>
.seachStyle {
    display: inline-block;
}
.dialogIcon {
    position: absolute;
    top: 25px;
    left: 20%;
}
.search-div {
    display: flex;
    margin-top: 19px;
}
.search-button {
    margin-top: 27px;
    margin-left: 16px;
    border: none;
    background-color: #00bff2;
    line-height: 8px;
    height: 33px;
    width: 95px;
}
.sou-button {
    margin-top: 3px;
    margin-left: 16px;
    border: none;
}
.search-input {
    margin-left: 20px;
    width: 200px;
}

.search-input:first-of-type {
    margin-left: 0px;
}

.ecss-el-table {
    text-align: center;
    padding-left: 50px;
}

.cell-span {
    font-size: 11px;
    color: #666666;
}

.page-pagination {
    float: right;
    margin-top: 10px;
    margin-right: 50px;
}

.count-cotent-div {
    width: 291px;
    height: 127px;
    margin-top: 30px;
    margin-left: 30px;
    background-color: white;
    text-align: center;
}

.select-div {
    display: flex;
}
.search-div {
    display: flex;
}

.value-input {
    height: 33px;
    margin-left: 20px;
    margin-top: 25px;
    width: 150px;
}

.bottom-div {
    float: left;
    margin-top: 20px;
    margin-left: 20px;
}

.dish-count-span {
    float: left;
    margin-left: 13px;
    margin-top: 9px;
    font-size: 14px;
    color: #666666;
}
.dish-low-span {
    font-size: 14px;
    color: #666666;
}
.dish-count-div {
    width: 100%;
    height: 30px;
    text-align: center;
    margin-top: 22px;
}
.dish-low-div {
    text-align: left;
    margin-left: 11px;
    margin-top: 9px;
}
</style>