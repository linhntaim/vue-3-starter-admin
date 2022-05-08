import {app} from '@/bootstrap/app'
import {Middleware} from '@/app/support/router'

export class Auth extends Middleware {
    beforeEach(to, from, next) {
        app.$log.info('middleware', 'auth.beforeEach')
        next()
    }
}