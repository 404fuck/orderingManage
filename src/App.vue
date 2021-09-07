<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="isRouterAlive"></router-view>
        </keep-alive>
    </div>
</template>
<script>
export default {
    name: 'App',
    provide () {                                    
        return {
            reload: this.reload                                              
        }
    },
    data() {
        return{
            isRouterAlive: true                    
        }
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },
    methods: {
        reload () {
            this.isRouterAlive = false;            
            this.$nextTick(function () {
                this.isRouterAlive = true;         
            }) 
        }
    },
    created() {
        if (this.language.length <= 0) {
            this.$store.dispatch("setLanguage", "en_US");
        }
        
    },
};
</script>
<style>
#app {
    width: 100%;
    height: 100%;
    /* 仅适用于Mac OS X / macOS （抗锯齿，页面更加清晰）*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.main-content {
    box-shadow: 0px 2px 20px #0000001a;
    background-color: white;
    margin: 22px;
    min-height: 800px;
}
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: #fff;
    font-family: "Microsoft YaHei", "微软雅黑" !important;
    -webkit-tap-highlight-color: rgba(0,0,0,0);

}
input {
    font-family: "Microsoft YaHei" !important;
}
input:-webkit-autofill {
      box-shadow: 0 0 1000px 1000px white inset !important;
}
/* 自定义滚动条 */
::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(144,147,153,.3);
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb:hover{
    background: rgba(144,147,153,.4); 
    
}
/* 
   -----sideBar icon ----

*/

