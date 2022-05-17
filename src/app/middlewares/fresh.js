import {Middleware} from '@/app/support/router'
import {app} from '@/bootstrap/app'
import {locale} from '@/config'

let fresh = true

export class Fresh extends Middleware
{
    beforeEach(to, from, next) {
        if (fresh) {
            this.restoreFromCache()
            this.restoreFromCookie()
            app.$setLocale(locale.default).then(() => next())
        }
        else {
            fresh = false
            next()
        }
    }

    restoreFromCache() {
        app.$log.info('middleware', 'fresh.restoreFromCache')
        app.$store.commit('ping/setFromCache')
    }

    restoreFromCookie() {
        app.$log.info('middleware', 'fresh.restoreFromCookie')
    }
}