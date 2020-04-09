// const serverURL = 'http://129.204.246.38'; // 生产地址
const serverURL = 'http://129.204.246.38:7001'; // 测试地址
// const serverURL = 'http://localhost:7001'; // 本地地址

const baseURL = process.env.NODE_ENV === 'development' ? serverURL : "";

const config = {
    baseURL,
    url: {
        wxConfig: '/wechat/wechat_config', // 微信配置信息
        orderList: '/order/list', // 订单列表
        orderDetail: '/order/detail', // 订单详情
        orderInsert: '/order/insert', // 发布订单
        devOrderList: '/order/developer/list', // 和我相关的订单（开发）
        tackOrder: '/order/developer/tack', // 接单
        cancelTackOrder: '/order/developer/cancel', // 取消接单
        finishOrder: 'order/developer/finish', // 完成订单工作
    }
};

export default config;