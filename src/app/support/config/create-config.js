import {Config} from './config'

export function createConfig(configs) {
    return {
        install(app) {
            app.config.globalProperties.$config = new Config(configs)
        },
    }
}
