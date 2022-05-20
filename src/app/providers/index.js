import {config} from './config'
import {log} from './log'
import {service} from './service'
import {encryption} from './encryption'
import {storage} from './storage'
import {cache} from './cache'
import {i18n, localization} from './settings'
import {store} from './store'
import {router} from './router'

// Should be maintained in order
export const providers = {
    config,
    log,
    service,
    encryption,
    storage,
    cache,
    i18n,
    localization,
    store,
    router,
}