import {I18LocaleHandler} from '@/app/support/locale'
import {locale as config} from '@/config'

const localeManager = new I18LocaleHandler()
export const i18n = localeManager.createI18Provider({
    locale: config.default,
    fallbackLocale: config.fallback,
})
export const locale = {
    install(app) {
        app.config.globalProperties.$setLocale = locale => {
            app.config.globalProperties.$log.info('locale', 'set', locale)
            return localeManager.setLocale(locale)
                .then(() => {
                    document.querySelector('html').setAttribute('lang', locale)
                    app.config.globalProperties.$request.with('starter', axios => {
                        axios.defaults.headers.common['Accept-Language'] = locale
                        return axios
                    }, 'locale')
                    app.config.globalProperties.$cookie.put('locale', locale)
                    return locale
                })
        }
    },
}
