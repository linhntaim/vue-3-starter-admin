export const localization = {
    locale: {
        default: process.env.VUE_APP_LOCALE || 'en',
        fallback: process.env.VUE_APP_FALLBACK_LOCALE || 'en',

        supported: ['en', 'vi'],
    },
}
