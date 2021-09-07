<template>
    <div class="sidebarStyle">
        <el-row style="margin-top: 70px">
            <div class="imgBox">
                <img
                    src="../../static/images/logo1.png"
                    alt
                    width="120"
                    style="
                        position: relative;
                        top: 50%;
                        transform: translatey(-50%);
                    "
                />
            </div>
            <p style="color: #232426; font-weight: bold; font-size: 18px">
                {{ $t("sidebar.commitChike") }}
            </p>
        </el-row>

        <el-menu
            :default-active="$route.path"
            :router="true"
            class="el-menu-vertical-demo"
            background-color="#F1F4FA"
            text-color="#899599"
            :unique-opened="true"
            active-text-color="#1968BD"
        >
            <el-menu-item
                index="/reportManage"
                style="text-align: left; padding-left: 47px"
            >
                <i class="sidebar_manage menu"></i>
                <span slot="title" class="fontWeight">{{
                    $t("sidebar.dandian")
                }}</span>
            </el-menu-item>

            <el-submenu index="1" style="text-align: left; padding-left: 57px">
                <template slot="title">
                    <i class="sidebar_data submenu"></i>
                    <span slot="title" class="fontWeight">{{
                        $t("sidebar.yinye")
                    }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/orderDetail">{{
                        $t("sidebar.dingdan")
                    }}</el-menu-item>
                    <el-menu-item index="/refoundDetail">{{
                        $t("sidebar.tuikuan")
                    }}</el-menu-item>
                    <el-menu-item index="/dishReport">{{
                        $t("sidebar.xiaoshou")
                    }}</el-menu-item>
                    <el-menu-item index="/setMealReport">{{
                        $t("sidebar.taocan")
                    }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2" style="text-align: left; padding-left: 57px">
                <template slot="title">
                    <i class="sidebar_store submenu"></i>
                    <span slot="title" class="fontWeight">{{
                        $t("sidebar.mengdianguanli")
                    }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/branchStoreList">{{
                        $t("sidebar.mengdianXinxi")
                    }}</el-menu-item>
                    <el-menu-item index="/deskManage" :disabled="isDeskManage==0?true:false">{{
                        $t("sidebar.zhuotai")
                    }}</el-menu-item>
                   
                    <el-menu-item index="/printerManage">{{
                        $t("sidebar.dayinji")
                    }}</el-menu-item>
                    <el-menu-item index="/payManage">{{
                        $t("sidebar.pay")
                    }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" style="text-align: left; padding-left: 57px">
                <template slot="title">
                    <i class="sidebar_yuangong submenu"></i>
                    <span slot="title" class="fontWeight">{{
                        $t("sidebar.yuangong")
                    }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/employeeManage">{{$t('sidebar.yuangong')}}</el-menu-item>
                    <el-menu-item index="/operatingDiary">{{$t('sidebar.log')}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" style="text-align: left; padding-left: 57px">
                <template slot="title">
                    <i class="sidebar_dish submenu"></i>
                    <span slot="title" class="fontWeight">{{
                        $t("sidebar.caiping")
                    }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/dishList">{{
                        $t("sidebar.caipingliebiao")
                    }}</el-menu-item>
                    <el-menu-item index="/addDishSetmeal">{{
                        $t("sidebar.xinjiantaocang")
                    }}</el-menu-item>
                    <el-menu-item index="/dishClassifyManage">{{
                        $t("sidebar.fenlei")
                    }}</el-menu-item>
                    <el-menu-item index="/specsManage">{{
                        $t("sidebar.guige")
                    }}</el-menu-item>
                    <el-menu-item index="/dishFeedingManage">{{
                        $t("sidebar.jialiao")
                    }}</el-menu-item>
                    <el-menu-item index="/unitManage">{{
                        $t("sidebar.danwei")
                    }}</el-menu-item>
                    <el-menu-item index="/tasteManage">{{
                        $t("sidebar.kouwei")
                    }}</el-menu-item>
                    <el-menu-item index="/takeOutManage">{{
                        $t("sidebar.takeout")
                    }}</el-menu-item>
                    <el-menu-item index="/saleTagsManage">{{
                        $t("sidebar.saletags")
                    }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item
                index="/systemManage"
                style="text-align: left; padding-left: 47px"
            >
                <i class="sidebar_system menu" style="color: #393939"></i>
                <span slot="title" class="fontWeight">{{
                    $t("sidebar.xitongguanli")
                }}</span>
            </el-menu-item>
            <el-menu-item
                index="/financeManage"
                style="text-align: left; padding-left: 47px"
            >
                <i class="sidebar_finance menu" style="color: #393939"></i>
                <span slot="title" class="fontWeight">{{
                    $t("sidebar.caiwuguangli")
                }}</span>
            </el-menu-item>
            
            <el-menu-item
                index="/downManage"
                style="text-align: left; padding-left: 47px"
            >
                <i class="sidebar_download menu"></i>
                <span slot="title" class="fontWeight">{{
                    $t("sidebar.download")
                }}</span>
            </el-menu-item>
            <div class="sidebar_Tag">
                <router-link to="/helpManage" target="_blank">
                    <i class="sidebar_help"></i>
                    <span class="sidebar_helptxt">{{ $t("help") }}</span>
                </router-link>
            </div>
           
        </el-menu>
    </div>
</template>
<script>
export default {
    name: "sider-bar",
    computed: {
        curentStore() {
            //console.log('curentStore')
            return this.$store.getters.curentStore;
        },
        businessModel() {
            return this.$store.getters.businessModel;
        },
    },
    data() {
        return {
            isDeskManage:0,//经营设置 【叫号取餐/牌号送餐】模式下，“桌台管理”置灰不可点击
        };
    },
    created() {
        let curentStore = this.curentStore;
        if (curentStore) {
            // console.log('重新加载数据' + curentStore.dep_id)
            this.dep_id = curentStore.dep_ID;
            //经营设置
            let businessModel = this.businessModel;
            if (businessModel) {
                this.isDeskManage = businessModel.business_model;
                
            }
        }
    },
    watch: {
        businessModel: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.isDeskManage = newVal.business_model;
                }
            },
        },
    },
    
};
</script>
<style scoped>
.el-menu-item i {
    color: #393939;
}
.el-menu-item.is-active i {
    color: #fff !important;
}
.el-menu-item:hover i {
    color: #fff !important;
}
.imgBox {
    width: 130px;
    height: 130px;
    text-align: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>