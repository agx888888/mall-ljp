<template>
  <div class="tab-bar-item" @click="btnClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    // 可以在使用此组件时在里面传入activeColor改变颜色
    activeColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    isActive() {
      //检索此时活跃的路由路径和组件路径
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    btnClick() {
      this.$router.replace(this.path);
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.tab-bar-item {
  padding-top: 5px;
  /* 均等分 */
  flex: 1;
  text-align: center;
  height: 44px;
  font-size: 10px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2;
}
</style>