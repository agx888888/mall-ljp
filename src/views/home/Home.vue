<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="ty-tab-control"
      v-show="isTabFixed"
    />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" class="shswiper" @swiperIagmeLoad="swiperIagmeLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl" />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 监听组件原生事件 -->
    <back-top @click.native="backClick" v-show="isShowbackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowbackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  //实例创建成功
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    //监听itme中图片加载完成的事件监听
    this.$bus.$on("itmeImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听的相关方法
     */

    //流行，新款，精选数据
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    //返回顶部事件
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //顶部按钮显示判断
    contentScroll(position) {
      //1.判断backTop是否显示
      this.isShowbackTop = -position.y > 990;

      //2.决定tabControl是否吸顶(position:fiexd)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //吸顶效果
    //等待图片加载完成之后获取
    swiperIagmeLoad() {
      //获取tabControl的offsetTop
      //所有的组件都有一个元素$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    /**
     * 网络请求
     */
    //轮播图和标签数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //保存数据,函数调用完后会回调数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
#home {
  height: 100vh;
  position: relative;
}
/* .shswiper {
  padding-top: 44px;
} */
.home-nav {
  background-color: var(--color-tint);
  color: rgb(250, 251, 252);
  /* better-scroll局部滚动 此样式已无用
  在使用原生滚动时为了不使导航跟着滚动
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.ty-tab-control {
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0px;
  right: 0px;
}
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
