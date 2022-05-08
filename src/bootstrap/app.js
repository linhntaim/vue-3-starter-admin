import * as providers from '../app/providers'
import {createApp} from 'vue'
import {take} from '@/app/support/helpers'
import App from '@/resources/views/App'

export const app = take(createApp(App), function (app) {
    Object.keys(providers).forEach(key => app.use(providers[key]))
}).mount('#app')
