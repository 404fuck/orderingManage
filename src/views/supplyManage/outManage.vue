<template>
  <div class="main">
    <hr style="position: relative;top: -10px;" />
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">出库管理</div>
      </el-row>
      <hr />
      <el-row class="row-header top10" style="padding:20px 50px 10px 50px">
        <el-col>
          <span class="select-region font14">
           单据号：
            <el-input
              class="store-select"
              v-model="inputSearch"
              placeholder="请输入供应商名称"
              size="small"
              style="width:200px"
            ></el-input>
          </span>
          <span class="select-region font14">
            单据类型：
            <el-select
              class="store-select"
              v-model="selectModel"
              placeholder="请选择单据类型"
              size="small"
              style="width:200px"
              @change="selectOne"
              value-key="id"
            >
              <el-option value="全部"></el-option>
              <el-option value="采购入库"></el-option>
              <el-option value="其他入库"></el-option>
              <el-option value="领料退回入库"></el-option>
            </el-select>
          </span>
          <span class="select-region font14">
            状态
            <el-select
              class="store-select"
              v-model="selectModel"
              placeholder="请选择状态"
              size="small"
              style="width:200px"
              @change="selectOne"
              value-key="id"
            >
              <el-option value="全部"></el-option>
              <el-option value="未完成"></el-option>
              <el-option value="已完成"></el-option>
            </el-select>
          </span>
           <span class="select-region font14">
           备注：
            <el-input
              class="store-select"
              v-model="inputSearch"
              placeholder="请输入备注"
              size="small"
              style="width:200px"
            ></el-input>
          </span>
          <span class="select-region font14">
              创建时间：
               <el-date-picker v-model="joinDateValue"
                            type="daterange"
                            :range-separator="$t('addBranchStore.go')"
                            :start-placeholder="$t('startTime')"
                            :end-placeholder="$t('endTime')"
                            format="yyyy-MM-dd"
                            @change="datepickerPick"></el-date-picker>
          </span>
          <span class="select-region font14">
              出库时间：
               <el-date-picker v-model="joinDateValue"
                            type="daterange"
                            :range-separator="$t('addBranchStore.go')"
                            :start-placeholder="$t('startTime')"
                            :end-placeholder="$t('endTime')"
                            format="yyyy-MM-dd"
                            @change="datepickerPick"></el-date-picker>
          </span>

          <el-button
            class="themeBtn"
            type="primary"
            size="small"
            @click="search"
          >查询</el-button>
           <el-button
            class="themeAddBtn"
            type="warning"
            size="small"
            @click="addSupply"
            icon="el-icon-circle-plus"
          >添加出库</el-button>
        </el-col>
      </el-row>
      <el-row>
          <el-col>
              <el-checkbox v-model="checked">展示自动扣料出库（仅显示三天内的所有数据）</el-checkbox>
          </el-col>
      </el-row>

      <el-row style="padding:10px 50px">
        <el-col>
          <div class="table">
            <el-table
              :data="tableData"
              border
              stripe
              style="width: 100%"
              v-loading="loading"
            >
              <el-table-column prop="employ_name" label="单据号"></el-table-column>
              <el-table-column prop="class_name" label="单据类型"></el-table-column>
              <el-table-column prop="mobile_inf" label="供应商名称"></el-table-column>
              <el-table-column prop="employ_name" label="仓库名称"></el-table-column>
              <el-table-column prop="class_name" label="出库时间"></el-table-column>
              <el-table-column prop="mobile_inf" label="状态"></el-table-column>
              <el-table-column prop="mobile_inf" label="创建时间"></el-table-column>
              <el-table-column prop="mobile_inf" label="完成时间"></el-table-column>
              <el-table-column :label="$t('operation')">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editRow(scope.$index, tableData)"
                    type="text"
                    size="small"
                  >查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row class="center">
              <el-pagination
                class="page-pagination"
                background
                @current-change="paginationChange"
                layout="prev, pager, next"
                :total="all_pages"
              ></el-pagination>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            checked: true
        }
    }
};
</script>
<style scoped>
</style>