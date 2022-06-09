import {UrlGenerator} from './url-generator'

export function createUrl() {
    return {
        install(app) {
            app.config.globalProperties.$url = new UrlGenerator(app)
        },
    }
}
