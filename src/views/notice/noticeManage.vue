<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2020-12-16 17:25:40
 * @LastEditors: Please set LastEditors
 * @Description: 系统通知
 * @FilePath: \sjoyOrderingManage\src\views\notice\noticeManage.vue
-->

<template>
    <div class="main noticeStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <HeadTitle
                :titles="headTitles"
                :selectTab="selectTab"
                @onHeadTitleItemClick="onHeadTitleItemClick"
            ></HeadTitle>
            <el-row v-if="selectTab == 0">
                <el-col class="noticeBox">
					<div
						v-for="(item, index) in listData"
						:key="index"
						class="noticeItem"
					>
						<div class="title fl">
							<img src="../../static/images/notice_new.png" v-if="item.checks != '1'" width="10" height="10"/>
							<span style="padding-left:5px">{{item.title}}</span>
						</div>
						<div class="time fl">{{ item.create_time | moment_ss }}</div>
						<div class="look fr"  @click="lookClick(item.business_type,item.checks)">
							<span>{{ $t("look") }}</span>
							<i class="el-icon-arrow-right"></i>
						</div>
					</div>
                </el-col>
                <el-col class="top40 center">
					<el-pagination
						class="page-pagination"
						background
						layout="prev, pager, next"
						v-if="
							currentPage.total > currentPage.size &&
							listData.length != 0
						"
						:total="currentPage.total"
						:page-size="currentPage.size"
						:current-page="currentPage.page"
						@current-change="handleCurrentChange"
					></el-pagination>
                </el-col>
            </el-row>

            <el-row v-if="selectTab == 1">
                <softnoticeManage></softnoticeManage>
            </el-row>
        </div>
    </div>
</template>
<script>
import HeadTitle from "../components/HeadTitle";
import softnoticeManage from "./softnoticeManage";
export default {
    components: {
        HeadTitle,
        softnoticeManage,
    },
    name: "noticemanage",
    computed: {
        curentStore() {
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
    },
    data() {
        return {
            dep_id: "",
            selectTab: 0,
            headTitles: [
                { id: 0, value: this.$t("noticeManage.yewuNoti") },
                { id: 1, value: this.$t("noticeManage.sysNoti") },
            ],
			listData: [],
			//分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
        };
    },
    methods: {
        onHeadTitleItemClick(index) {
            this.selectTab = index;
        },

		handleCurrentChange(page) {
            this.currentPage.page = page;
            this.getData();
        },
        lookClick(type, checks) {
            if (checks == "0") {
                this.readAllNews(type);
            }
            this.$router.push({ path: "/lowDishList"});
        },
        getData() {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                pageNum: this.currentPage.page-1,
				pageSize: this.currentPage.size,
            };
            this.request.allbusiness(data, function (res) {
                if (res.code == "1") {
					that.currentPage.total = res.data.total;
                    that.listData = res.data.list;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        readAllNews(type) {
            let that = this;
            let data = {
                dep_id: this.dep_id,
                type: type,
            };
            this.request.updatenews(data, function (res) {
                if (res.code == "1") {
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            this.dep_id = curentStore.dep_ID;
            this.getData();
        }
    },
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
				this.dep_id = newVal.dep_ID;
				this.currentPage.page = 1;
                this.getData();
            },
        },
    },
};
</script>
<style scoped>
.noticeBox{
	padding-left: 70px;
	padding-top: 20px;
	width: 50%;
	overflow: hidden;
}
.noticeItem{
	height: 60px;
	line-height: 60px;
	border-bottom: 1px solid #eff2f3;
	overflow: hidden;
}
.noticeItem .title{
	width: 25%;
	font-weight: bold;
	font-size: 14px;
	color:#232426;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.noticeItem .time{
	font-size: 13px;
	color: #303336;
	
}
.noticeItem .look{
	cursor: pointer;
	font-size: 12px;
	color: #2082ed;
}
</style>
