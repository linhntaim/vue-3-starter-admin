import {ConsoleLog} from '@/app/support/log/console-log'
import {modify} from '@/app/support/helpers'

export function createLog() {
    return {
        install(app) {
            app.config.globalProperties.$log = modify(
                app.config.globalProperties.$config?.get('log.default', ConsoleLog),
                LogClass => new LogClass,
            )
        },
    }
}