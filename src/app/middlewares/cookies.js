import {app} from '@/bootstrap/app'
import {Middleware} from '@/app/support/router'

export class Cookies extends Middleware {
    beforeEach(to, from, next) {
        app.$log.info('middleware', 'cookies.beforeEach')
        next()
    }
}