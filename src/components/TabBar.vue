<template>
    <mt-tabbar class="tab-bar" v-show="visible" v-model="activePath">
        <mt-tab-item v-for="route of routes" :key="route.path" :id="route.path">
            <i slot="icon" class="iconfont" :class="route.icon"/>
            {{route.title}}
        </mt-tab-item>
    </mt-tabbar>
</template>

<script>
    import {Tabbar, TabItem} from "mint-ui";

    export default {
        name: "TabBar",
        components: {
            "mt-tabbar": Tabbar,
            "mt-tab-item": TabItem
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
            activePath: {
                get() {
                    return this.$route.path;
                },
                set(path) {
                    this.$router.push(path);
                }
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