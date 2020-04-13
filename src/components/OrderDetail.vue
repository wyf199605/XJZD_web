<template>
    <!--  订单详情组件  -->
    <van-panel class="order-detail-wrapper">

    </van-panel>
</template>

<script>
    import { Panel } from "vant";
    export default {
        name: "OrderDetail",
        components: {
            [Panel.name]: Panel,
        },
        props: {
            data: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    .order-detail-wrapper {

    }
</style>