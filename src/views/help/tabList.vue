<template>
    <!-- 切换 tab -->
    <div class="hl-tabList com-flex">
        <div class="tab-left">
            <div 
                @click="navClick(index)" 
                :class="{active:tabIndex==index}" 
                v-for="(item,index) in typeList" 
                :key="index" 
                class="tab"
            >{{item}}</div>
            <!-- 软件功能 -->
            <div class="store-tab">
                <div class="store-tit" @click="softwareFun" :class="{active:softIndex}">
                    <span>软件功能</span>
                    <img src="../../static/images/help_jt1.png" alt="" v-if="!softIndex">
                    <img src="../../static/images/help_jt2.png" alt="" v-else>
                </div>
                <ul class="store-ul" v-show='softIndex'>
                    <li v-for="(item,index) in softLists" :key="index" @click="softClick(item,index)" :class="{active:tabIndex==index+2}">
                        {{item.function_name}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="content-right">
            <!-- 视频教程 -->
            <div class="show-list" v-show="tabIndex==0">
                <show-list 
                    :getDataLists="dataLists" 
                    :getType="getType"
                ></show-list>
            </div>
            <!-- 使用手册 -->
            <div class="show-list" v-show="tabIndex==1">
                <show-list 
                    :getDataLists="dataLists" 
                    :getType="getType"
                ></show-list>
            </div>
            <!-- 软件功能 -->
            <div class="show-list" v-show="tabIndex==index+2" v-for="(item,index) in softLists" :key="index">
                <show-list 
                    :getDataLists="softShowLists" 
                    :getType="getType"
                ></show-list>
            </div>
            
        </div>
    </div>
</template>
<script>
import showList from "./showList";
export default {
    components: {
        showList,
    },
    name: "tabList",
    props: {
        getProductId: {
            type: String,
            default: ""
        },
   
    },
    data() {
        return {
            tabIndex: 0,
            //门店管理
            softIndex:false,
            typeList:['视频教程','使用手册'],

            softLists:[],//软件功能
            softShowLists:[],
            //返回参数
            requestData:{
                product_id: "",  //id：默认管家39，服务员40，硬件辅料41，财务结算42
                title: "" , 
                type: "",
                page: 0,
                size: 10, 
                token: ""
            },
            getType:"3", //默认3视频,1使用手册
            dataLists:[],
            
        };
    },
    methods: {
        //视频,使用手册 赋值给getType
        navClick(index){
            let indexType;
            this.tabIndex = index;
            if(index==0){
               indexType = 3;
            }else if(index==1){
               indexType = 1;
            }
            this.getType = indexType.toString();
            this.helpList();
        },
        //软件功能 获取当前list
        softClick(item,index){
            this.tabIndex=index+2;
            this.softShowLists = item.list;
            this.getType ="2"; //软件功能 getType赋个值 在showlist组件做区分
            console.log(this.softShowLists);
           
        },
        /*
          ---接口数据处理
        */
        helpList() {
            let that = this;
            this.requestData.product_id=this.getProductId;
            this.requestData.type=this.getType;
            this.request.doc(this.requestData, function(res) {
                if (res.code == "1") {
                    let resData = res.data;
                    // console.log(resData);
                    if(that.getType=="2"){
                        that.softLists = resData.list;
                    }else{
                        that.dataLists = resData.list[0].list;
                    }
                    // console.log(that.softLists);
                    // console.log(that.dataLists);
                    
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //软件功能
        softwareFun(){
            this.softIndex = !this.softIndex;
            this.requestData.product_id=this.getProductId;
            this.getType="2";
            this.tabIndex =2;
            this.helpList(); 
            //初始化第一条默认展开
            setTimeout(() => {
                this.softShowLists = this.softLists[0].list;
            }, 250);
        }
        
    },
    created(){
        this.helpList();
    },
    watch:{
    }
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
.hl-tabList {
    width: 100%;
    justify-content: space-between;
    overflow: hidden;
    background: #fff;
}
.hl-tabList .tab-left {
    display: block;
    width: 12.5%;
    height: 920px;
    padding-top: 12px;
}
.hl-tabList .content-right {
    width: 87.5%;
    height: 920px;
    border-left: 12px solid #f5f9fc;
    border-top: 12px solid #f5f9fc;
}
.tab-left .tab,.tab-left .store-tab .store-tit {
    height: 72px;
    font-size: 18px;
    color: #6d7278;
    line-height: 72px;
    padding-left: 27%;
    cursor: pointer;
}
.tab-left .store-tab .store-tit.active{
    color: #f9803e;
}
.tab-left .store-tab .store-tit img{
    padding-left: 12.5%;
}
.tab-left .tab.active, .tab-left .store-tab .store-ul li.active{
    background: #f9803e;
    color: #fff;
}
.tab-left .tab.active:hover ,.tab-left .store-tab .store-ul li.active:hover{
    color: #fff !important;
}
.tab-left .tab:hover,.tab-left .store-tab .store-ul li:hover{
    color: #f9803e;
}
.content-right .show-list {
    padding: 15px 30px;
}
.tab-left .store-tab .store-ul li{
    height: 72px;
    font-size: 16px;
    color: #6d7278;
    line-height: 72px;
    padding-left: 27%;
    cursor: pointer;
}
</style>