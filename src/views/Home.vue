<template>
    <!-- 订单列表页面 -->
    <div class="home-page">
        <OrderList :fetch="fetchHandler"/>
    </div>
</template>

<script>
    import OrderList from "@/components/OrderList";
    import Ajax from "@/api";

    export default {
        name: "Home",
        components: {
            OrderList
        },
        methods: {
            fetchHandler({current}) {
                return Ajax.getOrderList(current, 10, false).then((res) => {
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
    .home-page {
        //@include coverScreen;
        padding-bottom: 50px;
    }
</style>