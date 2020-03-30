<template>
  <div class="home-page">
    <div class="container">
      <router-view/>
    </div>
    <TabBar/>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  name: 'Home',
  components: {
    TabBar
  }
};
</script>

<style lang="scss" scoped>
  .home-page {
    @include coverScreen;
    @include flex(flex-start);
    flex-direction: column;

    .container {
      flex: 1 1 auto;
      width: 100%;
    }

    .tab-bar {
      flex: 0 0 auto;
      position: relative;
      width: 100%;
    }
  }
</style>
