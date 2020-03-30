import Home from '../views/Home.vue';
import OrderForm from '../views/OrderForm.vue';
import Editor from '../views/Editor.vue';
import Myself from '../views/Myself.vue';
import Detail from '../views/Detail.vue';

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