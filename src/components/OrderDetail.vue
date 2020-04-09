<template>
    <!--  订单详情组件  -->
    <div class="order-detail-wrapper"></div>
</template>

<script>
    export default {
        name: "OrderDetail",
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