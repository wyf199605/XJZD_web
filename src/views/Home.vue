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
    import Ajax from "../api";

    export default {
        name: 'Home',
        components: {
            TabBar
        },
        mounted() {
            Ajax.getOrderList(0, 10).then((res) => {
                console.log(res.data);
            });
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
            position: relative;
        }

        .tab-bar {
            flex: 0 0 auto;
            position: relative;
            width: 100%;
        }
    }
</style>
