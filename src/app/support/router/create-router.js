import {createRouter as createBaseRouter, createWebHistory} from 'vue-router'
import {Middlewares} from './middlewares'
import {take} from '../helpers'

const middlewares = new Middlewares()

export function createRouter(options = {}) {
    if (!('history' in options)) {
        options.history = createWebHistory(process.env.BASE_URL)
    }
    return take(
        createBaseRouter(options),
        function (router) {
            router.beforeEach((to, from, next) => {
                middlewares.collect(to).beforeEach(to, from, next)
            })
            router.beforeResolve((to, from, next) => {
                middlewares.collect(to).beforeResolve(to, from, next)
            })
            router.afterEach((to, from) => {
                middlewares.collect(to).afterEach(to, from)
            })
        },
    )
}