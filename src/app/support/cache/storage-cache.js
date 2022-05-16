import {Cache} from './cache'

export class StorageCache extends Cache
{
    constructor(storage) {
        super()

        this.storage = storage
    }

    set(key, data, expiresIn = null) {
        const options = {}
        if (expiresIn) {
            options.expired = new Date().getTime() + expiresIn
        }
        this.storage.put(key, data, options)
        return this
    }

    get(key, def = null) {
        return this.storage.get(key, def)
    }

    remove(key) {
        this.storage.remove(key)
        return this
    }
}