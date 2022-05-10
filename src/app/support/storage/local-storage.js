import {Storage} from './storage'

export class LocalStorage extends Storage
{
    constructor(encryptor) {
        super(encryptor)

        this.handler = window.localStorage
    }

    putRaw(key, value, options = {}) {
        this.handler.setItem(key, JSON.stringify({value, options}))
        return this
    }

    has(key) {
        return key in this.handler
    }

    getRaw(key) {
        return JSON.parse(this.handler.getItem(key))
    }

    remove(key) {
        this.handler.removeItem(key)
        return this
    }
}