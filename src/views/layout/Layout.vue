<template>

<el-container style="height:100%">
  <el-aside width="280px">
    <Sidebar />
  </el-aside>
  <el-container>
    <el-header>
      <Navbar />
    </el-header>
    <el-main>
      <AppMain />
    </el-main>
  </el-container>
</el-container>
</template>


<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import AppMain from './AppMain'
export default {
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },

}
</script>
<style scoped>
.layout {
  position: relative;
}
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding: 0;
}

.el-header{
  background: #ffffff;
}

.el-aside {
  background-color: #F1F4FA;
  color: #393939;
  text-align: center;
  padding: 0;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  padding: 0;
}

body > .el-container {
  height: 800px;
}
</style>