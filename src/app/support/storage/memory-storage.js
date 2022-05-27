import {Storage} from './storage'

export class MemoryStorage extends Storage
{
    constructor(encryptor) {
        super(encryptor)

        this.data = {}
    }

    // eslint-disable-next-line no-unused-vars
    putRaw(key, rawValue, options = {}) {
        this.data[key] = rawValue
        return this
    }

    has(key) {
        return key in this.data
    }

    getRaw(key) {
        return this.data[key]
    }

    remove(key) {
        delete this.data[key]
        return this
    }
}