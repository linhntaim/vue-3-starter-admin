import {Drivers} from '../drivers'
import {LocalStorage} from './local-storage'

export class StorageManager extends Drivers
{
    getDefaultDriver() {
        return this.config?.get('storage.default', 'local')
    }

    createDefaultDriver() {
        return new LocalStorage(this.app.config.globalProperties.$encryptor)
    }
}