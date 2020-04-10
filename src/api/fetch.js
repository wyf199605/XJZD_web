import axios from 'axios';
import config from './config';
import { Toast } from 'vant';

Toast.allowMultiple(true);

const CancelToken = axios.CancelToken;

let instance = axios.create({timeout: 10000, baseURL: config.baseURL});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

/**
 * 请求方法封装
 * @param {string} url 请求地址
 * @param {"get" | "post" | "put" | "delete"} method 请求方式
 * @param {Object} data 请求数据
 * @param {boolean} loading 是否展示loading
 * @param {boolean} silent 是否静默请求
 * @param {number} timeout 超时请求，默认10s
 * @param {boolean} traditional 是否使用formData传输数据
 * @return {Promise<{code: number, data: Object, msg: string}>}
 */
export default function fetch ({url, method = 'get', data, loading = true, silent = false, timeout, traditional}) {
    let params = null,
        cancel = null,
        toastLoading = null;

    if (silent) {
        loading = false;
    }

    if (method.toLowerCase() === 'get') {
        params = data;
        data = null;
    }

    if(traditional){
        let formData = new FormData();
        for(let key in data){
            formData.append(key, data[key]);
        }
        data = formData;
    }

    if (loading) {
        toastLoading = Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner'
        });
    }

    let promise = new Promise((resolve, reject) => {
        instance.request({
            method,
            url,
            params,
            data,
            timeout,
            headers: {
                openid: getCookie('openid')
            },
            withCredentials: true,
            responseType: "json",
            cancelToken: new CancelToken(function (c) {
                cancel = c;
            })
        }).then((res) => {
            if (res.data.code !== 200) {
                !silent && Toast.fail({
                    message: res.data.msg,
                });
                reject(res);
                return;
            }
            console.log(res);
            resolve(res);
        }).catch((e) => {
            console.error(new Error(e));
            let response = e.response;
            !silent && Toast.fail({
                message: '请求失败，请检查您的网络！',
            });
            reject(response ? response.data : null);
        }).finally(() => {
            if (loading && toastLoading) {
                toastLoading.clear();
            }
        });
    });

    promise.cancel = function () {
        typeof cancel === "function" && cancel();
    };

    return promise
}