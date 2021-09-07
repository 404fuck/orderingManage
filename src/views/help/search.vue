<template>
    <div class="hl-container ">
        <div class="search-header com-flex">
            <router-link to="/helpManage">
                <h1 class="title">帮助中心</h1>
            </router-link>
            <div class="searchWrap com-flex">
                <el-input class="input" placeholder="请输入您的问题" v-model="searchInput" clearable @keyup.enter.native="searchBtn"></el-input>
                <button class="button" @click="searchBtn">搜 索</button>
            </div>
        </div>
        <div class="search-main">
            <div class="showList" v-if="isDetails==false">
                <ul class="show-ul">
                    <li 
                        v-for="(item,index) in getDataLists"
                        :key="index"
                    >
                        <span @click="searchListClick(item)">{{item.title}}</span>
                    </li>
                </ul>
            </div>
            <!-- 搜索问题 详情 -->
            <div class="search-details" v-else>
                <div class="title">
                    <img src="../../static/images/back.png" @click="backClick" alt />
                    <span>查看功能详情</span>
                </div>
                <h3 class="details-h3">{{getTitle}}</h3>
                <div v-html="getContent">{{getContent}}</div>
            </div>
            <!-- 暂无搜索内容 -->
            <div class="resultNull" v-if="getDataLists.length==0">
                <img src="../../static/images/searchNull.png" alt="">
                <p v-if="isNull==false">没有找到内容，换个关键词试试吧~</p>
                <p v-if="isNull==true">暂无内容~</p>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: "search",
    computed: {
        language: {
            get() {
                return this.$store.getters.language="zh_CN";
            },
            set(val) {},
        },
    },
    data() {
        return {
            searchInput: "",
            getDataLists:[],
            getTitle:"",
            getContent:null,
            isDetails:false,
            isNull:true,
        };
    },
    methods: {
        //搜索
        searchBtn(){
            if (this.searchInput==""||this.searchInput==null) {
                this.toast.warning("请先输入")
                return false;
            }
            this.isNull = false;
            this.searchList();
            console.log(this.getDataLists);
            this.isDetails = false;
            
        },
        searchListClick(item){
            this.isDetails = true;
            this.getTitle = item.title;
            this.getContent = item.content;
            console.log(this.getTitle);
        },
        backClick(){
            this.isDetails = false;
        },
        //请求数据
        searchList() {
            let that = this;
            let resData={
                title:"",
                token: ""
            };
            resData.title=this.searchInput;
            this.request.doc(resData, function(res) {
                if (res.code == "1") {
                    let resData = res.data;
                    that.getDataLists = resData.list;
                    if (that.getDataLists.length!=0) {
                        that.isNull = false;
                    }
                    // console.log(resData);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
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
html,body{
   background: #fff;
   width: 100%;
   height: 100%;
}
.hl-container  {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background: #fff;
}
.search-header {
    width: 100%;
    padding: 38px 55px;
    overflow: hidden;
}
.search-header .title {
    width: 200px;
    color: #333;
    font-size: 28px;
}
.search-header .searchWrap {
    justify-content: space-between;
    width: 750px;
}
.search-header .searchWrap .input {
    width: 650px;
    height: 34px;
    border-radius: 6px;
}

.search-header .searchWrap .button {
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
    cursor: pointer;
}
.search-main{
    background: #fff;
    padding: 10px 50px;
    overflow: hidden;
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
.showList .show-ul li span{
    float: left;
    cursor: pointer;
}
/* 搜索问题  详情 */
.search-details{
    margin-top: 30px;
}
.search-details .title img {
    padding-top: 10px;
    cursor: pointer;
}
.search-details .title span {
    padding-left: 10px;
    color: #808080;
    font-size: 14px;
}
.details-h3{
   font-size: 22px;
   color: #333;
   margin: 25px auto;
}
/* 搜索结果null */
.resultNull{
    margin: 12% auto;
    font-size: 14px;
    color: #999;
    text-align: center;
}
.resultNull p{
    padding-top: 20px;
}
</style>