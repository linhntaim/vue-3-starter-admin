import * as configs from '@/config'

export const config = {
    install(app) {
        app.config.globalProperties.$config = configs
    },
}