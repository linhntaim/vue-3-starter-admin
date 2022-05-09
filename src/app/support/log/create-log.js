import {LogManager} from './log-manager'

export function createLog(extend = {}) {
    return {
        install(app) {
            const logManager = new LogManager(app).extend(extend)
            app.config.globalProperties.$logging = logManager
            app.config.globalProperties.$log = logManager.driver()
        },
    }
}