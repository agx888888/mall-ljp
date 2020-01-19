<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active:index===currendIndex}"
      @click="tabClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currendIndex: 0
    };
  },
  methods: {
    tabClick(index) {
      this.currendIndex = index;
      //子往外传
      this.$emit("tabClick", index);
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  line-height: 40px;
  height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>