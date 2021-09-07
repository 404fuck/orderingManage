<template>
  <div class="main cashStyle">
    <hr style="position: relative;top: -10px;" />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <span style="color:#8C939B;">{{$t('sidebar.caiwuguangli')}}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="color:#232426">{{$t('addPayAccount.payOut')}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">{{$t('addPayAccount.payOut')}}</div>
      </el-row>
      <hr />
      <el-row style="padding:30px 50px">
        <el-col class="font20 fontWeight">
          <span style="color:#232426"
                v-format="'##0.00'">{{$t('cashOut.keTixian')}}{{walletInfo.balance_count}}</span>
          <span style="color:#8C939B;margin-left:80px">{{$t('cashOut.dongjie')}}</span>
        </el-col>
        <el-col class="top20">
          <el-row>
            <el-col :span="2"
                    style="margin-top: 30px;width: 5%;">
              <span class="title">{{$t('cashOut.shoukuanName')}}</span>
            </el-col>
            <el-col :span="22">
              <el-row>
                <el-col v-for="(item, index) in banklist"
                        :key="index"
                        :span="6"
                        :class="item.select?'bankBox top10':'unbankBox top10'"
                        style="margin-right:20px;height: 83px;line-height: 55px;">
                  <div @click="selectBankLick(index)"
                       class="center">
                    <span class="font20 fontWeight">{{item.bank_name}}</span>
                    <span class="bankText">({{item.account_no_w}})</span>
                  </div>
                </el-col>

                <el-col :span="6"
                        class="unbankBox top10 center"
                        style="height: 83px;line-height: 55px;">
                  <div @click="addPayAccountClick">
                    <i class="el-icon-plus"
                       style="font-size:24px;color:#8C939B"></i>
                    <span class="left20"
                          style="color:#8C939B;position: relative;top: -5px;">{{$t('cashOut.addShoukuanName')}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="top20">
          <label for
                 class="title">{{$t('cashOut.price')}}</label>
          <el-input v-model.trim="requestData.settle_amount"
                    class="left10"
                    style="width:400px"
                    :placeholder="$t('cashOut.price10')"></el-input>
        </el-col>
        <el-col class="top20">
          <label for
                 class="title">{{$t('cashOut.pwd')}}</label>
          <el-input v-model.trim="requestData.password"
                    class="left10"
                    style="width:400px"
                    :placeholder="$t('addNewStore.payPWD')"
                    show-password></el-input>
        </el-col>
        <el-col class="top20"
                style="margin-left:70px">
          <el-button class="themeBtn"
                     :loading="payLoading"
                     @click="payClick">{{$t('cashOut.submint')}}</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="$t('cashOut.tixianSub')"
               :visible.sync="dialogSubmit"
               width="25%">
      <div class="line top15"
           style="margin-left:0px"></div>
      <div class="block top20">
        <el-timeline>
          <el-timeline-item v-for="(activity, index) in activities"
                            :key="'1'+ index"
                            :icon="activity.icon"
                            :type="activity.type"
                            :color="activity.color"
                            :size="activity.size"
                            :timestamp="activity.timestamp">
            <el-row>
              <el-col>{{$t('cashOut.aaa')}}</el-col>
              <el-col class="top10"
                      style="color:#8C939B;font-size:12px;font-weight:100">{{selectBank.bank_name +' ('+selectBank.account_no_w+')'}}</el-col>
              <el-col class="top10"
                      style="color:#8C939B;font-size:12px;font-weight:100">{{$t('cashOut.price')}}{{requestData.settle_amount}}</el-col>
            </el-row>
          </el-timeline-item>
          <el-timeline-item v-for="(activity, index) in activities1"
                            :key="'2'+ index"
                            :icon="activity.icon"
                            :type="activity.type"
                            :color="activity.color"
                            :size="activity.size"
                            :timestamp="activity.timestamp">{{activity.content}}</el-timeline-item>
        </el-timeline>
      </div>
      <div slot="footer"
           class="dialog-footer center">
        <el-button @click="okClick"
                   class="themeBtn">{{$t('cashOut.comp')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "cashout",
  data () {
    return {
      dep_id: "",
      payLoading: false,

      walletInfo: { balance_count: 0 },
      banklist: null,

      dialogSubmit: false,
      dialogFormVisible: true,
      activities: [
        {
          size: "large",
          color: "#2082ED",
          icon: "el-icon-check"
        }
      ],
      activities1: [
        {
          content: this.$t("cashOut.24"),
          size: "large",
          color: "#B8BEC8"
        }
      ],

      requestData: {
        settle_type: this.$t("cashOut.payBank"), // 结算方式
        settle_amount: "", // 提现金额
        password: "",
        dep_id: "" //"门店ID"
      },

      selectBank: {
        bank_name: "",
        account_no_w: ""
      }
    };
  },
  methods: {
    okClick () {
      this.dialogSubmit = false
      this.$router.back(-1)
    },
    payClick () {
      this.cashwithdraw();
    },
    selectBankLick (index) {
      for (var i in this.banklist) {
        this.banklist[i].select = false;
      }
      this.banklist[index].select = true;
    },
    addPayAccountClick () {
      this.$router.push("/addPayAccount");
    },
    getbanklist () {
      let that = this;
      this.request.getbanklist({ dep_id: this.dep_id }, function (res) {
        if (res.code == "1") {
          if (res.data != null && res.data.length > 0) {
            for (var i in res.data) {
              res.data[i].account_no_w = res.data[i].account_no.substr(
                res.data[i].account_no.length - 4,
                4
              );
              res.data[i].select = false;
            }
            res.data[0].select = true;
          }
          that.banklist = res.data;
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    getWalletInfo () {
      let that = this;
      this.request.getWalletInfo({ dep_id: this.dep_id }, function (res) {
        if (res.code == "1") {
          that.walletInfo = res.data;
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    cashwithdraw () {
      for (var i in this.banklist) {
        if (this.banklist[i].select) {
          this.selectBank = this.banklist[i];
          break;
        }
      }
      this.requestData.rec_name = this.selectBank.account_name;
      this.requestData.rec_id = this.selectBank.id;
      this.requestData.bank_detail = this.selectBank.bank_detail;
      this.requestData.bank_account = this.selectBank.account_no;
      this.requestData.dep_id = this.dep_id;
      this.requestData.bank_type = this.selectBank.account_type;

      if (this.requestData.settle_amount < 10) {
        return;
      }
      if (this.requestData.password.length <= 0) {
        return;
      }

      this.payLoading = true;
      let that = this;
      this.request.cashwithdraw(this.requestData, function (res) {
        that.payLoading = false;
        if (res.code == "1") {
          that.dialogSubmit = true;
        } else {
          that.toast.error(res.msg);
        }
      });
    }
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
      this.getbanklist();
      this.getWalletInfo();
    }
  }
};
</script>

<style scoped>
.title {
  color: #232426;
  font-size: 12px;
  font-weight: bold;
}
.bankText {
  font-size: 20px;
  color: #232426;
  position: relative;
  left: 8px;
  font-weight: bold;
}
.bankBox {
  border: 2px #0082f4 solid;
  border-radius: 6px;
  padding: 15px;
}
.unbankBox {
  border: 2px #d3d9e2 dotted;
  border-radius: 6px;
  margin-right: 20px;
  padding: 15px;
}
</style>