import {LogManager} from './log-manager'

export function createLog(extend = {}) {
    return {
        install(app) {
            const logManager = new LogManager(app).extend(extend)
            app.config.globalProperties.$logManager = logManager
            app.config.globalProperties.$log = logManager.driver()
        },
    }
}