import {Storage} from './storage'

export class MemoryStorage extends Storage
{
    constructor(encryptor) {
        super(encryptor)

        this.data = {}
    }

    putRaw(key, value, options = {}) {
        this.data[key] = {value, options}
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