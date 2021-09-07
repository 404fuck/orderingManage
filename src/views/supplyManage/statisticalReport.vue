<template>
  <div class="main orderStyle">
    <hr style="position: relative;top: -10px;" />
    <div class="main-content">
      <el-row style="padding-top:10px">
        <div class="title-line">物料消耗统计表</div>
      </el-row>
      <hr />
      <el-row class="top15"
              style="padding:20px 0px 20px 30px;">
        <el-col>
          <div class="seachStyle top10">
            <label for
                   class="font14 fontWeight">仓库：</label>
            <el-select placeholder="请选择">
              <el-option value="全部"></el-option>
              <el-option value="冷鲜库"></el-option>
              <el-option value="常温库"></el-option>
              <el-option value="冷库"></el-option>
            </el-select>
          </div>
          <div class="seachStyle top10 left20">
            <label class="font14 fontWeight">物料：</label>
            <el-input placeholder="物料名称、代码模糊查询"
                      style="width:200px"></el-input>
          </div>
          <div class="seachStyle left20 top10"
               style="margin-right:20px">
            <label for
                   class="font14 fontWeight">类别：</label>
            <el-input placeholder="请输入类别"
                      style="width:200px"></el-input>
          </div>
          <div class="seachStyle left20 top10" style="margni-right:20px">
              <label for="" class="font14 fontWeight">盘点日期：</label>
              <el-date-picker v-model="joinDateValue"
                            type="daterange"
                            :range-separator="$t('addBranchStore.go')"
                            :start-placeholder="$t('startTime')"
                            :end-placeholder="$t('endTime')"
                            format="yyyy-MM-dd"
                            @change="datepickerPick"></el-date-picker>
          </div>
        </el-col>
        <el-col>
          <el-button class="themeBtn left20 top10"
                     @click="searchClick">{{$t('select')}}</el-button>
          <el-button class="themeBtn left20 top10"
                     @click="refreshClick">{{$t('orderDetail.reset')}}</el-button>
          <el-button class="themeImportBtn report-download left20 top10"
                     >{{$t('dishReport.download')}}</el-button>
        </el-col>
      </el-row>
      <el-row class="top10">
        <el-col style="padding:0px 30px 20px 30px">
          <el-table :data="tableData"
                    border
                    v-loading="tableLoading"
                    style="width: 100%">
            <el-table-column prop="order_id_show"
                             label="物料代码"
                             width="190"></el-table-column>
            <el-table-column prop="orderStates"
                             label="物料名称"
                             width="100"></el-table-column>
            <el-table-column prop="waiterService"
                             label="仓库"
                             width="130"></el-table-column>
            <el-table-column prop="create_time"
                             label="单位"
                             width="180"></el-table-column>
            <el-table-column prop="pay_time"
                             label="类别"
                             width="180"></el-table-column>
            <el-table-column prop="table_name"
                             label="消耗数量"></el-table-column>
            <el-table-column label="消耗金额"
                             width="160">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col class="center"
                style="margin-bottom:20px">
          <el-pagination class="page-pagination"
                         background
                         layout="prev, pager, next"
                         v-if="total > pageSize"
                         :total="total"
                         :page-count="pageSize"
                         @current-change="paginationChange"></el-pagination>
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
.seachStyle {
  display: inline-block !important;
}
</style>