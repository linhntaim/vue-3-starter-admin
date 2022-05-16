export const app = {
    name: process.env.VUE_APP_NAME,
    client: process.env.VUE_APP_CLIENT,
    static: !('VUE_APP_SERVICE_URL' in process.env),

    ping: {
        expired_in: 60 * 1000, // 1 minute
    },

    routes: {
        connection_lost: {
            name: 'connection_lost',
        },
    },
}