.el-menu-item-group .el-menu-item {
    margin-left: 0px !important;
}
.el-menu-item {
    margin-left: 30px;
    color: #303336 !important;
    overflow: hidden;
}
.el-menu-item .menu,.el-submenu__title .submenu{
    float: left;
    margin-top: 17px;
    margin-left: 2px;
    width: 20px;
    height: 20px;
}
.el-menu-item span,.el-submenu__title span{
    float: left;
    margin-left: 5px;
}
.el-menu-item,
.el-submenu__title {
    color: #393939 !important;
    border-radius: 100px 0px 0px 100px !important;;
}
.el-menu-item:hover,
.el-submenu__title:focus {
    outline: none;
    color: #fff !important;;
    background: #4c9bf0 !important;;
    font-size: 14px !important;;
    border-radius: 100px 0px 0px 100px !important;;
}
.el-submenu__title:hover {
    background: none !important;
}
.el-menu-item.is-active {
    color: #fff !important;;
    background: #1968bd !important;;
    font-size: 14px !important;;
    border-radius: 100px 0px 0px 100px !important;;
}
.el-menu-item .sidebar_manage{
    background: url("./static/images/icon/manage.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-menu-item:hover .sidebar_manage,.el-menu-item.is-active .sidebar_manage{
    background: url("./static/images/icon/manage_white.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-menu-item .sidebar_system{
    background: url("./static/images/icon/setting.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-menu-item:hover .sidebar_system,.el-menu-item.is-active .sidebar_system{
    background: url("./static/images/icon/setting_white.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-menu-item .sidebar_finance{
    background: url("./static/images/icon/line.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-menu-item:hover .sidebar_finance,.el-menu-item.is-active .sidebar_finance{
    background: url("./static/images/icon/line_white.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-menu-item .sidebar_download{
    background: url("./static/images/icon/download.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-menu-item:hover .sidebar_download,.el-menu-item.is-active .sidebar_download{
    background: url("./static/images/icon/download_white.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-submenu__title .sidebar_data{
    background: url("./static/images/icon/data.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-submenu__title .sidebar_store{
    background: url("./static/images/icon/collection.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-submenu__title .sidebar_yuangong{
    background: url("./static/images/icon/yuangong.png") left center no-repeat;
    background-size: 100% 100%;
}
.el-submenu__title .sidebar_dish{
    background: url("./static/images/icon/dish.png") left center no-repeat;
    background-size: 100% 100%;
}

.sidebar_Tag{
    text-align: left; 
    height: 56px;
    line-height: 56px;
    margin-left: 30px;
}
.sidebar_Tag a{
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
    color: #303336;
    padding-left: 47px;
    overflow: hidden;
    border-radius: 100px 0px 0px 100px;
}
.sidebar_Tag a .sidebar_help{
    float: left;
    width: 20px;
    height: 20px;
    margin-top: 18px;
    margin-left: 2px;
    background: url("./static/images/icon/help.png") left center no-repeat;
    background-size: 100% 100%;
}
.sidebar_Tag a .sidebar_helptxt{
   float: left;
   margin-left: 5px;
}
.sidebar_Tag:hover a{
    color: #fff;
    background: #4c9bf0;
}
.sidebar_Tag:hover a .sidebar_help {
    width: 20px;
    height: 20px;
    background: url("./static/images/icon/help_white.png") left center no-repeat;
    background-size: 100% 100%;
}

/* 面包屑 */
.crumbsLink{
    color: #8c939b !important;
    font-weight: normal !important;
}
.crumbsLink:hover{
    color: #6D7278 !important;
}
/* pubilc class */
.flex {
	display: flex;
}
.flex1 {
	flex: 1;
}
.flex-wrap {
	flex-wrap: wrap;
}
.flexv {
	flex-direction: column;
}
.flexc {
	justify-content: center;
}
.jus-b {
	justify-content: space-between;
}
.jus-a {
	justify-content: space-around;
}
.jus-s {
	justify-content: flex-start;
}
.ali-c {
	align-items: center;
}

hr {
    width: 98%;
    border: none;
    background: #eff2f3;
    height: 1px;
    margin-top: 20px;
}

.fontWeight {
    font-weight: bold;
}
.padding0 {
    padding: 0px;
}

/* font-size */
.font18 {
    font-size: 18px;
}
.font20 {
    font-size: 20px;
}
.font22 {
    font-size: 22px;
}
.font12 {
    font-size: 12px;
}
.font13 {
    font-size: 13px;
}
.font14 {
    font-size: 14px;
}
.font15 {
    font-size: 15px;
}
.font16 {
    font-size: 16px;
}
.font30 {
    font-size: 30px;
}
.center {
    text-align: center;
}
.right {
    text-align: right;
}
.left {
    text-align: left;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.oh {
    overflow: hidden;
}
.clear{
    clear: both;
}
/* margin */
.top10 {
    margin-top: 10px;
}
.top5 {
    margin-top: 5px;
}
.top15 {
    margin-top: 15px;
}
.top20 {
    margin-top: 20px;
}
.top25 {
    margin-top: 25px;
}
.top30 {
    margin-top: 30px;
}
.top40 {
    margin-top: 40px;
}
.top50 {
    margin-top: 50px;
}
.top60 {
    margin-top: 60px;
}

.right10 {
    margin-right: 10px;
}
.right20 {
    margin-right: 20px;
}
.left20 {
    margin-left: 20px;
}
.left25 {
    margin-left: 25px;
}
.left10 {
    margin-left: 10px;
}
.left8 {
    margin-left: 8px;
}
.left5 {
    margin-left: 5px;
}
.left15 {
    margin-left: 15px;
}
.left30 {
    margin-left: 30px;
}
.left40 {
    margin-left: 40px;
}
.left50 {
    margin-left: 50px;
}
.padding20 {
    padding: 20px;
}
.lineHeight20 {
    line-height: 20px;
}
.lineHeight35 {
    line-height: 35px;
}

.title-line {
    border-left: 4px #2082ed solid;
    padding-left: 10px;
    color: #393939;
    font-size: 16px;
    font-weight: bold;
}
/* UI-Btn */
/* 主要 */
.themeBtn {
    background: #2082ed;
    color: white;
    border-color: #2082ed;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.themeBtn:hover {
    background: #4c9bf0;
    color: white;
    border-color: #4c9bf0;
}
/* 新增 */
.themeAddBtn {
    background: #30cfb7;
    color: white;
    border-color: #30cfb7;
    font-size: 14px;
}
.themeAddBtn:hover {
    background: #30cfb7;
    color: white;
    border-color: #30cfb7;
    font-size: 14px;
}
/* 普通 */
.themeImportBtn {
    color: #2082ed;
    border-color: #1d82ed;
    background-color: rgba(32, 130, 237, 0.06);
}
.themeImportBtn:hover {
    color: #2082ed;
    border-color: #1d82ed;
    background-color: rgba(32, 130, 237, 0.06);
}
/* 取消 */
.cancelBtn {
    background: #fff;
    border-color: #0082f5;
    color: #2082ed;
    font-size: 14px;
}
.cancelBtn:hover {
    background: #fff;
    border-color: #0082f5;
    color: #2082ed;
    font-size: 14px;
}
.el-upload {
    width: 100% !important;
    height: 100% !important;
}
.el-menu {
    border: none !important;
}
.avatar {
    object-fit: cover;
}
.el-radio{
    margin-right: 50px;
}
[class^="icon-"] {
    font-family: "iconfont" !important;
    /* 以下内容参照第三方图标库本身的规则 */
    font-size: 18px !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.el-menu-item [class^=icon-] {
    margin-right: 5px;
    width: 24px;
    /* text-align: center; */
    font-size: 18px;
    vertical-align: middle;
}

.el-submenu [class^=icon-] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    /* text-align: center; */
    font-size: 18px;
}
.el-dialog--center .el-dialog__body{
    text-align: center !important;
}
/* 设置滚动条隐藏但可以滚动 */
.el-aside::-webkit-scrollbar {
    display: none !important;
}
/* 定义下载图标 */
.report-download{
    background: url('./static/images/reportDown.png') no-repeat 13px center;
    background-size: 16px 16px;
}
.report-download span{
    padding-left: 14px;
}
/* 定义全局公用样式 */
.titleRate .el-rate {
    display: inline-block;
}
/* select字体 */
.el-select-dropdown__item.selected {
    color: #2082ed !important;
}
.el-table__header-wrapper,
.el-table__footer-wrapper {
    height: 46px;
    line-height: 20px;
}
.el-select .el-input.is-disabled .el-input__inner {
    height: 32px !important;
}
.cashStyle .el-timeline-item__node--large {
    width: 24px !important;
    height: 24px !important;
    left: -7px !important;
}
.cashStyle
    .el-timeline-item:nth-child(2)
    .el-timeline-item__node--large::after {
    content: "￥";
    color: white;
}
.cashStyle .el-timeline-item:nth-child(1) {
    height: 80px !important;
}
.cashStyle .el-timeline-item:nth-child(1) .el-timeline-item__content {
    color: #2082ed !important;
    font-size: 14px !important;
}
.cashStyle .el-timeline-item__content {
    font-weight: bold;
}
/* 点评管理--评分 */
.el-rate__item {
    position: relative;
    top: -5px;
    left: 5px;
}
.el-image__inner {
    object-fit: cover;
}
.scoreRate .el-rate__text {
    float: left !important;
    font-size: 12px !important;
    color: #808080 !important;
}
.scoreRate .el-rate__icon {
    font-size: 20px !important;
}
.countRote .el-rate__text {
    float: left !important;
    font-size: 30px !important;
    color: #232426 !important;
    font-weight: bold !important;
}
.countRote .el-rate__icon,
.el-rate__decimal {
    font-size: 35px !important;
}
.itemRate .el-rate__text {
    float: left !important;
    font-size: 20px !important;
    color: #232426 !important;
    font-weight: bold !important;
}
.itemRate .el-rate__icon {
    font-size: 30px !important;
}
.dishStyle .printInfo-div .cell{
    text-align: left;
    margin-left: 10px;
}
.dishStyle .el-input--small .el-input__icon {
    font-size: 14px;
}
.dishStyle .el-button--text {
    color: #2082ed !important;
}
.el-button--text {
    color: #2082ed !important;
}
.size-div .el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #ebeef5 !important;
}
.size-div .el-table::before {
    height: 0px !important;
}
.size-div .el-table__fixed::before,
.el-table__fixed-right::before {
    height: 0px !important;
}
.size-div .el-button--text {
    color: #2082ed !important;
}
.googleStyle .el-input__inner {
    left: unset !important;
    width: 300px !important;
    right: 78px !important;
    top: 12px !important;
}
.el-input__inner {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

/* 关联菜品 */
.dishTabelStyle .el-table--enable-row-transition .el-table__body td {
    padding: 0;
    border: 1px #979797 solid;
    border-radius: 4px;
    height: 50px;
}
.dishTabelStyle .el-table::before {
    height: 0px !important;
}
.el-table--border td,
.el-table--border th {
    border-right: none !important;
}
.dishSetmealStyle .el-checkbox__input.is-checked .el-checkbox__inner,
.dishFeedStyle .el-checkbox__input.is-checked .el-checkbox__inner {
    border: none !important;
    background: #2082ed !important;
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
}
.dishSetmealStyle .el-checkbox__inner,
.dishFeedStyle .el-checkbox__inner {
    border: none !important;
    background: #b8bec8 !important;
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
}
.dishSetmealStyle .el-checkbox__inner::after,
.dishFeedStyle .el-checkbox__inner::after {
    border: none !important;
}
.dishSetmealStyle
    .el-checkbox__input.is-indeterminate
    .el-checkbox__inner::before,
.dishFeedStyle
    .el-checkbox__input.is-indeterminate
    .el-checkbox__inner::before {
    background: none !important;
}
.dishSetmealStyle .el-icon-caret-right:before,
.dishFeedStyle .el-icon-caret-right:before {
    content: "" !important;
}
.dishTabelStyle .el-table__body {
    border-spacing: 0px 10px !important;
}

.cell {
    font-size: 12px;
}
.el-breadcrumb {
    margin-left: 20px;
    font-size: 12px;
    position: relative;
    /* top: 10px; */
}
.line {
    background-color: #eeeeee;
    height: 1px;
    margin-left: 30px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: white !important;
    border: 1px #2082ed solid !important;
    color: #2082ed !important;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
    background: white !important;
    border: 1px #d3d9e2 solid !important;
    color: #303336 !important;
}
.el-dialog__body {
    padding-top: 0px !important;
}
.orderStyle .el-button--text,
.branchStoreStyle .el-button--text,
.dishListStyle .el-button--text {
    color: #2082ed !important;
}
.branchStyle .el-form-item__error{
    left: 10px;
}
.branchStyle .el-image__inner,
.branchStoreStyle .el-image__inner {
    object-fit: cover !important;
}
.userStyle .el-tag {
    background: none !important;
    border: none !important;
}
.el-form-item__label {
    color: #232426 !important;
    font-weight: bold !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.gradeStyle .select-content {
    color: #232426 !important;
    font-weight: bold !important;
    font-size: 12px !important;
}
.gradeList td {
    height: 100px !important;
}
.gradeList td:first-child .cell {
    border-right: 1px #979797 solid;
}
.tabStyle .headtitle-list-item-active,
.employeeStyle .headtitle-list-item-active {
    border-bottom-color: #2082ed !important;
    color: #2082ed !important;
}
.headtitle-list-item-active,
.headtitle-list-item {
    font-weight: bold !important;
}
.userStyle .el-form-item__content {
    display: inline-block !important;
    width: 60%;
}
.dishStyle .value-input,
.branchStyle .value-input {
    margin-left: 10px;
    width: 400px;
}
.userStyle .avatar-uploader,
.dishStyle .avatar-uploader,
.branchStyle .avatar-uploader {
    margin-left: 19px;
    margin-top: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 87px;
    height: 87px;
    display: block;
}
.userStyle .avatar-uploader-icon,
.dishStyle .avatar-uploader-icon,
.branchStyle .avatar-uploader-icon {
    font-size: 28px;
    color: #899599;
    width: 87px;
    height: 87px;
    line-height: 87px;
    text-align: center;
}
.dishStyle .el-tabs--left .el-tabs__item.is-left {
    text-align: center !important;
}
.dishStyle .el-tabs--left .el-tabs__item.is-left:nth-child(2) {
    background-position: -10% !important;
}
.dishListStyle .el-tabs__item.is-active {
    font-weight: bold;
    color: #2082ed;
}
.dishListStyle .has-gutter th:first-child .cell{
    padding-left: 21px;
}
/* 自定义表格 功能针对多规格菜 */
.diy-table .cell{
    padding: 0;
}


.dishListStyle .el-tabs__item {
    font-size: 16px;
    color: #5c6268;
    font-weight: bold;
}
.financeStyle .el-tabs__active-bar,
.dishListStyle .el-tabs__active-bar,
.addPrinterStyle .el-tabs__active-bar {
    background-color: #2082ed !important;
}
.dishStyle .el-tabs__item.is-active {
    color: #232426 !important;
    font-weight: bold !important;
    font-size: 14px !important;
    background-image: url("static/images/spot_blue.png") !important;
    background-repeat: no-repeat !important;
    background-position: 13% !important;
}
.dishStyle .el-tabs__item {
    color: #303336 !important;
    font-size: 14px !important;
    background-image: url("static/images/spot_gray.png") !important;
    background-repeat: no-repeat !important;
    background-position: 13% !important;
}
.noticeStyle .el-tabs__item {
    font-weight: bold !important;
    font-size: 16px !important;
    color: #393939 !important;
}
.financeStyle .el-tabs__item,
.commentStyle .el-tabs__item,
.addPrinterStyle .el-tabs__item {
    font-size: 16px !important;
    color: #303336 !important;
}

.financeStyle .el-tabs__item.is-active,
.commentStyle .el-tabs__item.is-active,
.noticeStyle .el-tabs__item.is-active,
.addPrinterStyle .el-tabs__item.is-active {
    font-weight: bold !important;
    color: #2082ed !important;
}
.addPrinterStyle .el-tabs__nav {
    height: 60px;
    line-height: 60px;
}
.commentStyle .el-tabs__active-bar,
.noticeStyle .el-tabs__active-bar {
    background: #2082ed !important;
    height: 4px !important;
}
.el-dialog__title {
    color: #393939 !important;
    font-weight: bold !important;
}
.dishStyle .el-tabs__active-bar {
    height: 0px !important;
}
.dishStyle .cz-input{
    position: relative;
    padding: 0 10px;
    width: 100px;
    height: 28px;
    margin: 0 auto;
    border-radius: 4px;
    border: 1px solid #E6EAEF;
}
.dishStyle .cz-input input{
    border: none;
    background: none;
    text-align: center;
    width: 90%;
    height: 26px;
    margin: 0 auto;
    outline: none;
    color: #606266;
    font-size: 12px;
}
.dishStyle  .cz-input span{
    position: absolute;
    right: 12px;
    top: 2px;
    font-size: 12px;
}
/* 添加自选菜品 */
.zxType-table .cell{
    padding: 0;
}
.zxType-table::before{
    background: none;
    height: 0;
}
/* 系统管理 */
.systemStyle .cash-radio-group{
    width: 600px;
}
.systemStyle .radio-group .el-radio{
    margin-right: 0 !important;
}
.systemStyle .cash-radio-group .radio{
    display: inline-block;
    min-width: 160px;
    margin-top: 20px;
    margin-right: 20px;
}
.systemStyle .el-tabs__item.is-active {
    background: #f4f7fd;
}
.systemStyle .el-tabs--left .el-tabs__item.is-left {
    min-width: 90px;
    color: #232426;
    text-align: left;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    font-weight: bold;
}
.systemStyle .el-tabs--left .el-tabs__nav-wrap.is-left::after{
   width: 1px;
   background: #e6eaef;
}
.systemStyle .el-tabs--left .el-tabs__nav-wrap.is-left .el-tabs__active-bar{
    background: none;
}
.systemStyle .el-input--small .el-input__icon {
    font-size: 14px;
    line-height: 34px;
}
.dishStyle .el-tag ,.gradeList .el-tag {
    height: 26px;
    line-height: 24px;
    color: #2082ed;
    font-size: 13px;
    padding: 0 10px;
    border-radius: 14px;
    border: 1px solid #0082f4;
    background: none;
}
.newStoreStyle .el-tag,
.systemStyle .waterStyle .el-tag {
    background-color: #2082ed;
    border-color: #2082ed;
    color: white;
}
.newStoreStyle .el-tag {
    border-radius: 17px;
}
.newStoreStyle .spanText {
    display: block;
    position: relative;
    top: -30px;
    color: #8c939b;
    font-size: 12px;
}
.newStoreStyle .avatar-uploader {
    margin-top: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 180px;
    height: 100px;
    text-align: center;
    display: block;
}

.newStoreStyle .avatar-uploader-icon {
    font-size: 28px;
    color: #899599;
    width: 87px;
    height: 87px;
    line-height: 87px;
    text-align: center;
}
.dishStyle .el-tag .el-tag__close {
    color: #2082ed;
    font-size: 13px;
    top: 0;
}
.dishStyle .el-tag .el-tag__close:hover {
    background: none;
}
.newStoreStyle .el-tag .el-tag__close,
.systemStyle .waterStyle .el-tag .el-tag__close {
    color: white;
}
.newStoreStyle .el-tag .el-tag__close,
.systemStyle .waterStyle .el-tag .el-tag__close:hover {
    color: white;
    background: none;
}
.systemStyle .el-form-item{
    margin-bottom: 0 !important;
}
.systemStyle .returnStyle .el-tag {
    line-height: 24px;
    height: 26px;
    border-radius: 13px;
    border: 1px solid #0082F4;
    background: none;
    color: #2082ED;
    font-size: 13px;
}
.systemStyle .returnStyle .el-tag .el-tag__close {
    color: #2082ed;
}
.systemStyle .returnStyle .el-tag .el-tag__close:hover {
    background: none;
}
.reportStyle .el-tabs__item.is-active {
    background: #2082ed !important;
    color: white !important;
}
.reportStyle .el-tabs__active-bar {
    width: 0px !important;
}
.el-date-editor .el-range-separator {
    width: 10% !important;
}
.reportStyle .el-tabs--top .el-tabs__item.is-top:last-child,
.el-tabs--top .el-tabs__item.is-bottom:last-child,
.el-tabs--bottom .el-tabs__item.is-top:last-child,
.el-tabs--bottom .el-tabs__item.is-bottom:last-child {
    padding: 0px 20px !important;
}
.reportStyle .el-tabs--top .el-tabs__item.is-top:nth-child(2),
.el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
.el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2) {
    padding: 0px 20px !important;
}
.reportStyle .el-tabs__item {
    border: 1px #d3d9e2 solid !important;
}
.reportStyle .el-tabs__item:nth-child(4) {
    border-left: none !important;
    border-radius: 2px 0px 0px 2px !important;
}
.reportStyle .el-tabs__item:nth-child(2) {
    border-right: none !important;
    border-radius: 2px 0px 0px 2px !important;
}
.reportStyle .el-tabs__item:last-of-type {
    border-left: none !important;
    border-radius: 2px 0px 0px 2px !important;
}
.reportStyle .el-tabs__nav {
    float: right;
}
.noticeStyle .el-tabs__nav {
    float: left ;
}
.dishStyle .el-tabs__nav-wrap::after,
.reportStyle .el-tabs__nav-wrap::after {
    height: 0px;
}
.dishStyle .el-tabs__nav {
    width: 0px;
}

.el-table th,
.el-table td {
    text-align: center !important;
}
.el-table th {
    background: #f4f7fd !important;
    color: #232426 !important;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #303336 !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #2082ed;
    border-color: #2082ed;
}
.el-slider__runway.disabled .el-slider__bar {
    background: #30cfb7 !important;
}

.el-radio__input.is-checked .el-radio__inner {
    border-color: #2082ed !important;
    background: #2082ed !important;
}


.el-switch__label.is-active {
    color: #232426 !important;
}
.el-switch__label {
    color: #8c939b !important;
}
.recomStyle .el-radio__input.is-checked + .el-radio__label {
    color: #8c939b !important;
}
.recomStyle .el-radio__label {
    font-weight: bold !important;
    color: #8c939b !important;
}
.el-radio__input.is-checked + .el-radio__label {
    color: #232426;
}
.el-radio__input.is-focus .el-radio__inner {
    border-color: #8c939b;
}
.el-radio__inner:hover {
    border-color: #2082ed;
}
.el-tooltip {
    cursor: pointer;
}
.el-tooltip__popper.is-light{
    background: #fff !important;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1) !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    z-index: 99 !important;
}
.el-tooltip__popper[x-placement^=right] .popper__arrow{
    border-right-color:  rgba(0, 0, 0, 0.1) !important;
}
/* 登录注册页样式 */
.login-container .el-input-group--prepend .el-input__inner {
    height: 50px !important;
}
.login-container .el-input--suffix .el-input__inner {
    height: 50px !important;
}
.login-container {
    position: fixed;
    text-align: center;
    width: 100%;
    height: 100%;
    background: url('../src/static/images/loginBg.png') no-repeat center;
    background-size: cover;
    overflow: hidden;
}
.container-logo {
    position: fixed;
    left: 80px;
    top: 50px;
    z-index: 9999;
}
.container-left {
    position: fixed;
    left: 80px;
    top: 160px;
    z-index: 9999;
    opacity: .9;
}
.container-right {
    position: fixed;
	top: 180px;
	right: 250px;
	z-index: 9999;
    background: #fff;
    width: 450px;
    height: 560px;
    box-shadow: 0px 28px 36px 11px rgba(25, 104, 190, 0.08);
    border-radius: 10px;
}

.login-main {
    border-radius: 3px;
    background-color: #fff;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
}
.container-right-header{
    overflow: hidden;
}
.left-title {
    float: left;
    cursor: pointer;
}
.right-title {
    float: right;
    line-height: 39px;
    text-align: center;
    margin-right: 18px;
    display: flex;
    align-items: center;
}
.loginBtn {
    width: 100% !important;
    background: #2082ed !important;
    border-color: #2082ed !important;
}
.title-company {
    font-size: 14px;
    color: #fd7b4d;
    margin-right: 35px;
    text-decoration: none;
}
.text-style {
    color: #768387;
    font-size: 14px;
}
.container-tabs {
    margin-top: 20px;
    line-height: 40px;
}
.container-body {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    padding: 50px 43px;
}
.tabs-active {
    cursor: pointer;
    font-size: 22px;
    color: #318aef;
    border-bottom: 3px solid #2082ed;
}
.tabs-unactive {
    cursor: pointer;
    font-size: 22px;
    color: #adadad;
}
.registTxt {
    color: #32c5ff;
    font-size: 14px;
    cursor: pointer;
}
.pass {
    margin-top: 25px;
}
.lang-select .el-dropdown{
    color: #808080;
    font-size: 14px;
}
.el-dropdown-menu__item.is-disabled {
    color: #318AEF !important;
}
/* 菜品管理 */
.addDish-content .el-form-item__error {
    left: 10px;
}
.addDish-content .note-textarea .el-textarea__inner {
    height: 100px;
}
.addDish-content .weekTxt .el-checkbox__label {
    font-size: 12px;
    color: #8c939b;
    padding-left: 5px;
}
.el-autocomplete-suggestion li {
    text-align: center;
    padding: 0 5px;
}
/* 分类管理---加料管理---单位管理  （排序修改删除卡片公用）*/
.content-wrap {
	padding: 30px;
    width: 320px;
	height: 650px;
	background: #fff;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	-moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
}
.addClassTit {
	width: 100%;
	height: 40px;
	font-size: 14px;
	line-height: 40px;
	text-align: center;
	border-radius: 4px;
	color: #30CFB7;
	border: 1px solid #00D3B6;
	margin-bottom: 10px;
	cursor: pointer;
}
.addClassTit span{
	font-weight: bold;
	padding-left: 8px;
}
.infinite-list {
	padding: 0;
	margin: 0;
	width: 100%;
    height: auto;
}
.infinite-list li {
	position: relative;
	list-style: none;
	margin-top: 20px;
	padding: 0 14px;
	height: 40px;
	line-height: 40px;
	border-radius: 4px;
	border: 1px solid #979797;
	overflow: hidden;
}
.infinite-list li.active{
	background: #2082ED;
	color: #fff;
}
.infinite-list li.active .li-title{
	color: #fff;
}
.infinite-list li .li-title{
	color: #303336;
	font-size: 12px;
}
.infinite-list li .li-icon:before{
	cursor: pointer;
}
.addClass-sort{
	position: absolute;
	right: 26px;
	top: 10px;
}
.addClass-del {
	position: absolute;
	right: 6px;
	top: 10px;
}
.editPrinterStyle .el-form-item__label,
.addPrinterStyle .el-form-item__label {
    text-align: left;
}
.editPrinterStyle .dishList .el-form-item__content,
.addPrinterStyle .dishList .el-form-item__content {
    padding-left: 10px;
    margin-left: 0px !important;
    border: 1px #e6eaef solid;
    width: 40%;
    margin-top: 20px;
}
.el-slider__bar {
    background: #2082ed;
}
.el-slider__button {
    width: 10px;
    height: 10px;
    border: solid 0.037037rem #2082ed;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"] {
    -moz-appearance: textfield;
}
.yujinStyle .el-form-item__label {
    font-size: 12px !important;
}
.seviesShui .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #2082ed !important;
    border-color: #2082ed !important;
}
.dishStyle .checkbox-group .el-checkbox{
    padding: 10px 0;
    margin-right: 60px;
}
/* 收款方式 */
.payManageStyle .el-checkbox{
    padding-top: 30px;
}
.payManageStyle .el-checkbox .el-checkbox__label,.dishStyle .el-checkbox .el-checkbox__label{
    font-size: 12px;
    font-weight: bold;
}
.payManageStyle .checkbox-group .el-checkbox{
    padding-top: 20px;
    margin-right: 75px;
}

.payManageStyle .checkbox-group .el-checkbox__label,.dishStyle .checkbox-group .el-checkbox__label{
    color: #303336;
    font-size: 12px;
    font-weight: normal;
}

.payManageStyle .el-tabs__header.is-left{
    min-width: 120px;
    border-right: 1px solid #E6EAEF;
}
.payManageStyle .el-tabs--left .el-tabs__nav{
    border: none;
}
.payManageStyle .el-tabs--left .el-tabs__item.is-left{
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    height: 60px;
    line-height: 60px;
    color: #232426;
    border: none;
}
.payManageStyle .el-tabs--left .el-tabs__item.is-left.is-active{
    background: #F4F7FD;
}
.payManageStyle .el-tabs--left .el-tabs__nav-wrap.is-left::after{
   width: 1px;
   background: #e6eaef;
}
.payManageStyle .el-tabs--left .el-tabs__nav-wrap.is-left .el-tabs__active-bar{
    background: none;
}

.shuifei .el-form-item__content {
    margin-left: 0px !important;
}
.startNum .el-form-item__content {
    margin-left: 0px !important;
}
.downManage .el-tabs__nav {
    float: right !important;
}
.downManage .el-tabs__item .is-bottom .is-active {
    background-image: url("static/images/waiter_code.png");
}
.downManage .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2) {
    border: 1px #1968be solid;
    color: #1968be;
    background: rgba(32, 130, 237, 0.11);
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    padding: 0px !important;
    margin-right: 30px;
}
.downManage .el-tabs--bottom .el-tabs__item.is-bottom:last-child {
    border: 1px #1968be solid;
    color: #1968be;
    background: rgba(32, 130, 237, 0.11);
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    padding: 0px !important;
    margin-right: 25px;
}
.downManage .el-tabs__item.is-active {
    border: 1px rgba(0, 0, 0, 0.1) solid !important;
    color: rgba(0, 0, 0, 0.1) !important;
    background: white !important;
}
.downManage .el-tabs__active-bar {
    background: none !important;
}
.downManage .el-tabs__nav-wrap::after {
    content: none !important;
}
/* 帮助中心 element */
.hl-container {
    user-select: none;
    margin: 0;
    padding: 0;
}
.hl-container ul,
.hl-container li {
    list-style: none;
}
.hl-container .searchWrap .el-input__inner {
    height: 34px;
}
.hl-container .searchWrap .el-input__suffix {
    top: -2px;
}
.hl-container .searchWrap .el-input__inner:focus {
    border-color: #f9803e;
}
.hl-container .el-tabs__nav-wrap {
    padding-left: 65px;
}
.hl-container .el-tabs__item {
    font-size: 24px;
    padding: 0 43px;
    color: #505050;
    height: 58px;
    line-height: 48px;
}
.hl-container .el-tabs__item.is-active {
    color: #f9803e;
}
.hl-container .el-tabs__item:hover {
    color: #f9803e;
}
.hl-container .el-tabs__active-bar {
    height: 4px;
    background-color: #f9803e;
}
.show-dialog .el-dialog__headerbtn:focus .el-dialog__close,
.el-dialog__headerbtn:hover .el-dialog__close {
    color: #f9803e;
}
/* 门店管理  form 表单 */
.demo-ruleForm .el-radio__label {
    color: #232426;
    font-size: 13px;
}
.row-grade .el-form-item__content {
    /* 职级权限选择 */
    width: 660px !important;
    margin-left: 48px !important;
    margin-top: 50px !important;
}
.select-storeShow .el-checkbox {
    /* 跨店选择门店 */
    font-size: 13px;
    color: #303336;
    margin-left: 32px;
    margin-right: 70px;
    margin-top: 20px;
}
.select-storeShow .noDataTxt {
    /* 暂无跨店门店 */
    margin-top: 20px;
    color: #909399;
    text-align: center;
}
.row-grade .el-tabs .el-tabs__nav {
    min-width: 160px;
}
.row-grade .el-tabs .el-tabs__active-bar {
    background: none;
}
.row-grade .el-tabs .el-tabs__item {
    width: 160px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #232426;
    font-size: 13px;
    border-bottom: 1px solid #e6eaef;
}
.row-grade .el-tabs .el-tabs__item:last-child {
    border-bottom: none;
}
.row-grade .el-tabs .el-tabs__nav-wrap::after {
    width: auto;
    background: none;
}
.row-grade .el-tabs .el-tabs__item.is-active {
    background: #f4f7fd;
    font-weight: 600;
}
.row-grade .row-tab-pane .el-tab-pane {
    margin-left: 60px;
    width: 380px;
    overflow: hidden;
}
.row-grade .row-tab-pane .el-tabs--left,
.row-grade .row-tab-pane{
    min-height: 612px;
}
.row-grade .row-tab-pane .el-tabs--left .el-tabs__header.is-left{
    border-right: 1px solid #e6eaef;
    min-height: 612px;
}
.row-grade .el-tabs--left .el-tabs__nav-wrap.is-left::after{
    width: 1px;
    background: #e6eaef;
}
.row-grade .el-tabs--left .el-tabs__nav-wrap.is-left .el-tabs__active-bar{
    background: none;
}
.row-grade .row-tab-pane .check-all {
    height: 60px;
    line-height: 60px;
}
.row-grade .row-tab-pane .el-checkbox {
    font-size: 13px;
    color: #303336;
    margin-right: 86px;
}
.row-grade .row-tab-pane .el-checkbox .el-checkbox__label {
    font-size: 13px;
    color: #303336;
}
.row-grade .row-tab-pane .check-all .el-checkbox__label {
    font-weight: 600;
}

/* 打印机选择框公用 */
.row-printerTab .el-form-item__content {
    /* 职级权限选择 */
    width: 92% !important;
}
.row-printerTab .row-tab-pane .el-tabs--left,
.row-grade .row-tab-pane {
    min-height: auto !important;
}
.row-printerTab .row-tab-pane .el-tabs--left .el-tabs__header.is-left{
    min-height: auto !important;
}
.row-printerTab .row-tab-pane .el-tab-pane {
    width: 100% !important;
}
.row-ticket .check-all .el-checkbox__label {
    font-weight: 600;
}
.row-ticket .el-checkbox .el-checkbox__label {
    font-size: 13px;
    color: #303336;
}
/* 营业数据 */
.el-cascader-node.in-active-path,/* Cascader 级联选择器 */
.el-cascader-node.is-selectable.in-checked-path, 
.el-cascader-node.is-active {
    color: #2082ed;
}
.dataTable {
    padding: 0px 30px 20px 30px;
    overflow: hidden;
}
.dataTable .el-table--border {
    border-right: 1px solid #ebeef5;
}
.seachStyle {
    position: relative;
    display: inline-block;
}
 /* 时间选择 */
.timeSelect .active{
    color: #ffffff;
    background: #2082ed;
}
.el-tabs--left .el-tabs__nav-wrap.is-left::after {
    z-index: 999;
}
.el-tabs__nav-wrap::after {
    background-color: #e6eaef !important;
}
/* 左对齐表格 */
.left-table .el-table__body-wrapper td {
    text-align: left !important;
    padding-left: 40px;
}

/* 
  ----收银机管家后台----
 */
 
.waiterHD{
    -webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	-ms-box-sizing: border-box;
	-o-box-sizing: border-box;
	box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #fff;
    padding:0 35px;
    font-size: 14px;
}
.navBar .el-input__inner{
    margin-left: 5px;
    width: 170px;
    color: #393939;
    font-weight: bold;
    font-size: 16px;
    border:none;
}
.navBar .el-select .el-input .el-select__caret{
    color: #000;
    font-weight: bold;
}
.navBar .el-input.is-disabled .el-input__inner{
    background: none !important;
}
</style>