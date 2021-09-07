<!--
 * @Author: zzt
 * @Date: 2021-01-15 12:00:34
 * @LastEditTime: 2021-01-20 16:08:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sjoyOrderingManage\src\views\waiterHD\reviewContainer\review.vue
-->

<template>
    <el-container>
        <el-aside width="60">
            <SideBar />
        </el-aside>
        <el-container>
            <el-header height="60">
                <NavBar />
            </el-header>
            <el-main>
                <AppMain />
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
import SideBar from '../components/sideBar';
import NavBar from '../components/navBar';
import AppMain from './appMain';
export default {
    components: {
        SideBar,
        NavBar,
        AppMain
       
    },
    computed: {},
    data() {
        return {};
    },
    created() {},
    mounted() {},
};
</script>
<style scoped>
.el-header{
  background: #fff;
  padding: 0 35px;
}
.el-aside {
  height: 100%;
  width: 60px;
  background-color: #F1F4FA;
  padding: 0;
 
}
.el-main {
  background-color: #fff;
  padding: 0;
}
</style>