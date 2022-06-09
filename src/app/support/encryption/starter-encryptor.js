import {Encryptor} from './encryptor'
import {EncryptService, ServiceError} from '../services'

export class StarterEncryptor extends Encryptor
{
    constructor(app, options = {}) {
        super(options)

        this.app = app
    }

    async encrypt(data) {
        const response = await this.app.config.globalProperties.$service(EncryptService).encrypt(data)
        if (response instanceof ServiceError) {
            throw 'Encrypt failed.'
        }
        return response.encrypted
    }

    async decrypt(data) {
        const response = await this.app.config.globalProperties.$service(EncryptService).decrypt(data)
        if (response instanceof ServiceError) {
            throw 'Decrypt failed.'
        }
        return response.decrypted
    }
}
