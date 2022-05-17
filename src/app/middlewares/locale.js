import {app} from '@/bootstrap/app'

export class Locale
{
    beforeEach(to, from, next) {
        const locale = 'locale' in to.query
            ? to.query.locale
            : ('lang' in to.query ? to.query.lang : null)
        if (locale && app.$config.locale.supported.includes(locale)) {
            app.$setLocale(locale).then(() => next())
        }
        else {
            next()
        }
    }
}