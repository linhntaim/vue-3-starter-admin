import {middlewares} from '@/app/middlewares'
import Base from '@/resources/views/master/Base'
import BaseError from '@/resources/views/master/BaseError'

export const routes = [
    {
        path: '/',
        component: Base,
        meta: {
            middleware: middlewares,
        },
        children: [
            {
                path: 'error',
                component: BaseError,
                children: [
                    {
                        path: 'connection-lost',
                        name: 'connection_lost',
                        component: () => import('@/resources/views/errors/ConnectionLost'),
                    },
                    {
                        path: '404',
                        name: 'not_found',
                        component: () => import('@/resources/views/errors/NotFound'),
                    },
                ],
            },
            {
                path: 'clear-site-data',
                name: 'clear_site_data',
                component: () => import('@/resources/views/pages/ClearSiteData'),
            },
            //
            {
                path: '/',
                name: 'root',
                component: () => import('@/resources/views/pages/Home.vue'),
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/resources/views/pages/About.vue'),
            },
            //
            {
                path: ':pathMatch(.*)*',
                component: () => import('@/resources/views/errors/NotFound'),
            },
        ],
    },
]