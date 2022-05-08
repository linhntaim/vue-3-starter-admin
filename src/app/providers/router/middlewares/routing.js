import {Middleware} from '@/app/support/router'
import {app} from '@/bootstrap/app'

export class Routing extends Middleware {
    beforeEach(to, from, next) {
        app.$log.info('middleware', 'routing.beforeEach')
        next()
    }
}