export class LocaleManager
{
    constructor() {
        this.loadedLocales = []
        this.locale = null
    }

    applyLocale(locale) {
        return this.locale = locale
    }

    setLocale(locale) {
        if (this.locale === locale) {
            return Promise.resolve(locale)
        }
        if (this.loadedLocales.includes(locale)) {
            return Promise.resolve(this.applyLocale(locale))
        }
        return this.setUnloadedLocale(locale)
    }

    setUnloadedLocale(locale) {
        return Promise.resolve(this.applyLocale(locale))
    }
}