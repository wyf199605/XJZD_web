<template>
    <!-- 订单列表页面 -->
    <div class="order-form-page">
        <OrderList :fetch="fetchHandler"/>
    </div>
</template>

<script>
    import OrderList from "@/components/OrderList";
    import Ajax from "@/api";

    export default {
        name: "OrderForm",
        components: {
            OrderList
        },
        methods: {
            fetchHandler({current}) {
                return Ajax.getOrderList(current, 10).then((res) => {
                    let data = res.data.data;
                    return {
                        data: data.data,
                        total: data.total
                    };
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .order-form-page {
        @include coverScreen;
    }
</style>