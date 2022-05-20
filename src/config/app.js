export const app = {
    id: process.env.VUE_APP_ID,
    name: process.env.VUE_APP_NAME,
    static: !('VUE_APP_SERVICE_URL' in process.env),

    ping: {
        expired_in: 60 * 1000, // 1 minute
    },

    routes: {
        root: {
            name: 'root',
        },
        connection_lost: {
            name: 'connection_lost',
        },
        redirect_if_unauthenticated: {
            name: 'unauthenticated',
        },
        redirect_if_authenticated: {
            name: 'root',
        },
    },
}
