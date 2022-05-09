import {app} from '@/bootstrap/app'
import {PingService} from '@/app/services/ping-service'
import {ServiceError} from '@/app/support/services'

export const ping = {
    namespaced: true,
    state: () => ({
        available: false,
        expiredAt: 0,
    }),
    mutations: {
        setAvailable(state, available) {
            state.available = available
            state.expiredAt = new Date().getTime() + 60 * 1000
        },
    },
    actions: {
        async ping(context) {
            if (context.getters.expired) {
                context.commit(
                    'setAvailable',
                    (await app.$service(PingService).ping()) instanceof ServiceError,
                )
            }
            return context.getters.available
        },
    },
    getters: {
        available: state => state.available,
        expired: state => new Date().getTime() > state.expiredAt,
    },
}