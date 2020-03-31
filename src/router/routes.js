import Home from '../views/Home.vue';
import OrderForm from '../views/OrderForm.vue'; // 订单列表
import Editor from '../views/Editor.vue'; // 发布新订单
import Myself from '../views/Myself.vue'; // 个人中心
import Detail from '../views/Detail.vue'; // 订单详情

export default [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {path: '/', component: OrderForm},
            {path: '/editor', component: Editor},
            {path: '/myself', component: Myself},
            {path: '/detail/:orderId', component: Detail},
        ]
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
];