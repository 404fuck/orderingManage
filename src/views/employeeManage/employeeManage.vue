<!--
 * @Author: your name
 * @Date: 2021-03-29 19:50:06
 * @LastEditTime: 2021-03-29 20:43:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sjoyOrderingManage\src\views\employeeManage\employeeManage.vue
-->
<template>
    <div class="employeeStyle">
        <hr style="position: relative; top: -10px" />
        <div class="main-content">
            <HeadTitle
                :titles="headTitles"
                :selectTab="selectTab"
                @onHeadTitleItemClick="onHeadTitleItemClick"
            ></HeadTitle>
            <Employee v-if="selectTab == 0"></Employee>
            <Grade v-if="selectTab == 1"></Grade>
        </div>
    </div>
</template>
<script>

import HeadTitle from "../components/HeadTitle";
import Employee from "../employeeManage/employee";
import Grade from "../employeeManage/grade";;
export default {
    components: {
        HeadTitle,
        Employee,
        Grade,
    },
    computed: {
        curentStore() {
            this.dep_ID = this.$store.getters.curentStore.dep_ID;
            return this.$store.getters.curentStore;
        },
        curentTab() {
            this.selectTab = this.$store.getters.curentTab;
            return this.$store.getters.curentTab;
        },
    },
    data() {
        return {
            dep_ID: "",
            selectTab: 0,
            headTitles: [
                { id: 0, value: this.$t("sidebar.nameList") },
                { id: 1, value: this.$t("sidebar.jobLevel") },
            ],
        };
    },
    methods: {
        onHeadTitleItemClick(index) {
            //this.toast.success(index)
            this.selectTab = index;
            this.$store.dispatch("setCurentTab", index);
        },
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            this.selectTab = this.$store.getters.curentTab;
        }
        
    },
    mounted() {},
    watch: {
        curentStore: {
            handler(newVal, oldVal) {
                var id = oldVal.dep_ID;
                if (id && newVal.dep_ID != oldVal.dep_ID) {
                    // console.log('刷新新数据' + newVal)
                    this.dep_ID = newVal.dep_ID;
                }
            },
        },
    },
};
</script>
<style scoped>
</style>
