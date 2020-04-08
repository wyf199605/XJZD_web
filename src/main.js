import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "./style/index.scss";

Vue.config.productionTip = false;

// 开发用
if (process.env.NODE_ENV === 'development') {
    document.cookie = 'openid=123321';
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
