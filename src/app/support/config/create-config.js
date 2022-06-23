import {registerPropertyFactory} from '../helpers'
import {Config} from './config'

export function createConfig(configs) {
    return {
        install(app) {
            registerPropertyFactory(app.config.globalProperties, '$config', function () {
                return new Config(configs)
            })
        },
    }
}
