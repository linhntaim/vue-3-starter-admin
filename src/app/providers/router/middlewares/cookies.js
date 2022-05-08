import {Middleware} from '@/app/support/router'
import {app} from '@/bootstrap/app'

export class Cookies extends Middleware {
    beforeEach(to, from, next) {
        app.$log.info('middleware', 'cookies.beforeEach')
        next()
    }
}