import {Singleton} from './singleton'
import {registerPropertyFactory} from '@/app/support/helpers'

export function createFactory() {
    return {
        install(app) {
            registerPropertyFactory(app.config.globalProperties, '$singleton', function () {
                return new Singleton(app._instance.proxy)
            })
        },
    }
}
