export function createLog() {
    return {
        install(app) {
            const LogClass = app.config.globalProperties.$config.log.default
            app.config.globalProperties.$log = new LogClass
        },
    }
}