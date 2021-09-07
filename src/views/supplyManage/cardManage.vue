<template>
  <div class="main">
    <hr style="position: relative;top: -10px;" />
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">成本卡管理</div>
      </el-row>
      <hr />
      <el-row class="row-header top10" style="padding:20px 50px 10px 50px">
        <el-col>
          <span class="select-region font14">
           商品信息：
            <el-input
              class="store-select"
              v-model="inputSearch"
              placeholder="请输入商品信息"
              size="small"
              style="width:200px"
            ></el-input>
          </span>
          <span class="select-region font14">
           物料信息：
            <el-input
              class="store-select"
              v-model="inputSearch"
              placeholder="请输入物料信息"
              size="small"
              style="width:200px"
            ></el-input>
          </span>
          <span class="select-region font14">
            成本卡状态：
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
              <el-option value="未创建"></el-option>
              <el-option value="已创建"></el-option>
            </el-select>
          </span>
          <el-button
            class="themeBtn"
            type="primary"
            size="small"
            @click="search"
          >查询</el-button>
           <el-button
            type="warning"
            size="small"
            class="themeAddBtn report-download"
          >下载报表</el-button>
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
              <el-table-column prop="employ_name" label="商品名称"></el-table-column>
              <el-table-column prop="class_name" label="商品助记码"></el-table-column>
              <el-table-column prop="class_name" label="商品规格"></el-table-column>
              <el-table-column prop="class_name" label="价格"></el-table-column>
              <el-table-column prop="mobile_inf" label="会员价"></el-table-column>
              <el-table-column prop="mobile_inf" label="商品状态"></el-table-column>
              <el-table-column prop="mobile_inf" label="是否自动扣库存"></el-table-column>
              <el-table-column prop="mobile_inf" label="退菜是否增加库存"></el-table-column>
              <el-table-column prop="mobile_inf" label="成本卡状态"></el-table-column>
              <el-table-column :label="$t('operation')">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editRow(scope.$index, tableData)"
                    type="text"
                    size="small"
                  >新增成本卡</el-button>
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