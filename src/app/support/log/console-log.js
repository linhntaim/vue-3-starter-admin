import {Log} from './log'

export class ConsoleLog extends Log {
    info(namespace, message, ...data) {
        console.info(namespace + ':', message, ...data)
    }
}