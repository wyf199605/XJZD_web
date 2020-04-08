<template>
    <Tabbar class="tab-bar" v-show="visible" :value="activePath">
        <TabbarItem v-for="route of routes" :key="route.path" :name="route.path" :to="route.path">
            <template #icon>
                <i slot="icon" class="iconfont" :class="route.icon"/>
            </template>
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
                    {path: '/', title: '我要接单', icon: 'icon-order'},
                    {path: '/editor', title: '发布订单', icon: 'icon-editor'},
                    {path: '/myself', title: '个人中心', icon: 'icon-people'},
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

<style scoped>

    .iconfont {
        font-size: 24px;
    }
</style>