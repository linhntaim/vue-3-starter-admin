import {Middleware} from '@/app/support/router'
import {app} from '@/bootstrap/app'
import {locale} from '@/config'

let fresh = true

export class Fresh extends Middleware
{
    async beforeEach(to, from, next) {
        if (fresh) {
            await this.restoreFromCache()
            await this.restoreFromCookie()
        }
        fresh = false
        next()
    }

    async restoreFromCache() {
        app.$log.info('middleware', 'fresh.restoreFromCache')
        await app.$store.commit('ping/setFromCache')
    }

    async restoreFromCookie() {
        app.$log.info('middleware', 'fresh.restoreFromCookie')
        const defaultLocale = await app.$cookie.get('locale', locale.default)
        await app.$setLocale(defaultLocale)
    }
}