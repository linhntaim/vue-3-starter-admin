import {middlewares} from '@/app/providers/router/middlewares'
import BaseBlank from '@/resources/views/master/BaseBlank'

export const routes = [
    {
        path: '/',
        component: BaseBlank,
        meta: {
            middleware: middlewares,
        },
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */ '../resources/views/pages/HomeView.vue'),
            },
            {
                path: 'about',
                name: 'about',
                component: () => import(/* webpackChunkName: "about" */ '../resources/views/pages/AboutView.vue'),
            },
            {
                path: ':pathMatch(.*)*',
                name: 'not_found',
                component: () => import(/* webpackChunkName: "not_found" */ '../resources/views/pages/NotFoundView.vue'),
            },
        ],
    },
]