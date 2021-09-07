<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-01-26 20:16:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sjoyOrderingManage\src\views\components\Slider.vue
-->
<template>
  <div>

    <div class="back-div">
      <div class="content-div"
           v-show="lowCount !=0 "
           :style="{width: contentWidth}">
        <span class="low-span">{{this.lowCount}}</span>
        <div class="content-line"></div>
      </div>
      <span class="count-span">{{this.count}}</span>
      <div class="back-line"></div>

    </div>
  </div>
</template>

<script>
export default {

  props: {
    lowCount: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    contentWidth: {
      type: String,
      default: '0px'
    },
  },
};
</script>

<style scoped>
.back-div {
  width: 70%;
  height: 100%;
  padding: 12px 0px;
}
.back-line {
  width: 100%;
  height: 16px;
  background: rgba(230, 234, 239, 1);
  border-radius: 8px;
}

.content-div {
  float: left;
}
.content-line {
  width: 100%;
  height: 16px;
  background: rgba(48, 207, 183, 1);
  border-radius: 7px;
}
.low-span {
  float: right;
  position: relative;
  left: 20px;
  top: -35px;
  font-size: 19px;
  font-weight: 600;
  color: rgba(48, 207, 183, 1);
  line-height: 42px;
}
.count-span {
  float: right;
  position: relative;
  top: -25px;
  font-size: 14px;
  color: #999;
  line-height: 22px;
}
</style>