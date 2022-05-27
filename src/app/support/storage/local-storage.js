import {Storage} from './storage'

export class LocalStorage extends Storage
{
    constructor(encryptor, options = {}) {
        super(encryptor, options)

        this.handler = window.localStorage
    }

    // eslint-disable-next-line no-unused-vars
    putRaw(key, rawValue, options = {}) {
        this.handler.setItem(key, rawValue)
        return this
    }

    has(key) {
        return key in this.handler
    }

    getRaw(key) {
        return this.handler.getItem(key)
    }

    remove(key) {
        this.handler.removeItem(key)
        return this
    }
}