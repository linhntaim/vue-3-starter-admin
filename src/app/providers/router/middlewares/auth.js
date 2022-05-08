import {Middleware} from '@/app/support/router'
import {app} from '@/bootstrap/app'

export class Auth extends Middleware {
    beforeEach(to, from, next) {
        app.$log.info('middleware', 'auth.beforeEach')
        next()
    }
}