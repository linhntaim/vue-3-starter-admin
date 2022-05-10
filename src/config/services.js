import {trim} from 'locutus/php/strings'

export const services = {
    request: 'starter',
    requests: {
        starter: {
            baseURL: (() => {
                if('VUE_APP_SERVICE_URL' in process.env) {
                    let serviceUrl = process.env.VUE_APP_SERVICE_URL
                    if(/^https?:\/\//.test(serviceUrl)) {
                        return  serviceUrl
                    }
                    serviceUrl = trim(serviceUrl, '/')
                    return window.location.origin + (serviceUrl ? '/' + serviceUrl : '')
                }
                return null
            })(),
        },
    },
}