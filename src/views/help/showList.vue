<template>
    <!-- 展示  list -->
    <div class="showList">
        <div v-if="isDetails==false">
            <!-- 是否是使用手册状态 -->
            <ul class="show-ul" v-if="getType==1">
                <li 
                    v-for="(item,index) in getDataLists"
                    :key="index"
                >
                    <p>{{item.name}}</p> 
                    <a :href="getFileUrl" target="_blank"  @click="downloadFile(item)" download>
                        <img src="../../static/images/help_down.png" alt="">
                    </a>
                    
                </li>
            </ul>
            <!-- 视频教程 -->
            <ul class="show-ul" v-else-if="getType==3">
                <li 
                    v-for="(item,index) in getDataLists"
                    :key="index"
                >
                    <span  @click="dialogClick(item)">{{item.title}}</span>
                </li>
            </ul>
            <!-- 软件功能 -->
            <ul class="show-ul" v-else>
                <li 
                    v-for="(item,index) in getDataLists"
                    :key="index"
                >
                    <span  @click="softClick(item)">{{item.title}}</span>
                </li>
            </ul>
        </div>
        <!-- 软件功能详情 -->
        <div class="soft-details" v-else>
            <div class="title">
                <img src="../../static/images/back.png" @click="backClick" alt />
                <span>查看功能详情</span>
            </div>
            <h3 class="details-h3">{{getTitle}}</h3>
            <div v-html="getSoftContent">{{getSoftContent}}</div>
        </div>
   

        <!-- 视频详情---弹出框 -->
        <el-dialog
            :visible.sync="dialogVisible"
            width="40%"
            class="show-dialog"
            >
            <div class="show-video">
                <video 
                    v-if="dialogVisible"
                    :src="getVideoUrl" 
                    preload="none" 
                    width="100%" 
                    height="100%" 
                    controls 
                    autoplay
                ></video>
            </div>
        </el-dialog>
        <!-- 分页 -->
        <!-- <el-pagination
            v-if="currentPage.total > currentPage.size&&currentPage.total!==0"
            class="show-pagination"
            layout="prev, pager, next,sizes"
            :total="currentPage.total"
            :pager-count="3"
            :page-size="currentPage.size"
            :current-page="currentPage.page"
            @current-change="handleCurrentChange"
        ></el-pagination> -->
    </div>
</template>
<script>
export default {
    name: "showList",
    props: {
        getDataLists: {
            type: Array,
            default: null
        },
        getType:{
            type: String,
            default: ""
        }
    },
    data() {
        return {
            dialogVisible:false,
            getVideoUrl:"",//获取视频地址
            getFileUrl:"",//获取文件下载地址
            getSoftContent:null,//获取软件功能详情
            getTitle:"",//获取软件功能标题
            //分页
            currentPage:{
                total: 0,
                page: 1,
                size: 10
            },
            isDetails:false,

        };
    },
    methods: {
        // 分页
        // handleCurrentChange(page) {
        //     this.currentPage.page = page;
        // },
        dialogClick(item){
            this.dialogVisible = true;
            this.getVideoUrl = item.content;
        },
        downloadFile(item){
            this.getFileUrl = item.path;
        },
        softClick(item){
            this.isDetails = true;
            this.getTitle = item.title;
            this.getSoftContent = item.content;
        },
        backClick(){
            this.isDetails = false;
        }

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
.showList .show-ul li {
    font-size: 16px;
    color: #505050;
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
}
.showList .show-ul li span:hover{
    color: #f9803e;
}
.showList .show-ul li p{
    float: left;
}
.showList .show-ul li span{
    float: left;
    cursor: pointer;
}
.showList .show-ul li img{
    margin-top: 22px;
    padding-left: 10px;
}
.show-video{
    width: 100%;
    height: 480px;
    overflow: hidden;
}
.show-video video{
    outline: none;
    border: none;
    background: none;
}
/* 软件功能详情 */
.show-softbox{
    padding: 20px 0;
    overflow: hidden;
}
.show-softbox .title img{
    padding-top: 10px;
    cursor: pointer;
}
.show-softbox .title span{
    padding-left: 10px;
    color: #808080;
    font-size: 14px;
}

/* 软件功能详情 */
.soft-details .title{
    margin-bottom: 25px;
}
.soft-details .title img {
    padding-top: 10px;
    cursor: pointer;
}
.soft-details .title span {
    padding-left: 10px;
    color: #808080;
    font-size: 14px;
}
.details-h3{
   font-size: 22px;
   color: #333;
   margin: 25px auto;
}
</style>