<template>
  <div class="main">
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">{{$t('storeCertify.ser')}}</div>
      </el-row>
      <hr />
      <el-row class="top20">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="190px"
          class="demo-ruleForm"
        >
          <el-form-item :label="$t('storeCertify.name')+'：'" prop="company_name">
            <el-input
              v-model="ruleForm.company_name"
              class="value-input"
              :placeholder="$t('storeCertify.inputName')"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('storeCertify.add')" prop="restaurant_address">
            <el-input
              v-model="ruleForm.restaurant_address"
              class="value-input"
              :placeholder="$t('storeCertify.inputAdd')"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('storeCertify.contact')" prop="contact">
            <el-input
              v-model="ruleForm.contact"
              class="value-input"
              :placeholder="$t('storeCertify.inputContact')"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('storeCertify.phone')" prop="contact_mobile">
            <el-input
              v-model="ruleForm.contact_mobile"
              class="value-input"
              :placeholder="$t('login.phonePH')"
            ></el-input>
          </el-form-item>

          <el-form-item label prop="name">
            <el-input
              class="value-input"
              :placeholder="$t('login.codePH')"
              v-model="ruleForm.erCode"
            >
              <el-button
                slot="append"
                @click="sendCode()"
                :disabled="
                       !show"
              >
                <span v-show="show">{{$t('storeCertify.sendCode')}}</span>
                <span v-show="!show" class="count">{{count}} s</span>
              </el-button>
            </el-input>
          </el-form-item>

          <el-form-item :label="$t('storeCertify.yingyezhizhao')" prop="business_license">
            <el-upload
              class="avatar-uploader"
              style="width:350px;text-align:center"
              :action="uploadUtils.uploadAction()"
              :data="uploadUtils.uploadData()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('storeCertify.farenzhengjian')" prop="fa_front">
            <div style="display:flex">
              <el-upload
                class="avatar-uploader-IDCard"
                :action="uploadUtils.uploadAction()"
                :data="uploadUtils.uploadData()"
                :show-file-list="true"
                :on-success="handleAvatarSuccessIDCardUp"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrlIDCardUp" :src="imageUrlIDCardUp" class="avatar-IDCard" />
                <i v-else class="el-icon-plus avatar-uploader-icon-IDCard">
                  <span
                    style="display: block;position: absolute;top: 26px;font-size: 14px;width:100%;text-align:center"
                  >{{$t('storeCertify.zheng')}}</span>
                </i>
              </el-upload>
              <el-upload
                class="avatar-uploader-IDCard"
                :action="uploadUtils.uploadAction()"
                :data="uploadUtils.uploadData()"
                :show-file-list="false"
                :on-success="handleAvatarSuccessIDCardDown"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrlIDCardDown" :src="imageUrlIDCardDown" class="avatar-IDCard" />
                <i v-else class="el-icon-plus avatar-uploader-icon-IDCard">
                  <span
                    style="display: block;position: absolute;top: 26px;font-size: 14px;width:100%;text-align:center"
                  >{{$t('storeCertify.fan')}}</span>
                </i>
              </el-upload>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              class="button themeBtn"
              type="primary"
              @click="submitForm('ruleForm')"
            >{{$t('storeCertify.summit')}}</el-button>
          </el-form-item>
          <div class="remark-div">{{$t('storeCertify.remark')}}</div>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import storeTitle from "../components/StoreTitle";
