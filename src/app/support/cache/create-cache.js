import {CacheManager} from './cache-manager'

export function createCache(extend = {}) {
    return {
        install(app) {
            const cacheManager = new CacheManager(app).extend(extend)
            app.config.globalProperties.$cacheManager = cacheManager
            app.config.globalProperties.$cache = cacheManager.driver()
        },
    }
}