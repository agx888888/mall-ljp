<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" class="shswiper"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view />
    <tab-control class="tab-control" :titles="['流行','新款','精选']" />
    <ul>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
      <li>cc</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import TabControl from "components/content/tabcontrol/TabControl";
import { getHomeMultidata } from "network/home.js";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: [],
      dKeywords: [],
      keywords: []
    };
  },
  //实例创建成功
  created() {
    //请求多个数据
    getHomeMultidata().then(res => {
      //保存数据,函数调用完后会回调数据
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.shswiper {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: rgb(250, 251, 252);

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>
