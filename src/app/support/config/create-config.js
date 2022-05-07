export function createConfig(config) {
    return {
        install(app) {
            app.config.globalProperties.$log = config
        },
    }
}