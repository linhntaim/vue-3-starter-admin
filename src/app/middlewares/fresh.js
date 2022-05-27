import {app} from '@/bootstrap/app'
import {localization} from '@/config'
import {Middleware} from '@/app/support/router'
import {ServiceError} from '@/app/support/services'

export class Fresh extends Middleware
{
    async beforeEach(to, from, next) {
        const fresh = app.$start.isFresh()
        app.$start.continue()
        if (fresh) {
            if (!(await this.restoreFromServer(to, from, next))) {
                return
            }
            await this.restoreFromCache()
            await this.restoreFromCookie()
        }
        next()
    }

    async restoreFromServer(to, from, next) {
        if (!app.$config.get('app.static')) {
            const data = await app.$store.dispatch('prerequisite/require', ['server'])
            app.$log.info('middleware', 'fresh.restoreFromServer', data)
            if (data instanceof ServiceError) {
                app.$start.reset()
                const connectionLostRoute = app.$config.app.routes.connection_lost
                if (to.name !== connectionLostRoute.name) {
                    next(connectionLostRoute)
                    return false
                }
            }
        }
        return true
    }

    async restoreFromCache() {
        app.$log.info('middleware', 'fresh.restoreFromCache')
        //
    }

    async restoreFromCookie() {
        app.$log.info('middleware', 'fresh.restoreFromCookie')
        // locale
        await app.$setLocale(await app.$cookie.get('locale', localization.locale.default))
        // account
        await app.$store.dispatch('account/restoreFromCookie')
    }
}
