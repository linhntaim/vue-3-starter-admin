import {registerPropertyFactory} from '@/app/support/helpers'
import {LogManager} from './log-manager'

export function createLog(extend = {}) {
    return {
        install(app) {
            registerPropertyFactory(app.config.globalProperties, '$logManager', function () {
                return new LogManager(app._instance.proxy).extend(extend)
            })
            registerPropertyFactory(app.config.globalProperties, '$log', function (props) {
                return props.$logManager.driver()
            })
        },
    }
}
