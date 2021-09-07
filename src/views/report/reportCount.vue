<!--
 * @Author: your name
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-19 20:18:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sjoyOrderingManage\src\views\report\reportCount.vue
-->
<template>
    <div class="reportCount">
        <el-row class="padding20">
            <el-col :span="18" class="left font14 countTitle">
                {{title}}
                <el-tooltip effect="light" placement="right">
                    <span slot="content">{{tipText}}</span>
                    <img src="../../static/images/tips.png" v-if="tipText!=''"/>
                </el-tooltip>
            
            </el-col>
            <el-col :span="6" class="right">
                <img
                    v-if="Number(befor)>0"
                    src="../../static/images/report_up.png"
                />
                <img v-else src="../../static/images/report_down.png" />
            </el-col>
            <el-col class="countNum">
                <span class="font30 fontWeight count">{{ now }}</span>
            </el-col>
            <el-col class="countSpan">
                <span>{{ titleText }}</span
                >&nbsp;
                <span>
                    <span v-if="Number(befor)!==-1">{{`${Number(befor)}%`}}</span>
                    <span v-else>---</span>
                </span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: {
        titleText: {
            type: String,
            default: null,
        },
        title: {
            type: String,
            default: null,
        },
        now: {
            type: String,
            default: "",
        },
        befor: {
            type: String,
            default: "",
        },
        tipText:{
            type: String,
            default:"",
        },
    },
};
</script>

<style scoped>
.reportCount {
    margin-top: 20px;
    position: relative;
    box-shadow: 1px 1px 30px rgb(0, 0, 0, 0.1);
    height: 150px;
}
.countNum{
    position: absolute;
    z-index: 999;
    left: 0;
    top: 50px;
    text-align: center;
}
.countSpan{
    position: absolute;
    z-index: 999;
    left: 0;
    top: 115px;
    text-align: center;
    font-size: 13px;
}
</style>


