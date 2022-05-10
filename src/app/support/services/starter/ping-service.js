import {StarterService} from '../starter-service'

export class PingService extends StarterService
{
    ping() {
        return this.get('ping')
    }
}