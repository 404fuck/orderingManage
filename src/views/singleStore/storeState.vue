<template>
  <div class="main">
    <hr style="position: relative;top: -10px;" />
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">{{$t('sidebar.xitongyindao')}}</div>
      </el-row>
      <el-row style="padding:20px 50px"
              class="center">
        <img :src="map_url"
             width="1000"
             usemap="#Map"
             class="imgMap" />
        <map name="Map"
             id="Map">
          <!-- 试用30天 -->
          <area shape="circle"
                coords="76,169,67"
                onFocus="this.blur()" />
          <!-- 资质认证 -->
          <area shape="circle"
                coords="353,300,67"
                @click="goStoreCertify"
                onFocus="this.blur()" />
          <!-- 使用正式版 -->
          <area shape="circle"
                coords="530,73,72"
                @click="finalMap"
                onFocus="this.blur()" />
          <!-- 点评入驻App -->
          <area shape="circle"
                coords="730,290,68"
                @click="appMap"
                onFocus="this.blur()" />
          <!-- 免费申请物料 -->
          <area shape="circle"
                coords="1058,110,71"
                @click="freeMap"
                onFocus="this.blur()" />
        </map>
      </el-row>
      <hr style="width:100%">
      <el-row style="padding-left:100px">

        <h5 style="font-size:16px;color:#393939">{{$t('storeState.shuoming')}}</h5>
        <p style="font-size:14px;color:#303336">
          {{$t('storeState.aaa')}}</br>
          {{$t('storeState.bbb')}}</br>
          {{$t('storeState.ccc')}}</br>
          {{$t('storeState.ddd')}}</br>
        </p>
        <p class="top30">
          <el-checkbox v-model="checked"
                       @change='checkboxChange'>
            {{$t('storeState.eee')}}
            <span style="color:#8C939B">{{$t('storeState.fff')}}</span>
          </el-checkbox>
        </p>

      </el-row>
    </div>
  </div>
</template>

<script>
import storeTitle from "../components/StoreTitle";
// 下面是导入三张图片的相对地址
import first from '../../static/images/storeState_first.png';
import secend from '../../static/images/storeState_secend.png';
import third from '../../static/images/storeState_third.png';
export default {
  components: {
    storeTitle
  },
  computed: {
    curentStore () {
      //console.log('curentStore')
      return this.$store.getters.curentStore;
    },
    storeList () {
      return this.$store.getters.storeList
    }
  },
  name: "AppMain",
  data () {
    return {
      titleText: "店铺概况",
      map_url: first,
      checked: false,
    };
  },
  methods: {
    getStore () {
      let that = this;
      let data = {};

      this.request.getStore(data, function (res) {
        that.message = res.message;
        this.toast(JSON.stringify(res));
      });
    },
    // 点击资质认证
    goStoreCertify () {
      this.map_url = secend;
      this.$router.push("/storeCertify");
    },
    // 点击试用正式版
    finalMap () {
      this.map_url = third;
    },
    // 点击点评入驻App
    appMap () {
      this.map_url = third;
    },
    // 点击免费申请物料
    freeMap () {

    },
    onTrialClick () {
      this.$router.push("/branchStoreList");
    },
    checkboxChange () {
      this.curentStore.guide_status = this.checked ? '0' : '1';

      let that = this;
      this.request.deptguide({ guide_status: this.curentStore.guide_status, dept_id: this.curentStore.dep_ID }, function (res) {
        if (res.code == '1') {
          that.toast.success(that.$t('updateSucc'))

          that.$store.dispatch('setCurentStore', that.curentStore)

          let index = -1
          for (var i in that.storeList) {
            if (that.storeList[i].dep_ID == that.curentStore.dep_ID) {
              index = i
              break
            }
          }
          that.storeList[index].guide_status = that.curentStore.guide_status
          that.$store.dispatch("setStoreList", that.storeList);
        } else {
          that.toast.error(res.msg)
          that.checked = !that.checked
        }
      })
    }
  },
  created () {

  }
};
</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.button-cs {
  width: 200px;
  height: 80px;
  background-color: #2082ed;
  border: none;
  color: white;
  border-radius: 8px;
}

.buttonCircle {
  width: 164px;
  height: 164px;
  background-color: white;
  border: 5px #2082ed solid;
  color: #2082ed;
  font-size: 20px;
  border-radius: 50%;
}

.button-top {
  color: #fff;
}

.button-bottom {
  /* text-align: center; */
  size: 12;
  color: #fff;
}

.button-one {
  display: flex;
}
.button-content {
  margin-top: 45px;
  display: flex;
}
</style>