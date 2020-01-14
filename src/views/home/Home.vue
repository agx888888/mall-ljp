<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import { getHomeMultidata } from "network/home.js";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper
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
      this.dKeywords = res.data.dKeyword;
      this.keywords = res.data.keywords;
    });
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.home-nav {
  background-color: var(--color-tint);
  color: rgb(250, 251, 252);
}
</style>
