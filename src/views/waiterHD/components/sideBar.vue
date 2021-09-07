<!--
 * @Author: zzt
 * @Date: 2021-01-15 11:58:11
 * @LastEditTime: 2021-03-29 21:20:24
 * @LastEditors: Please set LastEditors
 * @Description: 导航栏左侧
 * @FilePath: \sjoyOrderingManage\src\views\waiterHD\components\sideBar.vue
-->
<template>
    <div class="sideBar-container">
        <div class="sideBar">
            <div class="back-icon">
                <router-link to="/waiterHD">
                    <img src="../../../static/images/backHD.png" alt="">
                </router-link>
            </div>
            <!-- 经营数据 -->
            <div class="side-items" v-show="activeIndex==0">
                <router-link class="side-li-icon1"  to="/review/reReportManage"></router-link>
                <router-link class="side-li-icon2"  to="/review/reOrderDetail"></router-link>
                <router-link class="side-li-icon3"  to="/review/reRefoundDetail"></router-link>
                <router-link class="side-li-icon4"  to="/review/reDishReport"></router-link>
                <router-link class="side-li-icon5"  to="/review/reSetMealReport"></router-link>
            </div>
            <!-- 门店管理 -->
            <div class="side-items" v-show="activeIndex==1">
                <router-link class="side-li-icon6"  to="/review/reBranchStoreList"></router-link>
                <router-link class="side-li-icon7"  to="/review/reDeskManage"></router-link>
                <router-link class="side-li-icon8"  to="/review/reEmployeeManage"></router-link>
                <router-link class="side-li-icon9"  to="/review/rePayManage"></router-link>
                <router-link class="side-li-icon10"  to="/review/reSystemManage"></router-link>
            </div>
            <!-- 菜品管理 -->
            <div class="side-items" v-show="activeIndex==2">
                <router-link class="side-li-icon11"  to="/review/reDishList"></router-link>
                <router-link class="side-li-icon12"  to="/review/reUnitManage"></router-link>
                <router-link class="side-li-icon13"  to="/review/reDishClassifyManage"></router-link>
                <router-link class="side-li-icon14"  to="/review/reDishFeedingManage"></router-link>
                <router-link class="side-li-icon15"  to="/review/reTasteManage"></router-link>
                <router-link class="side-li-icon16"  to="/review/reTakeOutManage"></router-link>
                <router-link class="side-li-icon17"  to="/review/reSaleTagsManage"></router-link>
            </div>
            
            
        </div>
    </div>
</template>
<script>
export default {
    computed: {
       
    },
    data() {
        return {
            activeIndex:0,
        };
    },
    methods:{
        
    },
    created() {
        if(this.$route.params.activeIndex!=undefined&&this.$route.params.activeIndex!=null){
            this.activeIndex = this.$route.params.activeIndex;
        }
    },
    watch: {
        
    },
    
};
</script>
<style scoped>
    .sideBar{
        position: fixed;
        left: 0;
        top: 0;
        width: 60px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        background: #F1F4FA;
    }
    .back-icon{
        width: 60px;
        height: 70px;
        line-height: 70px;
        text-align: center;
    }
    .back-icon img{
        width: 26px;
        height: 16px;
    }
    .side-items a{
        display: block;
        width: 60px;
        height: 82px;
        margin-top: 8px;
    }
    .side-items .side-li-icon1 {
        background: url("../../../static/images/nav_menu1.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon1{
        background:  #2082ED url("../../../static/images/nav_menu1_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon2 {
        background: url("../../../static/images/nav_menu2.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon2{
        background:  #2082ED url("../../../static/images/nav_menu2_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon3 {
        background: url("../../../static/images/nav_menu3.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon3{
        background:  #2082ED url("../../../static/images/nav_menu3_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon4 {
        background: url("../../../static/images/nav_menu4.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon4{
        background:  #2082ED url("../../../static/images/nav_menu4_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon5 {
        background: url("../../../static/images/nav_menu5.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon5{
        background:  #2082ED url("../../../static/images/nav_menu5_w.png") center no-repeat;
        background-size: 35px 35px;
    }

    .side-items .side-li-icon6 {
        background: url("../../../static/images/nav_menu6.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon6{
        background:  #2082ED url("../../../static/images/nav_menu6_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon7 {
        background: url("../../../static/images/nav_menu7.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon7{
        background:  #2082ED url("../../../static/images/nav_menu7_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon8 {
        background: url("../../../static/images/nav_menu8.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon8{
        background:  #2082ED url("../../../static/images/nav_menu8_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon9 {
        background: url("../../../static/images/nav_menu9.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon9{
        background:  #2082ED url("../../../static/images/nav_menu9_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon10 {
        background: url("../../../static/images/nav_menu10.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon10{
        background:  #2082ED url("../../../static/images/nav_menu10_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon11 {
        background: url("../../../static/images/nav_menu11.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon11{
        background:  #2082ED url("../../../static/images/nav_menu11_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon12 {
        background: url("../../../static/images/nav_menu12.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon12{
        background:  #2082ED url("../../../static/images/nav_menu12_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon13 {
        background: url("../../../static/images/nav_menu13.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon13{
        background:  #2082ED url("../../../static/images/nav_menu13_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    
    .side-items .side-li-icon14 {
        background: url("../../../static/images/nav_menu14.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon14{
        background:  #2082ED url("../../../static/images/nav_menu14_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon15 {
        background: url("../../../static/images/nav_menu15.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon15{
        background:  #2082ED url("../../../static/images/nav_menu15_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon16 {
        background: url("../../../static/images/nav_menu16.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon16{
        background:  #2082ED url("../../../static/images/nav_menu16_w.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .side-li-icon17 {
        background: url("../../../static/images/nav_menu17.png") center no-repeat;
        background-size: 35px 35px;
    }
    .side-items .active.side-li-icon17{
        background:  #2082ED url("../../../static/images/nav_menu17_w.png") center no-repeat;
        background-size: 35px 35px;
    }



    
</style>