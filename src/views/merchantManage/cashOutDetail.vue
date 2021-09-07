<template>
  <div class="main branchStyle">
    <hr style="position: relative;top: -10px;" />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <span style="color:#8C939B;">{{$t('sidebar.caiwuguangli')}}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="color:#232426">{{$t('cashOutDetail.aaa')}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">{{$t('cashOutDetail.aaa')}}</div>
      </el-row>
      <hr />
      <el-row style="padding:30px">
        <el-col>
          <el-select
            v-model="typeValue"
            :placeholder="$t('orderDetail.select')"
            style="width:236px"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            class="btn-color-blue btn themeBtn left20"
            type="primary"
            size="small"
            @click="searchClick"
          >{{$t('search')}}</el-button>
          <span class="title-size" style="margin-left:10px">
            {{$t('operatingDiary.sum')}}
            <span class="title-num">{{total}}</span>
            &nbsp;{{$t('cashOutDetail.bbb')}}
          </span>
        </el-col>
        <el-col class="top15">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" :label="$t('index')"></el-table-column>
            <el-table-column prop="settle_type" :label="$t('cashOutDetail.ccc')"></el-table-column>
            <el-table-column prop="settle_amount" :label="$t('cashOutDetail.ddd')"></el-table-column>
            <el-table-column prop="rec_name" :label="$t('cashOutDetail.eee')"></el-table-column>
            <el-table-column prop="bank_detail" :label="$t('cashOutDetail.fff')"></el-table-column>
            <el-table-column prop="bank_account" :label="$t('cashOutDetail.ggg')"></el-table-column>
            <el-table-column prop="sts" :label="$t('cashOutDetail.hhh')"></el-table-column>
            <el-table-column prop :label="$t('user.createTime')">
              <template slot-scope="scope">
                <span>{{scope.row.apply_time | moment_ss}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="center top20">
          <el-pagination
            class="page-pagination"
            background
            layout="prev, pager, next"
            v-if="total > pageSize"
            :total="total"
            :page-count="pageSize"
            @current-change="paginationChange"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "cashoutdetail",
  data() {
    return {
      dep_id: null,
      pageNum: 1,
      total: 0,
      pageSize: 10,

      tableData: null,

      typeValue: "",
      typeOptions: [
        {
          value: "",
          label: this.$t("all")
        },
        {
          value: "1",
          label: this.$t("cashOutDetail.iii")
        },
        {
          value: "0",
          label: this.$t("cashOutDetail.jjj")
        }
      ]
    };
  },
  methods: {
    searchClick() {
      this.pageNum = 1;
      this.getsettlelist();
    },
    paginationChange(page) {
      let that = this;
      this.pageNum = page;
      this.getsettlelist();
    },
    getsettlelist() {
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        dep_id: this.dep_id,
        sts: this.typeValue
      };
      let that = this;
      this.request.getsettlelist(data, function(res) {
        if (res.code == "1") {
          that.total = res.data.total;
          for (var i in res.data.list) {
            res.data.list[i].sts = [
              that.$t("user.stating"),
              that.$t("cashOutDetail.kkk")
            ][res.data.list[i].sts];
          }
          that.tableData = res.data.list;
        } else {
          that.toast.error(res.msg);
        }
      });
    }
  },
  computed: {
    curentStore() {
      //console.log('curentStore')
      this.dep_id = this.$store.getters.curentStore.dep_ID;
      return this.$store.getters.curentStore;
    }
  },
  created() {
    var curentStore = this.curentStore;
    try {
      curentStore = JSON.parse(curentStore);
    } catch {}

    if (curentStore) {
      // console.log('重新加载数据' + curentStore.dep_id)
      this.dep_id = curentStore.dep_ID;
      this.getsettlelist();
    }
  },
  watch: {
    curentStore: {
      handler(newVal, oldVal) {
        if (newVal.dep_ID) {
          //this.toast.success(JSON.stringify(newVal))
          this.dep_id = newVal.dep_ID;
        }
      }
    }
  }
};
</script>
<style scoped>
.title-num {
  color: #2082ed;
}
</style>


