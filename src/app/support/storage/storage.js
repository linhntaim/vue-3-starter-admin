import {Maker} from '../maker'

export class Storage extends Maker
{
    constructor(app, options = {}) {
        super(app)

        this.encryptor = options.encryptor
            ? this.app.config.globalProperties.$encryption.driver(options.encryptor )
            : this.app.config.globalProperties.$encryptor
        if (options.encrypt) {
            options.flatten = true
        }
        this.options = options
    }

    async put(key, value, options = {}) {
        return this.putRaw(key, await this.toRawValue(this.toValue(value, options), options), options)
    }

    // eslint-disable-next-line no-unused-vars
    putRaw(key, rawValue, options = {}) {
        return this
    }

    // eslint-disable-next-line no-unused-vars
    toValue(value, options = {}) {
        return value
    }

    async toRawValue(value, options = {}) {
        let raw = {value, options}
        if (this.options.flatten) {
            raw = JSON.stringify(raw)
        }
        if (this.options.encrypt) {
            raw = await this.encryptor.encrypt(raw)
        }
        return raw
    }

    flash(key, value, options = {}) {
        options.flash = true
        return this.put(key, value, options)
    }

    // eslint-disable-next-line no-unused-vars
    has(key) {
        return false
    }

    async keep(key) {
        if (this.has(key)) {
            const got = await this.fromRawValue(this.getRaw(key))
            const value = this.fromValue(key, got.value, got.options)
            got.options.keep = true
            await this.put(key, value, got.options)
        }
        return this
    }

    async get(key, def = null) {
        if (!this.has(key)) {
            return def
        }

        const got = await this.fromRawValue(key, this.getRaw(key))
        return this.fromValue(key, got.value, got.options)
    }

    fromValue(key, value, options = {}) {
        if (options.expired) {
            if (new Date().getTime() > options.expired) {
                this.remove(key)
                return null
            }
        }
        if (options.flash) {
            if (options.keep) {
                delete options.keep
            }
            else {
                this.remove(key)
            }
        }
        return value
    }

    async fromRawValue(key, rawValue) {
        if (this.options.encrypt) {
            rawValue = await this.encryptor.decrypt(rawValue)
        }
        if (this.options.flatten) {
            rawValue = JSON.parse(rawValue)
        }
        return rawValue
    }

    // eslint-disable-next-line no-unused-vars
    getRaw(key) {
        return null
    }

    // eslint-disable-next-line no-unused-vars
    remove(key) {
        return this
    }
}