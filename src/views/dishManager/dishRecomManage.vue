<template>
  <div class="main recomStyle">
    <hr style="position: relative;top: -10px;" />
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">招牌菜/推荐菜</div>
      </el-row>
      <hr />
      <el-row style="padding:30px 50px">
        <el-col  >
          <el-radio
            v-model="radio"
            label="1"
            style="font-weight: bold;color: #232426;font-size: 14px !important;"
          >自动生成</el-radio>
          <span class="font12" style="color:#8C939B">系统更具以往菜品销量自动生成</span>
        </el-col>
        <el-col   style="padding-left:20px">
          <el-row>
            <el-col
              :span="5"
              style="height:600px;width:312px;box-shadow: 0.018519rem 0.018519rem 0.185185rem rgb(209, 209, 209);"
              class="selectBtn top20"
            >
              <div>
                <ul>
                  <li class="top10">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      style="color:#232426;font-weight:bold"
                    >菜品一级分类</el-checkbox>
                  </li>
                  <li class="top20">
                    <el-checkbox v-model="checked1" label="热菜" border></el-checkbox>
                  </li>
                  <li class="top20">
                    <el-checkbox v-model="checked2" label="甜品" border></el-checkbox>
                  </li>
                  <li class="top20">
                    <el-checkbox v-model="checked3" label="饮料" border></el-checkbox>
                  </li>
                  <li class="top20">
                    <el-checkbox v-model="checked4" label="凉菜" border></el-checkbox>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :span="4" class="top20 center" style="padding-left:20px">
              <el-row style="top: 40%;position: absolute;">
                <el-col  >
                  <el-button type="primary" class="themeImportBtn">筛选10个</el-button>
                </el-col>
                <el-col   class="top20">
                  <el-button type="primary" class="themeImportBtn">筛选15个</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="14" style="padding-left:20px">
              <p class="font14" style="color:#232426;font-weight:bold">筛选结果：</p>
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="no" label="展示顺序">
                  <template slot-scope="scope">
                    <i class="el-icon-d-caret"></i>
                    <span style="margin-left: 10px">{{ scope.row.no }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="菜品名称"></el-table-column>
                <el-table-column prop="type" label="规格"></el-table-column>
                <el-table-column prop="img" label="上传大图">
                  <template slot-scope="scope">
                    <i class="el-icon-circle-plus font16" style="color:#2082ED"></i>
                    <span style="margin-left: 10px">{{ scope.row.img }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" style="color:#2082ED">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="padding:10px 50px">
        <el-col  >
          <el-radio v-model="radio" label="2">手动选择</el-radio>
          <span class="font12" style="color:#8C939B">最多推荐10个</span>
        </el-col>
        <el-col :span="12" class="top20">
          <el-row>
            <el-col  >
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="no" label="展示顺序">
                  <template slot-scope="scope">
                    <i class="el-icon-d-caret"></i>
                    <span style="margin-left: 10px">{{ scope.row.no }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="菜品名称"></el-table-column>
                <el-table-column prop="type" label="规格"></el-table-column>
                <el-table-column prop="img" label="上传大图">
                  <template slot-scope="scope">
                    <i class="el-icon-circle-plus font16" style="color:#2082ED"></i>
                    <span style="margin-left: 10px">{{ scope.row.img }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" style="color:#2082ED">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-row style="border: 1px rgba(233, 238, 245, 1) solid;border-top:none;">
                <el-button
                  style="margin:10px"
                  type="primary"
                  class="themeImportBtn"
                  icon="el-icon-circle-plus"
                >添加菜品</el-button>
              </el-row>
            </el-col>
            <el-col   style="display:none">
              <el-button type="primary" class="themeAddBtn" icon="el-icon-circle-plus">添加菜品</el-button>
            </el-col>
            <!-- <el-col   class="top20 center">
              <el-button type="primary" class="themeBtn" style="width:100px">保存</el-button>
              <el-button type="primary" class="cancelBtn" style="width:100px">取消</el-button>
            </el-col>-->
          </el-row>
        </el-col>
      </el-row>
      <el-row style="padding-bottom:20px">
        <el-col   class="top20 center">
              <el-button type="primary" class="themeBtn" style="width:100px">保存</el-button>
              <el-button type="primary" class="cancelBtn" style="width:100px">取消</el-button>
            </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "dishrecommanage",
  data() {
    return {
      radio: "1",
      tableData: [
        {
          no: "01",
          name: "重庆酸辣粉",
          type: "大份",
          img: "",
          operation: ""
        }
      ]
    };
  }
};
</script>
<style>
.el-table th,
.el-table td {
  text-align: center !important;
}
.el-table th {
  background: #f4f7fd !important;
  color: #232426 !important;
}
.el-checkbox.is-bordered.is-checked {
  border-color: #dcdfe6;
}

.selectBtn ul {
  list-style: none;
  padding: 20px;
}
.selectBtn ul li label {
  width: 100%;
}
</style>
