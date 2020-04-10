<template>
    <van-pull-refresh
            v-model="refreshing"
            :disabled="disabledRefresh"
            @refresh="refreshHandler"
    >
        <van-list
                v-model="loading"
                :finished="finished"
                :error.sync="error"
                finished-text="没有更多了"
                error-text="请求失败，点击重新加载"
                @load="loadHandler"
        >
            <slot/>
        </van-list>
    </van-pull-refresh>
</template>

<script>
    import { List, PullRefresh, Toast } from 'vant';

    export default {
        name: "List",
        components: {
            [List.name]: List,
            [PullRefresh.name]: PullRefresh,
        },
        props: {
            data: {
                /**
                 * Array<{
                 *     title: string,
                 *     status: number,
                 *     deadline: string,
                 *     budget: number,
                 *     codeType: string
                 * }>
                 */
                type: Array,
                default: () => []
            },
            // () => Promise<void>
            onRefresh: {
                type: Function,
            },
            // () => Promise<boolean>
            onLoad: {
                type: Function,
                default: () => Promise.resolve(true),
            },
        },
        data() {
            return {
                refreshing: false,
                loading: false,
                finished: false,
                error: false,
            }
        },
        computed: {
             disabledRefresh() {
                 return typeof this.onRefresh !== "function";
             }
        },
        methods: {
            refreshHandler() {
                this.onRefresh().then(() => {
                    Toast('刷新成功');
                    this.finished = false;
                    this.error = false;
                }).catch(() => {
                    Toast('刷新失败，请重试！');
                }).finally(() => {
                    this.refreshing = false;
                });
            },
            loadHandler() {
                this.onLoad().then((finish) => {
                    this.loading = false;
                    this.finished = finish;
                }).catch(() => {
                    this.error = true;
                });
            },
        }
    }
</script>

<style lang="scss">

</style>