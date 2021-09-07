<!--
 * @Author: zzt
 * @Date: 2020-09-02 21:54:39
 * @LastEditTime: 2021-03-13 17:55:05
 * @LastEditors: Please set LastEditors
 * @Description: 语言切换
 * @FilePath: \sjoyOrderingManage\src\views\login\selectLang.vue
-->
<template>
    <div class="lang-select">
        <el-dropdown trigger="click" @command="handleSetLanguage">
            <span class="el-dropdown-link">
                {{`${language === stringutils.zh_CN()?'中文':'English'}`}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    :command="stringutils.zh_CN()"
                    :disabled="language === stringutils.zh_CN()"
                    class="text-style"
                    >中文</el-dropdown-item
                >
                <el-dropdown-item
                    :command="stringutils.en_US()"
                    :disabled="language === stringutils.en_US()"
                    class="text-style"
                    >English</el-dropdown-item
                >
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
export default {
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },
    data() {
        return {
            timer: null,
        };
    },
    methods: {
        handleSetLanguage(lang) {
            this.$store.dispatch("setLanguage", lang);
            this.$i18n.locale = lang;
            this.$router.go(0);
        },
    },
    created() {},
};
</script>
<style scoped>
.lang-select .el-dropdown-menu__item.is-disabled{
    color: #318AEF !important;
}
</style>