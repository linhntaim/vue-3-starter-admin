import {Config} from '@/app/support/config/config'

export function createConfig(configs) {
    return {
        install(app) {
            app.config.globalProperties.$config = new Config(configs)
        },
    }
}