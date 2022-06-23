import {Singleton} from './singleton'

export function createFactory() {
    return {
        install(app) {
            app.config.globalProperties.$singleton = new Singleton(app)
        },
    }
}
