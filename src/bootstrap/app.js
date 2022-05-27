import {createApp} from 'vue'
import {providers} from '@/app/providers'
import {take, time} from '@/app/support/helpers'
import App from '@/resources/views/App'

export const vueStart = time()

export const vueApp = createApp(App).use({
    install(app) {
        app.config.globalProperties.$start = {
            fresh: 0,
            freshStart: vueStart,
            isFresh() {
                return this.fresh === 0
            },
            continue() {
                ++this.fresh
                this.freshStart = time()
            },
            reset() {
                this.fresh = 0
            },
        }
    },
})

export const app = take(vueApp, function (app) {
    Object.keys(providers).forEach(key => app.use(providers[key]))
}).mount('#app')
