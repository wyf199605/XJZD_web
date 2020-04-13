import Home from '../views/Home.vue'; // 订单列表
import Myself from '../views/Myself.vue'; // 个人中心

const Editor = () => import(/* webpackChunkName: "editor" */ "../views/Editor.vue"); // 发布新订单
const Detail = () => import(/* webpackChunkName: "detail" */ "../views/Detail.vue"); // 订单详情

export default [
    {path: '/', component: Home},
    {path: '/editor', component: Editor},
    {path: '/myself', component: Myself},
    {path: '/detail/:orderId', component: Detail},
];