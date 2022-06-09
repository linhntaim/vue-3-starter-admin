import {RequestManager} from './request-manager'
import {Singleton} from '../singleton'

export function createService(extend = {}) {
    return {
        install(app) {
            const singleton = new Singleton(app)
            app.config.globalProperties.$request = new RequestManager(app).extend(extend)
            app.config.globalProperties.$service = ServiceClass => singleton.make(ServiceClass)
        },
    }
}
