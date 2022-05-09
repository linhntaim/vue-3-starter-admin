import {Drivers} from '../drivers'
import {ConsoleLog} from './console-log'

export class LogManager extends Drivers {
    getDefaultDriver() {
        return this.config?.get('log.default', 'console')
    }

    createDefaultDriver() {
        return new ConsoleLog(this.config?.get('log.drivers.console', {}))
    }
}