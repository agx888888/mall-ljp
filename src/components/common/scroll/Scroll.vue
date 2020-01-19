<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //1.创建Bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    //2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }

    //3.监听上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //回到顶部
    scrollTo(x, y, time = 500) {
      //如果this.scroll为null不会继续执行
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //完成加载更多之后再次加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //图片刷新
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log("---");
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>