import {Drivers} from '../drivers'
import {StorageCache} from '@/app/support/cache/storage-cache'

export class CacheManager extends Drivers
{
    constructor(app) {
        super(app, 'cache', 'storage')
    }

    storage(storageDriver) {
        return storageDriver
            ? this.app.config.globalProperties.$storageManager.driver(storageDriver)
            : this.app.config.globalProperties.$storage
    }

    createStorage() {
        const options = this.options('storage')
        return new StorageCache(this.storage(options.storage), options)
    }
}