import {middlewares} from '@/app/middlewares'
import {Auth} from '@/app/middlewares/auth'
import {Guest} from '@/app/middlewares/guest'
import Base from '@/resources/views/master/Base'
import BaseError from '@/resources/views/master/BaseError'
import BaseBlank from '@/resources/views/master/BaseBlank'

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
                        path: '401',
                        name: 'unauthenticated',
                        component: () => import('@/resources/views/errors/Unauthenticated'),
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
                component: () => import('@/resources/views/pages/Home'),
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/resources/views/pages/About'),
            },
            {
                path: 'auth',
                component: BaseBlank,
                meta: {
                    requiresGuest: true,
                    middleware: [Guest],
                },
                children: [
                    {
                        path: 'login',
                        name: 'login',
                        component: () => import('@/resources/views/pages/auth/Login'),
                    },
                    {
                        path: 'register',
                        component: () => import('@/resources/views/pages/auth/register/Base'),
                        children: [
                            {
                                path: '',
                                name: 'register',
                                component: () => import('@/resources/views/pages/auth/register/Index'),
                            },
                            {
                                path: 'success',
                                name: 'register_success',
                                component: () => import('@/resources/views/pages/auth/register/Success'),
                            },
                        ],
                    },
                    {
                        path: 'forgot-password',
                        component: () => import('@/resources/views/pages/auth/forgot-password/Base'),
                        children: [
                            {
                                path: '',
                                name: 'forgot_password',
                                component: () => import('@/resources/views/pages/auth/forgot-password/Index'),
                            },
                            {
                                path: 'success',
                                name: 'forgot_password_success',
                                component: () => import('@/resources/views/pages/auth/forgot-password/Success'),
                            },
                        ],
                    },
                ],
            },
            {
                path: '',
                component: BaseBlank,
                meta: {
                    requiresAuth: true,
                    middleware: [Auth],
                },
                children: [
                    {
                        path: 'account',
                        name: 'account',
                        component: () => import('@/resources/views/pages/me/Account'),
                    },
                ],
            },
            //
            {
                path: ':pathMatch(.*)*',
                component: () => import('@/resources/views/errors/NotFound'),
            },
        ],
    },
]
