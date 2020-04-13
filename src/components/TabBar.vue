<template>
    <Tabbar class="tab-bar-wrapper" :class="{visible: visible}" v-show="visible" :value="activePath">
        <TabbarItem
                v-for="route of routes"
                :key="route.path"
                :icon="route.icon"
                :name="route.path"
                :to="route.path"
                replace
        >
            {{route.title}}
        </TabbarItem>
    </Tabbar>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vant';

    export default {
        name: "TabBar",
        components: {
            Tabbar,
            TabbarItem
        },
        data() {
            return {
                routes: [
                    {path: '/', title: '我要接单', icon: 'orders-o'},
                    {path: '/editor', title: '发布订单', icon: 'records'},
                    {path: '/myself', title: '个人中心', icon: 'user-o'},
                ]
            }
        },
        computed: {
            activePath() {
                return this.$route.path;
            },
            visible() {
                return this.routes.some(({path}) => this.activePath === path);
            }
        }
    }
</script>

<style lang="scss">
    .tab-bar-wrapper {

        .iconfont {
            font-size: 24px;
        }
    }
</style>