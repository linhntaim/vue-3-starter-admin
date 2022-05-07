import {createRouter, createWebHistory} from 'vue-router'
import {routes} from '@/routes'
import {take} from '@/app/support/helpers'
import {Middlewares} from '@/app/support/router'

export const router = take(
    createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes,
    }),
    function (router) {
        router.beforeEach((to, from, next) => {
            (new Middlewares(to)).beforeEach(to, from, next)
        })
        router.beforeResolve((to, from, next) => {
            (new Middlewares(to)).beforeResolve(to, from, next)
        })
        router.afterEach((to, from) => {
            (new Middlewares(to)).afterEach(to, from)
        })
    },
)
