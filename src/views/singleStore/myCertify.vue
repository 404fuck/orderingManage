<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2020-12-17 20:39:04
 * @LastEditors: Please set LastEditors
 * @Description: 资质认证
 * @FilePath: \sjoyOrderingManage\src\views\singleStore\myCertify.vue
-->
<template>
    <div class="main">
        <div class="main-content">
            <el-row style="padding-top: 20px">
                <div class="title-line">资质认证</div>
            </el-row>
            <hr />
            <el-row style="padding: 30px 50px">
                <el-col class="right">
                    <el-button
                        class="themeAddBtn"
                        @click="addCertifyClick"
                        type="primary"
                        icon="el-icon-circle-plus"
                        >新增资质认证</el-button
                    >
                </el-col>
                <el-col class="top10">
                    <el-table :data="tabelData" height="660px" border>
                        <el-table-column
                            class="css-el-table"
                            prop="company_name"
                            label="店铺名称"
                            align="center"
                        >
                        </el-table-column>

                        <el-table-column
                            :label="$t('user.state')"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div v-if="scope.row.check_sts === '1'">
                                    <span class="cell-span">
                                        {{ $t("user.stating") }}
                                    </span>
                                </div>

                                <div v-else-if="scope.row.check_sts === '2'">
                                    <span class="cell-span"> 审核失败 </span>
                                </div>

                                <div v-else-if="scope.row.check_sts === '3'">
                                    <span class="cell-span"> 审核成功 </span>
                                </div>

                                <div v-else-if="scope.row.check_sts === '4'">
                                    <span class="cell-span"> 失效 </span>
                                </div>
                                <div v-else>
                                    <span class="cell-span"> 无 </span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        curentStore() {
            this.dep_id = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
        },
    },
    data() {
        return {
            titleText: "我的资质",
            tabelData: [],
        };
    },
    
    methods: {
        addCertifyClick() {
            this.$router.push("/storeCertify");
        },
        getData() {
            let that = this;
            this.request.storeCertifyList({ token: "" }, function (res) {
                if (res.code == "1") {
                    that.tabelData = res.data;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
	},
	created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
           this.getData();
        }
        
    },
};
</script>

<style scoped>
.ecss-el-table {
    text-align: center;
    padding-left: 50px;
}

.add-certify {
    border: none;
    float: right;
    background-color: #e06e37;
    line-height: 8px;
    margin-top: 8px;
    margin-right: 33px;
}
</style>