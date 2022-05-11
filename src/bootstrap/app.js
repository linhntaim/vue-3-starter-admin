import {createApp} from 'vue'
import {providers} from '@/app/providers'
import {take} from '@/app/support/helpers'
import App from '@/resources/views/App'

export const vueApp = createApp(App)

export const app = take(vueApp, function (app) {
    Object.keys(providers).forEach(key => app.use(providers[key]))
}).mount('#app')
