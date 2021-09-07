<template>
    
    <div class="hl-container">
        <div class="hl-header com-flex">
            <router-link to="/helpManage">
                <h1 class="title">帮助中心</h1>
            </router-link>
            <div class="searchWrap com-flex" @click="searchWrap">
                <el-input class="input" placeholder="请输入您的问题"></el-input>
                <button class="button">搜 索</button>
            </div>
        </div>
        <div class="hl-main">
            <div class="hl-tabwrap">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane name="first" :lazy="true">
                        <div slot="label" class="com-flex">
                            <img class="tab-icon" src="../../static/images/help_icon1.png" />
                            <span>Mjoy管家</span>
                        </div>
                        <tab-list :getProductId="productId"></tab-list>
                    </el-tab-pane>
                    <el-tab-pane name="second" :lazy="true">
                        <div slot="label" class="com-flex">
                            <img class="tab-icon" src="../../static/images/help_icon2.png" />
                            <span>Mjoy服务员</span>
                        </div>
                        <tab-list :getProductId="productId"></tab-list>
                    </el-tab-pane>
                    <el-tab-pane name="third" :lazy="true">
                        <div slot="label" class="com-flex">
                            <img class="tab-icon" src="../../static/images/help_icon3.png" />
                            <span>硬件辅料</span>
                        </div>
                        <tab-list :getProductId="productId"></tab-list>
                    </el-tab-pane>
                    <el-tab-pane name="fourth" :lazy="true">
                        <div slot="label" class="com-flex">
                            <img class="tab-icon" src="../../static/images/help_icon4.png" />
                            <span>财务结算</span>
                        </div>
                        <tab-list :getProductId="productId"></tab-list>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import tabList from "./tabList";
export default {
    name: "helpManage",
    components: {
        tabList,
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.language = "zh_CN";
            },
            set(val) {},
        },
    },
    data() {
        return {
            activeName: "first", //默认展开第一项
            productId: "39", //id：默认管家39，服务员40，硬件辅料41，财务结算42
        };
    },
    methods: {
        handleClick(tab, event) {
            let tabIndex = Number(tab.index) + 39;
            this.productId = tabIndex.toString();
        },
        //搜索
        searchWrap(){
            //跳转到搜索页
            this.$router.push("/helpManage/search");
        }
    },
    created() {
    },
};
</script>
<style scoped>
*,
*:before,
*::after {
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
}
* {
    margin: 0;
    padding: 0;
}
a{
    text-decoration: none;
    color: #333;
}
.com-flex {
    display: flex;
    align-items: center;
}
.hl-container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background: #fff;
}
.hl-header {
    width: 100%;
    padding: 38px 55px;
    overflow: hidden;
}
.hl-header .title {
    width: 200px;
    color: #333;
    font-size: 28px;
}
.hl-header .searchWrap {
    justify-content: space-between;
    width: 750px;
}
.hl-header .searchWrap .input {
    width: 650px;
    height: 34px;
    border-radius: 6px;
}

.hl-header .searchWrap .button {
    outline: none;
    border: none;
    width: 80px;
    height: 34px;
    line-height: 34px;
    background: #f9803e;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
}

.hl-tabwrap .tab-icon {
    display: block;
    margin-right: 16px;
}
</style>