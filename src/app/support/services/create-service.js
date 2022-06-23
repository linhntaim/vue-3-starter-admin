import {RequestManager} from './request-manager'

export function createService(extend = {}) {
    return {
        install(app) {
            app.config.globalProperties.$request = new RequestManager(app).extend(extend)
            app.config.globalProperties.$service = ServiceClass => app.config.globalProperties.$singleton.make(ServiceClass)
        },
    }
}
