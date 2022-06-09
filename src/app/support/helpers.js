import {Str} from './str'

export function time() {
    return new Date().getTime()
}

export function only(data, keys) {
    const d = {}
    keys.forEach(key => key in data && (d[key] = data[key]))
    return d
}

export function take(value, callback = null) {
    callback && callback(value)
    return value
}

export function modify(value, callback = null) {
    return callback ? callback(value) : value
}

export function dataGet(data, key, def = null) {
    const keys = key.split('.')
    let k
    while ((k = keys.shift())) {
        if (typeof data === 'object' && k in data) {
            data = data[k]
        }
        else {
            data = null
            break
        }
    }
    return data == null ? def : data
}

export const str = new Str()
