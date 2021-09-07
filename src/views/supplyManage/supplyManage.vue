<template>
  <div class="main">
    <hr style="position: relative;top: -10px;" />
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">供应商管理</div>
      </el-row>
      <hr />
      <el-row class="row-header top10" style="padding:20px 50px 10px 50px">
        <el-col>
          <span class="select-region font14">
           供应商名称：
            <el-input
              class="store-select"
              v-model="inputSearch"
              placeholder="请输入供应商名称"
              size="small"
              style="width:200px"
            ></el-input>
          </span>
          <span class="select-region font14">
           供应商代码：
            <el-input
              class="store-select"
              v-model="inputSearch"
              placeholder="请输入供应商代码"
              size="small"
              style="width:200px"
            ></el-input>
          </span>
          <span class="select-region font14">
            状态：
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
              <el-option value="启用"></el-option>
              <el-option value="停用"></el-option>
            </el-select>
          </span>
          <span class="select-region font14">
            结算方式：
            <el-select
              class="store-select"
              v-model="selectModel"
              placeholder="请选择结算方式"
              size="small"
              style="width:200px"
              @change="selectOne"
              value-key="id"
            >
              <el-option value="全部"></el-option>
              <el-option value="货到付款"></el-option>
              <el-option value="日结"></el-option>
              <el-option value="月结"></el-option>
            </el-select>
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
          >添加供应商</el-button>
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
              <el-table-column prop="employ_name" label="供应商代码"></el-table-column>
              <el-table-column prop="class_name" label="供应商名称"></el-table-column>
              <el-table-column prop="mobile_inf" label="地址"></el-table-column>
              <el-table-column prop="employ_name" label="电话"></el-table-column>
              <el-table-column prop="class_name" label="状态"></el-table-column>
              <el-table-column prop="mobile_inf" label="结算方式"></el-table-column>
              <el-table-column prop="mobile_inf" label="创建时间"></el-table-column>
              <el-table-column :label="$t('operation')">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editRow(scope.$index, tableData)"
                    type="text"
                    size="small"
                  >{{$t('edit')}}</el-button>
                  <el-button
                    @click.native.prevent="deleteRow(scope.row, tableData)"
                    type="text"
                    size="small"
                  >{{$t('delete')}}</el-button>
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

    }
  },
  methods:{
    addSupply(){
      this.$router.push({
        path: "/addSupply"
      });
    },
    editRow(){
       this.$router.push({
        path: "/editSupply"
      });
    }
  }
};
</script>
<style scoped>
</style>