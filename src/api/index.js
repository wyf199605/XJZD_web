import fetch from './fetch';
import config from './config';

export default class Ajax {
    /**
     * 获取微信配置信息
     * @return {Promise<{code: number, data: {
     *     appid: string,
     *     nonce: string,
     *     timestamp: string,
     *     signature: string,
     * }, msg: string}>}
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
     * @param {boolean} loading
     */
    static getOrderList(page, pageSize, loading = true) {
        return fetch({
            url: config.url.orderList,
            data: {
                page,
                pageSize
            },
            loading
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

    /**
     * 接单
     * @param {string} orderId
     * @returns {Promise<{code: number, data: Object, msg: string}>}
     */
    static tackOrder(orderId) {
        return fetch({
            url: config.url.tackOrder,
            data: {
                orderId
            }
        });
    }

    /**
     * 取消接单
     * @param {string} orderId
     * @returns {Promise<{code: number, data: Object, msg: string}>}
     */
    static cancelTackOrder(orderId) {
        return fetch({
            url: config.url.cancelTackOrder,
            method: "post",
            data: {
                orderId
            }
        });
    }

    /**
     * 更新订单内容
     * @param {string} orderId
     * @param {{
     *     title: string,
     *     details: string,
     *     deadline: string,
     *     budget: number,
     *     codeType: string
     * }} updateData
     */
    static updateOrder(orderId, updateData) {
        return fetch({
            url: config.url.updateOrder,
            method: "post",
            data: {
                ...updateData,
                orderId,
            }
        });
    }

    /**
     * 取消发布订单
     * @param {string} orderId
     * @returns {Promise<{code: number, data: Object, msg: string}>}
     */
    static cancelOrder(orderId) {
        return fetch({
            url: config.url.cancelOrder,
            method: "post",
            data: {
                orderId
            }
        });
    }
}
