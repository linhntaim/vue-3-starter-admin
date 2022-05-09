import * as providers from '../app/providers'
import {createApp} from 'vue'
import {take} from '@/app/support/helpers'
import App from '@/resources/views/App'

export const vueApp = createApp(App)

export const app = take(vueApp, function (app) {
    Object.keys(providers).forEach(key => app.use(providers[key]))
}).mount('#app')
