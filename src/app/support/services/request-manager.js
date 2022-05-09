import {Drivers} from '../drivers'
import axios from 'axios'

export class RequestManager extends Drivers {
    getDefaultDriver() {
        return this.config?.get('services.request', 'starter')
    }

    createDefaultDriver() {
        return axios.create(this.config?.get('services.requests.starter'))
    }
}