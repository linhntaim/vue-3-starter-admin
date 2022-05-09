export const app = {
    name: process.env.VUE_APP_NAME,
    client: process.env.VUE_APP_CLIENT,
    static: !process.env.VUE_APP_SERVICE_URL,

    routes: {
        connection_lost: {
            name: 'connection_lost',
        },
    },
}