import {CacheManager} from './cache-manager'
import {registerPropertyFactory} from '@/app/support/helpers'

export function createCache(extend = {}) {
    return {
        install(app) {
            registerPropertyFactory(app.config.globalProperties, '$cacheManager', function () {
                return new CacheManager(app._instance.proxy).extend(extend)
            })
            registerPropertyFactory(app.config.globalProperties, '$cache', function (props) {
                return props.$cacheManager.driver()
            })
        },
    }
}
