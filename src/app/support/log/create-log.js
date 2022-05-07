import {ConsoleLog} from './console-log'

export function createLog(options) {
    const LogClass = options && 'class' in options ? options.class : ConsoleLog
    return {
        install(app) {
            app.config.globalProperties.$log = new LogClass
        },
    }
}