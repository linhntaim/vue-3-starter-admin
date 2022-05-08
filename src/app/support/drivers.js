import {modify, str} from './helpers'

export class Drivers {
    constructor(app) {
        this.app = app
        this.config = app.config.globalProperties.$config
        this.drivers = {}
        this.extended = {}
    }

    getDefaultDriver() {
        return 'default'
    }

    extend(driver, callback) {
        switch (typeof driver) {
            case 'string':
                this.extended[driver] = callback
                break
            case 'object':
                Object.keys(driver).forEach(key => this.extended[key] = driver[key])
                break
        }
        return this
    }

    driver(driver = null) {
        if (driver == null) {
            driver = this.getDefaultDriver()
        }
        return driver in this.drivers
            ? this.drivers[driver]
            : (this.drivers[driver] = this.createDriver(driver))
    }

    createDriver(driver) {
        return modify(this.createCustomDriver(driver), createdDriver => {
            return createdDriver ? createdDriver : modify(this.createExtendedDriver(driver), createdDriver => {
                return createdDriver ? createdDriver : this.createDefaultDriver()
            })
        })
    }

    createCustomDriver(driver) {
        const method = 'create' + str.studly(driver)
        if (method in this) {
            return this[method]()
        }
        return null
    }

    createExtendedDriver(driver) {
        return driver in this.extended ? this.extended[driver]() : null
    }

    /**
     *
     * @returns {*}
     */
    createDefaultDriver() {
        throw 'Driver does not exist.'
    }
}