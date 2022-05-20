import {I18LocaleHandler} from '@/app/support/settings'
import {localization as config} from '@/config'
import {Settings} from '@/app/support/settings/settings'
import {str} from '@/app/support/helpers'

const localeHandler = new I18LocaleHandler(config.locale.supported)
const settings = new Settings()
    .setLocaleHandler(localeHandler)

export const i18n = localeHandler.createI18Provider({
    locale: config.locale.default,
    fallbackLocale: config.locale.fallback,
})
export const localization = {
    install(app) {
        settings
            .setLocaleApply(async (locale, changed) => {
                if (changed) {
                    document.querySelector('html').setAttribute('lang', locale)
                    app.config.globalProperties.$request.with('starter', axios => {
                        axios.defaults.headers.common['Accept-Language'] = locale
                        return axios
                    }, 'header.accept-language')
                    await app.config.globalProperties.$cookie.put('locale', locale)
                    app.config.globalProperties.$log.info('locale', 'applied', locale)
                }
                else {
                    app.config.globalProperties.$log.info('locale', 'no need to apply')
                }
            })
            .setCommonApply((settings, changes) => {
                if (Object.keys(changes).some(key => changes[key])) {
                    app.config.globalProperties.$request.with('starter', axios => {
                        axios.defaults.headers.common['X-Settings'] = (() => {
                            const values = {}
                            Object.keys(settings).forEach(key => settings[key] && (values[str.snake(key)] = settings[key]))
                            return JSON.stringify(values)
                        })()
                        return axios
                    }, 'header.x-settings')
                    app.config.globalProperties.$log.info('settings', 'applied', settings)
                }
                else {
                    app.config.globalProperties.$log.info('settings', 'no need to apply')
                }
            })

        app.config.globalProperties.$setLocale = locale => {
            app.config.globalProperties.$log.info('locale', 'applying', locale)
            return settings.setLocale(locale).apply()
        }
    },
}
