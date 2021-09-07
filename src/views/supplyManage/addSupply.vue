<!-- 添加供应商-->
<template>
  <div class="main">
    <hr style="position: relative;top: -10px;" />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <span style="color:#8C939B;">供应商管理</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="color:#232426">添加供应商</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">添加供应商</div>
      </el-row>
      <hr />
      <el-row style="padding:30px 20px">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="160px"
          class="demo-ruleForm"
        >
          <el-form-item label="供应商代码：" prop="grade">
            <el-input
              class="value-input"
              placeholder="只能填写数字和字符，例如S1"
              @change="selectOne"
              value-key="id"
            >
            </el-input>

          </el-form-item>

          <el-form-item label="供应商名称：" prop="name">
            <el-input
              class="value-input"
              placeholder="请输入供应商名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="供应商全称：" prop="phone">
            <el-input
              class="value-input"
              placeholder="请输入供应商全称"
            ></el-input>
          </el-form-item>

          <el-form-item label="结算方式：" prop="pass">
            <el-select
              class="value-input"
              placeholder="请选择"
            >
            <el-option value="货到付款"></el-option>
            <el-option value="日结"></el-option>
             <el-option value="月结"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人：" prop="repass">
            <el-input
              class="value-input"
              placeholder="请输入联系人"
              show-password
            ></el-input>
          </el-form-item>
            <el-form-item label="联系人电话：" prop="repass">
            <el-input
              class="value-input"
              placeholder="请输入联系人电话"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="联系地址：" prop="repass">
            <el-input
              class="value-input"
              placeholder="请输入联系地址"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="repass">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </el-form-item>
          <el-form-item label="状态：">
              <el-radio-group v-model="radio">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>

          <div style="clear:both;margin-top:50px;margin-left:-60px">
            <el-button
              class="button sure themeBtn"
              type="primary"
              style="width:100px"
            >{{$t('save')}}</el-button>
            <el-button
              class="button cancel cancelBtn"
              type="primary"
              style="width:100px"
            >{{$t('cancel')}}</el-button>
          </div>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            radio:0
        }
    }
};
</script>
<style scoped>
.demo-ruleForm {
  min-height: 684px;
}

.value-input {
  width: 350px;
  height: 35px;
}

.avatar-uploader {
  margin-left: 19px;
  margin-top: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 87px;
  height: 87px;
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #899599;
  width: 87px;
  height: 87px;
  line-height: 87px;
  text-align: center;
}

.avatar {
  width: 87px;
  height: 87px;
}

.sure {
  margin-left: 150px;
}

.sure-next {
  width: 170px;
}

.cancel {
  margin-left: 10px;
}

.button-addregion {
  margin-left: 15px;
  width: 100px;
  line-height: 10px;
}
</style>