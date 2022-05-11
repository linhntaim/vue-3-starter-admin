import {Encryption} from './encryption'

export function createEncryption(extend = {}) {
    return {
        install(app) {
            const encryption = new Encryption(app).extend(extend)
            app.config.globalProperties.$encryption = encryption
            app.config.globalProperties.$encryptor = encryption.driver()
        },
    }
}