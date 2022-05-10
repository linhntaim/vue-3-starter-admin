export class Storage
{
    constructor(encryptor) {
        this.encryptor = encryptor
    }

    put(key, value, options = {}) {
        return this.putRaw(key, this.toValue(value, options), options)
    }

    // eslint-disable-next-line no-unused-vars
    putRaw(key, value, options = {}) {
        return this
    }

    toValue(value, options = {}) {
        if (options.encrypt) {
            value = this.encryptor.encrypt(JSON.stringify(value))
        }
        return value
    }

    flash(key, value, options = {}) {
        options.flash = true
        return this.put(key, value, options)
    }

    // eslint-disable-next-line no-unused-vars
    has(key) {
        return false
    }

    keep(key) {
        if (this.has(key)) {
            const got = this.fromValue(this.getRaw(key))
            got.options.keep = true
            this.put(key, got.value, got.options)
        }
        return this
    }

    get(key) {
        if (!this.has(key)) {
            return null
        }

        const got = this.getRaw(key)
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
        if (options.encrypt) {
            value = JSON.parse(this.encryptor.decrypt(value))
        }
        return value
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