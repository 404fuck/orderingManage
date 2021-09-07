<template>
  <div>
    <div>
      <el-row>
        <el-col :span="12">
          <ul>
            <li v-for="item in tabelData"
                class="li_content">
              <el-row>
                <el-col :span="21"
                        class="left font14 fontWeight"
                        style="color:#232426">
                  <img v-if="item.flag != '1'"
                       src="../../static/images/notice_new.png"
                       alt
                       width="12" />
                  <span style="margin-left:5px;">{{item.push_title}}</span>
                  <span class="left50 font14"
                        style="color:#303336;font-weight:normal">{{item.create_time | moment_ss}}</span>
                </el-col>
                <el-col :span="3"
                        class="right font12">
                  <a @click="lookClick(item)"
                     style="color:#2082ED;text-decoration:none;cursor:pointer">
                    <span>{{$t('look')}}</span>
                    <i class="el-icon-arrow-right"></i>
                  </a>
                </el-col>
              </el-row>
              <hr />
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-pagination class="page-pagination center"
                     background
                     layout="prev, pager, next"
                     :total="total"
                     :page-count="pageSize"
                     @current-change="paginationChange"></el-pagination>
    </div>
    <el-dialog :title="selectItem.push_title"
               :visible.sync="messageDetail"
               width="25%">
      <div class="line"
           style="margin-left:0px"></div>
      <el-row class="font14 messageDetail">
        <el-col :span="24">
          <ul>
            <li>{{selectItem.push_content}}</li>
          </ul>
        </el-col>
      </el-row>
      <div slot="footer"
           class="dialog-footer center">
        <el-button class="themeBtn"
                   style="width:100px"
                   @click="messageDetail = false">{{$t('ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import softnoticeManage from "./softnoticeManage";
export default {
  name: "softnoticemanage",

  data () {
    return {
      messageDetail: false,
      dialogVisible: false,
      pageNum: 0,
      pageSize: 10,
      total: 0,
      tabelData: null,
      selectItem: {
        push_title: null,
        push_content: null
      },
      systemNotiCount: 0
    };
  },
  methods: {
    paginationChange (page) {
      let that = this;
      that.pageNum = page;
      that.getData();
    },
    lookClick (val) {
      this.selectItem = val;
      this.messageDetail = true;

      this.updatepush(val);
    },
    updatepush (val) {
      let that = this;
      let data = {
        id: val.id,
        dep_id: this.curentStore.dep_ID
      };
      this.request.updatepush(data, function (res) {
        if (res.code == "1") {
          for (let i in that.tabelData) {
            if (that.tabelData[i].id == val.id) {
              that.tabelData[i].flag = "1";
            }
          }
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    getData () {
      let that = this;
      let data = {
        dep_id: this.curentStore.dep_ID,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.request.allpushmess(data, function (res) {
        if (res.code == "1") {
          that.total = res.data.total;
          that.tabelData = res.data.list;
        } else {
          that.toast.error(res.msg);
        }
      });
    }
  },
  computed: {
    curentStore () {
      return this.$store.getters.curentStore;
    }
  },

  created () {
    var curentStore = this.curentStore;
    try {
      curentStore = JSON.parse(curentStore);
    } catch { }

    if (curentStore) {
      this.getData();
    }
  },
  watch: {
    curentStore: {
      handler (newVal, oldVal) {
        this.curentStore = newVal;
      }
    }
  }
};
</script>

<style  scoped>
.businessMessage {
  display: inline-block;
  position: relative;
  top: 25px;
  left: 60px;
  background: red;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  line-height: 15px;
  font-size: 10px;
  color: white;
  text-align: center;
}
.systemMessage {
  display: inline-block;
  position: relative;
  top: 25px;
  left: 150px;
  background: red;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  line-height: 15px;
  font-size: 10px;
  color: white;
  text-align: center;
}
.messageDetail ul li {
  list-style: none;
}
.messageDetail ul {
  padding: 0px;
}
.li_content {
  list-style: none;
  height: 65px;
  line-height: 65px;
}
hr {
  width: 97%;
  margin-top: 0px;
  margin-left: 15px;
}
.row-header {
  padding: 0px 20px;
}
.header {
  line-height: 50px;
  background-color: #fff;
  margin-top: 1px;
  text-align: left;
  padding-left: 15px;
  font-size: 16px;
}
</style>

