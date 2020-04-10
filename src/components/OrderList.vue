<template>
    <List
            class="order-list-wrapper"
            :on-refresh="refreshHandler"
            :on-load="loadHandler"
    >
        <template v-if="data.length === 0">
            <van-empty description="暂无数据"/>
        </template>
        <template v-else>
            <van-cell-group>
                <van-cell
                        v-for="(item, index) of data"
                        :key="index"
                        is-link
                        @click="clickHandler(item)"
                >
                    <template #title>
                        <div class="item-header">
                            <div class="title-wrapper">
                                <span class="title">{{item.title}}</span>
                            </div>
                            <div class="amount-wrapper">
                                <span class="label">预算金额：</span>
                                <span class="amount">{{item.budget | amountFormat}}</span>
                            </div>
                        </div>
                    </template>
                    <template #label>
                        <p>详细内容：{{item.details | limit}}</p>
                        <p>截止时间：{{item.deadline | dateFormat}}</p>
                        <p>发布时间：{{item.createTime | dateFormat}}</p>
                        <p style="margin-top: 10px;">
                            <van-tag type="warning" size="large" plain>{{item.codeType}}</van-tag>
                            <van-tag type="primary" size="large" style="margin-left: 10px;">
                                {{item.status | statusLabel}}
                            </van-tag>
                        </p>
                    </template>
                </van-cell>
            </van-cell-group>
        </template>
    </List>
</template>

<script>
    import { Cell, CellGroup, Tag, Empty } from "vant";
    import List from "./List";
    import moment from "moment";

    export default {
        name: "OrderList",
        components: {
            List,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Tag.name]: Tag,
            [Empty.name]: Empty,
        },
        props: {
            fetch: {
                // ({current: number, refresh: boolean}) => Promise<{data: Array, total: number}>
                type: Function,
                required: true,
            }
        },
        data(){
            return {
                data: [],
                current: 0,
                total: 0,
            }
        },
        methods: {
            refreshHandler() {
                return this.fetch({
                    current: 0,
                    refresh: true,
                }).then(({data, total}) => {
                    if (!Array.isArray(data)) {
                        data = []
                    }
                    this.data = data;
                    this.total = total || 0;
                    this.current = 1;
                });
            },
            loadHandler() {
                return this.fetch({
                    current: this.current,
                    refresh: false,
                }).then(({data, total}) => {
                    if (!Array.isArray(data)) {
                        data = [];
                    }
                    this.current += 1;
                    this.data.push(...data);
                    this.total = total || 0;
                    return this.data.length >= total;
                });
            },
            clickHandler(itemData) {
                this.$emit('click', itemData);
            }
        },
        filters: {
            dateFormat(val) {
                return moment(val).format("YYYY-MM-DD HH:mm");
            },
            amountFormat(val) {
                if (!val) {
                    return '面谈';
                }
                return val;
            },
            limit(val, limit = 10) {
                if (!val) {
                    return '';
                }
                let postfix = '';
                if (val.length > limit){
                    postfix = '...';
                }
                return val.slice(0, limit) + postfix;
            },
            statusLabel(val) {
                switch (val) {
                    case 0:
                        return '等待接单';
                }
                return '未知状态';
            }
        }
    }
</script>

<style lang="scss">
    .order-list-wrapper{
        @include wh(100%);

        .item-header {
            @include flex(space-between);

            .title-wrapper {
                .title {
                    font-size:  16px;
                    font-weight: bold;
                }
            }

            .amount-wrapper {
                .label {
                    color: $sub_text;
                    font-size: 12px;
                }
                .amount {
                    color: $error
                }
            }
        }
    }
</style>