import {registerPropertyFactory} from '@/app/support/helpers'
import {StorageManager} from './storage-manager'

export function createStorage(extend = {}) {
    return {
        install(app) {
            registerPropertyFactory(app.config.globalProperties, '$storageManager', function () {
                return new StorageManager(app._instance.proxy).extend(extend)
            })
            registerPropertyFactory(app.config.globalProperties, '$storage', function (props) {
                return props.$storageManager.driver()
            })
            registerPropertyFactory(app.config.globalProperties, '$cookie', function (props) {
                return props.$storageManager.driver('cookie')
            })
        },
    }
}
