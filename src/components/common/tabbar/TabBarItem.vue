<template>
  <div class="tab-bar-item" @click="btnClick">
    <!-- <img src="../../assets/img/tabbar/home.svg" alt />
    <div>首页</div>-->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{active:isActive}" :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // isActive: true
    };
  },
  computed: {
    isActive() {
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
/* .active {
  /* color: red;
} */
</style>
