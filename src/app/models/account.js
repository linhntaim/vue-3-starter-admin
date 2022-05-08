export const account = {
    namespaced: true,
    state: () => ({
        account: null,
    }),
    mutations: {
        setAccount(state, account) {
            state.account = account
        },
    },
    actions: {
        setAccount(context, account) {
            context.commit('setAccount', account)
        },
    },
    getters: {
        account: state => state.account,
    },
}