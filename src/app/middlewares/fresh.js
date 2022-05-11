import {Middleware} from '@/app/support/router'
import {app} from '@/bootstrap/app'

let fresh = true

export class Fresh extends Middleware
{
    beforeEach(to, from, next) {
        if (fresh) {
            this.restoreFromCache()
            this.restoreFromCookie()
        }
        fresh = false
        next()
    }

    restoreFromCache() {
        app.$log.info('middleware', 'fresh.restoreFromCache')
        app.$store.commit('ping/setFromCache')
    }

    restoreFromCookie() {
        app.$log.info('middleware', 'fresh.restoreFromCookie')
    }
}