import {registerPropertyFactory} from '@/app/support/helpers'
import {RequestManager} from './request-manager'

export function createService(extend = {}) {
    return {
        install(app) {
            registerPropertyFactory(app.config.globalProperties, '$request', function () {
                return new RequestManager(app._instance.proxy).extend(extend)
            })
            registerPropertyFactory(app.config.globalProperties, '$service', function (props) {
                return ServiceClass => props.$singleton.make(ServiceClass)
            })
        },
    }
}