export default {
  components: {
    storeTitle
  },
  created() {},
  data() {
    return {
      titleText: "认证资质",
      show: true,
      count: 0,
      timer: null,
      imageUrl: "",
      imageUrlIDCardDown: "",
      imageUrlIDCardUp: "",
      contact: "",
      ruleForm: {
        company_name: "",
        restaurant_address: "",
        contact: "",
        contact_mobile: "",
        business_license: "",
        fa_front: "",
        fa_back: "",
        erCode: ""
      },
      rules: {
        company_name: [
          {
            required: true,
            message: this.$t("storeCertify.inputName"),
            trigger: "blur"
          },
          {
            min: 1,
            max: 50,
            message: this.$t("storeCertify.1_50"),
            trigger: "blur"
          }
        ],
        restaurant_address: [
          {
            required: true,
            message: this.$t("storeCertify.inputAdd"),
            trigger: "blur"
          },
          {
            min: 1,
            max: 100,
            message: this.$t("storeCertify.1_100"),
            trigger: "blur"
          }
        ],
        contact: [
          {
            required: true,
            message: this.$t("storeCertify.inputContact"),
            trigger: "blur"
          }
        ],
        contact_mobile: [
          {
            required: true,
            message: this.$t("addBranchStore.inputPhoneNum"),
            trigger: "blur"
          }
        ],
        business_license: [
          {
            required: true,
            message: this.$t("storeCertify.uploadYingye"),
            trigger: "blur"
          }
        ],
        fa_front: [
          {
            required: true,
            message: this.$t("storeCertify.uploadFaren"),
            trigger: "blur"
          }
        ],
        fa_back: [
          {
            required: true,
            message: this.$t("storeCertify.请上传法人证件"),
            trigger: "blur"
          }
        ],
        erCode: [
          {
            required: true,
            message: this.$t("login.pleseInputCode"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handlePhoneLogin() {
      //验证数据
      if (!this.stringutils.isMobileNumber(this.ruleForm.contact_mobile)) {
        return;
      }
      if (this.stringutils.isEmpty(this.ruleForm.erCode)) {
        this.toast.warning(this.$t("login.pleseInputCode"));
        return;
      }

      //提交数据
      let data = {
        str_param: this.ruleForm.contact_mobile,
        str_param1: this.ruleForm.erCode
      };

      let that = this;
      this.request.verifyphonecode(data, function(res) {
        if (res.code == "1") {
          that.uploadInfo();
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    sendCode() {
      if (!this.stringutils.isMobileNumber(this.ruleForm.contact_mobile)) {
        return;
      }

      // 验证码倒计时
      if (!this.timer) {
        let data = { str_param: this.ruleForm.contact_mobile };
        let that = this;
        this.request.codeforphone(data, function(res) {
          if (res.code == "1") {
            that.toast.success(that.$t("regist.sendSec"));
            that.count = 60;
            that.show = false;
            that.timer = setInterval(() => {
              if (that.count > 0 && that.count <= 60) {
                that.count--;
              } else {
                that.show = true;
                clearInterval(that.timer);
                that.timer = null;
              }
            }, 1000);
          } else {
            that.toast.error(res.msg);
          }
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handlePhoneLogin();
        } else {
          //   console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    uploadInfo() {
      let that = this;
      this.request.storeCertifyInfo(that.ruleForm, function(res) {
        if (res.code == "1") {
          that.toast.success(that.$t("addSucc"));
          that.$router.back(-1);
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (Number(res.code) > 0) {
        this.ruleForm.business_license = res.msg;
        this.imageUrl = URL.createObjectURL(file.raw);
      } else {
        this.ruleForm.business_license = "";
        this.imageUrl = "";
        this.toast.error(res.msg);
      }
    },
    beforeAvatarUpload(file) {
      return this.uploadUtils.beforeAvatarUpload(file);
    },
    handleAvatarSuccessIDCardUp(res, file) {
      if (Number(res.code) > 0) {
        this.ruleForm.fa_front = res.msg;
        this.imageUrlIDCardUp = URL.createObjectURL(file.raw);
      } else {
        this.ruleForm.fa_front = "";
        this.imageUrlIDCardUp = "";
        this.toast.error(res.msg);
      }
    },
    handleAvatarSuccessIDCardDown(res, file) {
      if (Number(res.code) > 0) {
        this.ruleForm.fa_back = res.msg;
        this.imageUrlIDCardDown = URL.createObjectURL(file.raw);
      } else {
        this.ruleForm.fa_back = "";
        this.imageUrlIDCardDown = "";
        this.toast.error(res.msg);
      }
    }
  },
  computed: {
    getToken() {
      return this.$store.getters.token;
    },
    myData() {
      return {
        token: this.getToken
      };
    }
  }
};
</script>

<style scoped>
hr {
  width: 98%;
  border: none;
  background: #eff2f3;
  height: 1px;
  margin-top: 20px;
}
.demo-ruleForm {
  min-height: 777px;
}

.value-input {
  margin-left: 19px;
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
  width: 133px;
  height: 200px;
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #899599;
  width: 133px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}

.avatar-uploader-IDCard {
  margin-left: 19px;
  margin-top: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 160px;
  height: 100px;
  display: block;
}

.avatar-uploader-icon-IDCard {
  font-size: 28px;
  color: #899599;
  width: 160px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.avatar-IDCard {
  width: 160px;
  height: 100px;
}

.remark-div {
  margin-top: 31px;
  margin-left: 98px;
  /* text-align: center; */
  font-size: 12px;
  color: #899599;
}

.button {
  margin-left: 100px;
  width: 100px;
  line-height: 10px;
}
</style>