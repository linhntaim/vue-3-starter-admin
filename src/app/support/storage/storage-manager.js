import {Drivers} from '../drivers'
import {LocalStorage} from './local-storage'
import {CookieStorage} from '@/app/support/storage/cookie-storage'

export class StorageManager extends Drivers
{
    getDefaultDriver() {
        return this.config?.get('storage.default', 'local')
    }

    encryptor() {
        return this.app.config.globalProperties.$encryptor
    }

    createDefaultDriver() {
        return new LocalStorage(this.encryptor(), this.config?.get('storage.drivers.local') || {})
    }

    createCookie() {
        return new CookieStorage(this.encryptor(), this.config?.get('storage.drivers.cookie') || {})
    }
}