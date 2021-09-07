<template>
  <div class="main branchStyle">
    <hr style="position: relative;top: -10px;" />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <span style="color:#8C939B;">{{$t('sidebar.caiwuguangli')}}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="color:#8C939B">{{$t('addPayAccount.payOut')}}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="color:#232426">{{$t('addPayAccount.payOut')}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">{{$t('addPayAccount.add')}}</div>
      </el-row>
      <hr />
      <el-row style="padding:30px">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="120px">
          <el-form-item :label="$t('addPayAccount.type')"
                        prop="account_type">
            <el-radio-group v-model="ruleForm.account_type">
              <el-radio :label="$t('addPayAccount.siren')"></el-radio>
              <el-radio :label="$t('addPayAccount.gongsi')"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('addPayAccount.kaiBank')"
                        prop="bank_name">
            <el-input v-model="ruleForm.bank_name"
                      :placeholder="$t('addPayAccount.inputKaiBank')"
                      style="width:400px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('addPayAccount.zhiName')"
                        prop="bank_detail">
            <el-input v-model="ruleForm.bank_detail"
                      :placeholder="$t('addPayAccount.inputZhiName')"
                      style="width:400px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('addPayAccount.kaiName')"
                        prop="account_name">
            <el-input v-model="ruleForm.account_name"
                      :placeholder="$t('addPayAccount.inputKaiName')"
                      style="width:400px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('addPayAccount.bankName')"
                        prop="account_no">
            <el-input v-model="ruleForm.account_no"
                      :placeholder="$t('addPayAccount.inputBankNum')"
                      style="width:400px"></el-input>
          </el-form-item>
          <el-form-item class="top30">
            <el-button class="themeBtn"
                       style="width:100px"
                       @click="submitForm('ruleForm')">{{$t('addPayAccount.sub')}}</el-button>
            <el-button class="themeImportBtn"
                       @click="jumpBankList()">{{$t('addPayAccount.shou')}}</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "addpayaccount",
  data () {
    return {
      ruleForm: {
        account_type: '',//账户类型 
        bank_detail: '',//支行名称,
        account_no: '',//银行账户,
        company_id: '1',//公司ID ,
        dep_id: '',//门店ID,
        account_name: '',//账户名称
      },

      rules: {
        account_type: [
          { required: true, message: this.$t('addPayAccount.zhanhuType'), trigger: "blur" }
          // { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        bank_name: [
          { required: true, message: this.$t('addPayAccount.inputKaiBank'), trigger: "blur" }
        ],
        bank_detail: [
          { required: true, message: this.$t('addPayAccount.inputZhiName'), trigger: "blur" }
          // { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        account_name: [
          { required: true, message: this.$t('addPayAccount.inputKaiName'), trigger: "blur" }
        ],
        account_no: [
          { required: true, message: this.$t('addPayAccount.inputBankNum'), trigger: "blur" }
        ],
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addbank();
        } else {
          //   console.log('error submit!!');
          return false;
        }
      });
    },
    addbank () {
      this.ruleForm.dep_id = this.dep_id
      let that = this;
      this.request.addbank(this.ruleForm, function (res) {
        if (res.code == "1") {
          that.toast.success(that.$t('addSucc'));
          that.$router.back(-1);
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    jumpBankList () {
      this.$router.push({ path: "/financeManage", query: { active: 'third' } });
    },
  },
  computed: {
    curentStore () {
      //console.log('curentStore')
      this.dep_id = this.$store.getters.curentStore.dep_ID;
      return this.$store.getters.curentStore;
    }
  },
  created () {
    var curentStore = this.curentStore;
    try {
      curentStore = JSON.parse(curentStore);
    } catch { }

    if (curentStore) {
      // console.log('重新加载数据' + curentStore.dep_id)
      this.dep_id = curentStore.dep_ID;

    }
  },
};
</script>
<style scoped>
</style>


