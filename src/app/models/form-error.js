export const formError = {
    namespaced: true,
    state: () => ({
        messages: [],
        validation: {},
    }),
    mutations: {
        setMessages(state, messages) {
            state.messages = messages
        },
        setValidation(state, validation) {
            state.validation = validation
        },
        reset(state) {
            state.messages = []
            state.validation = {}
        },
    },
    getters: {
        messages: state => state.messages,
        validation: state => state.validation,
    },
}
