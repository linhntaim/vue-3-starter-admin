import {Drivers} from '../drivers'
import {StorageCache} from '@/app/support/cache/storage-cache'

export class CacheManager extends Drivers
{
    getDefaultDriver() {
        return this.config?.get('cache.default', 'storage')
    }

    createDefaultDriver() {
        return new StorageCache(
            this.app.config.globalProperties.$storageManager.driver(
                this.config?.get('cache.drivers.storage.driver', 'local'),
            ),
        )
    }
}