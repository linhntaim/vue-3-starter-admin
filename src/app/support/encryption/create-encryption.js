import {registerPropertyFactory} from '@/app/support/helpers'
import {Encryption} from './encryption'

export function createEncryption(extend = {}) {
    return {
        install(app) {
            registerPropertyFactory(app.config.globalProperties, '$encryption', function () {
                return new Encryption(app._instance.proxy).extend(extend)
            })
            registerPropertyFactory(app.config.globalProperties, '$encryptor', function (props) {
                return props.$encryption.driver()
            })
        },
    }
}
