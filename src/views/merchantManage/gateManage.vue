<template>
  <div class="main">
    <hr style="position: relative;top: -10px;" />
    <div class="main-content branchStoreStyle">
      <el-row style="padding-top:20px">
        <div class="title-line">{{$t('sidebar.mengdian')}}</div>
      </el-row>
      <hr />
      <el-row style="padding:10px 50px">
        <el-col :span="12">
          <div class="seachStyle">
            <el-input size="small"
                      class="search-input"
                      :placeholder="$t('addBranchStore.inputStoreName')"
                      style="width:200px"></el-input>
          </div>
          <el-button size="small"
                     class="themeBtn left10"
                     type="primary">{{$t('search')}}</el-button>
          <span class="left20"
                style="color:#8C939B">
            {{$t('operatingDiary.sum')}}
            <span style="color:#2082ED">5</span>个门店
          </span>
        </el-col>
        <el-col :span="12"
                class="right">
          <el-button @click="addnewstore"
                     icon="el-icon-circle-plus"
                     size="small"
                     type="primary"
                     class="themeAddBtn">新店入驻</el-button>
        </el-col>
      </el-row>
      <el-row style="padding:10px 50px">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column prop="date"
                           label="序号"></el-table-column>
          <el-table-column prop="name"
                           label="门店名称"></el-table-column>
          <el-table-column label="线上营业状态设置">
            <template slot-scope="scope">
              <el-switch v-model="value"
                         active-color="#2082ED"
                         inactive-color="#D8D8D8"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button @click="handleClick=true"
                         type="text"
                         size="small">查看店码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <el-dialog title="殊乐新餐饮店码"
               :visible.sync="handleClick"
               width="25%">
      <div class="line"
           style="margin-left:0px"></div>
      <el-row class="center top20">
        <img src="../../static/images/qcode.png"
             alt
             width="167" />
      </el-row>
      <div slot="footer"
           class="dialog-footer center">
        <el-button @click="dialogFormVisible = false"
                   class="themeImportBtn report-download">下 载</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { METHODS } from "http";
export default {
  name: "gatemanage",
  data () {
    return {
      value: true,
      handleClick: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        }
      ]
    };
  },
  methods: {
    addnewstore () {
      this.$router.push("/addNewStore");
    }
  }
};
</script>
<style scoped>
.seachStyle {
  display: inline-block;
}
</style>
