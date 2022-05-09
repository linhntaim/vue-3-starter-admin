import {StarterService} from '@/app/support/services'

export class PingService extends StarterService {
    ping() {
        return this.get('ping')
    }
}