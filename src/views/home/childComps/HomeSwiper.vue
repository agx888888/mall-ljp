<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt @load="imgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return banners;
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("swiperIagmeLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>