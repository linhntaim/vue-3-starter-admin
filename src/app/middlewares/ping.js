import {app} from '@/bootstrap/app'
import {Middleware} from '@/app/support/router'

export class Ping extends Middleware {
    async beforeEach(to, from, next) {
        app.$log.info('middleware', 'ping.beforeEach')
        if (!app.$config.get('app.static') && await app.$store.dispatch('ping/ping')) {
            const connectionLostRoute = app.$config.app.routes.connection_lost
            if (to.name !== connectionLostRoute.name) {
                next(connectionLostRoute)
                return
            }
        }
        next()
    }
}