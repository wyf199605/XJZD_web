<template>
  <div class="home-page">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="订单">
        <i slot="icon" class="iconfont icon-order"></i>
        我要接单
      </mt-tab-item>
      <mt-tab-item id="发现">
        <i slot="icon" class="iconfont icon-editor"></i>
        发布订单
      </mt-tab-item>
      <mt-tab-item id="我的">
        <i slot="icon" class="iconfont icon-people"></i>
        个人中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    selected(){
      return '我的'
    }
  }
};
</script>

<style lang="scss" scoped>
  .home-page {
    @include coverScreen;
    .iconfont {
      font-size: 24px;
    }
  }
</style>
