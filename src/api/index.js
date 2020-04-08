import fetch from './fetch';
import config from './config';

export default class Ajax {
    /**
     * 获取微信配置信息
     * @return {Promise<{code: number, data: Object, msg: string}>}
     */
    static getWxConfig() {
        return fetch({
            url: config.url.wxConfig
        });
    }

    /**
     * 获取订单列表
     * @param page
     * @param pageSize
     * @return {Promise<{
     *     code: number,
     *     msg: string,
     *     data: {
     *         total: number,
     *         data: Array<{
     *             _id: string,
     *             title: string,
     *             details: string,
     *             codeType: string,
     *             budget: number,
     *             deadline: string,
     *             status: number
     *         }>
     *     },
     * }>}
     */
    static getOrderList(page, pageSize) {
        return fetch({
            url: config.url.orderList,
            data: {
                page,
                pageSize
            }
        });
    }

    /**
     * 根据订单好获取订单详情内容
     * @param {string} orderId 订单ID
     * @return {Promise<{code: number, data: Object, msg: string}>}
     */
    static getOrderDetail(orderId) {
        return fetch({
            url: config.url.orderDetail,
            data: {
                orderId
            }
        });
    }

    /**
     * 新增订单
     * @param {{
     *     title: string,
     *     details: string,
     *     codeType: string,
     *     budget: number,
     *     deadline: string,
     *     pictures?: string,
     *     attachment?: string
     * }} data
     * @return {Promise<{code: number, data: Object, msg: string}>}
     */
    static insertOrder(data) {
        return fetch({
            url: config.url.orderInsert,
            method: "post",
            data,
        });
    }
}
