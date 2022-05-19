import {LocaleHandler} from './locale-handler'
import {createI18n} from 'vue-i18n'
import {take} from '../helpers'

export class I18LocaleHandler extends LocaleHandler
{
    createI18Provider(options = {}) {
        options = Object.assign({
            globalInjection: true,
            legacy: false,
            locale: process.env.VUE_APP_I18N_LOCALE || 'en',
            fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
        }, options || {})
        this.loadedLocales = Object.keys(options.messages || {})
        this.locale = this.loadedLocales.length ? options.locale : null
        return take(createI18n(options), installer => this.i18n = installer.global)
    }

    applyLocale(locale) {
        this.i18n.locale.value = locale
        return super.applyLocale(locale)
    }

    setUnloadedLocale(locale) {
        return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${locale}.js`)
            .then(messages => {
                this.i18n.setLocaleMessage(locale, messages.default)
                this.loadedLocales.push(locale)
                return this.applyLocale(locale)
            })
            .catch(() => Promise.resolve(this.locale))
    }
}