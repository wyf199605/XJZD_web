<template>
    <div id="app">
        <keep-alive :include="['Home', 'Editor']">
            <router-view/>
        </keep-alive>
        <TabBar/>
    </div>
</template>

<script>
    import TabBar from "@/components/TabBar";

    export default {
        name: 'App',
        components: {
            TabBar
        },
        mounted() {
        }
    };
</script>

<style lang="scss">
    @import "./style/helper/index";

    #app {
    }
</style>
