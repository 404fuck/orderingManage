<!--
 * @Author: zzt
 * @Date: 2021-01-15 11:59:44
 * @LastEditTime: 2021-01-15 20:14:06
 * @LastEditors: Please set LastEditors
 * @Description: 入口组件
 * @FilePath: \sjoyOrderingManage\src\views\waiterHD\reviewContainer\appMain.vue
-->
<template>
    <div class="app-main">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
};
</script>
<style scoped>
.app-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 84px);
    position: relative;
    overflow: hidden;
}

.fade-transform-enter-active {
    transition: all 0.3s ease;
}

.fade-transform-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-transform-enter,
.fade-transform-leave-active {
    transform: translateX(-430px);
    opacity: 0;
}
</style>