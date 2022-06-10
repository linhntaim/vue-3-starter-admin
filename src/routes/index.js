import {middlewares} from '@/app/middlewares'
import {Auth} from '@/app/middlewares/auth'
import {Guest} from '@/app/middlewares/guest'
import Base from '@/resources/views/master/Base'
import BaseError from '@/resources/views/master/BaseError'
import BaseAuth from '@/resources/views/master/BaseAuth'
import BaseAdmin from '@/resources/views/master/BaseAdmin'

export const routes = [
    {
        path: '/',
        component: Base,
        meta: {
            middleware: middlewares,
        },
        children: [
            {
                path: 'clear-site-data',
                name: 'clear_site_data',
                component: () => import('@/resources/views/pages/ClearSiteData'),
            },
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
                    //
                ],
            },
            {
                path: 'auth',
                component: BaseAuth,
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
                                name: 'register.success',
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
                                name: 'password.request',
                                component: () => import('@/resources/views/pages/auth/forgot-password/Index'),
                            },
                            {
                                path: 'success',
                                name: 'password.request.success',
                                component: () => import('@/resources/views/pages/auth/forgot-password/Success'),
                            },
                        ],
                    },
                    {
                        path: 'reset-password',
                        component: () => import('@/resources/views/pages/auth/reset-password/Base'),
                        children: [
                            {
                                path: ':token',
                                name: 'password.reset',
                                component: () => import('@/resources/views/pages/auth/reset-password/Index'),
                            },
                            {
                                path: 'success',
                                name: 'password.reset.success',
                                component: () => import('@/resources/views/pages/auth/reset-password/Success'),
                            },
                        ],
                    },
                    //
                ],
            },
            {
                path: '/',
                name: 'root',
                redirect: {name: 'dashboard'},
            },
            //
            //
            {
                path: '/',
                component: BaseAdmin,
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
                    //
                    {
                        path: 'dashboard',
                        name: 'dashboard',
                        component: () => import('@/resources/views/pages/Home'),
                    },
                ],
            },
            {
                path: ':pathMatch(.*)*',
                component: () => import('@/resources/views/pages/Welcome'),
            },
        ],
    },
]
