import {Log} from './log'

export class ConsoleLog extends Log
{
    info(namespace, message, ...data) {
        console.info(namespace + ':', message, ...data)
    }

    error(namespace, message, ...data) {
        console.error(namespace + ':', message, ...data)
    }

    warn(namespace, message, ...data) {
        console.warn(namespace + ':', message, ...data)
    }
}