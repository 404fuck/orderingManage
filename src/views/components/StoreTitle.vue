<template>
  <div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dep_id: null,
    }
  },
  methods: {

  },
  computed: {
    curentStore () {
      //console.log('curentStore')
      this.dep_id = this.$store.getters.curentStore.dep_ID;
      return this.$store.getters.curentStore;
    }
  },
  created () {
    var curentStore = this.curentStore;
    try {
      curentStore = JSON.parse(curentStore);
    } catch { }

    if (curentStore) {
      // console.log('重新加载数据' + curentStore.dep_id)
      this.dep_id = curentStore.dep_ID;

    }
  },
  watch: {
    curentStore: {
      handler (newVal, oldVal) {
        if (newVal.dep_ID) {
          //this.toast.success(JSON.stringify(newVal))
          this.dep_id = newVal.dep_ID;

        }
      }
    }
  },
};
</script>

<style scoped>
</style>