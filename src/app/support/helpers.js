export function take(value, callback = null) {
    callback && callback(value)
    return value
}

export function modify(value, callback = null) {
    return callback ? callback(value) : value
}