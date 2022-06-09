import {StorageManager} from './storage-manager'

export function createStorage(extend = {}) {
    return {
        install(app) {
            const storageManager = new StorageManager(app).extend(extend)
            app.config.globalProperties.$storageManager = storageManager
            app.config.globalProperties.$storage = storageManager.driver()
            app.config.globalProperties.$cookie = storageManager.driver('cookie')
        },
    }
}
