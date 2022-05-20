import {app} from '@/bootstrap/app'
import {only} from '@/app/support/helpers'
import {PrerequisiteService} from '@/app/services/prerequisite-service'

export const prerequisite = {
    namespaced: true,
    state: () => ({
        metadata: {},
    }),
    mutations: {
        setData(state, {name, data}) {
            state.metadata[name] = data
        },
        reset(state) {
            state.metadata = {}
        },
    },
    actions: {
        async require(context, names) {
            const notExisted = []
            names.forEach(
                name => !(name in context.state.metadata) && notExisted.push(name),
            )
            if (notExisted.length) {
                await app.$service(PrerequisiteService)
                    .done(data => notExisted.forEach(name => context.commit('setData', {name, data: data[name]})))
                    .require(notExisted)
            }
            return Promise.resolve(only(context.state.metadata, names))
        },
    },
    getters: {
        metadata: state => state.metadata,
    },
}