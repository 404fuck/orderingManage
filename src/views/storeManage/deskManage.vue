<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2020-11-27 16:21:48
 * @LastEditors: Please set LastEditors
 * @Description: 桌台管理
 * @FilePath: \sjoyOrderingManage\src\views\storeManage\deskManage.vue
-->
<template>
    <div>
        <hr style="position: relative; top: -10px" />
        <div class="main-content tabStyle">
            <HeadTitle
                :titles="headTitles"
                @onHeadTitleItemClick="onHeadTitleItemClick"
            ></HeadTitle>
            <deskModel v-if="selectTab == 0"></deskModel>
            <regionModel v-if="selectTab == 1"></regionModel>
        </div>
    </div>
</template>
<script>
import HeadTitle from "../components/HeadTitle";
import deskModel from "./deskModel";
import regionModel from "./regionModel";

export default {
    components: {
        HeadTitle,
        deskModel,
        regionModel,
    },
    computed: {},
    data() {
        return {
            titleText: this.$t("sidebar.zhuotai"),
            selectTab: 0,
            headTitles: [
                { id: 0, value: this.$t("sidebar.zhuotai") },
                { id: 1, value: this.$t("deskManage.quyu") },
            ],
        };
    },
    methods: {
        onHeadTitleItemClick(index) {
            //this.toast.success(index)
            this.selectTab = index;
        },
    },
    created() {},
    mounted() {},
};
</script>
<style scoped>
</style>