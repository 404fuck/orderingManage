<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-27 17:21:54
 * @LastEditors: Please set LastEditors
 * @Description: tab切换组件
 * @FilePath: \sjoyOrderingManage\src\views\components\HeadTitle.vue
-->
<template>
    <div class="header">
        <ul class="headtitle-list">
            <li
                v-for="(item, index) in titles"
                :key="index"
				class="headtitle-list-item"
                :class="
                    index == selectIndex
                        ? 'headtitle-list-item-active':''
                        
                "
                @click="clickItem(index)"
            >
                <span class="c">{{ item.value }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        titles: {
            type: Array,
            default: [],
        },
        selectTab: {
            type:Number,
            default: 0,
        },
    },

    data() {
        return {
            selectIndex: this.selectTab,
        };
    },
    methods: {
        clickItem(index) {
            this.selectIndex = index;
            this.$emit("onHeadTitleItemClick", index);
        },
    },
};
</script>

<style scoped>
.header {
    line-height: 70px;
    background-color: #fff;
    margin-top: 1px;
    text-align: left;
    padding-left: 15px;
    font-size: 16px;
    border-bottom: 1px solid #eff2f3;
    overflow: hidden;
}

.headtitle-list {
    height: 65px;
    list-style: none;
    /* 去掉ul前面的符号 */
    margin: 0px;
    /* 与外界元素的距离为0 */
    padding: 0px;
    /* 与内部元素的距离为0 */
    width: auto;
    /*宽度根据元素内容调整*/
}

.headtitle-list-item {
    float: left;
    height: 65px;
    border-bottom: 3px solid transparent;
    line-height: 70px;
    margin: auto 15px;
    color: #303336;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    transition: all 0.2s;
}

.headtitle-list-item-active {
    border-color: #2082ed;
    color: #2082ed;
}
</style>