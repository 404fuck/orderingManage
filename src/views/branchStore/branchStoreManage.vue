<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-02-22 15:01:44
 * @LastEditors: Please set LastEditors
 * @Description: 门店编辑管理
 * @FilePath: \sjoyOrderingManage\src\views\branchStore\branchStoreManage.vue
-->
<template>
    <div>
        <hr style="position: relative; top: -10px" />
        <div class="main-content tabStyle">
            <HeadTitle
                :titles="headTitles"
                :selectTab="selectTab"
                @onHeadTitleItemClick="onHeadTitleItemClick"
            ></HeadTitle>
            <storeInfo v-if="selectTab == 0"></storeInfo>
            <bussinessInfo v-if="selectTab == 1"></bussinessInfo>
        </div>
    </div>
</template>
<script>
import HeadTitle from "../components/HeadTitle";
import storeInfo from "./editBranchStore";
import bussinessInfo from "./editBussinessInfo";

export default {
    components: {
        HeadTitle,
        storeInfo,
        bussinessInfo,
    },
    computed: {},
    data() {
        return {
            titleText: this.$t("addBranchStore.basicInfo"),
            selectTab: 0,
            headTitles: [
                { id: 0, value: this.$t("addBranchStore.basicInfo") },
                { id: 1, value: this.$t("addBranchStore.bussinessInfo") },
            ],
        };
    },
    methods: {
        onHeadTitleItemClick(index) {
            //this.toast.success(index)
            this.selectTab = index;
		},
    },
    created() {
    },
    mounted() {},
};
</script>
<style scoped>
</style>